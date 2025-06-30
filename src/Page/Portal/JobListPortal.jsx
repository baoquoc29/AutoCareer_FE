import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, Pagination, Select, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import FooterPortal from "./FooterPortal";
import "./StylePortal/JobListPortal.css";
import { get_all_job_portal } from "../../Redux/actions/JobThunk";
import { CalendarOutlined, EnvironmentOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons";
import JobCard from "./JobCard";
import { useLocation } from "react-router-dom";
import { get_all_provinces } from "../../Redux/actions/LocationThunk";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

const JobListPortal = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    // Redux state
    const queryParams = new URLSearchParams(location.search);
    const keywordFromURL = queryParams.get("keyword") || "";
    const job = useSelector((state) => state.JobReducer.jobsPortal || []);
    const totalElements = useSelector((state) => state.JobReducer.totalElements || 0);
    const { provinces } = useSelector(state => state.LocationReducer);

    // Local state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [searchText, setSearchText] = useState(keywordFromURL);
    const [filters, setFilters] = useState({
        fromDate: null,
        toDate: null,
        provinceId: null,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(get_all_provinces());
    }, [dispatch]);

    useEffect(() => {
        fetchJobs();
    }, [filters.provinceId, filters.fromDate, filters.toDate, searchText, currentPage]);

    const fetchJobs = async () => {
        try {
            setLoading(true);

            // Kiểm tra nếu không có filter nào, thì chỉ fetch tất cả công việc
            if (!filters.fromDate && !filters.toDate && !filters.provinceId) {
                await dispatch(get_all_job_portal(currentPage, pageSize, searchText, null, null, null));
            } else {
                await dispatch(get_all_job_portal(currentPage, pageSize, searchText, filters.provinceId, filters.fromDate, filters.toDate));
            }
        } catch (error) {
            console.error(error);
            message.error("Lỗi khi tải công việc!");
        } finally {
            setLoading(false);
        }
    };

    const handleDateRangeChange = (dates) => {
        const [fromDate, toDate] = dates || [null, null];
        setFilters(prev => ({
            ...prev,
            fromDate: fromDate ? fromDate.format("YYYY-MM-DD") : null,
            toDate: toDate ? toDate.format("YYYY-MM-DD") : null,
        }));

        setCurrentPage(1);
    };


    const handleLocationChange = (value) => {
        setFilters(prev => ({ ...prev, provinceId: value }));
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleResetFilters = () => {
        setSearchText("");
        setFilters({
            fromDate: null,
            toDate: null,
            provinceId: null,
        });
        setCurrentPage(1);
    };

    const handleManualFilter = () => {
        fetchJobs();
    };

    return (
        <div className="job-listPortal">
            <HeaderPortal />
            <div className="portal-list-job-container">
                {/* Filter Section */}
                <div className="filter-container-workshop-list" style={{
                    padding: '16px 24px',
                    marginBottom: '24px'
                }}>
                    <Space  className="filter-actions" style={{ width: '100%', flexWrap: 'wrap' }}>
                        <Input
                            placeholder="Tìm kiếm theo tên"
                            value={searchText}
                            onChange={handleSearch}
                            prefix={<SearchOutlined style={{ color: '#1890ff' }} />}
                            style={{ width: 250, borderRadius: '6px' }}
                            allowClear
                        />
                        <Select
                            placeholder="Chọn vị trí"
                            onChange={handleLocationChange}
                            value={filters.provinceId || null}
                            allowClear
                            suffixIcon={<EnvironmentOutlined style={{ color: '#1890ff' }} />}
                            style={{ width: 200, borderRadius: '6px' }}
                        >
                            {provinces.map((province) => (
                                <Option key={province.id} value={province.id}>
                                    {province.name}
                                </Option>
                            ))}
                        </Select>
                    </Space>
                </div>

                {/* Total results */}
                <p className="total-results">
                    {totalElements > 0 ? (
                        <>
                            <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{totalElements}</span>
                            <span> kết quả được tìm thấy!</span>
                        </>
                    ) : "Không có dữ liệu."}
                </p>

                {/* Job Cards */}
                <div className="card-container">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '50px' }}>Đang tải...</div>
                    ) : job.length > 0 ? (
                        job.map((jobItem) => (
                            <JobCard key={jobItem.id} job={jobItem} />
                        ))
                    ) : (
                        <p className="no-job">Không tìm thấy công việc phù hợp</p>
                    )}
                </div>

                {/* Pagination */}
                {totalElements > 0 && (
                    <div className="pagination-container">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={totalElements}
                            onChange={handlePageChange}
                            showSizeChanger
                            pageSizeOptions={['7', '10', '20', '50', '100']}
                            className="pagination"
                        />
                    </div>
                )}
            </div>
            <FooterPortal />
        </div>
    );
};

export default JobListPortal;
