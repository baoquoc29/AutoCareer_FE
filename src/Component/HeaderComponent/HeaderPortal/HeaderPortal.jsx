import React from 'react';
import {Layout, Menu, Button, Dropdown, Avatar, Space} from 'antd';
import {Link, NavLink} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import './Style/Portal.css';
import { useNavigate } from 'react-router-dom';

import {DOMAIN, TOKEN, USER_LOGIN} from "../../../Utils/Setting/Config";
import {logoutUser} from "../../../Redux/actions/UserThunk";
import {
    DownOutlined,
    EditOutlined,
    LogoutOutlined, ProjectOutlined,
    SettingOutlined,
    UsergroupDeleteOutlined,
    UserOutlined
} from "@ant-design/icons";
import WorkshopPortal from "../../../Page/Portal/WorkshopPortal";
const { Header: AntHeader } = Layout;

const HeaderPortal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, userData } = useSelector(state => state.UserReducer);

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the login page
    };
    const handleRegisterClick = () => {
        navigate('/account-type-selection'); // Navigate to the register page
    };
    const handleToManagerClick = () => {
        if(userData?.role?.name === "BUSINESS") {
            window.open('/dashboard-industry', '_blank');
        }
        else if(userData?.role?.name === "UNIVERSITY") {
            window.open('/university', '_blank');
        }
        else if(userData?.role?.name === "ADMIN") {
            window.open('/admin', '_blank');
        }
        else if(userData?.role?.name === "BUSINESS") {
            window.open('/dashboard-industry', '_blank');
        }
        else if(userData?.role?.name === "EMPLOYEE") {
            window.open('/job-manager', '_blank');
        }
    }


    const handleLogout = async () => {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            dispatch(logoutUser(token));
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(USER_LOGIN);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            console.log('No token found');
        }
    };

    const menuItems =  userData?.role?.name === 'UNIVERSITY' ?
            [
                { key: '1', label: 'Thông tin cá nhân', icon: <UserOutlined />, onClick: () => navigate('/profile') },
                { key: '2', label: 'Quản lý & đăng bài', icon: <SettingOutlined />, onClick: () => handleToManagerClick() },
                { key: '3', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout }
            ]
            : userData?.role?.name === 'ADMIN' ?
                [
                    { key: '1', label: 'Thông tin cá nhân', icon: <UserOutlined />, onClick: () => navigate('/admin') },
                    { key: '2', label: 'Quản lý người dùng', icon: <UsergroupDeleteOutlined />,  onClick: () => handleToManagerClick() },
                    { key: '3', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout }
                ]
                : userData?.role?.name === 'BUSINESS' ?
                    [
                        { key: '1', label: 'Thông tin cá nhân', icon: <UserOutlined />, onClick: () => navigate('/business') },
                        { key: '2', label: 'Quản lý người dùng', icon: <UsergroupDeleteOutlined />,  onClick: () => handleToManagerClick() },
                        { key: '3', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout }
                    ]
                : userData?.role?.name === 'SUB_ADMIN' ?
                    [
                        { key: '1', label: 'Thông tin cá nhân', icon: <UserOutlined />,onClick: () => navigate('/admin') },
                        { key: '2', label: 'Quản lý người dùng', icon: <EditOutlined />, onClick: () => handleToManagerClick() },
                        { key: '3', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout }
                    ]
                    : userData?.role?.name === 'EMPLOYEE' ?
                        [
                            { key: '1', label: 'Thông tin cá nhân', icon: <UserOutlined />, onClick: () => navigate('/business') },
                            { key: '2', label: 'Quản lý công việc', icon: <ProjectOutlined />,onClick: () => handleToManagerClick() },
                            { key: '3', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout }
                        ]
                        : [];
    const menu = (
        <Menu items={menuItems} />
    );
    return (
        <AntHeader className="custom-header-portal">
            <div className="header-container-portal">
                <div className="header-brand-portal">
                    <NavLink to="/" className="brand-wrap-portal">
                        <img src={"aotucareer-logo.svg"} alt="logo" className="logo-portal" />
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
                        {userData?.role?.name !== "BUSINESS" && (
                            <Menu.Item key="1">
                                <Link to="job-section" smooth={true} duration={500}>
                                    Việc làm
                                </Link>
                            </Menu.Item>
                        )}
                        {userData?.role?.name !== "UNIVERSITY" && (
                            <Menu.Item key="2">
                                <Link to="workshop-section" smooth={true} duration={500}>
                                    Hội thảo
                                </Link>
                            </Menu.Item>
                        )}
                        {userData?.role?.name !== "BUSINESS" && (
                            <Menu.Item key="4">
                                <Link to="business-section" smooth={true} duration={500}>
                                    Công ty
                                </Link>
                            </Menu.Item>
                        )}
                        <Menu.Item key="5">
                            <Link to="industry-section" smooth={true} duration={500}>Lĩnh vực</Link>
                        </Menu.Item>
                    </Menu>
                </div>

                {/* Buttons */}
                <div className="header-buttons-portal">
                    {!isAuthenticated ? (
                        <>
                            <Button type="default" className="btn-login-portal" onClick={handleLoginClick}>Đăng nhập</Button>
                            <Button type="primary" className="btn-register-portal" onClick={handleRegisterClick}>Đăng ký</Button>
                        </>
                    ) : (
                        <Dropdown overlay={menu} placement="bottomRight" arrow>
                            <Button type="link" className="btn-username-portal" style={{ padding: 0, height: 'auto' }}>
                                <Space>
                                    <Avatar
                                        src={`${DOMAIN}/api/v1/image/resource?imageId=${userData?.university?.logoImageId || userData?.business?.businessImageId}`}
                                        style={{ backgroundColor: '#3E7494' }}
                                        icon={<UserOutlined />}
                                    />
                                    <span style={{ fontWeight: 500, fontSize: '16px' }}>
                        {userData?.university?.name || userData?.business?.name || userData?.role?.description ||  'Người dùng'}
                    </span>
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    )}
                </div>
            </div>
        </AntHeader>
    );
};

export default HeaderPortal;
