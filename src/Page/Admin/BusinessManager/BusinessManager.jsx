import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Tabs, Button, Input, Pagination, Card} from "antd";
import {FileExcelOutlined, SearchOutlined} from "@ant-design/icons";
import {
    approved_business,
    get_all_businesses,
    get_approved_businesses,
    get_pending_businesses,
    get_rejected_businesses, rejected_business,
} from "../../../Redux/actions/AdminBusinessThunk";
import {doc as XLSX} from "prettier";
import {toast} from "react-toastify";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import BusinessTable from "./BusinessTable";
import {CSVLink} from "react-csv";
import BusinessDetail from "./BusinessDetail";

const BusinessManager = () => {
    const dispatch = useDispatch();
    const businesses = useSelector((state) => state.AdminBusinessReducer.businesses);
    const totalElements = useSelector((state) => state.AdminBusinessReducer.totalElements); // Tổng số bản ghi
    const totalPages = useSelector((state) => state.AdminBusinessReducer.totalPages);
    const [pageNo, setPageNo] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(10);
    const [filteredData, setFilteredData] = useState([]);
    const [updatedData, setUpdatedData] = useState([]);
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
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
    //     setFilteredData(businesses || []);
    // }, [businesses]);

    const fetchBusinesses = async (currentTab) => {
        switch (currentTab) {
            case "Tất cả":
                await dispatch(get_all_businesses(pageNo - 1, pageSize, keyword));
                break;
            case "Chờ duyệt":
                await dispatch(get_pending_businesses(pageNo - 1, pageSize, keyword));
                break;
            case "Đã phê duyệt":
                await dispatch(get_approved_businesses(pageNo - 1, pageSize, keyword));
                break;
            case "Bị từ chối":
                await dispatch(get_rejected_businesses(pageNo - 1, pageSize, keyword));
                break;
            default:
                break;
        }
        console.log(businesses)
    };
    // Fetch data khi thay đổi tab, trang, kích thước trang hoặc keyword
    // useEffect(() => {
    //     fetchBusinesses();
    // }, [fetchBusinesses]);
    useEffect(() => {
        setFilteredData(businesses)
    }, [businesses])

    useEffect(()  =>  {
        fetchBusinesses(currentTab);
    }, [currentTab, pageNo, pageSize, keyword]);

    const handlePageChange  = async (page, pageSize) => {
        setPageNo(page);
        setPageSize(pageSize);
       await fetchBusinesses(page, pageSize, keyword);
    };

    const handleSearch = async (e)  => {
        const value = e.target.value;
        setKeyword(value);
        await  fetchBusinesses();
    };

    // Dữ liệu hiển thị theo tab
    const data = Array.isArray(filteredData) ? filteredData.map((business, index) => ({
        key: business.id,
        stt: (pageNo - 1) * pageSize + index + 1,
        name: business.name,
        taxCode: business.taxCode,
        email: business.email,
        createdAt: formatDate(business.createdAt),
        licenseImageId: business.licenseImageId,
        businessImageId: business.businessImageId,
        location: business.location,
        state: business.userAccount.state,
    })) : [];

    const handleViewDetails = (record) => {
        setSelectedBusiness(record);
    };
    const handleReject = async (req) => {
        console.log(req);
        dispatch(rejected_business(req));
        await fetchBusinesses(currentTab);
        handleViewDetails(selectedBusiness);
    };
    const handleApprove = async (req) => {
        console.log(req);
        dispatch(approved_business(req));
        await fetchBusinesses(currentTab);
        for (let b of filteredData) {
            if (b.key === selectedBusiness.key) {
                setSelectedBusiness(b);
            }
        }
        handleViewDetails(selectedBusiness);
    }
    const handleCloseDetail = () => {
        setSelectedBusiness(null); // Đóng chi tiết
    };
    const exportToExcel = () => {
        if (filteredData && filteredData.length > 0) {
            // Chuyển dữ liệu thành bảng tính Excel
            const worksheet = XLSX.utils.json_to_sheet(filteredData);
            const adminBusinesses = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(adminBusinesses, worksheet, 'Danh sách businesses');

            // Xuất file Excel
            XLSX.writeFile(adminBusinesses, 'Danh sách doanh nghiệp.xlsx');
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
                                {selectedBusiness ? (
                                    <div className="col-md-4 mb-3 border-5">
                                        <BusinessDetail
                                            business={selectedBusiness}
                                            onReject={handleReject}
                                            onApprove={handleApprove}
                                            onClose={handleCloseDetail}
                                        />
                                    </div>
                                ) : null}
                                <div className={selectedBusiness ? "col-md-8 mb-3 mt-3" : "col-md-12 mb-3 mt-3"}>
                                    <Card title="Danh sách tài khoản doanh nghiệp">

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

                                            <BusinessTable data={data} onDetail={handleViewDetails}></BusinessTable>
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

export default BusinessManager;
