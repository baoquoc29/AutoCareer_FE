import React from 'react';
import './StylePortal/FooterPortal.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <div className="logo-container-footer">
                        <img alt="logo" src={'aotucareer-logo.svg'} className="footer-logo"/>
                        <span className="brand-name">AutoCareerBridge</span>
                    </div>
                    <p className="brand-slogan">Kết nối sự nghiệp thông minh</p>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="links-column">
                        <h4 className="column-title">Công ty</h4>
                        <ul>
                            <li><a href="/about">Về chúng tôi</a></li>
                            <li><a href="/team">Đội ngũ</a></li>
                            <li><a href="/careers">Tuyển dụng</a></li>
                            <li><a href="/news">Tin tức</a></li>
                        </ul>
                    </div>

                    <div className="links-column">
                        <h4 className="column-title">Dịch vụ</h4>
                        <ul>
                            <li><a href="/services">Tư vấn nghề nghiệp</a></li>
                            <li><a href="/training">Đào tạo</a></li>
                            <li><a href="/recruitment">Tuyển dụng</a></li>
                            <li><a href="/assessment">Đánh giá năng lực</a></li>
                        </ul>
                    </div>

                    <div className="links-column">
                        <h4 className="column-title">Hỗ trợ</h4>
                        <ul>
                            <li><a href="/contact">Liên hệ</a></li>
                            <li><a href="/faq">Câu hỏi thường gặp</a></li>
                            <li><a href="/privacy">Chính sách bảo mật</a></li>
                            <li><a href="/terms">Điều khoản sử dụng</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-contact">
                    <h4 className="contact-title">Liên hệ</h4>
                    <div className="contact-info">
                        <p><i className="fas fa-map-marker-alt"></i> 123 Đường ABC, Quận XYZ, TP.HCM</p>
                        <p><i className="fas fa-phone"></i> 0900 123 456</p>
                        <p><i className="fas fa-envelope"></i> contact@autocareerbridge.com</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="copyright">&copy; 2024 AutoCareerBridge. Bảo lưu mọi quyền.</p>
                <div className="legal-links">
                    <a href="/privacy">Bảo mật</a>
                    <a href="/terms">Điều khoản</a>
                    <a href="/cookies">Cookies</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;