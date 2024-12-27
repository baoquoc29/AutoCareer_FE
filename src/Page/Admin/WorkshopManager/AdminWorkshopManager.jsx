import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Input, Pagination, Card, Select} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {
    approved_workshop,
    get_all_workshops,
    get_approved_workshops, get_detail_workshop,
    get_pending_workshops,
    get_rejected_workshops, rejected_workshop,
} from "../../../Redux/actions/AdminWorkshopThunk";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import WorkshopTable from "./WorkshopTable";
import {useNavigate} from "react-router-dom";

const AdminWorkshopManager = () => {
    const dispatch = useDispatch();
    const workshops = useSelector((state) => state.AdminWorkshopReducer.workshops);
    const totalElements = useSelector((state) => state.AdminWorkshopReducer.totalElements); // Tổng số bản ghi
    const [pageNo, setPageNo] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [currentTab, setCurrentTab] = useState("ALL");
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const {Option} = Select;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Trả về "N/A" nếu không có ngày giờ
        const date = new Date(dateString);
        const options = {
            hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric',
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date); // Định dạng theo tiếng Việt
    };

    const fetchWorkshops = async (currentTab) => {
        switch (currentTab) {
            case "ALL":
                await dispatch(get_all_workshops(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "PENDING":
                await dispatch(get_pending_workshops(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "APPROVED":
                await dispatch(get_approved_workshops(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "REJECTED":
                await dispatch(get_rejected_workshops(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            default:
                break;
        }
        console.log(workshops)
    };
    useEffect(() => {
        setFilteredData(workshops)
    }, [workshops])

    useEffect(() => {
        fetchWorkshops(currentTab);
    }, [currentTab, pageNo, pageSize, keyword]);

    const handlePageChange = async (page, pageSize) => {
        setPageNo(page);
        setPageSize(pageSize);
        await fetchWorkshops(page, pageSize, keyword);
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setKeyword(value);
        setPageNo(1)
        await fetchWorkshops();
    };

    // Dữ liệu hiển thị theo tab
    const data = Array.isArray(filteredData) ? filteredData.map((workshop, index) => ({
        key: workshop.id || "",
        stt: (pageNo - 1) * pageSize + index + 1,
        title: workshop.title || "",
        description: workshop.description || "",
        university: workshop.university || "",
        location: workshop.location|| "",
        state: workshop.statusBrowse || "",
        expireDate: workshop.expireDate || "",
        createdAt: formatDate(workshop.createdAt) || "",
        createdBy: workshop.createdBy || "",
        updatedAt: formatDate(workshop.updatedAt) || "",
        updatedBy: workshop.updatedBy || "",
        status: workshop.status || ""
    })) : [];

    const handleViewDetails = async (record) => {
        // setSelectedWorkshop(record);
        await dispatch(get_detail_workshop(record.key))
        navigate("/admin-workshop-detail");
    };
    const handleChangeTab = (tab) => {
        setCurrentTab(tab);
        setPageNo(1)
    }


    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div className="mt-auto">
                            <div className="row">
                                <div className={"col-md-12 mb-3 mt-3"}>
                                    <Card title="Danh sách hội thảo">
                                        <div className="table-responsive">
                                            <div className="d-flex justify-content-between mb-3">
                                                <div style={{display: 'flex', gap: '10px'}}>
                                                    <Input
                                                        placeholder="Nhập tên hội thảo... "
                                                        value={keyword}
                                                        onChange={handleSearch}
                                                        prefix={<SearchOutlined/>}
                                                        style={{width: 200}}
                                                    />
                                                    <Select
                                                        placeholder="Chọn trạng thái duyệt"
                                                        value={currentTab}
                                                        showSearch
                                                        onChange={(value) => handleChangeTab(value)}
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
                                            </div>

                                            <WorkshopTable data={data} onDetail={handleViewDetails}></WorkshopTable>
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

export default AdminWorkshopManager;
