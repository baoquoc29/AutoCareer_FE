import React from "react";
import { Modal, Divider, Typography, Row, Col } from "antd";
import { CheckCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const IndustryDetailModal = ({ open, onClose, industry }) => {
    if (!industry) return null; // Nếu không có ngành, không hiển thị gì cả

    const formatDateTime = (dateString) => {
        if (!dateString) return "Không xác định";
        const date = new Date(dateString);
        // Định dạng thời gian
        const time = date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        // Định dạng ngày
        const day = date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        // Kết hợp giờ và ngày bằng dấu "-"
        return `${time} - ${day}`;
    };

    return (
        <Modal
            title={<Title level={4}>Chi tiết ngành</Title>}
            open={open}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            <div style={{ padding: "10px 0" }}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Text strong>Mã ngành:</Text> <Text>{industry.industryCode}</Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Tên chuyên ngành:</Text> <Text>{industry.industryName}</Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Ngày tạo:</Text> <Text>{formatDateTime(industry.createAt)} </Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Người tạo:</Text> <Text>{industry.createBy}</Text>
                    </Col>
                    <Col span={24}>
                        <Text strong>Trạng thái: </Text>
                        <Text style={{ color: industry.status === "ACTIVE" ? "green" : "orange" }}>
                            {industry.status === "ACTIVE" ? (
                                <CheckCircleOutlined style={{ marginRight: 2 }} />
                            ) : (
                                <PauseCircleOutlined style={{ marginRight: 2 }} />
                            )}
                            {industry.status === "ACTIVE" ? "Hoạt động" : "Tạm ngưng"}
                        </Text>
                    </Col>
                </Row>
            </div>
            <Divider />
        </Modal>
    );
};

export default IndustryDetailModal;
