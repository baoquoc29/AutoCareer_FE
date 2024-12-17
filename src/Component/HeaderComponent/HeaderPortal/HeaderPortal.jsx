import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import './Style/Portal.css';

const { Header: AntHeader } = Layout;

const HeaderPortal = () => {
    return (
        <AntHeader className="custom-header-portal">
            <div className="header-container-portal">
                <div className="header-brand-portal">
                    <NavLink to="/home-screen" className="brand-wrap-portal">
                        <img src={"aotucarerr-logo.svg"} alt="logo" className="logo-portal" />
                        <span className="brand-title-portal">Career Bridge</span>
                    </NavLink>
                </div>

                <div className="nav-menu-wrapper">
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        className="nav-menu-portal"
                    >
                        <Menu.Item key="1">
                            <Link to="job-section" smooth={true} duration={500}>
                                Việc làm
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="workshop-section" smooth={true} duration={500}>
                                Hội thảo
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="university-section" smooth={true} duration={500}>
                                Trường học
                            </Link>
                        </Menu.Item>
                        {/* Use Link component for scroll-to functionality */}
                        <Menu.Item key="4">
                            <Link to="business-section" smooth={true} duration={500}>
                                Công ty
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="industry-section" smooth={true} duration={500}>Lĩnh vực</Link>
                        </Menu.Item>
                    </Menu>
                </div>

                {/* Buttons */}
                <div className="header-buttons-portal">
                    <Button type="default" className="btn-login-portal">Đăng nhập</Button>
                    <Button type="primary" className="btn-register-portal">Đăng ký</Button>
                    <Button type="link" className="btn-employer-portal">Đăng tuyển & Hợp tác</Button>
                </div>
            </div>
        </AntHeader>
    );
};

export default HeaderPortal;
