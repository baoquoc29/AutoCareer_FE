import React, { useState } from 'react';
import './PremiumPackages.css';

const PremiumPackages = () => {
    const packages = [
        {
            id: 1,
            name: "Gói VIP - 1 Tháng",
            price: "300,000đ",
            originalPrice: "400,000đ",
            duration: "1 tháng", // tương ứng 30 ngày
            days: 30,
            postsPerMonth: 30,
            features: [
                "Đăng 10 bài/tháng",
                "Hỗ trợ 24/7 VIP",
                "AI Tìm kiếm ứng viên",
                "Thống kê chi tiết"
            ],
            popular: false,
            highlight: false
        },
        {
            id: 2,
            name: "Gói VIP - 3 Tháng",
            price: "850,000đ",
            originalPrice: "1,200,000đ",
            duration: "3 tháng", // tương ứng 90 ngày
            days: 90,
            postsPerMonth: 30,
            features: [
                "Đăng 20 bài/tháng",
                "Hỗ trợ 24/7 VIP",
                "AI Tìm kiếm ứng viên",
                "Thống kê chi tiết"
            ],
            popular: true,
            highlight: true
        },
        {
            id: 3,
            name: "Gói VIP - 6 Tháng",
            price: "1,600,000đ",
            originalPrice: "2,400,000đ",
            duration: "6 tháng", // tương ứng 180 ngày
            days: 180,
            postsPerMonth: 30,
            features: [
                "Đăng 30 bài/tháng",
                "Ưu tiên hiển thị cao nhất",
                "Hỗ trợ 24/7 VIP",
                "AI Tìm kiếm ứng viên",
                "Thống kê chi tiết"
            ],
            popular: false,
            highlight: false
        }
    ];


    const [selectedPackage, setSelectedPackage] = useState(null);

    return (
        <div className="premium-container">
            <div className="premium-header">
                <h2>Nâng Cấp Tài Khoản</h2>
                <p>Chọn gói phù hợp để tối ưu hiệu quả tuyển dụng</p>
            </div>

            <div className="packages-grid">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className={`package-card ${pkg.highlight ? 'highlight' : ''} ${selectedPackage === pkg.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPackage(pkg.id)}
                    >
                        {pkg.popular && <div className="popular-tag">Phổ biến</div>}

                        <h3>{pkg.name}</h3>

                        <div className="price-section">
                            <span className="current-price">{pkg.price}</span>
                            <span className="original-price">{pkg.originalPrice}</span>
                            <span className="duration">/{pkg.duration}</span>
                        </div>

                        <div className="posts-count">
                            <span>{pkg.postsPerMonth}</span> bài đăng/tháng
                        </div>

                        <ul className="features">
                            {pkg.features.map((feature, index) => (
                                <li key={index}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button className={`select-btn ${selectedPackage === pkg.id ? 'selected' : ''}`}>
                            {selectedPackage === pkg.id ? 'Đã chọn' : 'Chọn gói'}
                        </button>
                    </div>
                ))}
            </div>

            {selectedPackage && (
                <div className="checkout-section">
                    <div className="selected-package">
                        <h4>Gói đã chọn: <strong>{packages.find(p => p.id === selectedPackage).name}</strong></h4>
                        <p className="price">{packages.find(p => p.id === selectedPackage).price}</p>
                    </div>
                    <button className="checkout-btn">Thanh toán ngay</button>
                    <p className="secure-payment">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M17 8V7C17 5.89543 16.1046 5 15 5H5C3.89543 5 3 5.89543 3 7V13C3 14.1046 3.89543 15 5 15H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M20 12C20 14.2091 18.2091 16 16 16H8C5.79086 16 4 14.2091 4 12C4 9.79086 5.79086 8 8 8H16C18.2091 8 20 9.79086 20 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Thanh toán an toàn
                    </p>
                </div>
            )}
        </div>
    );
};

export default PremiumPackages;