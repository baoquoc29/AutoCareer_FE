import React, { useState } from 'react';
import './PremiumPackages.css';

const PremiumPackages = () => {
    const packages = [
        {
            id: 1,
            name: "Gói Cơ Bản",
            level: "Cấp 1",
            price: "100,000đ",
            originalPrice: "150,000đ",
            duration: "1 tháng",
            postsPerMonth: 10,
            features: [
                "Đăng 10 bài/tháng",
                "Ưu tiên hiển thị",
                "Hỗ trợ cơ bản"
            ],
            popular: false,
            color: "#4e73df"
        },
        {
            id: 2,
            name: "Gói Nâng Cao",
            level: "Cấp 2",
            price: "200,000đ",
            originalPrice: "250,000đ",
            duration: "1 tháng",
            postsPerMonth: 20,
            features: [
                "Đăng 20 bài/tháng",
                "Hỗ trợ 24/7",
                "AI Tìm kiếm ứng viên",
                "Ưu tiên hiển thị cao"
            ],
            popular: true,
            color: "#1cc88a"
        },
        {
            id: 3,
            name: "Gói Cao Cấp",
            level: "Cấp 3",
            price: "300,000đ",
            originalPrice: "400,000đ",
            duration: "1 tháng",
            postsPerMonth: 30,
            features: [
                "Đăng 30 bài/tháng",
                "Ưu tiên hiển thị cao nhất",
                "Hỗ trợ 24/7 VIP",
                "AI Tìm kiếm ứng viên",
                "Thống kê chi tiết"
            ],
            popular: false,
            color: "#f6c23e"
        }
    ];

    const [selectedPackage, setSelectedPackage] = useState(null);

    return (
        <div className="premium-container">
            <div className="premium-header">
                <h1 className="premium-title">Nâng Cấp Tài Khoản Premium</h1>
                <p className="premium-subtitle">Lựa chọn gói phù hợp để tối ưu hiệu quả đăng bài tuyển dụng</p>
            </div>

            <div className="packages-grid">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className={`package-card ${pkg.popular ? 'popular' : ''} ${selectedPackage === pkg.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPackage(pkg.id)}
                    >
                        {pkg.popular && (
                            <div className="popular-badge" style={{ backgroundColor: pkg.color }}>
                                PHỔ BIẾN
                            </div>
                        )}

                        <div className="package-content">
                            <div className="package-header" style={{ borderTopColor: pkg.color }}>
                                <h3 className="package-name">{pkg.name}</h3>
                                <div className="package-level" style={{ color: pkg.color }}>{pkg.level}</div>
                            </div>

                            <div className="package-price-section">
                                <div className="price-wrapper">
                                    <span className="package-price">{pkg.price}</span>
                                    <span className="original-price">{pkg.originalPrice}</span>
                                </div>
                                <div className="package-duration">{pkg.duration}</div>
                            </div>

                            <div className="package-posts">
                                <span className="posts-count">{pkg.postsPerMonth}</span>
                                <span className="posts-label">bài đăng/tháng</span>
                            </div>

                            <ul className="package-features">
                                {pkg.features.map((feature, index) => (
                                    <li key={index}>
                                        <span className="feature-icon">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            className="select-button"
                            style={{ backgroundColor: pkg.color }}
                        >
                            {selectedPackage === pkg.id ? 'Đã chọn' : 'Chọn gói'}
                        </button>
                    </div>
                ))}
            </div>

            {selectedPackage && (
                <div className="checkout-section">
                    <div className="checkout-content">
                        <h2>Xác nhận thanh toán</h2>
                        <div className="selected-package-info">
                            <div className="info-row">
                                <span>Gói đã chọn:</span>
                                <strong>{packages.find(p => p.id === selectedPackage).name}</strong>
                            </div>
                            <div className="info-row">
                                <span>Giá:</span>
                                <span className="package-price-checkout">
                                    {packages.find(p => p.id === selectedPackage).price}
                                </span>
                            </div>
                        </div>
                        <button className="checkout-button">TIẾN HÀNH THANH TOÁN</button>
                        <div className="secure-payment">
                            <span className="lock-icon">🔒</span>
                            Thanh toán an toàn & bảo mật
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PremiumPackages;