import {Button, Col, Modal, Row, Tag} from "antd";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import React, { useState} from "react";
import SubAdminUpdate from "./SubAdminUpdate";
import {useSelector} from "react-redux";

const SubAdminDetailModal = ({open, onClose}) => {
    const [isOpen, setOpen] = useState(false);
    const subAdmin = useSelector(state => state.SubAdminReducer.subAdmin);
    console.log("subAdmin", subAdmin);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Trả về "N/A" nếu không có ngày giờ
        const date = new Date(dateString);
        const options = {
            hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric',
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date); // Định dạng theo tiếng Việt
    };


    return (
        <Modal open={open} onCancel={onClose} footer={null} width={700}>
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>Thông tin chi tiết quản trị viên</h2>
            <Row gutter={[16, 16]}>
                <Col span={6} style={{textAlign: "center"}}>
                    <img
                        src={subAdmin?.subAdminImageId ? `${GET_IMAGE_URI}${subAdmin.subAdminImageId}` : "placeholder-avatar.jpg"}
                        alt="Avatar"
                        style={{
                            width: 100, height: 100, borderRadius: "50%", objectFit: "cover",
                        }}
                    />
                </Col>
                <Col span={18}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <p>
                                <strong>Họ tên:</strong> {subAdmin?.name}
                            </p>
                            <p>
                                <strong>Giới
                                    tính:</strong> {subAdmin?.gender === "female" ? "Nữ" : subAdmin?.gender === "male" ? "Nam" : "Không xác định"}
                            </p>
                            <p>
                                <strong>Email:</strong> {subAdmin?.email}
                            </p>
                            <p>
                                <strong>Số điện thoại:</strong> {subAdmin?.phone}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong> {subAdmin?.address}
                            </p>

                        </Col>
                        <Col span={12}>
                            <p>
                                <strong>Mã quản trị viên:</strong> {subAdmin?.subAdminCode}
                            </p>


                            <p>
                                <strong>Trạng thái tài khoản:</strong>{" "}
                                {subAdmin?.status === "ACTIVE" ? (
                                    <Tag color="green" style={{fontWeight: "bold"}}>Hoạt động</Tag>
                                ) : (
                                    <Tag color="red" style={{fontWeight: "bold"}}>Dừng</Tag>
                                )}
                            </p>
                            <p>
                                <strong>Thời gian tạo:</strong> {formatDate(subAdmin?.createdAt)}
                            </p>
                            <p>
                                <strong>Thời gian cập nhật:</strong> {formatDate(subAdmin?.updatedAt)}
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div style={{textAlign: "center", marginTop: 20}}>
                <Button type="primary" style={{width: 100}} onClick={()=> setOpen(true)}>
                    Sửa
                </Button>
            </div>
            <SubAdminUpdate
                open={isOpen}
                onClose={() => setOpen(false)}
                subAdminData={subAdmin}
            />
        </Modal>);
};

export default SubAdminDetailModal;
