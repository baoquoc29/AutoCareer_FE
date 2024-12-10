import React from "react";
import { Modal, Divider, Row, Col, Typography } from "antd";
import {CheckCircleOutlined, PauseCircleOutlined, CloseCircleOutlined, ClockCircleOutlined} from "@ant-design/icons";

const { Text } = Typography;

const JobDetailModal = ({ open, onClose, job }) => {
    if (!job) return null; // Nếu không có công việc, không hiển thị gì cả

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

    const formatDate = (dateString) => {
        if (!dateString) return "Không xác định";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);
    };

    return (
        <Modal
            title="Chi tiết Công việc"
            open={open}
            onCancel={onClose}
            footer={null}
            width={600}
            bodyStyle={{ padding: "20px" }}
        >
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Text strong>Tiêu đề:</Text> <Text>{job.title}</Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Ngày hết hạn:</Text> <Text>{formatDate(job.expireDate)}</Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Trình độ:</Text> <Text>{job.level}</Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Chi tiết công việc:</Text> <Text>{job.jobDescription}</Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Yêu cầu:</Text> <Text>{job.requirement}</Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Quyền lợi:</Text> <Text>{job.benefit}</Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Mức lương:</Text> <Text>{job.salary}</Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Thời gian làm việc: </Text> <Text>{job.workingTime}</Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Trạng thái duyệt: </Text>
                        <Text
                            style={{
                                color:
                                    job.statusBrowse === "PENDING"
                                        ? "orange"
                                        : job.statusBrowse === "APPROVED"
                                            ? "green"
                                            : "red",
                            }}
                        >
                            {job.statusBrowse === "PENDING" ? (
                                <ClockCircleOutlined style={{ marginRight: 2 }} />
                            ) : job.statusBrowse === "APPROVED" ? (
                                <CheckCircleOutlined style={{ marginRight: 2 }} />
                            ) : (
                                <CloseCircleOutlined style={{ marginRight: 2 }} />
                            )}
                            {getStatusBrowse(job.statusBrowse)}
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Trạng thái: </Text>
                        <Text style={{ color: job.status === "ACTIVE" ? "green" : "orange" }}>
                            {job.status === "ACTIVE" ? (
                                <CheckCircleOutlined style={{ marginRight: 2 }} />
                            ) : job.status === "INACTIVE" ? (
                                <PauseCircleOutlined style={{ marginRight: 2 }} />
                            ) : (
                                <CloseCircleOutlined style={{ marginRight: 2 }} />
                            )}
                            {getStatus(job.status)}
                        </Text>
                    </Col>
                </Row>
            </div>
            <Divider />
            <div style={{ textAlign: "left" }}>
                <button onClick={onClose}
                        style={{ padding: "6px 12px", fontSize: "14px", border: "none", backgroundColor: "#1890ff",
                            color: "white", cursor: "pointer", borderRadius: "4px" }}>
                    Đóng
                </button>
            </div>
        </Modal>
    );
};

export default JobDetailModal;
