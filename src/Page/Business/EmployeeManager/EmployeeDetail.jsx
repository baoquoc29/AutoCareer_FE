import { Button, Modal, Tag } from "antd";
import React from "react";

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
        const year = String(date.getFullYear()); // Lấy 2 chữ số cuối của năm
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <Modal open={open} onCancel={onClose} footer={null}>
                <h2>Chi tiết nhân viên</h2>
                <p><strong>Mã nhân viên:</strong> {employee.employeeCode}</p>
                <p><strong>Tên nhân viên:</strong> {employee.name}</p>
                <p><strong>Giới tính:</strong> {employee.gender}</p>
                <p><strong>Email nhân viên:</strong> {employee.email}</p>
                <p><strong>Số điện thoại:</strong> {employee.phone}</p>
                <p><strong>Ngày sinh:</strong> {employee.dateOfBirth ? formatDate(employee.dateOfBirth) : 'N/A'}</p>
                <p><strong>Địa chỉ:</strong> {employee.address ? employee.address : 'N/A'}</p>
                <p>
                    <strong>Trạng thái tài khoản: </strong>
                    <Tag color={getStatusColor(employee.status)}>{employee.status.toUpperCase()}</Tag>
                </p>
                <p><strong>Ngày tạo: </strong>{formatDate(employee.createdAt)}</p>
                <div className="modal-footer-right">
                    <Button type="primary" onClick={onClose}>Đóng</Button>
                </div>
            </Modal>
        </>
    );
};

export default EmployeeDetail;
