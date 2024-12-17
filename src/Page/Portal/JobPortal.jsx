import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Dropdown, Menu, Pagination, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { get_all_industry } from "../../Redux/actions/IndustryThunk";
import {
    get_all_job,
    get_all_job_by_industry,
    get_all_job_by_province,
    get_all_job_by_region
} from "../../Redux/actions/PortalThunk"; // Import get_all_job for initial API call
import "../Portal/StylePortal/JobPortal.css";
import {DOMAIN} from "../../Utils/Setting/Config";

const defaultLocations = [
    { id: 0, name: "Tất cả" },
    { id: 1, name: "Hà Nội" },
    { id: 79, name: "Thành Phố Hồ Chí Minh" },
    { id: 3, name: "Miền Bắc" },
    { id: 7, name: "Miền Nam" }
];

const salary = [
    "Tất cả", "Dưới 10 triệu", "Từ 10-15 triệu", "Từ 15-20 triệu", "Từ 20-25 triệu", "Từ 25-30 triệu", "Thoả thuận"
];

const experience = [
    "Tất cả", "1-2 năm", "3-5 năm", "Trên 5 năm"
];

const JobPortal = () => {
    const jobs = useSelector((state) => state.PortalReducer.jobList || []);
    const industries = useSelector((state) => state.IndustryReducer.industriesNoPag);
    const totalElements = useSelector((state) => state.PortalReducer.totalElements );
    const [filter, setFilter] = useState("location");
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredOptions, setFilteredOptions] = useState(defaultLocations.map(loc => loc.name));
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(9);
    const locationListRef = useRef(null);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(get_all_job(page-1, size)); // Fetch all jobs initially
        dispatch(get_all_industry()); // Fetch industries
        console.log("Jobs:", jobs);

    }, [dispatch]);

    // Update filtered options based on selected filter
    useEffect(() => {
        switch (filter) {
            case "location":
                setFilteredOptions(defaultLocations.map(loc => ({ id: loc.id, name: loc.name })));
                break;
            case "salary":
                setFilteredOptions(salary.map((name, index) => ({ id: index, name })));
                break;
            case "experience":
                setFilteredOptions(experience.map((name, index) => ({ id: index, name })));
                break;
            case "industry":
                if (industries.length > 0) {
                    setFilteredOptions(industries.map((industry) => ({ id: industry.id, name: industry.name })));
                }
                break;
            default:
                setFilteredOptions([]);
                break;
        }
    }, [filter, industries]);

    const onHandleChangeIndustry = (industryId) => {
        setSelectedOption(industryId);
        if (filter === "industry") {
            setLoading(true);
            dispatch(get_all_job_by_industry(page-1, size, industryId)).finally(() => setLoading(false));  // Call the API with the selected industry
        }
    };
    const onHandLeChangeProvince = (provinceId) => {
        setSelectedOption(provinceId);
        if (filter === "location") {
            setLoading(true);
            if (provinceId === 3 || provinceId === 7) {
                dispatch(get_all_job_by_region(page-1, size, provinceId)).finally(() => setLoading(false));
            } else if (provinceId === 0) {
                console.log(totalElements);
                dispatch(get_all_job(page-1, size)).finally(() => setLoading(false));
            } else {
                dispatch(get_all_job_by_province(page-1, size, provinceId)).finally(() => setLoading(false));
            }
        }
    };


    const handleMenuClick = (e) => {
        setFilter(e.key);
        setSelectedOption(null);  // Reset selection when filter changes
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const scrollLeft = () => {
        if (locationListRef.current) {
            smoothScroll(locationListRef.current, -500); // Scroll left by 500 pixels
        }
    };

    const scrollRight = () => {
        if (locationListRef.current) {
            smoothScroll(locationListRef.current, 500); // Scroll right by 500 pixels
        }
    };

    const smoothScroll = (element, distance) => {
        const start = element.scrollLeft;
        const change = distance;
        const duration = 500;
        let startTime = null;

        const animateScroll = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            element.scrollLeft = start + change * progress;

            if (elapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    const paginatedJobs = jobs.slice(
        (currentPage - 1) * size,
        currentPage * size
    );

    const generateMenu = (handleMenuClick) => (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="location">
                <i className="fas fa-map-pin"></i> Địa điểm
            </Menu.Item>
            <Menu.Item key="salary">
                <i className="fas fa-money-bill"></i> Mức lương
            </Menu.Item>
            <Menu.Item key="experience">
                <i className="fas fa-user-tie"></i> Kinh nghiệm
            </Menu.Item>
            <Menu.Item key="industry">
                <i className="fas fa-industry"></i> Ngành nghề
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="job-portal-container">
            <p className="title-job-portal">Việc làm tốt nhất</p>
            <Card className="search-bar">
                <div className="filter-location-container">
                    <div className="filter-container">
                        <i className="fas fa-filter filter-icon"></i>
                        <span className="filter-label">Lọc theo:</span>
                        <Dropdown overlay={generateMenu(handleMenuClick)} trigger={["click"]}>
                            <div className="dropdown-container">
                                <span className="selected-filter">
                                    {filter === "location" ? "Địa điểm" : filter === "salary" ? "Mức lương" : filter === "experience" ? "Kinh nghiệm" : filter === "industry" ? "Ngành nghề" : "Vị trí"}
                                </span>
                                <DownOutlined className="dropdown-icon" />
                            </div>
                        </Dropdown>
                    </div>

                    <div className="location-scroll-container">
                        <button className="scroll-btn" onClick={scrollLeft}>{"<"}</button>
                        <div className="location-list" ref={locationListRef}>
                            {filteredOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className={`location-item ${selectedOption === option.id ? "active" : ""}`}
                                    onClick={() => {
                                         switch (filter) {
                                             case "location":
                                                 onHandLeChangeProvince(option.id);
                                                 break;
                                             case "industry":
                                                 onHandleChangeIndustry(option.id);  // Trigger industry filter API call
                                                 break;
                                         }
                                    }}
                                >
                                    {option.name}
                                </div>
                            ))}
                        </div>
                        <button className="scroll-btn" onClick={scrollRight}>{">"}</button>
                    </div>
                </div>
            </Card>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Row gutter={[16, 16]} className="grid">
                        {paginatedJobs.map((job, index) => (
                            <Col xs={24} sm={12} md={8} key={index}>
                                <div className="job-portal-card">
                                    <div className="job-portal-card-image">
                                        <img src={`${DOMAIN}/api/v1/image/resource?imageId=${job.imageBusinessId}`}/>
                                    </div>
                                    <div className="job-portal-card-content">
                                        <h3 className="job-portal-card-title">{job.title}</h3>
                                        <p className="job-portal-card-company">{job.businessName}</p>
                                        <div className="job-portal-card-location-salary">
                                            <span className="job-portal-card-tag">{job.salary}</span>
                                            <span className="job-portal-card-tag">{job.province}</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <Pagination
                        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
                        className="job-portal-pagination"
                        current={currentPage}
                        pageSize={size}
                        total={totalElements}
                        onChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default JobPortal;
