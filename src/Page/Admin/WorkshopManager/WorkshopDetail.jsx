import React, {useEffect, useState} from "react";
import {Button, Modal, Space, Row, Col, Card, Divider, Typography} from "antd";

import {
    CheckCircleOutlined,
    ClockCircleOutlined, DollarOutlined,
    ExclamationCircleOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import "./WorkshopDetail.css";
import DisplayRichText from "../../../Component/TextEditDisplay/DisplayRichText";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {approved_workshop, get_detail_workshop, rejected_workshop} from "../../../Redux/actions/AdminWorkshopThunk";
import RejectModal from "../../Modal/RejectModal";

const {Text, Title} = Typography;

const AdminWorkshopDetail = () => {
    const dispatch = useDispatch();
    const workshopData = useSelector(state => state.AdminWorkshopReducer.workshop)  // assuming workshop data is stored here
    const navigate = useNavigate();
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [message, setMessage] = useState("");


    const formatSalary = (salary) => {
        if (!salary) return "Không xác định";
        return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    };

    const formatDate = (dateString) => {
        try {
            if (!dateString) return "Không xác định"; // Kiểm tra giá trị null hoặc undefined
            const date = new Date(dateString);

            if (isNaN(date.getTime())) return "Không hợp lệ"; // Kiểm tra ngày hợp lệ

            // Định dạng giờ
            const time = new Intl.DateTimeFormat("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }).format(date);

            // Định dạng ngày
            const dateFormatted = new Intl.DateTimeFormat("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }).format(date);

            return `${time} - ${dateFormatted}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Không xác định"; // Trả về mặc định nếu có lỗi
        }
    };

    const handleApproved = () => {
        Modal.confirm({
            title: 'Xác nhận phê duyệt',
            content: `Bạn có chắc chắn muốn phê duyệt tin hội thảo "${workshopData.title}"?`,
            okText: 'Phê duyệt',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Approved workshop: ${workshopData.title}`);
                dispatch(approved_workshop({id: workshopData.id})).then(() => {
                    dispatch(get_detail_workshop(workshopData.id))
                }); // Gửi lý do từ chối
            },
        });
    }


    // Trạng thái lưu lý do từ chối

    const handleReject = () => {
        setIsRejectModalVisible(true); // Hiển thị modal từ chối
    };
    const closeModalReject = () => {
        setIsRejectModalVisible(false);
    }

    const handleConfirmReject = (message) => {
        Modal.confirm({
            title: 'Xác nhận từ chối',
            content: `Bạn có chắc chắn muốn từ chối tài khoản doanh nghiệp "${workshopData?.title}"?`,
            okText: 'Từ chối',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Rejected business: ${workshopData?.title}`);
                let req = {id: workshopData.id, message: message};
                dispatch(rejected_workshop(req)).then(() => {
                    dispatch(get_detail_workshop(workshopData.id));
                })
                setIsRejectModalVisible(false); // Đóng modal
            },
        });
    };

    if (!workshopData) {
        return (
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
                            <div>Không tìm thấy hội thảo.</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
                        <Row gutter={[16, 16]}>
                            {/* Workshop Content Card */}
                            <Col span={24} md={16}>
                                <Card bordered={false}>
                                    <Title level={2} style={{textAlign: "center"}}>{workshopData?.title}</Title>

                                    <Space direction="vertical" size={4} style={{width: "100%"}}>
                                        <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>
                                            Chi tiết hội thảo</Divider>
                                        <Text strong style={{color: "#722ed1"}}>
                                            <ClockCircleOutlined
                                                style={{color: "#722ed1", marginRight: "8px"}}/>
                                            Ngày bắt đầu:
                                        </Text>
                                        <Text>
                                            {formatDate(workshopData?.startDate)}
                                        </Text>
                                        <Text strong style={{color: "#722ed1"}}>
                                            <ClockCircleOutlined
                                                style={{color: "#722ed1", marginRight: "8px"}}/>
                                            Ngày kết thúc:
                                        </Text>
                                        <Text>
                                            {formatDate(workshopData?.endDate)}
                                        </Text>
                                        <Text strong style={{color: "#722ed1"}}>
                                            <ClockCircleOutlined
                                                style={{color: "#722ed1", marginRight: "8px"}}/>
                                            Ngày hết hạn:
                                        </Text>
                                        <Text>
                                            {formatDate(workshopData?.expireDate)}
                                        </Text>
                                        <Text strong style={{color: "#52c41a"}}>
                                            <QuestionCircleOutlined style={{color: "#52c41a", marginRight: "8px"}}/>
                                            Địa chỉ:
                                        </Text>
                                        <span style={{whiteSpace: "pre-wrap"}}>
                                            <DisplayRichText
                                                content={`${workshopData?.location?.description}, ${workshopData?.location?.ward?.fullName}, ${workshopData?.location?.district?.fullName}, ${workshopData?.location?.province?.fullName}`}/>
                                        </span>

                                        <Text strong style={{color: "#ffafcc"}}>
                                            <ExclamationCircleOutlined style={{color: "#ffafcc", marginRight: "8px"}}/>
                                            Mô tả:
                                        </Text>
                                        <div style={{whiteSpace: "pre-wrap"}}>
                                            <DisplayRichText content={workshopData?.description}/>
                                        </div>
                                    </Space>

                                    <Divider/>
                                    <Row justify="space-between" align="middle">
                                        <Col>
                                            <Button
                                                type="default"
                                                onClick={() => navigate(-1)}
                                            >
                                                Quay lại
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Space>
                                                <Button type="primary" danger onClick={handleReject}
                                                        disabled={workshopData?.statusBrowse !== "PENDING"}>
                                                    Từ chối
                                                </Button>
                                                <Button type="primary" onClick={handleApproved}
                                                        disabled={workshopData?.statusBrowse !== "PENDING"}>
                                                    Duyệt
                                                </Button>
                                            </Space>
                                        </Col>
                                    </Row>

                                </Card>
                            </Col>
                            <Col span={24} md={8}>
                                {/* Additional Info Card */}
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Card bordered={false}>
                                            <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>Thông
                                                tin trường học</Divider>
                                            <Row gutter={[16, 16]}>
                                                <Col span={24}>

                                                </Col>
                                                <Col span={24}>

                                                </Col>
                                                <Col span={24}>

                                                </Col>
                                                <Col span={12}>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>

                                    <Col span={24}>
                                        <Card bordered={false}>
                                            <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>Thông
                                                tin khác</Divider>
                                            <Row gutter={[16, 16]}>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong>Trạng thái:</Text>
                                                        <Text
                                                            style={{
                                                                color: workshopData?.status === "ACTIVE" ? "green" : "red",
                                                            }}
                                                        >
                                                            {workshopData?.status === "ACTIVE"
                                                                ? "Hoạt động"
                                                                : workshopData?.status === "INACTIVE"
                                                                    ? "Không hoạt động"
                                                                    : "Không xác định"}
                                                        </Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong>Trạng thái duyệt:</Text>
                                                        <Text
                                                            style={{
                                                                color:
                                                                    workshopData?.statusBrowse === "PENDING"
                                                                        ? "orange"
                                                                        : workshopData?.statusBrowse === "APPROVED"
                                                                            ? "green"
                                                                            : "red",
                                                            }}
                                                        >
                                                            {workshopData?.statusBrowse === "PENDING"
                                                                ? "Chờ duyệt"
                                                                : workshopData?.statusBrowse === "APPROVED"
                                                                    ? "Đã duyệt"
                                                                    : "Bị từ chối"}
                                                        </Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong>Người tạo:</Text>
                                                        <Text>{workshopData?.createdBy}</Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong style={{color: "#722ed1"}}>
                                                            <ClockCircleOutlined
                                                                style={{color: "#722ed1", marginRight: "8px"}}/>
                                                            Thời gian tạo:
                                                        </Text>
                                                        <Text>
                                                            {formatDate(workshopData?.createdAt)}
                                                        </Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong>Người cập nhật:</Text>
                                                        <Text>{workshopData?.updatedBy}</Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong style={{color: "#722ed1"}}>
                                                            <ClockCircleOutlined
                                                                style={{color: "#722ed1", marginRight: "8px"}}/>
                                                            Thời gian cập nhật:
                                                        </Text>
                                                        <Text>{formatDate(workshopData?.updatedAt)}
                                                        </Text>
                                                    </Space>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <RejectModal
                open={isRejectModalVisible}
                onClose={closeModalReject}
                handleReject={handleConfirmReject}
            ></RejectModal>
        </section>
    );
};

export default AdminWorkshopDetail;
