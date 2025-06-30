import React from 'react';

import './CareerDevelopment.css';
import {Button, Image} from "antd";
import {CheckIcon} from "lucide-react"; // We'll create this CSS file

const CareerDevelopment = () => {
    return (
        <section className="career-development-section">
            <div className="career-development-container">
                <div className="career-development-grid">
                    {/* Image Column */}
                    <div className="image-column">
                        <Image
                            src="/assets/img/li.jpeg"
                            width={550}
                            height={550}
                            preview={false}
                            alt="Career growth illustration"
                            className="career-image"
                        />
                    </div>

                    {/* Content Column */}
                    <div className="content-column">
                        <div className="content-header">
                            <h2 className="content-title">Phát triển sự nghiệp của bạn</h2>
                            <p className="content-subtitle">
                                Chúng tôi cung cấp các công cụ và nguồn lực để giúp bạn đạt được mục tiêu nghề nghiệp
                            </p>
                        </div>

                        <ul className="features-list">
                            <li className="feature-item">
                                <div className="feature-icon">
                                    <CheckIcon className="check-icon" />
                                </div>
                                <div className="feature-content">
                                    <h3 className="feature-title">Hồ sơ chuyên nghiệp</h3>
                                    <p className="feature-description">Tạo hồ sơ nổi bật để thu hút nhà tuyển dụng</p>
                                </div>
                            </li>

                            <li className="feature-item">
                                <div className="feature-icon">
                                    <CheckIcon className="check-icon" />
                                </div>
                                <div className="feature-content">
                                    <h3 className="feature-title">Đề xuất việc làm</h3>
                                    <p className="feature-description">Nhận đề xuất việc làm phù hợp với kỹ năng của bạn</p>
                                </div>
                            </li>

                            <li className="feature-item">
                                <div className="feature-icon">
                                    <CheckIcon className="check-icon" />
                                </div>
                                <div className="feature-content">
                                    <h3 className="feature-title">Chuẩn bị phỏng vấn</h3>
                                    <p className="feature-description">Các tài nguyên và mẹo để chuẩn bị cho phỏng vấn</p>
                                </div>
                            </li>
                        </ul>

                        <Button className="cta-button">Tạo hồ sơ ngay</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerDevelopment;