import React from "react";
import {Modal} from "antd";

const JobDetailModal = ({open, onClose, job}) => {
    if (!job) return null; // Nếu không có ngành, không hiển thị gì cả
    const getStatusBrowse = (status) => {
        switch (status) {
            case 'PENDING':
                return 'Chờ duyệt';
            case 'APPROVED':
                return 'Đã duyệt';
            case 'REJECTED':
                return 'Bị từ chối';
            default:
                return 'Không xác định';
        }
    };

    const getStatus = (status) => {
        switch (status) {
            case 'ACTIVE':
                return 'Hoạt động';
            case 'INACTIVE':
                return 'Tạm ngưng';
            default:
                return 'Không xác định';
        }
    };
    return (
        <>
            <Modal
                title="Chi tiết Công việc"
                open={open}
                onCancel={onClose}
                footer={null}
            >
                <div>
                    <p><b>Tiêu đề:</b> {job.title}</p>
                    <p><strong>Ngày hết hạn:</strong> {job.expireDate}</p>
                    <p><strong>Trình độ:</strong> {job.level}</p>
                    <p><strong>Chi tiết công việc:</strong> {job.jobDescription}</p>
                    <p><strong>Yêu cầu:</strong> {job.requirement}</p>
                    <p><strong>Quyền lợi:</strong> {job.benefit}</p>
                    <p><strong>Mức lương:</strong> {job.salary}</p>
                    <p><strong>Thời gian làm việc:</strong> {job.workingTime}</p>
                    <p><strong>Trạng thái duyệt:</strong> {getStatusBrowse(job.statusBrowse)}</p>
                    <p><b>Trạng thái:</b> {getStatus(job.status)}</p>
                </div>
            </Modal>
        </>
    );
};

export default JobDetailModal;
