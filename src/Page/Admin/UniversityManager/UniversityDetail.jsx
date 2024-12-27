import React, {useState} from "react";
import {Button, Modal, Space, Input, Tag, Row, Col, Typography, Divider} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import "./UniversityDetail.css";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import {useDispatch, useSelector} from "react-redux";
import {
    approved_university,
    get_detail_university,
    rejected_university
} from "../../../Redux/actions/AdminUniversityThunk";

const {Title, Text} = Typography;

const UniversityDetail = ({open, onClose}) => {
    const dispatch = useDispatch();
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [message, setMessage] = useState(""); // Trạng thái lưu lý do từ chối
    const university = useSelector(state => state.AdminUniversityReducer.university);

    const handleReject = () => {
        setIsRejectModalVisible(true); // Hiển thị modal từ chối
    };

    const handleConfirmReject = () => {
        Modal.confirm({
            title: 'Xác nhận từ chối',
            content: `Bạn có chắc chắn muốn từ chối tài khoản trường học "${university.name}"?`,
            okText: 'Từ chối',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Rejected university: ${university.name}`);
                let req = {id: university.id, message: message};
                dispatch(rejected_university(req)).then(() => {
                    dispatch(get_detail_university(university.id))
                }) // Gửi lý do từ chối
                setMessage(""); // Reset lý do từ chối
                setIsRejectModalVisible(false); // Đóng modal
            },
        });
    };

    const handleApproved = () => {
        Modal.confirm({
            title: 'Xác nhận phê duyệt',
            content: `Bạn có chắc chắn muốn phê duyệt tài khoản trường học "${university.name}"?`,
            okText: 'Phê duyệt',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Approved university: ${university.name}`);
                dispatch(approved_university({id: university.id})).then(() => {
                    dispatch(get_detail_university(university.id))
                });
            },
        });
    }

    const handleCloseRejectModal = () => {
        setIsRejectModalVisible(false);
        setMessage("");
    }

    if (!university) {
        return (
            <div style={{textAlign: "center", padding: "20px"}}>
                <p>Chọn trường học để xem chi tiết.</p>
            </div>
        );
    }

    return (
        <Modal open={open} onCancel={onClose} footer={null} width={700}>
            <Title level={4} style={{textAlign: "center"}}>Chi tiết tài khoản trường học</Title>
            <Divider style={{marginTop: 1}}/>
            <div className="row mb-4">
                <div className="col-md-3 text-center">
                    <img
                        src={university.universityImageId ? `${GET_IMAGE_URI}${university.universityImageId}` : "placeholder-avatar.jpg"}
                        alt="Logo trường học"
                        className="img-fluid logo-image rounded"
                        style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div className="col-md-9">
                    <h1 className="university-name">{university.name || "Chưa cập nhật"}</h1>
                    <p className="university-description">{university.description || "Mô tả chưa được cung cấp."}</p>
                    <Tag
                        color={university?.userAccount?.state === "APPROVED" ? "green" : university?.userAccount?.state === "REJECTED" ? "red" : "orange"}>
                        {university?.userAccount?.state === "APPROVED" ? "Đã phê duyệt" : university?.userAccount?.state === "REJECTED" ? "Đã từ chối" : "Đang chờ duyệt"}
                    </Tag>
                </div>
            </div>

            {/* General Information */}
            <div className="row mb-4">
                <p><strong>Tên trường học:</strong> {university.name || "Chưa cập nhật"}</p>
                <p><strong>Website:</strong> <a href={university.website || "#"} target="_blank"
                                                rel="noopener noreferrer">{university.website || "Chưa cập nhật"}</a>
                </p>
                <p><strong>Năm thành lập:</strong> {university.foundYear || "Chưa cập nhật"}</p>
                <p><strong>Địa Chỉ:</strong> {university.location ? (
                    `${university.location.province?.fullName || ""}, ${university.location.district?.fullName || ""}, ${university.location.ward?.fullName || ""}, ${university.location.description || ""}`
                ) : "Chưa cập nhật"}</p>
                <p><strong>Email:</strong> {university.email || "Chưa cập nhật"}</p>
                <p><strong>Điện Thoại:</strong> {university.phone || "Chưa cập nhật"}</p>

            </div>
            {/* Action Buttons */}
            <div style={{textAlign: "right", marginTop: "16px"}}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Button onClick={onClose}>Đóng</Button>
                    </Col>
                    <Col>
                        <Space>
                            <Button type="primary" onClick={handleApproved}
                                    disabled={university?.userAccount?.state !== "PENDING"}>
                                Duyệt
                            </Button>
                            <Button type="primary" danger onClick={handleReject}
                                    disabled={university?.userAccount?.state !== "PENDING"}>
                                Từ chối
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </div>

            {/* Reject Modal */}
            <Modal
                open={isRejectModalVisible}
                onCancel={handleCloseRejectModal}
                onOk={handleConfirmReject}
                okText="Từ chối"
                okType="danger"
                cancelText="Hủy"
                width={600}
            >
                <h2>
                    <ExclamationCircleOutlined style={{color: "#faad14", marginRight: "8px"}}/>
                    Nhập lý do từ chối
                </h2>
                <Input.TextArea
                    rows={4}
                    placeholder="Nhập lý do từ chối..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                        borderRadius: "8px",
                        padding: "10px",
                        fontSize: "16px",
                        resize: "none",
                    }}
                />
            </Modal>
        </Modal>
    );
};

export default UniversityDetail;
