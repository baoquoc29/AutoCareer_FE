import React, { useEffect, useState } from "react";
import { Pagination, DatePicker, Select, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import WorkshopCard from "./WorkshopCard";
import FooterPortal from "./FooterPortal";
import { get_university_total, get_work_shop_feature } from "../../Redux/actions/PortalThunk";
import "./StylePortal/WorkshopListPortal.css";
import { get_all_provinces } from "../../Redux/actions/WorkShopThunk";
import { BookOutlined, CalendarOutlined, EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const WorkshopListPortal = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    // Parse URL search parameters
    const queryParams = new URLSearchParams(location.search);
    const keywordFromURL = queryParams.get("keyword") || "";

    useEffect(() => {
        dispatch(get_all_provinces());
        dispatch(get_university_total());
    }, [dispatch]);

    // Redux state
    const workshops = useSelector((state) => state.PortalReducer.workShopFeatures || []);
    const totalElements = useSelector((state) => state.PortalReducer.totalElements || 0);
    const { provinces } = useSelector((state) => state.WorkShopReducer);
    const { universities } = useSelector((state) => state.PortalReducer);
    const [pageSize, setPageSize] = useState(7); // Số mục mặc định

    // Local state for pagination and filters
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        dateRange: null,
        location: null,
        universityId: null,
        searchTerm: keywordFromURL, // Initialize with keyword from URL
    });

    useEffect(() => {
        const { dateRange, location, searchTerm, universityId } = filters;
        const [startDate, endDate] = dateRange ? dateRange : [];

        // Dispatch the action to fetch workshop data with applied filters
        dispatch(
            get_work_shop_feature({
                page: currentPage - 1, // Adjust for zero-based page index
                size: pageSize,
                startDate: startDate ? startDate.format("YYYY-MM-DD") : "",
                endDate: endDate ? endDate.format("YYYY-MM-DD") : "",
                provinceId: location || "",
                universityId: universityId || "",
                keyword: searchTerm || "",
            })
        );
    }, [dispatch, currentPage, filters, pageSize]);

    // Handlers for filters
    const handleDateRangeChange = (dates) => {
        setFilters((prevFilters) => ({ ...prevFilters, dateRange: dates }));
        setCurrentPage(1); // Reset to the first page after filtering
    };

    const handleLocationChange = (value) => {
        setFilters((prevFilters) => ({ ...prevFilters, location: value }));
        setCurrentPage(1); // Reset to the first page after filtering
    };
    const handleUniversityChange = (value) => {
        setFilters((prevFilters) => ({ ...prevFilters, universityId: value }));
        setCurrentPage(1); // Reset to the first page after filtering
    };

    const handleSearchChange = (e) => {
        setFilters((prevFilters) => ({ ...prevFilters, searchTerm: e.target.value }));
        setCurrentPage(1); // Reset to the first page after filtering
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className={"workshop-listPortal"}>
            <HeaderPortal />
            <div className="portal-list-work-shop-container">
                <div className="filter-container-workshop-list">
                    <Space size="large" className="filter-actions">
                        <RangePicker
                            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                            className="filter-date"
                            onChange={handleDateRangeChange}
                            format="DD/MM/YYYY"
                            suffixIcon={<CalendarOutlined />} /* Biểu tượng lịch */
                        />

                        <Select
                            placeholder="Chọn vị trí"
                            className="filter-select"
                            onChange={handleLocationChange}
                            allowClear
                            suffixIcon={<EnvironmentOutlined />} /* Biểu tượng vị trí */
                        >
                            {provinces.map((province) => (
                                <Option key={province.id} value={province.id}>
                                    {province.name}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Chọn trường đại học"
                            className="filter-select"
                            onChange={handleUniversityChange}
                            allowClear
                            suffixIcon={<BookOutlined />}
                        >
                            {universities.map((university) => (
                                <Option key={university.id} value={university.id}>
                                    {university.universityName}
                                </Option>
                            ))}
                        </Select>

                        <Input
                            placeholder="Tìm kiếm theo tên"
                            className="filter-input"
                            value={filters.searchTerm}
                            onChange={handleSearchChange}
                            prefix={<SearchOutlined />} /* Biểu tượng tìm kiếm */
                        />
                    </Space>
                </div>

                {/* Total results */}
                <p className="total-results">
                    {totalElements > 0 ? (
                        <>
                            <span style={{ fontWeight: "bold", color: "#Blue" }}>{totalElements}</span>
                            <span> kết quả được tìm thấy!</span>
                        </>
                    ) : (
                        "Không có dữ liệu."
                    )}
                </p>

                {/* Workshop Cards */}
                <div className="card-container">
                    {workshops.length > 0 ? (
                        workshops.map((workshop) => (
                            <WorkshopCard key={workshop.id} workshop={workshop} />
                        ))
                    ) : (
                        <p className="no-workshops"></p>
                    )}
                </div>

                {/* Pagination */}
                <div className="pagination-container">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                        showSizeChanger={true}
                        total={totalElements}
                        pageSizeOptions={[7, 10, 20, 50, 100]}
                        className="pagination"
                    />
                </div>
            </div>

            <FooterPortal />
        </div>
    );
};

export default WorkshopListPortal;
