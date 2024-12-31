import React, {useEffect, useState} from "react";
import {DatePicker, Input, Pagination, Select, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import FooterPortal from "./FooterPortal";
import "./StylePortal/JobListPortal.css";
import {get_all_job_portal} from "../../Redux/actions/JobThunk";
import {BookOutlined, CalendarOutlined, EnvironmentOutlined, SearchOutlined} from "@ant-design/icons";
import JobCard from "./JobCard";

const { RangePicker } = DatePicker;
const { Option } = Select;

const JobListPortal = () => {
    const dispatch = useDispatch();
    // Redux state
    const job = useSelector((state) => state.JobReducer.jobsPortal || []);
    const totalElements = useSelector((state) => state.JobReducer.totalElements || 0);
    const [currentPage,setCurrentPage] = useState("1");
    const [pageSize,setPageSize] = useState("7");
    const [searchText, setSearchText] = useState("");

    // Local state for pagination and filters
    const [filters, setFilters] = useState({
        dateRange: null,
        location: null,
        universityId: null,
        searchTerm: "",
    });

    useEffect(() => {
        dispatch(get_all_job_portal(currentPage, pageSize, encodeURIComponent(searchText)));
    }, [dispatch, currentPage, pageSize, searchText]);

    // Handlers for filters
    const handleDateRangeChange = (dates) => {
        setFilters((prevFilters) => ({ ...prevFilters, dateRange: dates }));
        setCurrentPage(1); // Reset to the first page after filtering
    };

    const handleLocationChange = (value) => {
        setFilters((prevFilters) => ({ ...prevFilters, location: value }));
        setCurrentPage(1); // Reset to the first page after filtering
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value); // Cập nhật giá trị ô tìm kiếm
        setCurrentPage(1)
    };
    const handlePageChange = (page, pageSize) => {
        setPageSize(pageSize);
        setCurrentPage(page);
    };

    return (
        <div className={"job-listPortal"}>
            <HeaderPortal />
            <div className="portal-list-job-container">
                <div className="filter-container-workshop-list">
                    <Space size="large" className="filter-actions">
                        <Input
                            placeholder="Tìm kiếm theo tên"
                            className="filter-input"
                            value={searchText}
                            onChange={handleSearch}
                            prefix={<SearchOutlined/>} /* Biểu tượng tìm kiếm */
                        />
                        <RangePicker
                            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                            className="filter-date"
                            onChange={handleDateRangeChange}
                            format="DD/MM/YYYY"
                            suffixIcon={<CalendarOutlined/>} /* Biểu tượng lịch */
                        />

                        <Select
                            placeholder="Chọn vị trí"
                            className="filter-select"
                            onChange={handleLocationChange}
                            allowClear
                            suffixIcon={<EnvironmentOutlined/>} /* Biểu tượng vị trí */
                        >
                            {/*{provinces.map((province) => (*/}
                            {/*    <Option key={province.id} value={province.id}>*/}
                            {/*        {province.name}*/}
                            {/*    </Option>*/}
                            {/*))}*/}
                        </Select>
                    </Space>
                </div>

                {/* Total results */}
                <p className="total-results">
                    {totalElements > 0
                        ? <>
                            <span style={{fontWeight: 'bold', color: '#Blue'}}>{totalElements}</span>
                            <span> kết quả được tìm thấy!</span>
                        </>
                        : "Không có dữ liệu."}
                </p>


                {/* Workshop Cards */}
                <div className="card-container">
                    {job.length > 0 ? (
                        job.map((job) => (
                            <JobCard key={job.id} job={job}/>
                        ))
                    ) : (
                        <p className="no-job"></p>
                    )}
                </div>

                {/* Pagination */}
                <div className="pagination-container">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        defaultPageSize={7}
                        defaultCurrent={1}
                        total={totalElements}
                        onChange={handlePageChange}
                        pageSizeOptions={[7, 10, 20, 50, 100]}
                        showSizeChanger={true}
                        className="pagination"
                    />
                </div>
            </div>

            <FooterPortal/>
        </div>
    );
};

export default JobListPortal;
