import React, { useState} from "react";
import {Button, Modal, Space, Input, Image, Tag} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import "./BusinessDetail.css";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";

const BusinessDetail = ({business, onApprove, onReject, onClose}) => {

    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [message, setMessage] = useState(""); // Trạng thái lưu lý do từ chối

    const handleReject = () => {
        setIsRejectModalVisible(true); // Hiển thị modal từ chối
    };

    const handleConfirmReject = () => {
        Modal.confirm({
            title: 'Xác nhận từ chối',
            content: `Bạn có chắc chắn muốn từ chối tài khoản doanh nghiệp "${business.name}"?`,
            okText: 'Từ chối',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Rejected business: ${business.name}`);
                let req = {id: business.key, message: message};
                onReject(req); // Gửi lý do từ chối
                setMessage(""); // Reset lý do từ chối
                setIsRejectModalVisible(false); // Đóng modal
            },
        });
    };
    const handleApproved = () => {
        Modal.confirm({
            title: 'Xác nhận phê duyệt',
            content: `Bạn có chắc chắn muốn phê duyệt tài khoản doanh nghiệp "${business.name}"?`,
            okText: 'Phê duyệt',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Approved business: ${business.name}`);
                onApprove({id: business.key}); // Gửi lý do từ chối
            },
        });
    }

    if (!business) {
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
                    <div className="card card-profile-business ">
                        <div className="row mb-4">
                            <div className="col-md-3 text-center">
                                <img
                                    src={business.businessImageId ? `${GET_IMAGE_URI}${business.businessImageId}` : "/placeholder-logo.png"}
                                    alt="Logo Doanh Nghiệp"
                                    className="img-fluid logo-image rounded"
                                    style={{maxHeight: "150px"}}
                                />
                            </div>
                            <div className="col-md-9">
                                <h1 className="business-name">{business.name || "Chưa cập nhật"}</h1>
                                <p className="business-description">{business.description || "Mô tả chưa được cung cấp."}</p>
                                <Tag
                                    color={business.state === "APPROVED" ? "green" : business.state === "REJECTED" ? "red" : "orange"}>
                                    {business.state === "APPROVED" ? "Đã phê duyệt" : business.state === "REJECTED" ? "Đã từ chối" : "Đang chờ duyệt"}
                                </Tag>
                            </div>
                        </div>

                        {/* General Information */}
                        <div className="row mb-4">
                            <p><strong>Tên Doanh Nghiệp:</strong> {business.name || "Chưa cập nhật"}</p>
                            <p><strong>Mã số thuế:</strong> {business.taxCode || "Chưa cập nhật"}</p>
                            <p><strong>Website:</strong> <a href={business.website || "#"} target="_blank"
                                                            rel="noopener noreferrer">{business.website || "Chưa cập nhật"}</a>
                            </p>
                            <p><strong>Năm thành lập:</strong> {business.foundYear || "Chưa cập nhật"}</p>
                            <p><strong>Quy mô doanh nghiệp:</strong> {business.companySize || "Chưa cập nhật"}</p>
                            <p><strong>Địa Chỉ:</strong> {business.location ? (
                                `${business.location.province?.fullName || ""}, ${business.location.district?.fullName || ""}, ${business.location.ward?.fullName || ""}, ${business.location.description || ""}`
                            ) : "Chưa cập nhật"}</p>
                            <p><strong>Email:</strong> {business.email || "Chưa cập nhật"}</p>
                            <p><strong>Điện Thoại:</strong> {business.phone || "Chưa cập nhật"}</p>
                            <div className="row mb-4">
                                <p><strong>Ảnh Giấy Phép Kinh Doanh:</strong></p>
                                {business.licenseImageId ? (
                                    <div className="text-center">
                                        <Image
                                            src={business.licenseImageId ? `${GET_IMAGE_URI}${business.licenseImageId}` : "/placeholder-logo.png"}
                                            alt="Logo Doanh Nghiệp"
                                            className="img-fluid logo-image rounded"
                                            style={{maxHeight: "150px"}}
                                            preview={true}
                                        />
                                    </div>
                                ) : (
                                    <p>Chưa có ảnh giấy phép kinh doanh.</p>
                                )}
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="text-center mt-4">
                            <Space>
                                {business.state === "PENDING" && (
                                    <>
                                        <Button type="primary" onClick={() => handleApproved()}>
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

export default BusinessDetail;
