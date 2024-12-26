import {Button, Col, Modal, Row, Space, Tag, Typography, Divider, Card} from "antd";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import React, {useState} from "react";
import SubAdminUpdate from "./SubAdminUpdate";
import {useSelector} from "react-redux";

const {Title, Text} = Typography;

const SubAdminDetailModal = ({open, onClose}) => {
    const [isOpen, setOpen] = useState(false);
    const subAdmin = useSelector(state => state.SubAdminReducer.subAdmin);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const options = {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        };
        return new Intl.DateTimeFormat("vi-VN", options).format(date);
    };

    return (
        <Modal open={open} onCancel={onClose} footer={null}
               style={{
                   maxWidth: "90vw", // Đặt chiều rộng tối đa theo viewport
                   minWidth: "600px", // Đặt chiều rộng tối thiểu
               }}>
            {/*<Card title={"Thông tin chi tiết quản trị viên"}></Card>*/}
            <Title level={4}>Thông tin chi tiết quản trị viên</Title>
            <Divider style={{marginTop: 1}}/>
            <Row gutter={[16, 16]}>
                <Col span={8} style={{textAlign: "center"}}>
                    <img
                        src={subAdmin?.subAdminImageId ? `${GET_IMAGE_URI}${subAdmin.subAdminImageId}` : "placeholder-avatar.jpg"}
                        alt="Avatar"
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #ccc",
                        }}
                    />
                    <div style={{marginTop: "16px"}}>
                        {subAdmin?.status === "ACTIVE" ? (
                            <Tag color="green" style={{fontSize: "14px", fontWeight: "bold"}}>Hoạt động</Tag>
                        ) : (
                            <Tag color="red" style={{fontSize: "14px", fontWeight: "bold"}}>Dừng</Tag>
                        )}
                    </div>
                </Col>
                <Col span={16}>
                        <Col span={24}>
                            <Text strong>Họ tên:</Text> {subAdmin?.name || "N/A"}
                        </Col>
                        <Col span={24}>
                            <Text strong>Mã quản trị viên:</Text> {subAdmin?.subAdminCode || "N/A"}
                        </Col>
                        <Col span={24}>
                            <Text strong>Giới
                                tính:</Text> {subAdmin?.gender === "female" ? "Nữ" : subAdmin?.gender === "male" ? "Nam" : "Không xác định"}
                        </Col>
                        <Col span={24}>
                            <Text strong>Email:</Text> {subAdmin?.email || "N/A"}
                        </Col>
                        <Col span={24}>
                            <Text strong>Số điện thoại:</Text> {subAdmin?.phone || "N/A"}
                        </Col>
                        <Col span={24}>
                            <Text strong>Địa chỉ:</Text> {subAdmin?.address || "N/A"}
                        </Col>
                    <Col span={24}>
                        <Text strong>Thời gian tạo:</Text> {formatDate(subAdmin?.createdAt)}
                    </Col>
                    <Col span={24}>
                        <Text strong>Thời gian cập nhật:</Text> {formatDate(subAdmin?.updatedAt)}
                    </Col>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>

            </Row>
            <div style={{textAlign: "right", marginTop: "16px"}}>
                <Space>
                    <Button style={{width: 100}} onClick={onClose}>Đóng</Button>
                    <Button style={{width: 100}} type="primary" onClick={() => setOpen(true)}>
                        Sửa
                    </Button>
                </Space>
            </div>
            <SubAdminUpdate
                open={isOpen}
                onClose={() => setOpen(false)}
                subAdminData={subAdmin}
            />
        </Modal>
    );
};

export default SubAdminDetailModal;
