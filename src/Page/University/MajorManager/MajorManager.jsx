import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Input, Pagination, Select} from "antd";
import {FileExcelOutlined, SearchOutlined} from "@ant-design/icons";
import {create_major, delete_major_id, get_all_majors, update_major_id} from "../../../Redux/actions/MajorThunk";
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
    };
    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
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
    const handleDelete = (id) => {
        dispatch(delete_major_id(id))
            .then(() => {
                dispatch(get_all_majors())
            })
            .catch((error) => {
                toast.success(error.messages)
            })
    }
    const handleEdit = (id) => {
        const major = majors.find((m) => m.id === id);
        setSelectedMajor(major);
        setEditOpen(true);
    };
    const handleEditSubmit = (values) => {
        dispatch(update_major_id(selectedMajor.id, values))
            .then(() => {
                dispatch(get_all_majors());
            })
            .catch((error) => {
                toast.error(error.messages);
            });
    };
    // const exportToExcel = () => {
    //     if (dataToExport && dataToExport.length > 0) {
    //         toast.success('Tải xuống thành công');
    //     } else {
    //         toast.error('Không có dữ liệu để xuất');
    //     }
    // };

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
    }));
    const filteredData = data.filter((major) =>
        major.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        major.code.toLowerCase().includes(searchKeyword.toLowerCase())
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

    return (
        <>
            <section>
                <div className="m-5 mt-5">
                    <div className="row">
                        <div className="col-lg-4 mb-3 border-5">
                            <Card title="Thông tin chuyên ngành">
                                <MajorForm onSubmit={handleSubmit}/>
                            </Card>
                        </div>
                        <div className="col-lg-8 mb-3">
                            <Card title="Danh sách chuyên ngành">
                                <div className="table-responsive">
                                    <div className="d-flex mb-3 search-section">
                                        <Select
                                            style={{width: 375}}
                                            showSearch
                                            autoFocus={true}
                                            placeholder="Tìm theo kiếm khoa"
                                            optionFilterProp="label"
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={sections.map(section => ({
                                                value: section.id,
                                                label: section.name
                                            }))}
                                            onChange={handleSectionChange}
                                            value={selectedSection || undefined}
                                        />
                                        <Input placeholder="Tìm kiếm theo tên hoặc mã ngành "
                                               value={searchKeyword}
                                               onChange={handleSearchChange}  prefix={<SearchOutlined/>}/>
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
                                    <MajorTable data={paginatedData} onInfo={handleInfo} onDelete={handleDelete}
                                                onEdit={handleEdit}/>
                                    <ResultSummary totalElements={majors.length}/>
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
                                            total={majors.length}
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
            <MajorDetailModal open={open} onClose={() => setOpen(false)} major={selectedMajor}/>
            <MajorEditModal open={editOpen} onClose={() => setEditOpen(false)} major={selectedMajor}
                            onSubmit={handleEditSubmit}/>
        </>
    )
}
export default MajorManager;