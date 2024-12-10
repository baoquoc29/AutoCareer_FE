import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {delete_section, get_all_sections, update_section} from "../../../Redux/actions/SectionThunk";
import {Button, Card, Input} from 'antd';
import { FileExcelOutlined, SearchOutlined} from "@ant-design/icons";
import {SectionForm} from "./SectionForm";
import SectionTable from "./SectionTable";
import SectionDetailModal from "./Modal/SectionDetailModal";
import SectionEditModal from "./Modal/SectionEditModal";
import {toast} from "react-toastify";
import './Style/Section.css'
import {CSVLink} from "react-csv";

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

    useEffect(() => {
        dispatch(get_all_sections());
    }, [dispatch]);
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
        // Nếu không tìm thấy kết quả, hiển thị tất cả các section
        setFilteredData(filtered.length > 0 ? filtered : []);
    };
    const handleSubmitEdit = (values) => {
        const sectionId = selectedSection?.id; // Lấy ID của section cần cập nhật
        if (sectionId) {
            dispatch(update_section(sectionId, values)) // Truyền ID và các giá trị cần cập nhật
                .then(() => {
                    toast.success("Cập nhật khoa thành công")
                    setOpenEdit(false); // Đóng modal sau khi cập nhật thành công
                })
                .catch((error) => {
                    console.error("Lỗi khi cập nhật section:", error);
                });
        } else {
            console.error("Không tìm thấy ID của section.");
        }
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
        { label: "STT", key: "index" },
        { label: "Tên khoa", key: "name" },
        { label: "Mô tả", key: "description" }
    ];
    return (
        <>
            <section>
                <div className="m-5 mt-5">
                    <div className="row ">
                        <div className="section-form col-md-4 mb-3">
                            <SectionForm universityId={universityId}/>
                        </div>
                        <div className="section-table col-md-8 mb-3">
                            <Card title="Danh sách Khoa">
                                <div className="table-responsive">
                                    <div className="d-flex justify-content-between mb-3">
                                        <Input placeholder="Search..." value={searchText}
                                               onChange={handleSearch} prefix={<SearchOutlined/>}
                                               style={{width: 200}}/>
                                        <Button type="default" icon={<FileExcelOutlined/>} style={{backgroundColor: '#107C41', color: '#FFFFFF'}} onClick={exportToExcel}>
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
                                        sections={filteredData.length > 0 ? filteredData : sections}
                                        onDelete={handleDelete} onInfo={handleInfo} onEdit={handleEdit}/>
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