import { Button, Card, Modal, Tag, Avatar, Typography } from "antd";
import React from "react";
import {
    CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined,
    EnvironmentOutlined,
    IdcardOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined
} from "@ant-design/icons";
import './EmployeeCSS/EmployeeDetail.css'
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";

const { Text } = Typography;

const EmployeeDetail = ({ open, onClose, employee }) => {
    if (!employee) return null;

    // Hàm xác định màu sắc dựa trên trạng thái
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "active":
                return "green";
            case "inactive":
                return "volcano";
            default:
                return "geekblue";
        }
    };

    // Hàm định dạng ngày
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    };

    const getStatusText = (status) => {
        if (status === 'ACTIVE') {
            return 'Hoạt động';
        } else if (status === 'INACTIVE') {
            return 'Đã xóa';
        }
        return status.toUpperCase(); // Trả về giá trị gốc nếu không khớp
    };

    return (
        <Modal open={open} onCancel={onClose} footer={null} className="employee-detail-modal" width={700}>
            <Card title="Chi tiết nhân viên" style={{border: 'none', marginTop:'-10px'}} >
                <div className="employee-header">
                    <Avatar
                        size={100}
                        src={employee.employeeImageId ? `${GET_IMAGE_URI}${employee.employeeImageId}` : 'placeholder-avatar.jpg'}
                        alt="Employee Avatar"
                        className="employee-avatar"
                    />
                </div>

                <div style={{ padding: "10px 0" }}>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <Text strong><IdcardOutlined /> Mã nhân viên:</Text> <Text>{employee.employeeCode}</Text>
                        </div>
                        <div className="detail-item">
                            <Text strong><UserOutlined /> Tên nhân viên:</Text>
                            <Text
                                style={{
                                    maxWidth: '75%', // Giới hạn chiều rộng của ô text
                                    overflow: 'hidden',  // Ẩn nội dung tràn
                                    textOverflow: 'ellipsis', // Thêm dấu ba chấm
                                    whiteSpace: 'nowrap', // Không xuống dòng
                                    display: 'inline-block' // Sử dụng inline-block để maxWidth hoạt động
                                }}
                            >
                                {employee.name}
                            </Text>
                        </div>
                        <div className="detail-item">
                            <Text strong><UserOutlined /> Giới tính:</Text> <Text>{employee.gender}</Text>
                        </div>
                        <div className="detail-item">
                            <Text strong><MailOutlined /> Email nhân viên:</Text> <Text>{employee.email}</Text>
                        </div>
                        <div className="detail-item">
                            <Text strong><PhoneOutlined /> Số điện thoại:</Text> <Text>{employee.phone}</Text>
                        </div>
                        <div className="detail-item">
                            <Text strong><CalendarOutlined /> Ngày sinh:</Text> <Text>{employee.dateOfBirth ? formatDate(employee.dateOfBirth) : 'N/A'}</Text>
                        </div>
                        <div className="detail-item">
                            <Text strong><EnvironmentOutlined /> Địa chỉ:</Text> <Text>{employee.address ? employee.address : 'N/A'}</Text>
                        </div>
                        <div className="detail-item">
                            <Text strong><CheckCircleOutlined /> Trạng thái tài khoản:</Text>
                            <Text>
                                <Tag color={getStatusColor(employee.status)}>
                                    {getStatusText(employee.status)}
                                </Tag>
                            </Text>
                        </div>
                        <div className="detail-item">
                            <Text strong><ClockCircleOutlined /> Ngày tạo:</Text> <Text>{formatDate(employee.createdAt)}</Text>
                        </div>
                    </div>
                </div>
                <div className="modal-footer-right">
                    <Button type="primary" onClick={onClose}>Đóng</Button>
                </div>
            </Card>
        </Modal>
    );
};

export default EmployeeDetail;