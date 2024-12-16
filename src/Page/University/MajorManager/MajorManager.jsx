import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Input, Modal, Pagination, Select} from "antd";
import {DeleteOutlined, FileExcelOutlined, SearchOutlined} from "@ant-design/icons";
import {
    create_major, delete_major,
    get_all_majors, refund_major,
    stop_major,
    update_major_id
} from "../../../Redux/actions/MajorThunk";
import MajorTable from "./MajorTable";
import MajorForm from "./MajorForm";
import MajorDetailModal from "./Modal/MajorDetailModal";
import {toast} from "react-toastify";
import MajorEditModal from "./Modal/MajorEditModal";
import {get_all_sections} from "../../../Redux/actions/SectionThunk";
import './Style/Major.css'
import {CSVLink} from "react-csv";
import ResultSummary from "../../../Component/Paging/ResultsSummary";


const MajorManager = () => {
    const dispatch = useDispatch();
    const {majors} = useSelector((state) => state.MajorReducer);// Lấy danh sách chuyên ngành từ Redux
    const [searchKeyword, setSearchKeyword] = useState(''); // Từ khóa tìm kiếm
    const [open, setOpen] = useState(false);// Trạng thái mở modal chi tiết
    const [editOpen, setEditOpen] = useState(false);// Trạng thái mở modal chỉnh sửa
    const [selectedMajor, setSelectedMajor] = useState(null);// Lưu trữ chuyên ngành đang được chọn
    const [selectedSection, setSelectedSection] = useState('');// Lưu trữ khoa đang được chọn
    const sections = useSelector(state => state.SectionReducer.sections);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [pageSize] = useState(7); // Kích thước trang
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    useEffect(() => {
        if (sections.length === 0) {
            dispatch(get_all_sections());
        }
    }, [dispatch, sections.length]);
    useEffect(() => {
        dispatch(get_all_majors());
    }, [dispatch])

    const handleSectionChange = (value) => {
        setSelectedSection(value);
        setCurrentPage(1); // Reset to first page when section changes
    };
    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
        setCurrentPage(1); // Reset to first page when search keyword changes
    };
    const handleStatusChange = (value) => {
        setSelectedStatus(value); // Lưu trạng thái được chọn
        setCurrentPage(1); // Reset trang về 1 khi thay đổi trạng thái
    };
    const handleInfo = (id) => {
        const major = majors.find((m) => m.id === id);
        setSelectedMajor(major);
        setOpen(true);
    }
    const handleSubmit = (values) => {
        dispatch(create_major(values))
            .then(() => {
                dispatch(get_all_majors());
            })
    }
    const handleDelete = async () => {
        if (selectedRowKeys.length === 0) {
            return; // Nếu không có gì được chọn thì không làm gì
        }
        Modal.confirm({
            title: 'Xác nhận xóa vĩnh viễn ',
            content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} chuyên ngành đã chọn?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            okButtonProps: {
                style: {
                    backgroundColor: '#FF4D4F', // Màu nền đỏ
                    color: 'white', // Màu chữ trắng
                    borderColor: '#FF4D4F', // Viền đỏ
                }
            },
            onOk: async () => {
                // Gọi API xóa với danh sách các ID đã chọn
                await dispatch(delete_major(selectedRowKeys));
                dispatch(get_all_majors(currentPage, pageSize)); // Lấy lại danh sách
                setSelectedRowKeys([]); // Reset lại danh sách các ID đã chọn
            },
        });
    }
    const handleEdit = (id) => {
        const major = majors.find((m) => m.id === id);
        setSelectedMajor(major);
        setEditOpen(true);
    };
    const handleEditSubmit = async (values) => {
        await dispatch(update_major_id(selectedMajor.id, values));
        await dispatch(get_all_majors());
        // setEditOpen(false);
    };
    const headers = [
        {label: 'STT', key: 'stt'},
        {label: 'Tên chuyên ngành', key: 'name'},
        {label: 'Mã chuyên ngành', key: 'code'},
        {label: 'Số lượng sinh viên', key: 'numberStudent'},
        {label: 'Mô tả', key: 'description'},
    ];
    const data = majors.map((major, index) => ({
        id: major.id,
        stt: index + 1,
        name: major.name,
        code: major.code,
        numberStudent: major.numberStudent,
        status: major.status,
        description: major.description,
        sectionId: major.sectionId, // Thêm trường sectionId để lọc
        sectionName: sections.find(section => section.id === major.sectionId)?.name || 'Không có thông tin', // Thêm tên khoa vào data
    }));
    const filteredData = data.filter((major) =>
        (selectedSection === '' || major.sectionId === selectedSection) &&
        (selectedStatus === '' || major.status.toLowerCase() === selectedStatus.toLowerCase()) &&
        (major.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            major.code.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
// Calculate start and end index for pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    // Get paginated data
    const paginatedData = filteredData.slice(startIndex, endIndex);
    const exportToExcel = () => {
        const dataToExport = filteredData.length > 0 ? filteredData : sections;
        if (dataToExport && dataToExport.length > 0) {
            toast.success('Tải xuống thành công');
        } else {
            toast.error('Không có dữ liệu để xuất');
        }
    };
    const handleStopMajor = async (id) => {
        await dispatch(stop_major(id));
        dispatch(get_all_majors(currentPage, pageSize));
    };
    const handleRefundMajor = async (id) => {
        await dispatch(refund_major(id))
        dispatch(get_all_majors(currentPage, pageSize));
    }

    return (
        <>
            <section>
                <div className="m-5 mt-5">
                    <div className="row">
                        <div className="col-lg-3 mb-3 border-5">
                            <Card title="Thông tin chuyên ngành">
                                <MajorForm onSubmit={handleSubmit}/>
                            </Card>
                        </div>
                        <div className="col-lg-9 mb-3">
                            <Card title="Danh sách chuyên ngành">
                                <div className="table-responsive">
                                    <div className="d-flex mb-3 search-section">
                                        <Select
                                            style={{width: 200}}
                                            autoFocus={true}
                                            placeholder="Tìm kiếm theo khoa"
                                            optionFilterProp="label"
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={[
                                                {value: "", label: "Tất cả"}, // Lựa chọn "Tất cả" ở đầu
                                                ...sections.map(section => ({
                                                    value: section.id,
                                                    label: section.name
                                                }))
                                            ]}
                                            onChange={handleSectionChange}
                                            value={selectedSection}
                                        />

                                        <Select
                                            style={{width: 180}}
                                            placeholder="Trạng thái"
                                            onChange={handleStatusChange}
                                            value={selectedStatus}
                                        >
                                            <Select.Option value="">Tất cả</Select.Option>
                                            <Select.Option value="active">Hoạt động</Select.Option>
                                            <Select.Option value="inactive">Tạm ngưng</Select.Option>

                                        </Select>
                                        <Input placeholder="Tìm kiếm theo tên hoặc mã ngành "
                                               value={searchKeyword}
                                               onChange={handleSearchChange} prefix={<SearchOutlined/>}/>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            icon={<DeleteOutlined/>}
                                            danger={true} color={"danger"}
                                            onClick={handleDelete} // Gọi hàm xóa
                                            disabled={selectedRowKeys.length === 0} // Vô hiệu hóa nút nếu không có ID nào được chọn
                                        >
                                            Xóa
                                        </Button>
                                        <Button type="default" icon={<FileExcelOutlined/>} onClick={exportToExcel}
                                                style={{backgroundColor: '#107C41', color: '#FFFFFF'}}>
                                            <CSVLink
                                                data={filteredData}
                                                headers={headers}
                                                filename={'DanhSachChuyenNganh.csv'}
                                                style={{color: 'inherit', textDecoration: 'none'}}
                                            >
                                                Export excel
                                            </CSVLink>
                                        </Button>
                                    </div>
                                    <MajorTable data={paginatedData}
                                                onInfo={handleInfo}
                                                onDelete={handleDelete}
                                                onEdit={handleEdit}
                                                onStop={handleStopMajor}
                                                onRefund={handleRefundMajor}
                                                selectedRowKeys={selectedRowKeys}
                                                setSelectedRowKeys={setSelectedRowKeys}
                                                sections={sections}/>
                                    <ResultSummary totalElements={filteredData.length}/>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "50px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Pagination
                                            current={currentPage}
                                            pageSize={pageSize}
                                            total={searchKeyword ? filteredData.length : majors.length}
                                            onChange={(page) => setCurrentPage(page)}
                                            showSizeChanger={false}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
            <MajorDetailModal open={open} onClose={() => setOpen(false)} major={selectedMajor} sections={sections}/>
            <MajorEditModal open={editOpen} onClose={() => setEditOpen(false)} major={selectedMajor}
                            onSubmit={handleEditSubmit}/>
        </>
    )
}
export default MajorManager;