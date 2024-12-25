import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Tabs, Button, Input, Pagination, Card, Select} from "antd";
import {FileExcelOutlined, SearchOutlined} from "@ant-design/icons";
import {
    get_all_businesses,
    get_approved_businesses,
    get_pending_businesses,
    get_rejected_businesses,
} from "../../../Redux/actions/AdminBusinessThunk";

import ResultSummary from "../../../Component/Paging/ResultsSummary";
import BusinessTable from "./BusinessTable";
import BusinessDetail from "./BusinessDetail";
import {get_business_by_id} from "../../../Redux/actions/BusinessThunk";

const BusinessManager = () => {
    const dispatch = useDispatch();
    const businesses = useSelector((state) => state.AdminBusinessReducer.businesses);
    const totalElements = useSelector((state) => state.AdminBusinessReducer.totalElements); // Tổng số bản ghi
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [filteredData, setFilteredData] = useState([]);
    const [currentTab, setCurrentTab] = useState("ALL");
    const [keyword, setKeyword] = useState("");
    const {Option} = Select;
    const [open, setOpen] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Trả về "N/A" nếu không có ngày giờ
        const date = new Date(dateString);
        const options = {
            hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric',
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date); // Định dạng theo tiếng Việt
    };

    const fetchBusinesses = async (currentTab) => {
        switch (currentTab) {
            case "ALL":
                await dispatch(get_all_businesses(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "PENDING":
                await dispatch(get_pending_businesses(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "APPROVED":
                await dispatch(get_approved_businesses(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "REJECTED":
                await dispatch(get_rejected_businesses(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            default:
                break;
        }
        console.log(businesses)
    };
    useEffect(() => {
        setFilteredData(businesses)
    }, [businesses])

    useEffect(() => {
        fetchBusinesses(currentTab);
    }, [currentTab, pageNo, pageSize, keyword]);

    const handlePageChange = async (page, pageSize) => {
        setPageNo(page);
        setPageSize(pageSize);
        await fetchBusinesses(page, pageSize, keyword);
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setKeyword(value);
        await fetchBusinesses();
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
        setOpen(true)
        dispatch(get_business_by_id(record.key))
    };

    const handleCloseDetail = async () => {
        setOpen(false);
        await fetchBusinesses(currentTab);
    };

    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div className="mt-auto">
                            <div className="row">
                                <BusinessDetail
                                    open={open}
                                    onClose={handleCloseDetail}
                                />

                                <div className={"col-md-12 mb-3 mt-3"}>
                                    <Card title="Danh sách tài khoản doanh nghiệp">


                                        <div className="table-responsive">
                                            <div className="d-flex justify-content-between align-items-center mb-3">

                                                <div style={{display: 'flex', gap: '10px'}}>
                                                    <Input
                                                        placeholder="Nhập tên hoặc email... "
                                                        value={keyword}
                                                        onChange={handleSearch}
                                                        prefix={<SearchOutlined/>}
                                                        style={{width: 200}}
                                                    />
                                                    <Select
                                                        placeholder="Chọn trạng thái duyệt"
                                                        value={currentTab}
                                                        showSearch
                                                        onChange={(value) => setCurrentTab(value)}
                                                        style={{width: 200}}
                                                        filterOption={(input, option) => {
                                                            const childrenText = String(option.props.children || "");
                                                            return childrenText.toLowerCase().includes(input.toLowerCase());
                                                        }}
                                                    >
                                                        <Option value="ALL">Tất cả trạng thái</Option>
                                                        <Option value="PENDING">Đang chờ duyệt</Option>
                                                        <Option value="APPROVED">Đã chấp nhập</Option>
                                                        <Option value="REJECTED">Bị từ chối</Option>
                                                    </Select>
                                                </div>
                                                {/*<div style={{display: "flex", gap: "10px"}}>*/}
                                                {/*    <Button type="default" icon={<FileExcelOutlined/>} style={{*/}
                                                {/*        backgroundColor: '#107C41',*/}
                                                {/*        color: '#FFFFFF',*/}
                                                {/*        marginLeft: '10px'*/}
                                                {/*    }}>*/}
                                                {/*        <CSVLink*/}
                                                {/*            data={""}*/}
                                                {/*            headers={""}*/}
                                                {/*            filename={"DanhSachKhoa.csv"}*/}
                                                {/*            style={{color: 'inherit', textDecoration: 'none'}}*/}
                                                {/*        >*/}
                                                {/*            Export excel*/}
                                                {/*        </CSVLink>*/}
                                                {/*    </Button>*/}
                                                {/*</div>*/}
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
