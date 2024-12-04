import React, { useState } from "react";
import { Card, Typography, Button, Row, Col, Modal } from "antd";
import dayjs from "dayjs";
import { DOMAIN } from "../../../Utils/Setting/Config";
import PropTypes from "prop-types";

const { Text } = Typography;

const WorkShopDetails = ({ workshop, onBack, onViewCompanyList, onViewPendingCompanies }) => {
    const { title, description, startDate, endDate, expireDate, workshopImageId, location } = workshop;
    const { province, district, ward, description: addressDescription } = location || {};
    const imageWorkshop = workshopImageId ? `${DOMAIN}/api/v1/image/resource?imageId=${workshopImageId}` : '';

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    // Ghép địa chỉ chi tiết
    const fullAddress = [
        addressDescription,
        ward?.fullName,
        district?.fullName,
        province?.fullName,
    ]
        .filter((part) => part)
        .join(", ") || "Không có thông tin địa chỉ";

    return (
        <Card
            title={<span style={{ color: "#1890ff" }}>Chi Tiết Hội Thảo</span>}
            style={{
                width: "100%",
                margin: "20px 0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Nút danh sách công ty */}
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
                <Button type="primary" onClick={onViewCompanyList} style={{ marginRight: "10px" }}>
                    Danh sách công ty tham gia
                </Button>
                <Button type="default" onClick={onViewPendingCompanies}>
                    Danh sách công ty chờ duyệt
                </Button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Tiêu đề */}
                <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "10px" }}>
                    <p style={{ color: "#000000" }}>Tiêu Đề:</p>
                    <Text style={{ fontSize: "16px" }}>{title}</Text>
                </div>

                {/* Ngày bắt đầu, ngày kết thúc, ngày hết hạn */}
                <Row gutter={16}>
                    <Col span={8}>
                        <div>
                            <p>Ngày Bắt Đầu:</p>
                            <Text>{startDate}</Text>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <p>Ngày Kết Thúc:</p>
                            <Text>{endDate}</Text>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <p>Ngày Hết Hạn:</p>
                            <Text>{expireDate}</Text>
                        </div>
                    </Col>
                </Row>

                {/* Địa chỉ */}
                <div>
                    <p>Địa chỉ:</p>
                    <Text>{fullAddress}</Text>
                </div>

                {/* Mô tả */}
                <div>
                    <p>Mô Tả:</p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: description || "<p>Không có mô tả</p>",
                        }}
                        style={{
                            width: "100%",
                            minHeight: "100px",
                            padding: "12px",
                        }}
                    />
                </div>

                {/* Nút xem ảnh */}
                <div>
                    <p>Ảnh:</p>
                    {imageWorkshop ? (
                        <Button onClick={showModal} type="primary">
                            Xem ảnh
                        </Button>
                    ) : (
                        <Text style={{ color: "#ff4d4f" }}>Không có ảnh</Text>
                    )}
                </div>

                {/* Nút quay lại */}
                <div style={{ textAlign: "right" }}>
                    <Button onClick={onBack} style={{ backgroundColor: "#1890ff", color: "#fff" }}>
                        Quay lại
                    </Button>
                </div>
            </div>

            {/* Modal hiển thị ảnh lớn */}
            <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                width={600}
            >
                <img
                    src={imageWorkshop}
                    alt="Workshop"
                    style={{
                        width: "100%",
                        objectFit: "contain",
                    }}
                />
            </Modal>
        </Card>
    );
};

WorkShopDetails.propTypes = {
    workshop: PropTypes.shape({
        title: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        expireDate: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        workshopImageId: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
        location: PropTypes.shape({
            province: PropTypes.shape({
                name: PropTypes.string,
                fullName: PropTypes.string,
            }),
            district: PropTypes.shape({
                name: PropTypes.string,
                fullName: PropTypes.string,
            }),
            ward: PropTypes.shape({
                name: PropTypes.string,
                fullName: PropTypes.string,
            }),
            description: PropTypes.string,
        }),
    }).isRequired,
    onBack: PropTypes.func.isRequired,
    onViewCompanyList: PropTypes.func.isRequired,
    onViewPendingCompanies: PropTypes.func.isRequired,
};

export default WorkShopDetails;
