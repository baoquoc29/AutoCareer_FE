import React from 'react';
import {Avatar, Button, Dropdown, Form, Input, Layout, Menu, Modal, Space, Typography} from 'antd';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './Style/Portal.css';
import {DOMAIN, TOKEN, USER_LOGIN} from "../../../Utils/Setting/Config";
import {change_password, clearLocalStorage, logoutUser} from "../../../Redux/actions/UserThunk";
import {
    DownOutlined,
    EditOutlined,
    LockOutlined,
    LogoutOutlined,
    ProjectOutlined,
    SettingOutlined,
    UsergroupDeleteOutlined,
    UserOutlined
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const HeaderPortal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, userData } = useSelector(state => state.UserReducer);
    const location = useLocation();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [currentPassword, setCurrentPassword] = React.useState('');
    const { Title } = Typography;
    const handleChangePasswordClick = () => {
        setIsModalVisible(true);
    };
    const [isPasswordChanged, setIsPasswordChanged] = React.useState(false);
    const [form] = Form.useForm(); // Tạo instance cho form

    const handleOk = () => {
        form.submit();
    };
    const onFinish = (values) => {
        const { currentPassword, newPassword, confirmPassword } = values;
        console.log('Mật khẩu hiện tại:', currentPassword);
        console.log('Mật khẩu mới:', newPassword);
        console.log('Xác nhận mật khẩu:', confirmPassword);
        const requestBody = {
            username : userData?.username,
            password : currentPassword,
            newPassword : newPassword,
            reNewPassword: confirmPassword,

        };
        dispatch(change_password(requestBody));
        setIsModalVisible(false);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleLoginClick = () => {
        const currentUrl = window.location.pathname; // Lấy URL hiện tại
        window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`; // Lưu URL vào query param
    };

    const handleToWorkShopClick = () => {
        window.location.href = `/work-shop-all`;
    };

    const handleRegisterClick = () => {
        window.location.href = '/account-type-selection';
    };

    const handleToManagerClick = () => {
        if (userData?.role?.name === "BUSINESS") {
            window.open('/dashboard-industry', '_blank');
        } else if (userData?.role?.name === "UNIVERSITY") {
            window.open('/university', '_blank');
        } else if (userData?.role?.name === "ADMIN") {
            window.open('/admin', '_blank');
        } else if (userData?.role?.name === "EMPLOYEE") {
            window.open('/job-manager', '_blank');
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            dispatch(logoutUser(token));
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(USER_LOGIN);

            // Thêm độ trễ 2 giây trước khi điều hướng
            setTimeout(() => {
                dispatch(clearLocalStorage());
                window.location.href = '/';
            }, 2000); // 2000ms = 2 giây
        } else {
            console.log('No token found');
        }
    };

    const menuItems = userData?.role?.name === 'UNIVERSITY' ? [
        { key: '1', label: 'Thông tin cá nhân', icon: <UserOutlined />, onClick: () => navigate('/profile') },
        { key: '2', label: 'Quản lý & đăng bài', icon: <SettingOutlined />, onClick: handleToManagerClick },
        { key: '3', label: 'Đổi mật khẩu', icon: <LockOutlined />, onClick: () => handleChangePasswordClick() },
        { key: '4', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout }
    ] : userData?.role?.name === 'ADMIN' ? [
        { key: '1', label: 'Thông tin cá nhân', icon: <UserOutlined />, onClick: () => navigate('/admin') },
        { key: '2', label: 'Quản lý người dùng', icon: <UsergroupDeleteOutlined />, onClick: handleToManagerClick },
        { key: '3', label: 'Đổi mật khẩu', icon: <LockOutlined />, onClick: () => handleChangePasswordClick() },
        { key: '4', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout }
    ] : userData?.role?.name === 'BUSINESS' ? [
        { key: '1', label: 'Thông tin cá nhân', icon: <UserOutlined />, onClick: () => navigate('/business') },
        { key: '2', label: 'Quản lý người dùng', icon: <UsergroupDeleteOutlined />, onClick: handleToManagerClick },
        { key: '3', label: 'Đổi mật khẩu', icon: <LockOutlined />, onClick: () => handleChangePasswordClick() },
        { key: '4', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout }
    ] : userData?.role?.name === 'SUB_ADMIN' ? [
        { key: '1', label: 'Thông tin cá nhân', icon: <UserOutlined />, onClick: () => navigate('/admin') },
        { key: '2', label: 'Quản lý người dùng', icon: <EditOutlined />, onClick: handleToManagerClick },
        { key: '3', label: 'Đổi mật khẩu', icon: <LockOutlined />, onClick: () => handleChangePasswordClick() },
        { key: '4', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout }
    ] : userData?.role?.name === 'EMPLOYEE' ? [
        { key: '1', label: 'Thông tin cá nhân', icon: <UserOutlined />, onClick: () => navigate('/business') },
        { key: '2', label: 'Quản lý công việc', icon: <ProjectOutlined />, onClick: handleToManagerClick },
        { key: '3', label: 'Đổi mật khẩu', icon: <LockOutlined />, onClick: () => handleChangePasswordClick() },
        { key: '4', label: 'Đăng xuất', icon: <LogoutOutlined />, onClick: handleLogout }
    ] : [];

    const menu = (
        <Menu items={menuItems} />
    );
    const getValidationMessage = (fieldName, value) => {
        const isPasswordField = ['currentPassword', 'newPassword', 'confirmPassword'].includes(fieldName);
        if (isPasswordField) {
            if (!value) return 'Mật khẩu là bắt buộc.';
            if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}/.test(value)) {
                return 'Mật khẩu phải chứa ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
            }
        }
        return null;
    };

    const currentPath = location.pathname;

    return (
        <AntHeader className="custom-header-portal">
            <div className="header-container-portal">
                <div className="header-brand-portal">
                    <NavLink to="/" className="brand-wrap-portal">
                        <img src={"aotucareer-logo.svg"} alt="logo" className="logo-portal"/>
                        <span className="brand-title-portal">Career Bridge</span>
                    </NavLink>
                </div>

                <div className="nav-menu-wrapper">
                    <Menu
                        theme="light"
                        mode="horizontal"
                        className="nav-menu-portal"
                        selectedKeys={[currentPath]} // Đặt selectedKeys là đường dẫn hiện tại
                    >
                        {userData?.role?.name !== "BUSINESS" && (
                            <Menu.Item key="/job-section" onClick={() => navigate('/job-section')}>
                                Việc làm
                            </Menu.Item>
                        )}
                        {userData?.role?.name !== "UNIVERSITY" && (
                            <Menu.Item key="/work-shop-all" onClick={handleToWorkShopClick}>
                                Hội thảo
                            </Menu.Item>
                        )}
                        {userData?.role?.name !== "UNIVERSITY" && (
                            <Menu.Item key="/university-section" onClick={() => navigate('/university-section')}>
                                Trường học
                            </Menu.Item>
                        )}
                        {userData?.role?.name !== "BUSINESS" && (
                            <Menu.Item key="/business-section" onClick={() => navigate('/business-section')}>
                                Công ty
                            </Menu.Item>
                        )}
                        <Menu.Item key="/industry-section" onClick={() => navigate('/industry-section')}>
                            Lĩnh vực
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
                            <Button type="link" className="btn-username-portal" style={{padding: 0, height: 'auto'}}>
                                <Space>
                                    <Avatar
                                        src={`${DOMAIN}/api/v1/image/resource?imageId=${userData?.university?.logoImageId || userData?.business?.businessImageId}`}
                                        style={{backgroundColor: '#3E7494'  , objectFit: 'scale-down' }}
                                        icon={<UserOutlined/>}
                                    />
                                    <span style={{fontWeight: 500, fontSize: '16px'}}>
                                        {userData?.university?.name || userData?.business?.name || userData?.role?.description || 'Người dùng'}
                                    </span>
                                    <DownOutlined/>
                                </Space>
                            </Button>
                        </Dropdown>
                    )}
                </div>
            </div>


            <Modal
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <Title level={5} style={{ textAlign: 'center' }}>Đổi mật khẩu</Title>
                <Form
                    onFinish={onFinish}
                    form={form}
                    name="change-password"
                    labelCol={{ span: 10 }} // Tăng khoảng cách cho label
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    labelAlign="left" // Căn label sang trái
                    style={{ maxWidth: 400, margin: '0 auto' }}
                >
                    <Form.Item
                        label="Mật khẩu hiện tại"
                        name="currentPassword"
                        style={{ marginBottom: '16px' }}
                        rules={[
                            { required: true,message: ""  },
                            { validator: (_, value) => getValidationMessage('currentPassword', value) ? Promise.reject(getValidationMessage('currentPassword', value)) : Promise.resolve() }
                        ]}
                    >
                        <Input.Password
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                            placeholder="Nhập mật khẩu hiện tại"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                            { required: true,message: ""  },
                            { validator: (_, value) => getValidationMessage('newPassword', value) ? Promise.reject(getValidationMessage('newPassword', value)) : Promise.resolve() }
                        ]}
                        style={{ marginBottom: '16px' }}
                    >
                        <Input.Password
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder="Nhập mật khẩu mới"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        rules={[
                                    { required: true,message: ""  },
                            { validator: (_, value) => getValidationMessage('confirmPassword', value) ? Promise.reject(getValidationMessage('confirmPassword', value)) : Promise.resolve() },
                            {
                                validator: (_, value) => {
                                    if (!value || value === newPassword) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Mật khẩu xác nhận không khớp!');
                                },
                            },
                        ]}
                        style={{ marginBottom: '16px' }}
                    >
                        <Input.Password
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="Nhập lại mật khẩu"
                        />
                    </Form.Item>
                </Form>
            </Modal>



        </AntHeader>
    );
};

export default HeaderPortal;
