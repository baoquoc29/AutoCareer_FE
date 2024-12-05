import React from "react";
import {Modal} from "antd";

const JobDetailModal = ({open, onClose, job}) => {
    if (!job) return null; // Nếu không có ngành, không hiển thị gì cả
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
                    <p><strong>Trạng thái duyệt:</strong> {job.statusBrowse}</p>
                    <p><b>Trạng thái:</b> {job.status === "ACTIVE" ? "Hoạt động" : "Tạm ngưng"}</p>
                </div>
            </Modal>
        </>
    );
};

export default JobDetailModal;
