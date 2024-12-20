import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    delete_industry_by_id,
    get_all_industry_paging,
    get_industry_detail_admin, inactive_industry_by_id,
    update_industry_by_id
} from "../../../Redux/actions/IndustryThunk";
import {Button, Card, Input, Pagination} from "antd";
import IndustryAdminTable from "./IndustryAdminTable";
import IndustryAdminForm from "./IndustryAdminForm";
import IndustryAdminDetail from "./IndustryAdminDetail"; // Import Modal mới
import {DownloadOutlined, SearchOutlined,} from "@ant-design/icons";
import * as XLSX from "xlsx";
import ResultsSummary from "../../../Component/Paging/ResultsSummary";
import DeleteSelectedButton from "../../../Component/DeleteSelectedButton/DeleteSelectedButton";
import IndustryEditModal from "./IndustryEditModal";
import {toast} from "react-toastify";

const IndustryAdminManager = () => {
    const dispatch = useDispatch();
    const industryAdminTable = useSelector((state) => state.IndustryReducer.industriesAllPag); // Cho Table
    const selectedIndustry = useSelector((state) => state.IndustryReducer.industryDetail);
    const totalElements = useSelector((state) => state.IndustryReducer.totalElements); // Tổng số bản ghi
    const currentPage = useSelector((state) => state.IndustryReducer.currentPage); // Trang hiện tại
    const pageSize = useSelector((state) => state.IndustryReducer.pageSize); // Số bản ghi 1 trang
    const keyword = useSelector((state) => state.IndustryReducer.keyword); // Từ khóa tìm kiếm
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]); // Lưu trữ các bản ghi đã chọn
    const [editModalOpen, setEditModalOpen] = useState(false); // Quản lý trạng thái mở modal chỉnh sửa
    const [editingIndustry, setEditingIndustry] = useState(null); // Lưu ngành nghề cần chỉnh sửa

    useEffect(() => {
        dispatch(get_all_industry_paging(currentPage, pageSize, keyword));
    }, [dispatch, currentPage, pageSize, load]);

    useEffect(() => {
        setFilteredData(industryAdminTable);
    }, [industryAdminTable]);

    const handlePageChange = (page, pageSize) => {
        dispatch(get_all_industry_paging(page, pageSize, searchText)); // Gọi API với trang và kích thước mới
    };

    const handleEdit = (record) => {
        dispatch(get_industry_detail_admin(record.id)) // Fetch industry details
            .then(() => {
                setEditingIndustry(record); // Set the industry for editing
                setEditModalOpen(true); // Open the modal
            })
            .catch(() => {
                toast.error("Không thể tải thông tin ngành nghề.");
            });
    };

    const handleDelete = (record) => {
        dispatch(inactive_industry_by_id(record.id));
    };

    const handleDeleteMultiple = async (records) => {
        if (records.length === 0) {
            alert("Chưa chọn bản ghi để xóa!");
            return;
        }
        const idsToDelete = records.map(record => record.key).filter(id => id !== undefined);

        // Sử dụng Promise.all để xóa song song
        try {
            // Map over each ID and create a promise for each deletion
            const deletePromises = idsToDelete.map(id => dispatch(inactive_industry_by_id(id)));

            // Wait for all deletions to complete
            await Promise.all(deletePromises);
            setSelectedRows([]);
            toast.success(`Xóa ${records.length} ngành nghề thành công`);
        } catch (error) {
            console.error("Lỗi khi xóa các bản ghi:", error);
        }
    };

    const handleInfo = (record) => {
        dispatch(get_industry_detail_admin(record.id)); // id của industry
        setOpen(true) // Mở modal industry detail
    };


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value); // Cập nhật giá trị ô tìm kiếm
        dispatch(get_all_industry_paging(1, pageSize, value)); // Gọi API với từ khóa
    };

    const handleSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedRows(selectedRows); // Cập nhật danh sách bản ghi đã chọn
    };
    const data = Array.isArray(filteredData) ? filteredData.map((industry, index) => ({
        key: industry.id,
        id: industry.id,
        stt: (currentPage - 1) * pageSize + index + 1,
        name: industry.name,
        code: industry.code,
        status: industry.status,
        createAt: industry.createAt,
        createBy: industry.createBy,
        updateAt: industry.updateAt,
        updateBy: industry.updateBy
    })) : [];

    const exportToExcel = () => {
        if (filteredData.length === 0) {
            alert("No data to export!");
            return;
        }

        // Chuyển đổi dữ liệu thành định dạng Excel
        const worksheet = XLSX.utils.json_to_sheet(
            filteredData.map((industry) => ({
                "Tên ngành nghề": industry.name,
                "Mã ngành nghề": industry.code,
                "Trạng thái": industry.status,
            }))
        );

        // Tạo workbook mới và thêm worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Industries");

        // Xuất file Excel
        XLSX.writeFile(workbook, "Industries.xlsx");
    }
    return (<>
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div className="mt-auto">
                        <div className="row">
                            <div className="col-md-4 mb-3 border-5">
                                <IndustryAdminForm load={setLoad}/>
                                <img
                                    src={"aotucareer-logo.svg"}
                                    alt="Ngành nghề"
                                    className="logo"
                                    style={{maxWidth: "80%", height: "auto", display: "block", margin: "0 auto"}}
                                /></div>
                            <div className="col-md-8 mb-3">
                                <Card title="Danh sách ngành nghề">
                                    <div className="table-responsive">
                                        <div className="d-flex justify-content-between mb-3">
                                            <Input
                                                placeholder="Tìm kiếm..."
                                                value={searchText}
                                                onChange={handleSearch}
                                                prefix={<SearchOutlined/>}
                                                style={{width: 200}}
                                            />
                                            <div style={{display: "flex", gap: "10px"}}>
                                                <DeleteSelectedButton
                                                    selectedRows={selectedRows}
                                                    onDeleteMultiple={handleDeleteMultiple}
                                                />
                                                <Button
                                                    icon={<DownloadOutlined/>}
                                                    onClick={exportToExcel}
                                                    style={{
                                                        backgroundColor: '#1d8f29',  // Màu xanh lá đậm (Excel)
                                                        borderColor: '#1d8f29',      // Màu viền
                                                        color: 'white',              // Màu chữ
                                                    }}
                                                >
                                                    Xuất Excel
                                                </Button>
                                            </div>
                                        </div>
                                        <IndustryAdminTable
                                            data={data}
                                            onInfo={handleInfo}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                            selectedRows={selectedRows}
                                            onSelectChange={handleSelectChange}/>
                                        <ResultsSummary
                                            totalElements={totalElements}
                                        />
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                        <Pagination
                                            current={currentPage}
                                            pageSize={pageSize}
                                            defaultPageSize={7}
                                            defaultCurrent={1}
                                            total={totalElements}
                                            onChange={handlePageChange}
                                            pageSizeOptions={[7, 10, 20, 50, 100]}
                                            showSizeChanger={true}
                                        />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <IndustryAdminDetail
            open={open}
            onClose={() => setOpen(false)}
            industry={selectedIndustry}
        />
        <IndustryEditModal
            visible={editModalOpen}
            onClose={() => setEditModalOpen(false)} // Đóng modal
            industry={editingIndustry} // Truyền thông tin ngành nghề
            onSubmit={(id, industryRequest) => {
                dispatch(update_industry_by_id(id, industryRequest))
            }}
        />
    </>);
};
export default IndustryAdminManager;
