import React, {useState} from "react";
import {Button, Modal, Space, Input, Image, Tag, Row, Col, Card, Divider, Typography} from "antd";

import {
    CheckCircleOutlined,
    ClockCircleOutlined, ContactsOutlined, DollarOutlined, EditOutlined,
    ExclamationCircleOutlined,
    QuestionCircleOutlined, UserAddOutlined, UserOutlined
} from "@ant-design/icons";
import "./JobDetail.css";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import DisplayRichText from "../../../Component/TextEditDisplay/DisplayRichText";

const {Text, Title} = Typography;

const JobDetail = ({job, onApprove, onReject, onClose}) => {

    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [message, setMessage] = useState(""); // Trạng thái lưu lý do từ chối

    const handleReject = () => {
        setIsRejectModalVisible(true); // Hiển thị modal từ chối
    };

    const handleConfirmReject = () => {
        Modal.confirm({
            title: 'Xác nhận từ chối',
            content: `Bạn có chắc chắn muốn từ chối tin tuyển dụng "${job.name}"?`,
            okText: 'Từ chối',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Rejected job: ${job.name}`);
                let req = {id: job.key, message: message};
                onReject(req); // Gửi lý do từ chối
                setMessage(""); // Reset lý do từ chối
                setIsRejectModalVisible(false); // Đóng modal
            },
        });
    };
    const handleApproved = () => {
        Modal.confirm({
            title: 'Xác nhận phê duyệt',
            content: `Bạn có chắc chắn muốn phê duyệt tin tuyển dụng "${job.name}"?`,
            okText: 'Phê duyệt',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Approved job: ${job.name}`);
                onApprove({id: job.key}); // Gửi lý do từ chối
            },
        });
    }
    const formatSalary = (salary) => {
        if (!salary) return "Không xác định";
        return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    };


    const formatDate = (dateString) => {
        if (!dateString) return "Không xác định"; // Nếu không có giá trị đầu vào

        const date = new Date(dateString);

        if (isNaN(date.getTime())) { // Kiểm tra xem ngày có hợp lệ không
            console.warn("Invalid date value:", dateString);
            return "Không xác định";
        }

        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };

        return new Intl.DateTimeFormat('vi-VN', options).format(date);
    };


    if (!job) {
        return (
            <div style={{textAlign: "center", padding: "20px"}}>
                <p>Chọn tin tuyển dụng để xem chi tiết.</p>
            </div>
        );
    }

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <Row gutter={[16, 16]}>
                        {/* Job Content Card */}
                        <Col span={24}>
                            <Card bordered={false}>
                                <Title level={2} style={{textAlign: "center"}}>{job.title}
                                    <Tag
                                        color={job.state === "APPROVED" ? "green" : job.state === "REJECTED" ? "red" : "orange"}>
                                        {job.state === "APPROVED" ? "Đã phê duyệt" : job.state === "REJECTED" ? "Đã từ chối" : "Đang chờ duyệt"}
                                    </Tag>
                                </Title>

                                {/* Nội dung công việc */}
                                <Space direction="vertical" size={4} style={{width: "100%"}}>
                                    <Col span={24}>
                                        <Text strong style={{color: "#ff70a6"}}>
                                            <DollarOutlined
                                                style={{color: "#ff70a6", marginRight: "8px"}}/>
                                            Mức lương: </Text>
                                        <Text>
                                            {formatSalary(job.salary)}
                                        </Text>
                                    </Col>
                                    <Col span={24}>
                                        <Text strong>
                                            <ContactsOutlined style={{color: "#ff70a6", marginRight: "8px"}}/>
                                            Kinh nghiệm: </Text>
                                        <Text>{job.level}</Text>
                                    </Col>
                                    <Col span={24}>
                                        <Text strong style={{color: "#722ed1"}}>
                                            <ClockCircleOutlined
                                                style={{color: "#722ed1", marginRight: "8px"}}/>
                                            Ngày hết hạn: </Text>
                                        <Text>
                                            {formatDate(job.expireDate)}
                                        </Text>
                                    </Col>
                                    <Col span={24}>
                                        <Text strong style={{color: "#722ed1"}}>
                                            <ClockCircleOutlined style={{color: "#722ed1", marginRight: "8px"}}/>
                                            Thời gian làm việc: </Text>
                                        <Text>
                                            {job.workingTime ? job.workingTime : "Không xác định"}
                                        </Text>
                                    </Col>
                                    <Col span={24}>
                                        <Text strong style={{color: "#ffafcc"}}>
                                            <ExclamationCircleOutlined
                                                style={{color: "#ffafcc", marginRight: "8px"}}/>
                                            Mô tả công việc: </Text>
                                        <div style={{whiteSpace: "pre-wrap"}}>
                                            <DisplayRichText content={job.jobDescription}/>
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <Text strong style={{color: "#52c41a"}}>
                                            <QuestionCircleOutlined style={{color: "#52c41a", marginRight: "8px"}}/>
                                            Yêu cầu: </Text>
                                        <div style={{whiteSpace: "pre-wrap"}}>
                                            <DisplayRichText content={job.requirement}/>
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <Text strong style={{color: "#1890ff"}}>
                                            <CheckCircleOutlined style={{color: "#1890ff", marginRight: "8px"}}/>
                                            Quyền lợi: </Text>
                                        <div style={{whiteSpace: "pre-wrap"}}>
                                            <DisplayRichText content={job.benefit}/>
                                        </div>
                                    </Col>

                                </Space>

                                <Divider/>

                                <Col span={24}>
                                    <Text strong style={{color: "#722ed1"}}>
                                        <ClockCircleOutlined
                                            style={{color: "#722ed1", marginRight: "8px"}}/>
                                        Thời gian tạo: </Text>
                                    <Text>
                                        {formatDate(job?.createdAt)}
                                    </Text>
                                </Col>
                                <Col span={24}>
                                    <Text strong>
                                        <UserAddOutlined style={{color: "#722ed1", marginRight: "8px"}}/>
                                        Người tạo: </Text>
                                    <Text>{job?.createdBy}</Text>
                                </Col>
                                <Col span={24}>
                                    <Text strong style={{color: "#722ed1"}}>
                                        <ClockCircleOutlined
                                            style={{color: "#722ed1", marginRight: "8px"}}/>
                                        Thời gian cập nhật: </Text>
                                    <Text>{formatDate(job?.updatedAt)}</Text>
                                </Col>
                                <Col span={24}>
                                    <Text strong> <UserOutlined style={{color: "#722ed1", marginRight: "8px"}}/>Người
                                        cập nhật: </Text>
                                    <Text>{job?.updatedBy}</Text>
                                </Col>
                            </Card>
                        </Col>
                    </Row>

                    {/* Action Buttons */}
                    <div className="text-center mt-4">
                        <Space>
                            {job.state === "PENDING" && (
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

    )
        ;
};

export default JobDetail;
