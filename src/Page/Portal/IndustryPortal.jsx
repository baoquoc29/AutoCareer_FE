import React, { useState, useRef } from 'react';
import { Row, Col, Card, Typography, Carousel, Button } from 'antd';
import { DollarCircleOutlined, AppstoreAddOutlined, PhoneOutlined, UserOutlined, BankOutlined, LaptopOutlined, HomeOutlined, FileProtectOutlined } from '@ant-design/icons';
import './StylePortal/IndustryPortal.css'; // Import the CSS file

const { Text } = Typography;

const jobCategories = [
    { title: 'Kinh doanh - Bán hàng', icon: <DollarCircleOutlined />, jobs: '9.350' },
    { title: 'Marketing - PR - Quảng cáo', icon: <AppstoreAddOutlined />, jobs: '5.277' },
    { title: 'Dịch vụ khách hàng - Vận hành', icon: <PhoneOutlined />, jobs: '1.895' },
    { title: 'Nhân sự - Hành chính - Pháp lý', icon: <UserOutlined />, jobs: '2.974' },
    { title: 'Tài chính - Ngân hàng - Bảo hiểm', icon: <BankOutlined />, jobs: '872' },
    { title: 'Công nghệ Thông tin', icon: <LaptopOutlined />, jobs: '3.696' },
    { title: 'Bất động sản - Xây dựng', icon: <HomeOutlined />, jobs: '1.535' },
    { title: 'Kế toán - Kiểm toán - Thuế', icon: <FileProtectOutlined />, jobs: '3.112' },
];

const JobCategoryCard = ({ title, icon, jobs }) => (
    <Col span={6} style={{ marginBottom: '20px' }}>
        <Card
            bordered={false}
            hoverable
            className="job-category-card"
        >
            <div className="icon">{icon}</div>
            <div>
                <Text className="card-title">{title}</Text>
            </div>
            <Text className="jobs-count">{jobs} việc làm</Text>
        </Card>
    </Col>
);

const JobCategories = () => {
    const carouselRef = useRef(null); // Reference to the carousel
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4; // Set number of items per slide

    // Divide the job categories into chunks for each slide
    const paginatedCategories = [];
    for (let i = 0; i < jobCategories.length; i += pageSize) {
        paginatedCategories.push(jobCategories.slice(i, i + pageSize));
    }

    // Move to the previous slide
    const goToPrevSlide = () => {
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    };

    // Move to the next slide
    const goToNextSlide = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };

    return (
        <div className="job-categories-container">
            <Row justify="space-between" align="middle" className="title-pagination-row">
                <Col>
                    <Typography.Title level={3} className="title">
                        Top ngành nghề nổi bật
                    </Typography.Title>
                    <Text className="job-count-text">Tất cả các ngành nghề</Text>
                </Col>

                {/* Add the navigation buttons to go to previous/next slide */}
                <Col>
                    <Button
                        icon={<span className="arrow-left">‹</span>}
                        onClick={goToPrevSlide}
                        style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            fontSize: '20px',
                            marginRight: '10px',
                        }}
                    />
                    <Button
                        icon={<span className="arrow-right">›</span>}
                        onClick={goToNextSlide}
                        style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            fontSize: '20px',
                        }}
                    />
                </Col>
            </Row>

            {/* Carousel with dots and navigation arrows */}
            <Carousel
                ref={carouselRef}
                autoplay
                dots={true}  // Enable dots for navigation
            >
                {paginatedCategories.map((categoryGroup, index) => (
                    <div key={index}>
                        {/* Row containing the cards, ensure it's a horizontal row */}
                        <Row gutter={[16, 16]} justify="center" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                            {categoryGroup.map((category, index) => (
                                <JobCategoryCard
                                    key={index}
                                    title={category.title}
                                    icon={category.icon}
                                    jobs={category.jobs}
                                />
                            ))}
                        </Row>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default JobCategories;
