import React, {useState, useRef, useEffect} from 'react';
import { Row, Col, Card, Typography, Carousel, Button } from 'antd';
import './StylePortal/IndustryPortal.css';
import {useDispatch, useSelector} from "react-redux";
import {get_total_all_job} from "../../Redux/actions/PortalThunk";
import {
    LaptopOutlined,
    MedicineBoxOutlined,
    BookOutlined,
    BuildOutlined,
    BankOutlined,
    ShopOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    ThunderboltOutlined,
    CarOutlined,
    NotificationOutlined,
    CustomerServiceOutlined,
    AppleOutlined,
    ShoppingOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
const { Text } = Typography;
const industryIcons = {
    "Công nghệ thông tin": <LaptopOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Y tế": <MedicineBoxOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Giáo dục": <BookOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Xây dựng": <BuildOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Tài chính - Ngân hàng": <BankOutlined style={{ fontSize: '50px', color: '#1c1c23' }} />,
    "Sản xuất": <ShopOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Bất động sản": <HomeOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Thương mại điện tử": <ShoppingCartOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Năng lượng": <ThunderboltOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Vận tải": <CarOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Truyền thông - Quảng cáo": <NotificationOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Dịch vụ khách hàng": <CustomerServiceOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Nông nghiệp": <AppleOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Hàng tiêu dùng": <ShoppingOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
    "Du lịch - Khách sạn": <GlobalOutlined style={{ fontSize: '40px', color: '#1c1c23' }} />,
};

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
    const dispatch = useDispatch();
    const industriesTotalJob = useSelector((state) => state.PortalReducer.industryTotalJob || []);
    // Divide the job categories into chunks for each slide
    const paginatedCategories = [];
    for (let i = 0; i < industriesTotalJob.length; i += pageSize) {
        paginatedCategories.push(industriesTotalJob.slice(i, i + pageSize));
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
    useEffect(() => {
        dispatch(get_total_all_job());
    }, [dispatch]);

    return (
        <div className="job-categories-container" data-aos="fade-up">
            <Row justify="space-between" align="middle" className="title-pagination-row">
                <Col>
                    <Typography.Title level={3} >
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
                                    title={category.industryName}
                                    icon={industryIcons[category.industryName]} // Lấy icon từ danh sách industryIcons
                                    jobs={category.totalJobs}
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
