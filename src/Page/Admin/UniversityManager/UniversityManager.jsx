import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Tabs, Button, Input, Pagination, Card} from "antd";
import {FileExcelOutlined, SearchOutlined} from "@ant-design/icons";

import {doc as XLSX} from "prettier";
import {toast} from "react-toastify";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import UniversityTable from "./UniversityTable";
import {CSVLink} from "react-csv";
import UniversityDetail from "./UniversityDetail";
import {
    approved_university,
    get_all_universities, get_approved_universities, get_pending_universities, get_rejected_universities,
    rejected_university
} from "../../../Redux/actions/AdminUniversityThunk";

const UniversityManager = () => {
    const dispatch = useDispatch();
    const universities = useSelector((state) => state.AdminUniversityReducer.universities);
    const totalElements = useSelector((state) => state.AdminUniversityReducer.totalElements); // Tổng số bản ghi
    const totalPages = useSelector((state) => state.AdminUniversityReducer.totalPages);
    const [pageNo, setPageNo] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(10);
    const [filteredData, setFilteredData] = useState([]);
    const [updatedData, setUpdatedData] = useState([]);
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [currentTab, setCurrentTab] = useState("Tất cả");
    const [keyword, setKeyword] = useState("");


    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Trả về "N/A" nếu không có ngày giờ
        const date = new Date(dateString);
        const options = {
            hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric',
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date); // Định dạng theo tiếng Việt
    };

    // useEffect(() => {
    //     setFilteredData(universityes || []);
    // }, [universityes]);

    const fetchUniversities = (currentTab) => {
        switch (currentTab) {
            case "Tất cả":
                dispatch(get_all_universities(pageNo - 1, pageSize, keyword));
                break;
            case "Chờ duyệt":
                dispatch(get_pending_universities(pageNo - 1, pageSize, keyword));
                break;
            case "Đã phê duyệt":
                dispatch(get_approved_universities(pageNo - 1, pageSize, keyword));
                break;
            case "Bị từ chối":
                dispatch(get_rejected_universities(pageNo - 1, pageSize, keyword));
                break;
            default:
                break;
        }
        console.log(universities)
    };
    // Fetch data khi thay đổi tab, trang, kích thước trang hoặc keyword
    // useEffect(() => {
    //     fetchUniversities();
    // }, [fetchUniversities]);
    useEffect(() => {
        setFilteredData(universities)
    }, [universities])

    useEffect(() => {
        fetchUniversities(currentTab);
    }, [currentTab, pageNo, pageSize, keyword]);

    const handlePageChange = (page, pageSize) => {
        setPageNo(page);
        setPageSize(pageSize);
        fetchUniversities(page, pageSize, keyword);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setKeyword(value);
        fetchUniversities();
    };

    // Dữ liệu hiển thị theo tab
    const data = Array.isArray(filteredData) ? filteredData.map((university, index) => ({
        key: university.id,
        stt: (pageNo - 1) * pageSize + index + 1,
        name: university.name,
        phone: university.phone,
        email: university.email,
        createdAt: formatDate(university.createdAt),
        universityImageId: university.logoImageId,
        location: university.location,
        state: university.userAccount.state,
    })) : [];

    const handleViewDetails = (record) => {
        setSelectedUniversity(record);
    };
    const handleReject = (req) => {
        console.log(req);
        dispatch(rejected_university(req));
        fetchUniversities(currentTab);
        handleViewDetails(selectedUniversity);
    };
    const handleApprove = (req) => {
        console.log(req);
        dispatch(approved_university(req));
    }
    const handleCloseDetail = () => {
        setSelectedUniversity(null); // Đóng chi tiết
    };
    const exportToExcel = () => {
        if (filteredData && filteredData.length > 0) {
            // Chuyển dữ liệu thành bảng tính Excel
            const worksheet = XLSX.utils.json_to_sheet(filteredData);
            const adminUniversities = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(adminUniversities, worksheet, 'Danh sách universityes');

            // Xuất file Excel
            XLSX.writeFile(adminUniversities, 'Danh sách doanh nghiệp.xlsx');
        } else {
            // Nếu không có dữ liệu, hiển thị thông báo lỗi
            toast.error("Không có dữ liệu để xuất");
        }
    };

    const tabs = [{label: "Tất cả", key: "Tất cả"}, {label: "Chờ duyệt", key: "Chờ duyệt"}, {
        label: "Đã phê duyệt",
        key: "Đã phê duyệt"
    }, {label: "Bị từ chối", key: "Bị từ chối"},];

    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div className="mt-auto">
                            <div className="row">
                                {selectedUniversity ? (
                                    <div className="col-md-4 mb-3 border-5">
                                        <UniversityDetail
                                            university={selectedUniversity}
                                            onReject={handleReject}
                                            onApprove={handleApprove}
                                            onClose={handleCloseDetail}
                                        />
                                    </div>
                                ) : null}
                                <div className={selectedUniversity ? "col-md-8 mb-3 mt-3" : "col-md-12 mb-3 mt-3"}>
                                    <Card title="Danh sách tài khoản trường học">

                                        <Tabs
                                            defaultActiveKey="Tất cả"
                                            onChange={(key) => setCurrentTab(key)}
                                            items={tabs}
                                        />
                                        <div className="table-responsive">
                                            <div className="d-flex justify-content-between mb-3">
                                                <Input
                                                    placeholder="Nhập tên hoặc email... "
                                                    value={keyword}
                                                    onChange={handleSearch}
                                                    prefix={<SearchOutlined/>}
                                                    style={{width: 200}}
                                                />
                                                <div style={{display: "flex", gap: "10px"}}>
                                                    <Button type="default" icon={<FileExcelOutlined/>} style={{
                                                        backgroundColor: '#107C41',
                                                        color: '#FFFFFF',
                                                        marginLeft: '10px'
                                                    }}>
                                                        <CSVLink
                                                            data={""}
                                                            headers={""}
                                                            filename={"DanhSachKhoa.csv"}
                                                            style={{color: 'inherit', textDecoration: 'none'}}
                                                        >
                                                            Export excel
                                                        </CSVLink>
                                                    </Button>
                                                </div>
                                            </div>

                                            <UniversityTable data={data} onDetail={handleViewDetails}></UniversityTable>
                                            <ResultSummary totalElements={totalElements}></ResultSummary>
                                        </div>
                                        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                            <Pagination
                                                current={pageNo}
                                                pageSize={pageSize}
                                                defaultPageSize={10}
                                                defaultCurrent={1}
                                                total={totalElements}
                                                onChange={handlePageChange}
                                                className="text-center mt-5"
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
        </>
    )
};

export default UniversityManager;
