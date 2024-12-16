import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    delete_section,
    get_all_sections,
    refund_section,
    stop_section,
    update_section
} from "../../../Redux/actions/SectionThunk";
import {Button, Card, Input, Modal, Pagination, Select} from 'antd';
import {DeleteOutlined, FileExcelOutlined, SearchOutlined} from "@ant-design/icons";
import {SectionForm} from "./SectionForm";
import SectionTable from "./SectionTable";
import SectionDetailModal from "./Modal/SectionDetailModal";
import SectionEditModal from "./Modal/SectionEditModal";
import {toast} from "react-toastify";
import './Style/Section.css'
import {CSVLink} from "react-csv";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import {Option} from "antd/es/mentions";


const SectionManager = () => {
    const dispatch = useDispatch();
    const sections = useSelector((state) => state.SectionReducer.sections);
    const userData = useSelector(state => state.UserReducer.userData);
    const [open, setOpen] = useState(false);// Trạng thái mở modal chi tiết
    const [openEdit, setOpenEdit] = useState(false);// Trạng thái mở modal chỉnh sửa
    const [selectedSection, setSelectedSection] = useState(null);
    const [universityId, setUniversityId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [paginatedData, setPaginatedData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        dispatch(get_all_sections());
    }, [dispatch]);
    useEffect(() => {
        const data = filteredData.length > 0 || searchText || selectedStatus ? filteredData : sections;
        handlePagination(currentPage, pageSize, data);
    }, [sections, filteredData, currentPage, pageSize, searchText,selectedStatus]);
    useEffect(() => {
        if (userData && userData["university"]) {
            setUniversityId(userData["university"].id);
        }
    }, [userData]);
    const handleDelete = async () => {
        if (selectedRowKeys.length === 0) {
            return; // Nếu không có gì được chọn thì không làm gì
        }
        Modal.confirm({
            title: 'Xác nhận xóa vĩnh viễn ',
            content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} khoa đã chọn?`,
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
                await dispatch(delete_section(selectedRowKeys));
                dispatch(get_all_sections(currentPage, pageSize)); // Lấy lại danh sách
                setSelectedRowKeys([]); // Reset lại danh sách các ID đã chọn
            },
        });
    }
    const handleInfo = (id) => {
        const section = sections.find(s => s.id === id); // Find section by ID
        setSelectedSection(section);
        setOpen(true);
    };
    const handleEdit = (id) => {
        const section = sections.find(s => s.id === id); // Find section by ID
        setSelectedSection(section);
        setOpenEdit(true);
    };
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        // Lọc các section theo name
        const filtered = sections.filter((section) =>
            section.name.toLowerCase().includes(value.toLowerCase()) // Chỉ lọc theo name
        );
        // Nếu không tìm thấy kết quả, hiển thị mảng rỗng
        setFilteredData(filtered);
        setCurrentPage(1);
    };
    const handleStatusChange = (value) => {
        setSelectedStatus(value);
        let filtered = sections;

        // Nếu có trạng thái được chọn, lọc theo trạng thái
        if (value) {
            filtered = sections.filter((section) =>
                section.status.toLowerCase().trim() === value.toLowerCase().trim() // Kiểm tra chính xác trạng thái
            );
        }

        setFilteredData(filtered); // Cập nhật danh sách sau khi lọc
        setCurrentPage(1); // Đặt lại trang về 1 khi thay đổi bộ lọc
    };
    const handleSubmitEdit = async (values) => {
        const sectionId = selectedSection?.id; // Lấy ID của section cần cập nhật
        await dispatch(update_section(sectionId, values)); // Chờ cập nhật hoàn thành
        // Đóng modal sau khi cập nhật thành công
        // setOpenEdit(false);
    }
    const exportToExcel = () => {
        const dataToExport = filteredData.length > 0 ? filteredData : sections;
        if (dataToExport && dataToExport.length > 0) {
            toast.success('Tải xuống thành công');
        } else {
            toast.error('Không có dữ liệu để xuất');
        }
    };
    const csvHeaders = [
        {label: "STT", key: "index"},
        {label: "Tên khoa", key: "name"},
        {label: "Mô tả", key: "description"}
    ];
    const handlePagination = (page, size, data) => {
        const validData = Array.isArray(data) ? data : [];
        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;
        const paginatedItems = validData.slice(startIndex, endIndex);
        setPaginatedData(paginatedItems);
    };
    const handleStopSection = async (id) => {
        await dispatch(stop_section(id));
        dispatch(get_all_sections());
    };
    const handleRefundSection = async (id) => {
        await dispatch(refund_section(id))
        dispatch(get_all_sections());
    }
    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        handlePagination(page, size);
    };

    return (
        <>
            <section>
                <div className="m-5 mt-5">
                    <div className="row ">
                        <div className="section-form col-md-4 mb-3">
                            <SectionForm universityId={universityId}/>
                        </div>
                        <div className="section-table col-md-8 mb-3">
                            <Card style={{textAlign: 'center'}} title="Danh sách khoa">
                                <div className="table-responsive">
                                    <div className="d-flex justify-content-between mb-3">
                                        <Input placeholder="Tìm kiếm..." value={searchText}
                                               onChange={handleSearch} prefix={<SearchOutlined/>}
                                               style={{width: 200}}/>
                                        <div className="d-flex justify-content-end">
                                            <Select
                                                style={{marginRight:'10px'}}
                                                placeholder="Trạng thái"
                                                value={selectedStatus}
                                                onChange={handleStatusChange}
                                            >
                                                <Select.Option value="">Tất cả</Select.Option>
                                                <Select.Option value="active">Hoạt động</Select.Option>
                                                <Select.Option value="inactive">Tạm ngưng</Select.Option>

                                            </Select>
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
                                            <Button type="default" icon={<FileExcelOutlined/>}
                                                    style={{backgroundColor: '#107C41', color: '#FFFFFF',marginLeft: '10px'}}
                                                    onClick={exportToExcel}>
                                                <CSVLink
                                                    data={filteredData.length > 0 ? filteredData : sections}
                                                    headers={csvHeaders}
                                                    filename={"DanhSachKhoa.csv"}
                                                    style={{color: 'inherit', textDecoration: 'none'}}
                                                >
                                                    Export excel
                                                </CSVLink>
                                            </Button>
                                        </div>
                                    </div>
                                    <SectionTable
                                        sections={paginatedData}
                                        onDelete={handleDelete} onInfo={handleInfo} onEdit={handleEdit}
                                        pageSize={pageSize} currentPage={currentPage} onStop={handleStopSection}
                                        onRefund={handleRefundSection}
                                        selectedRowKeys={selectedRowKeys}
                                        setSelectedRowKeys={setSelectedRowKeys}/>
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
                                            onChange={handlePageChange}
                                            total={searchText ? filteredData.length : sections.length}
                                            showSizeChanger={false}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
            <SectionDetailModal open={open} onClose={() => setOpen(false)} section={selectedSection}/>
            <SectionEditModal open={openEdit} onClose={() => setOpenEdit(false)} section={selectedSection}
                              universityId={universityId} onSubmit={handleSubmitEdit}/>
        </>
    )
}
export default SectionManager;