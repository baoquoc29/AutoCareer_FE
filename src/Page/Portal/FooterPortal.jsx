import React from 'react';
import './StylePortal/FooterPortal.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-left">
                    <img alt={"logo"} src={'aotucareer-logo.svg'}/>
                    <div className="footer-title">
                        <h2>AutoCareerBridge</h2>
                        <p>&copy; 2024 AutoCareerBridge. Mọi quyền được bảo lưu.</p>
                    </div>
                </div>
                <div className="footer-center">
                <ul>
                        <li><a href="/about">Tất cả về chúng tôi</a></li>
                        <li><a href="/services">Dịch vụ</a></li>
                        <li><a href="/contact">Liên hệ</a></li>
                        <li><a href="/privacy">Chính sách bảo mật</a></li>
                    </ul>
                </div>
                <div className="footer-right">
                    <h3>Theo dõi chúng tôi</h3>
                    <div className="social-icons">
                        <a  href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="icons fab fa-facebook-f"></i>
                        </a>
                        <a  href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="icons fab fa-github"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="icons fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
