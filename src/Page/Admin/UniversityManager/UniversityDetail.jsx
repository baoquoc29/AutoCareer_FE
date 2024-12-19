import React, {useState} from "react";
import {Button, Modal, Space, Input, Image, Tag} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import "./UniversityDetail.css";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config"; // Custom CSS

const UniversityDetail = ({university, onApprove, onReject, onClose}) => {
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [message, setMessage] = useState(""); // Trạng thái lưu lý do từ chối

    const handleReject = () => {
        setIsRejectModalVisible(true); // Hiển thị modal từ chối
    };

    const handleConfirmReject = () => {
        let req = {id: university.key, message: message};
        onReject(req); // Gửi lý do từ chối
        setMessage(""); // Reset lý do từ chối
        setIsRejectModalVisible(false); // Đóng modal
    };

    if (!university) {
        return (
            <div style={{textAlign: "center", padding: "20px"}}>
                <p>Chọn doanh nghiệp để xem chi tiết.</p>
            </div>
        );
    }

    return (
        <section id="content" className="content">
            <div className="content__wrap">
                <div className="container">
                    <div className="card card-profile-university ">
                        <div className="row mb-4">
                            <div className="col-md-3 text-center">
                                <img
                                    src={university.universityImageId ? `${GET_IMAGE_URI}${university.universityImageId}` : "/placeholder-logo.png"}
                                    alt="Logo Doanh Nghiệp"
                                    className="img-fluid logo-image rounded"
                                    style={{maxHeight: "150px"}}
                                />
                            </div>
                            <div className="col-md-9">
                                <h1 className="university-name">{university.name || "Chưa cập nhật"}</h1>
                                <p className="university-description">{university.description || "Mô tả chưa được cung cấp."}</p>
                                <Tag
                                    color={university.state === "APPROVED" ? "green" : university.state === "REJECTED" ? "red" : "orange"}>
                                    {university.state === "APPROVED" ? "Đã phê duyệt" : university.state === "REJECTED" ? "Đã từ chối" : "Đang chờ duyệt"}
                                </Tag>
                            </div>
                        </div>

                        {/* General Information */}
                        <div className="row mb-4">
                            <p><strong>Tên Doanh Nghiệp:</strong> {university.name || "Chưa cập nhật"}</p>
                            <p><strong>Website:</strong> <a href={university.website || "#"} target="_blank"
                                                            rel="noopener noreferrer">{university.website || "Chưa cập nhật"}</a>
                            </p>
                            <p><strong>Năm thành lập:</strong> {university.foundYear || "Chưa cập nhật"}</p>
                            <p><strong>Địa Chỉ:</strong> {university.location ?  (
                                `${university.location.province?.fullName || ""}, ${university.location.district?.fullName || ""}, ${university.location.ward?.fullName || ""}, ${university.location.description || ""}`
                            ) : "Chưa cập nhật"}</p>
                            <p><strong>Email:</strong> {university.email || "Chưa cập nhật"}</p>
                            <p><strong>Điện Thoại:</strong> {university.phone || "Chưa cập nhật"}</p>

                        </div>
                        {/* Action Buttons */}
                        <div className="text-center mt-4">
                            <Space>
                                {university.state === "PENDING" && (
                                    <>
                                        <Button type="primary" onClick={() => onApprove({id: university.key})}>
                                            Duyệt
                                        </Button>
                                        <Button danger onClick={handleReject}>
                                            Từ chối
                                        </Button>
                                    </>
                                )}
                                <Button onClick={onClose}>Đóng</Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reject Modal */}
            <Modal
                open={isRejectModalVisible}
                onCancel={() => setIsRejectModalVisible(false)}
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
        </section>
    );
};

export default UniversityDetail;
