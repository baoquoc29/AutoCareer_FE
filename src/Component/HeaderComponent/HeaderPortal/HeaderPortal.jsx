import React from 'react';
import { Layout, Menu, Button } from 'antd';
import logo from '../aotucareer-logo.svg';
import { NavLink } from "react-router-dom";
import './Style/Portal.css';
const { Header: AntHeader } = Layout;

const HeaderPortal = () => {
    return (
        <AntHeader className="custom-header">
            <div className="header-container">
                <div className="header__brand">
                    <div className="brand-wrap">
                        <NavLink to="/" className="brand-img stretched-link">
                            <img src={logo} alt="logo" className="logo" style={{ width: "40px", height: "40px" }} />
                        </NavLink>
                        <div className="brand-title" >Career Bridge</div>
                    </div>
                </div>

                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    className="nav-menu"
                >
                    <Menu.Item key="1"><NavLink to="/">Việc làm</NavLink></Menu.Item>
                    <Menu.Item key="2"><NavLink to="/tools">Hội thảo</NavLink></Menu.Item>
                    <Menu.Item key="3"><NavLink to="/career-guide">Cẩm nang nghề nghiệp</NavLink></Menu.Item>
                </Menu>


                <div className="header-buttons">
                    <Button type="default" className="btn-login">Đăng nhập</Button>
                    <Button type="primary" className="btn-register">Đăng ký</Button>
                    <Button type="link" className="btn-employer">Đăng tuyển & Hợp tác</Button>
                </div>
            </div>
        </AntHeader>
    );
};

export default HeaderPortal;
