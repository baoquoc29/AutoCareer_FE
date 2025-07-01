import React, { useState } from 'react';
import './PremiumPackages.css';

const PremiumPackages = () => {
    const vipPackage = {
        id: 1,
        name: "Gói VIP - 3 Tháng",
        price: "850,000đ",
        originalPrice: "1,200,000đ",
        savings: "Tiết kiệm 350,000đ",
        duration: "3 tháng",
        days: 90,
        postsPerMonth: 20,
        features: [
            "Đăng 20 bài/tháng",
            "Hỗ trợ 24/7 VIP",
            "AI Tìm kiếm ứng viên",
            "Thống kê chi tiết",
            "Ưu tiên hiển thị bài đăng"
        ],
        benefits: [
            "Tăng khả năng tiếp cận ứng viên chất lượng",
            "Tiết kiệm thời gian tuyển dụng",
            "Quản lý tin tuyển dụng hiệu quả"
        ]
    };

    const [isSelected, setIsSelected] = useState(false);

    return (
        <div className="premium-container">
            <div className="premium-header">
                <h2>Nâng Cấp Tài Khoản VIP</h2>
                <p>Tối ưu hiệu quả tuyển dụng với gói VIP 3 tháng</p>
            </div>

            <div className="package-single">
                <div className={`package-card highlight ${isSelected ? 'selected' : ''}`}>
                    <div className="popular-tag">Phổ biến nhất</div>

                    <h3>{vipPackage.name}</h3>

                    <div className="price-section">
                        <span className="current-price">{vipPackage.price}</span>
                        <span className="original-price">{vipPackage.originalPrice}</span>
                        <span className="duration">/{vipPackage.duration}</span>
                        <div className="savings-badge">{vipPackage.savings}</div>
                    </div>

                    <div className="posts-count">
                        <span>{vipPackage.postsPerMonth}</span> bài đăng/tháng
                    </div>

                    <div className="features-section">
                        <h4>Tính năng nổi bật:</h4>
                        <ul className="features">
                            {vipPackage.features.map((feature, index) => (
                                <li key={index}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="benefits-section">
                        <h4>Lợi ích khi nâng cấp:</h4>
                        <ul className="benefits">
                            {vipPackage.benefits.map((benefit, index) => (
                                <li key={index}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        className={`select-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => setIsSelected(!isSelected)}
                    >
                        {isSelected ? 'Đã chọn gói VIP' : 'Chọn gói VIP'}
                    </button>
                </div>
            </div>

            {isSelected && (
                <div className="checkout-section">
                    <div className="selected-package">
                        <h4>Gói đã chọn: <strong>{vipPackage.name}</strong></h4>
                        <p className="price">{vipPackage.price} <span className="original-price">{vipPackage.originalPrice}</span></p>
                        <p className="savings">{vipPackage.savings}</p>
                    </div>
                    <button className="checkout-btn">Thanh toán ngay</button>
                    <p className="secure-payment">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M17 8V7C17 5.89543 16.1046 5 15 5H5C3.89543 5 3 5.89543 3 7V13C3 14.1046 3.89543 15 5 15H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M20 12C20 14.2091 18.2091 16 16 16H8C5.79086 16 4 14.2091 4 12C4 9.79086 5.79086 8 8 8H16C18.2091 8 20 9.79086 20 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Thanh toán an toàn với SSL
                    </p>
                </div>
            )}
        </div>
    );
};

export default PremiumPackages;