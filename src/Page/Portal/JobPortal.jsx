import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Dropdown, Menu, Pagination } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { get_all_industry } from "../../Redux/actions/IndustryThunk"; // Thêm import cho action
import "../Portal/StylePortal/JobPortal.css";

const jobs = [
    { title: "Nhân Viên Kinh Doanh Tại Hồ Chí Minh", company: "Công Ty TNHH Giải Pháp Kết Nối", salary: "10 - 15 triệu", location: "Hồ Chí Minh, Hà Nội", imageUrl: "https://via.placeholder.com/90" },
    { title: "Nhân Viên Tài Chính Doanh Nghiệp", company: "Công Ty Cổ Phần Tổng RCC", salary: "Trên 14 triệu", location: "Hà Nội", imageUrl: "https://via.placeholder.com/90" },
    { title: "Leader Content Marketing", company: "Công Ty Công Nghệ Giáo Dục Moon.vn", salary: "13 - 22 triệu", location: "Hà Nam & 4 nơi khác", imageUrl: "https://via.placeholder.com/90" },
    { title: "Trưởng Phòng Kinh Doanh Chuỗi", company: "Công Ty Đầu Tư Phát Triển Y Khoa Việt Smile", salary: "25 - 40 triệu", location: "Hà Nội", imageUrl: "https://via.placeholder.com/90" },
    { title: "Trưởng Phòng Kinh Doanh Chuỗi", company: "Công Ty Đầu Tư Phát Triển Y Khoa Việt Smile", salary: "25 - 40 triệu", location: "Hà Nội", imageUrl: "https://via.placeholder.com/90" },
    { title: "Trưởng Phòng Kinh Doanh Chuỗi", company: "Công Ty Đầu Tư Phát Triển Y Khoa Việt Smile", salary: "25 - 40 triệu", location: "Hà Nội", imageUrl: "https://via.placeholder.com/90" },
    { title: "Trưởng Phòng Kinh Doanh Chuỗi", company: "Công Ty Đầu Tư Phát Triển Y Khoa Việt Smile", salary: "25 - 40 triệu", location: "Hà Nội", imageUrl: "https://via.placeholder.com/90" },
    { title: "Trưởng Phòng Kinh Doanh Chuỗi", company: "Công Ty Đầu Tư Phát Triển Y Khoa Việt Smile", salary: "25 - 40 triệu", location: "Hà Nội", imageUrl: "https://via.placeholder.com/90" },
    { title: "Trưởng Phòng Kinh Doanh Chuỗi", company: "Công Ty Đầu Tư Phát Triển Y Khoa Việt Smile", salary: "25 - 40 triệu", location: "Hà Nội", imageUrl: "https://via.placeholder.com/90" },
];

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
    const industries = useSelector((state) => state.IndustryReducer.industries);
    const [filter, setFilter] = useState("location");
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredOptions, setFilteredOptions] = useState(defaultLocations.map(loc => loc.name));
    const pageSize = 9;
    const locationListRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (filter === "industry" ) {
            dispatch(get_all_industry());
        }
    }, [dispatch, filter, industries]);

    useEffect(() => {
        if (filter === "location") {
            setFilteredOptions(defaultLocations.map(loc => loc.name));
        } else if (filter === "salary") {
            setFilteredOptions(salary);
        } else if (filter === "experience") {
            setFilteredOptions(experience);
        } else if (filter === "industry" && industries.length > 0) {
            setFilteredOptions(industries.map((industry) => industry.name)); // Dữ liệu ngành nghề từ API
        }
    }, [filter, industries]);

    const handleMenuClick = (e) => {
        setFilter(e.key);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const scrollLeft = () => {
        if (locationListRef.current) {
            locationListRef.current.scrollBy({ left: -100, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (locationListRef.current) {
            locationListRef.current.scrollBy({ left: 100, behavior: "smooth" });
        }
    };

    const paginatedJobs = jobs.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
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
                            {filteredOptions.map((option, index) => (
                                <div key={index} className="location-item">
                                    {option}
                                </div>
                            ))}
                        </div>
                        <button className="scroll-btn" onClick={scrollRight}>{">"}</button>
                    </div>
                </div>
            </Card>

            <Row gutter={[16, 2]} className="grid">
                {paginatedJobs.map((job, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                        <div className="job-portal-card">
                            <div className="job-portal-card-image">
                                <img src={job.imageUrl} alt={job.title} />
                            </div>
                            <div className="job-portal-card-content">
                                <h3 className="job-portal-card-title">{job.title}</h3>
                                <p className="job-portal-card-company">{job.company}</p>
                                <div className="job-portal-card-location-salary">
                                    <span className="job-portal-card-tag">{job.salary}</span>
                                    <span className="job-portal-card-tag">{job.location}</span>
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
                pageSize={pageSize}
                total={jobs.length}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default JobPortal;
