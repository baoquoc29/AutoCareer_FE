import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {delete_section, get_all_sections, update_section} from "../../../Redux/actions/SectionThunk";
import {Button, Card, Input, Pagination} from 'antd';
import {FileExcelOutlined, SearchOutlined} from "@ant-design/icons";
import {SectionForm} from "./SectionForm";
import SectionTable from "./SectionTable";
import SectionDetailModal from "./Modal/SectionDetailModal";
import SectionEditModal from "./Modal/SectionEditModal";
import {toast} from "react-toastify";
import './Style/Section.css'
import {CSVLink} from "react-csv";
import ResultSummary from "../../../Component/Paging/ResultsSummary";

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
    const [pageSize, setPageSize] = useState(5);
    const [paginatedData, setPaginatedData] = useState([]);

    useEffect(() => {
        dispatch(get_all_sections());
    }, [dispatch]);

    useEffect(() => {
        const data = filteredData.length > 0 || searchText ? filteredData : sections;
        handlePagination(currentPage, pageSize, data);
    }, [sections, filteredData, currentPage, pageSize, searchText]);

    useEffect(() => {
        if (userData && userData["university"]) {
            setUniversityId(userData["university"].id);
        }
    }, [userData]);
    const handleDelete = (id) => {
        dispatch(delete_section(id))
            .then(() => {
                dispatch(get_all_sections());
            })
            .catch((error) => {
                console.log(error)
            })
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
                                        <Button type="default" icon={<FileExcelOutlined/>}
                                                style={{backgroundColor: '#107C41', color: '#FFFFFF'}}
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
                                    <SectionTable
                                        sections={paginatedData}
                                        onDelete={handleDelete} onInfo={handleInfo} onEdit={handleEdit} pageSize={pageSize} currentPage={currentPage}/>
                                    <ResultSummary totalElements={searchText ? filteredData.length : sections.length}/>
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