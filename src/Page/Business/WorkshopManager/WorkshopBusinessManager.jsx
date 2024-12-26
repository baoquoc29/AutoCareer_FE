import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    get_all_workshop_by_business,
} from "../../../Redux/actions/WorkShopThunk";
import { Card, Input, Pagination, Select } from "antd";
import WorkshopBusinessDetail from "./WorkshopBusinessDetail";
import WorkShopBusinessTable from "./WorkshopBusinessTable";
import ResultsSummary from "../../../Component/Paging/ResultsSummary";
import {useNavigate} from "react-router-dom";

const { Option } = Select;

const WorkshopBusinessManager = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [filters, setFilters] = useState({
        state: null,
        searchTerm: null,
    });
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const navigate = useNavigate();

    const resetView = () => {
        setSelectedWorkshop(null);
    };

    const handleViewDetails = (workshop) => {
        navigate("/business-workshop-detail", {state: workshop});
        
    };

    const userInfo = (() => {
        try {
            return JSON.parse(localStorage.getItem("USER_LOGIN")) || {};
        } catch {
            return {};
        }
    })();
    const idBusiness = userInfo.business?.id || null;

    const workshopsData = useSelector((state) => state.WorkShopReducer.workshopsBusiness || []);
    const totalItems = useSelector((state) => state.WorkShopReducer.totalRecords || 0);

    useEffect(() => {
        if (!idBusiness) return;

        const { state, searchTerm } = filters;
        dispatch(
            get_all_workshop_by_business(idBusiness, {
                page: currentPage - 1,
                size: pageSize,
                keyword: searchTerm || "",
                state: state || "APPROVED",
            })
        );
    }, [dispatch, currentPage, pageSize, filters, idBusiness]);

    const handleSearchChange = (e) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            searchTerm: e.target.value,
        }));
        setCurrentPage(1);
    };

    const handleStatusChange = (value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            state: value,
        }));
        setCurrentPage(1);
    };

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div className="mt-auto">
                        <div className="row">
                            <Card title="Quản lý hội thảo">

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: 16,
                                            }}
                                        >
                                            <div style={{ display: "flex", gap: 8 }}>
                                                <Input
                                                    placeholder="Tìm kiếm theo tiêu đề"
                                                    value={filters.searchTerm}
                                                    onChange={handleSearchChange}
                                                    style={{ width: 200 }}
                                                />
                                                <Select
                                                    placeholder="Chọn trạng thái"
                                                    style={{ width: 150 }}
                                                    onChange={handleStatusChange}
                                                    allowClear
                                                >
                                                    <Option value="REJECTED">Từ chối</Option>
                                                    <Option value="APPROVED">Chấp nhận</Option>
                                                    <Option value="PENDING">Chờ duyệt</Option>
                                                </Select>
                                            </div>
                                        </div>

                                        <WorkShopBusinessTable
                                            workshops={workshopsData || []}
                                            page={currentPage}
                                            size={pageSize}
                                            onView={handleViewDetails}
                                        />

                                        <ResultsSummary totalElements={totalItems} />
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <Pagination
                                                current={currentPage}
                                                pageSize={pageSize}
                                                total={totalItems}
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
        </section>
    );
};

export default WorkshopBusinessManager;
