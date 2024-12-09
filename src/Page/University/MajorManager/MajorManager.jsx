import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import * as XLSX from 'xlsx';
import {Button, Card, Input, Select} from "antd";
import {DownloadOutlined, SearchOutlined} from "@ant-design/icons";
import {create_major, delete_major_id, get_all_majors, update_major_id} from "../../../Redux/actions/MajorThunk";
import MajorTable from "./MajorTable";
import MajorForm from "./MajorForm";
import MajorDetailModal from "./Modal/MajorDetailModal";
import {toast} from "react-toastify";
import MajorEditModal from "./Modal/MajorEditModal";
import {get_all_sections} from "../../../Redux/actions/SectionThunk";
import './Style/Major.css'


const MajorManager = () => {
    const dispatch = useDispatch();
    const {majors} = useSelector((state) => state.MajorReducer);// Lấy danh sách chuyên ngành từ Redux

    const [searchText, setSearchText] = useState('');// Lưu trữ từ khóa tìm kiếm
    const [filteredData, setFilteredData] = useState([]);// Lưu trữ danh sách chuyên ngành đã lọc
    const [open, setOpen] = useState(false);// Trạng thái mở modal chi tiết
    const [editOpen, setEditOpen] = useState(false);// Trạng thái mở modal chỉnh sửa
    const [selectedMajor, setSelectedMajor] = useState(null);// Lưu trữ chuyên ngành đang được chọn
    const [selectedSection, setSelectedSection] = useState('');// Lưu trữ khoa đang được chọn
    const sections = useSelector(state => state.SectionReducer.sections);
    useEffect(() => {
        dispatch(get_all_majors());
    }, [dispatch]);
    useEffect(() => {
        if (sections.length === 0) {
            dispatch(get_all_sections());
        }
    }, [dispatch, sections.length]);
    // Hàm xử lý tìm kiếm chuyên ngành theo tên hoặc mã
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        filterData(value, selectedSection);
    };
    // Hàm xử lý thay đổi khoa được chọn
    const handleSectionChange = (value) => {
        setSelectedSection(value);
        filterData(searchText, value);
    };
    // Hàm lọc dữ liệu chuyên ngành theo từ khóa và khoa
    const filterData = (text, sectionId) => {
        const filtered = majors.filter((major) =>
            (major.name.toLowerCase().includes(text.toLowerCase()) ||
                major.code.toLowerCase().includes(text.toLowerCase())) &&
            (sectionId ? major.sectionId === sectionId : true)
        );

        // Cập nhật lại số thứ tự (stt) sau khi lọc
        const updatedFilteredData = filtered.map((major, index) => ({
            id: major.id,
            stt: index + 1,  // Cập nhật lại stt trong filteredData
            name: major.name,
            code: major.code,
            numberStudent: major.numberStudent,
            status: major.status,
            description: major.description,
        }));

        setFilteredData(updatedFilteredData);
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
                toast.success("Xóa chuyên ngành thành công")
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
                toast.success("Chỉnh sửa chuyên ngành thành công");
                dispatch(get_all_majors());
            })
            .catch((error) => {
                toast.error(error.messages);
            });
    };
    const exportToExcel = () => {
        if (filteredData && filteredData.length > 0) {
            // Chuyển dữ liệu thành bảng tính Excel
            const worksheet = XLSX.utils.json_to_sheet(filteredData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Chuyên ngành');

            // Xuất file Excel
            XLSX.writeFile(workbook, 'Chuyên Ngành.xlsx');
        } else {
            // Nếu không có dữ liệu, hiển thị thông báo lỗi
            toast.error("Không có dữ liệu để xuất");
        }
    };
    const data = majors.map((major, index) => ({
        id: major.id,
        stt: index + 1,
        name: major.name,
        code: major.code,
        numberStudent: major.numberStudent,
        status: major.status,
        description: major.description,
    }));

    return (
        <>
            <section>
                <div className="container mt-5">
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
                                               value={searchText}
                                               onChange={handleSearch} prefix={<SearchOutlined/>}/>
                                        <Button type="default" icon={<DownloadOutlined/>}
                                                onClick={exportToExcel}>Tải xuống dạng excel</Button>
                                    </div>
                                    <MajorTable data={filteredData.length > 0 ? filteredData : data}
                                                onInfo={handleInfo} onDelete={handleDelete}
                                                onEdit={handleEdit}/>
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