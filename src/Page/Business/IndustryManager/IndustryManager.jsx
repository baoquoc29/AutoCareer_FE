import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    delete_industry_by_id,
    get_all_industry,
    get_all_industry_business,
    get_industry_detail
} from "../../../Redux/actions/IndustryThunk";
import {Button, Card, Input, Pagination} from "antd";
import IndustryTable from "./IndustryTable";
import IndustryForm from "./IndustryForm";
import IndustryDetailModal from "./IndustryDetailModel"; // Import Modal mới
import {DownloadOutlined, FileExcelFilled, FileExcelOutlined, SearchOutlined,} from "@ant-design/icons";
import * as XLSX from "xlsx";
import logo from "../../../Component/HeaderComponent/aotucareer-logo.svg";


const IndustryManager = () => {
    const dispatch = useDispatch();
    const industryTable = useSelector((state) => state.IndustryReducer.industries); // Cho Table
    const selectedIndustry = useSelector((state) => state.IndustryReducer.industryDetail);
    const industryOptions = useSelector((state) => state.IndustryReducer.industriesNoPag); // Cho Select
    const totalElements = useSelector((state) => state.IndustryReducer.totalElements); // Tổng số bản ghi
    const currentPage = useSelector((state) => state.IndustryReducer.currentPage); // Trang hiện tại
    const pageSize = useSelector((state) => state.IndustryReducer.pageSize);
    const keyword = useSelector((state) => state.IndustryReducer.keyword);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        dispatch(get_all_industry_business(currentPage, pageSize, keyword));
        dispatch(get_all_industry());
    }, [dispatch, currentPage, pageSize, load]);

    useEffect(() => {
        setFilteredData(industryTable);
    }, [industryTable]);

    const handlePageChange = (page, pageSize) => {
        dispatch(get_all_industry_business(page, pageSize, searchText)); // Gọi API với trang và kích thước mới
    };

    const handleDelete = (record) => {
        dispatch(delete_industry_by_id(record.key));
    };

    const handleInfo = (record) => {
        dispatch(get_industry_detail(record.id)); // Set only the id of the selected industry
        setOpen(true) // Fetch the industry details
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value); // Cập nhật giá trị ô tìm kiếm
        dispatch(get_all_industry_business(1, pageSize, value)); // Gọi API với từ khóa
    };

    const data = Array.isArray(filteredData) ? filteredData.map((industry, index) => ({
        key: industry.id,
        id: industry.industryId,
        stt: (currentPage - 1) * pageSize + index + 1,
        name: industry.industryName,
        code: industry.industryCode,
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
                "Tên ngành nghề": industry.industryName,
                "Mã ngành nghề": industry.industryCode,
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
                                <IndustryForm selectData={industryOptions} load={setLoad}/>
                                <img src={logo} alt="logo" className="logo" style={{width: "500px", height: "500px"}}/>
                            </div>
                            <div className="col-md-8 mb-3">
                                <Card title="Danh sách ngành nghề">
                                    <div className="table-responsive">
                                        <div className="d-flex justify-content-between mb-3">
                                            <Input
                                                placeholder="Search..."
                                                value={searchText}
                                                onChange={handleSearch}
                                                prefix={<SearchOutlined/>}
                                                style={{width: 200}}
                                            />
                                            <Button
                                                icon={<FileExcelOutlined/>}
                                                onClick={exportToExcel}
                                            >
                                                Xuất Excel
                                            </Button>
                                        </div>
                                        <IndustryTable data={data} onInfo={handleInfo} onDelete={handleDelete}/>
                                        <div className="mt-3">
                                             <span style={{
                                                 float: "right",
                                                 fontSize: "14px",
                                                 color: "#555",
                                             }}>
                                                Có <span style={{fontWeight: "bold"}}>{totalElements}</span> kết quả được tìm thấy
                                             </span>
                                        </div>
                                    </div>
                                    <Pagination
                                        current={currentPage}
                                        pageSize={pageSize}
                                        total={totalElements}
                                        onChange={handlePageChange}
                                        className="text-center mt-3"
                                    />
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <IndustryDetailModal
            open={open}
            onClose={() => setOpen(false)}
            industry={selectedIndustry}
        />
    </>);
};
export default IndustryManager;
