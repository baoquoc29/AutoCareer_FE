import React from 'react';
import { Layout, Menu, Button } from 'antd';
import logo from '../aotucareer-logo.svg';
import { NavLink } from 'react-router-dom';
import './Style/Portal.css';
const { Header: AntHeader } = Layout;

const HeaderPortal = () => {
    return (
        <AntHeader className="custom-header-portal">
            <div className="header-container-portal">
                <div className="header-brand-portal">
                    <div className="brand-wrap-portal">
                        <NavLink to="/" className="brand-img-portal stretched-link">
                            <img src={logo} alt="logo" className="logo-portal" style={{ width: "40px", height: "40px" }} />
                        </NavLink>
                        <div className="brand-title-portal">Career Bridge</div>
                    </div>
                </div>

                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    className="nav-menu-portal"
                >
                    <Menu.Item key="1"><NavLink to="/">Việc làm</NavLink></Menu.Item>
                    <Menu.Item key="2"><NavLink to="/tools">Hội thảo</NavLink></Menu.Item>
                    <Menu.Item key="3"><NavLink to="/career-guide">Cẩm nang nghề nghiệp</NavLink></Menu.Item>
                </Menu>

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
