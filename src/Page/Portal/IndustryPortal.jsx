import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { get_total_all_job } from "../../Redux/actions/PortalThunk";
import { Link } from "react-router-dom";
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
    GlobalOutlined
} from '@ant-design/icons';
import "./StylePortal/IndustryPortal.css";
const industryIcons = {
    "Công nghệ thông tin": <LaptopOutlined />,
    "Y tế": <MedicineBoxOutlined />,
    "Giáo dục": <BookOutlined />,
    "Xây dựng": <BuildOutlined />,
    "Tài chính - Ngân hàng": <BankOutlined />,
    "Truyền thông - Quảng cáo": <NotificationOutlined />,
    "Dịch vụ khách hàng": <CustomerServiceOutlined />,
    "Nông nghiệp": <AppleOutlined />,
    "Hàng tiêu dùng": <ShoppingOutlined />,
    "Du lịch - Khách sạn": <GlobalOutlined />,
};

const JobCategories = () => {
    const dispatch = useDispatch();
    const industriesTotalJob = useSelector((state) => state.PortalReducer.industryTotalJob || []);

    useEffect(() => {
        dispatch(get_total_all_job());
    }, [dispatch]);

    // Process industry data
    const processedIndustries = Object.keys(industryIcons).map(name => {
        const industryData = industriesTotalJob.find(item => item.industryName === name);
        return {
            name,
            icon: industryIcons[name],
            count: industryData ? industryData.totalJobs : 0
        };
    });

    return (
        <section className="job-categories-section">
            <div className="job-categories-container">
                <div className="section-header">
                    <h2>Khám phá theo ngành nghề</h2>
                    <p>Tìm kiếm cơ hội việc làm phù hợp với chuyên môn của bạn</p>
                </div>

                <div className="industries-grid">
                    {processedIndustries.map((industry, index) => (
                        <Link to="#" key={index} className="industry-card">
                            <div className="industry-icon-container">
                                {React.cloneElement(industry.icon, { className: 'industry-icon' })}
                            </div>
                            <h3>{industry.name}</h3>
                            <p className="job-count">{industry.count} việc làm</p>
                        </Link>
                    ))}
                </div>

                <button className="view-all-btn">Xem tất cả ngành nghề</button>
            </div>
        </section>
    );
};

export default JobCategories;