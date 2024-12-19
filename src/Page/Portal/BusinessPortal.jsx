import React, { useState, useRef } from "react";
import { Row, Col, Pagination, Card } from "antd";
import "../Portal/StylePortal/BusinessPortal.css";

const jobs = [
    { company: "Công Ty TNHH Giải Pháp Kết Nối", industry: "Bán lẻ", imageUrl: "https://via.placeholder.com/90", totalJob: "9 việc làm" },
    { company: "Công Ty Cổ Phần Tổng RCC", industry: "Tài chính", imageUrl: "https://via.placeholder.com/90", totalJob: "2 việc làm" },
    { company: "Công Ty Công Nghệ Giáo Dục Moon.vn", industry: "Marketing", imageUrl: "https://via.placeholder.com/90", totalJob: "3 việc làm" },
    { company: "Công Ty Đầu Tư Phát Triển Y Khoa Việt Smile", industry: "Y tế", imageUrl: "https://via.placeholder.com/90", totalJob: "4 việc làm" },
    { company: "Công Ty ABC", industry: "Marketing", imageUrl: "https://via.placeholder.com/90", totalJob: "1 việc làm" },
    { company: "Công Ty TNHH Giải Pháp Kết Nối", industry: "Bán lẻ", imageUrl: "https://via.placeholder.com/90", totalJob: "9 việc làm" },
    { company: "Công Ty Cổ Phần Tổng RCC", industry: "Tài chính", imageUrl: "https://via.placeholder.com/90", totalJob: "2 việc làm" },
    { company: "Công Ty Công Nghệ Giáo Dục Moon.vn", industry: "Marketing", imageUrl: "https://via.placeholder.com/90", totalJob: "3 việc làm" },
    { company: "Công Ty Đầu Tư Phát Triển Y Khoa Việt Smile", industry: "Y tế", imageUrl: "https://via.placeholder.com/90", totalJob: "4 việc làm" },
    { company: "Công Ty ABC", industry: "Marketing", imageUrl: "https://via.placeholder.com/90", totalJob: "1 việc làm" }, { company: "Công Ty TNHH Giải Pháp Kết Nối", industry: "Bán lẻ", imageUrl: "https://via.placeholder.com/90", totalJob: "9 việc làm" },
    { company: "Công Ty Cổ Phần Tổng RCC", industry: "Tài chính", imageUrl: "https://via.placeholder.com/90", totalJob: "2 việc làm" },


];

const industry = [
    "Tất cả", "Công nghệ", "Tài chính", "Marketing", "Bán lẻ", "Y tế", "Giáo dục", "Kỹ thuật",
    "Nhân sự", "Sản xuất", "Nông nghiệp", "Dịch vụ khách hàng", "Bất động sản", "Hàng tiêu dùng",
    "Vận tải", "Du lịch", "Khoa học", "Môi trường", "Nghệ thuật", "Truyền thông", "Ngân hàng",
    "Văn hóa", "Pháp lý", "Xây dựng", "Thể thao", "Thực phẩm & Đồ uống", "IT & Phần mềm", "Tư vấn", "Giải trí"
];

const BusinessPortal = () => {
    const [filter, setFilter] = useState("Tất cả");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;
    const locationListRef = useRef(null);

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

// Smooth scrolling function with requestAnimationFrame
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


    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
        setCurrentPage(1);
    };

    const filteredJobs = jobs.filter((job) =>
        filter === "Tất cả" || job.industry === filter
    );

    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <Card className="business-portal-card-container">
            <div className="business-portal-header">
                Doanh nghiệp tiêu biểu
            </div>


            {/* Industry Scroll Container */}
            <div className="industry-scroll-container">
            <button className="scroll-btn" onClick={scrollLeft}>{"<"}</button>
                <div className="industry-list" ref={locationListRef}>
                    {industry.map((option, index) => (
                        <div
                            key={index}
                            className={`industry-item ${filter === option ? "active" : ""}`}
                            onClick={() => handleFilterChange(option)} // Update active class on click
                        >
                            {option}
                        </div>
                    ))}
                </div>
                <button className="scroll-btn" onClick={scrollRight}>{">"}</button>
            </div>

            {/* Display Jobs */}
            <Row gutter={[16, 2]} className="grid-business-portal">
                {paginatedJobs.length > 0 ? (
                    paginatedJobs.map((job, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <div className="business-portal-card">
                                <div className="business-portal-card-image">
                                    <img src={job.imageUrl} alt={job.company || "Job Image"}/>
                                </div>
                                <div className="business-portal-card-content">
                                    <h3 className="business-portal-card-title">{job.company}</h3>
                                    <p className="business-portal-card-company">{job.industry}</p>
                                    <div className="business-portal-card-location-salary">
                                        <span className="business-portal-card-tag">{job.totalJob}</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))
                ) : (
                    <p className="no-jobs-message">Không có công ty nào trong ngành này</p>
                )}
            </Row>

            <div className="business-portal-pagination">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredJobs.length}
                    onChange={handlePageChange}
                />
            </div>
        </Card>

    );
};

export default BusinessPortal;
