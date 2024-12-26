import React, {useState} from "react";
import {Button, Modal, Space, Row, Col, Card, Divider, Typography} from "antd";

import {
    CheckCircleOutlined,
    ClockCircleOutlined, DollarOutlined, EnvironmentOutlined,
    ExclamationCircleOutlined, FieldTimeOutlined, LinkOutlined, MailOutlined, PhoneOutlined,
    QuestionCircleOutlined, SolutionOutlined,
} from "@ant-design/icons";
import "./JobDetail.css";
import DisplayRichText from "../../../Component/TextEditDisplay/DisplayRichText";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {get_job_detail} from "../../../Redux/actions/JobThunk";
import {approved_job, rejected_job} from "../../../Redux/actions/AdminJobThunk";
import RejectModal from "../../Modal/RejectModal";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";

const {Text, Title} = Typography;

const AdminJobDetail = () => {
    const dispatch = useDispatch();
    const jobData = useSelector((state) => state.JobReducer.selectedJobDetail); // assuming job data is stored here
    const navigate = useNavigate();
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    // const userLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
    // const username = userLogin?.username; // Lấy username từ đối tượng USER_LOGIN

    const formatSalary = (salary) => {
        if (!salary) return "Không xác định";
        return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Không xác định";
        const date = new Date(dateString);
        const time = new Intl.DateTimeFormat("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(date);

        const dateFormatted = new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);

        return `${time} - ${dateFormatted}`;
    };


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
            content: `Bạn có chắc chắn muốn từ chối tài khoản doanh nghiệp "${jobData?.title}"?`,
            okText: 'Từ chối',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Rejected business: ${jobData.title}`);
                let req = {id: jobData.jobId, message: message};
                dispatch(rejected_job(req)).then(() => {
                    dispatch(get_job_detail(jobData.jobId));
                })
                setIsRejectModalVisible(false); // Đóng modal
            },
        });
    };
    const handleApproved = () => {
        Modal.confirm({
            title: 'Xác nhận phê duyệt',
            content: `Bạn có chắc chắn muốn phê duyệt tin tuyển dụng "${jobData.title}"?`,
            okText: 'Phê duyệt',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Approved job: ${jobData.title}`);
                dispatch(approved_job({id: jobData.jobId})).then(() => {
                    dispatch(get_job_detail(jobData.jobId));
                })
            },
        });
    }


    if (!jobData) {
        return (
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
                            <div>Không tìm thấy công việc.</div>
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
                            {/* Job Content Card */}
                            <Col span={24} md={16}>
                                <Card bordered={false} className={"container"}>
                                    <Title level={2} style={{textAlign: "center"}}>{jobData.title}</Title>
                                    <Divider style={{marginTop: 1}}/>

                                    <Space direction="vertical" size={4} style={{width: "100%"}}>
                                        <Row gutter={[16, 16]}>
                                            <Col span={24}>
                                                <Text strong>
                                                    <DollarOutlined
                                                        style={{
                                                            color: "#ff70a6",
                                                            marginRight: "8px"
                                                        }}/>
                                                    Mức lương:
                                                </Text>
                                                <Text> {formatSalary(jobData.salary)}</Text>
                                            </Col>
                                            <Col span={24}>
                                                <Text strong>
                                                    <SolutionOutlined style={{
                                                        color: "#223eef",
                                                        marginRight: "8px"
                                                    }}/>
                                                    Kinh nghiệm:</Text>
                                                <Text> {jobData.level}</Text>
                                            </Col>
                                            <Col span={24}>
                                                <Text strong>
                                                    <FieldTimeOutlined
                                                        style={{
                                                            color: "#722ed1",
                                                            marginRight: "8px"
                                                        }}/>
                                                    Thời gian làm việc:
                                                </Text>
                                                <Text> {jobData.workingTime ? jobData.workingTime : "Không xác định"}</Text>
                                            </Col>
                                            <Col span={24}>
                                                <Text strong>
                                                    <ClockCircleOutlined
                                                        style={{
                                                            color: "#722ed1",
                                                            marginRight: "8px"
                                                        }}/>
                                                    Ngày hết hạn:
                                                </Text> {formatDate(jobData.expireDate) || "N/A"}
                                            </Col>
                                            <Col span={24}>
                                                <Text strong style={{color: "#ffafcc"}}>
                                                    <ExclamationCircleOutlined
                                                        style={{
                                                            color: "#ffafcc",
                                                            marginRight: "8px"
                                                        }}/>
                                                    Mô tả công việc:
                                                </Text>
                                                <div style={{whiteSpace: "pre-wrap"}}>
                                                    <DisplayRichText content={jobData.jobDescription}/>
                                                </div>
                                            </Col>
                                            <Col span={24}>
                                                <Text strong>
                                                    <QuestionCircleOutlined
                                                        style={{
                                                            color: "#52c41a",
                                                            marginRight: "8px"
                                                        }}/>
                                                    Yêu cầu ứng viên:
                                                </Text>
                                                <div style={{whiteSpace: "pre-wrap"}}>
                                                    <DisplayRichText content={jobData.requirement}/>
                                                </div>
                                            </Col>
                                            <Col span={24}>
                                                <Text strong>
                                                    <CheckCircleOutlined
                                                        style={{
                                                            color: "#1890ff",
                                                            marginRight: "8px"
                                                        }}/>
                                                    Quyền lợi:
                                                </Text>
                                                <div style={{whiteSpace: "pre-wrap"}}>
                                                    <DisplayRichText content={jobData.benefit}/>
                                                </div>
                                            </Col>
                                        </Row>
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
                                                        disabled={jobData.statusBrowse !== "PENDING"}>
                                                    Từ chối
                                                </Button>
                                                <Button type="primary" onClick={() => handleApproved()}
                                                        disabled={jobData.statusBrowse !== "PENDING"}>
                                                    Duyệt
                                                </Button>
                                            </Space>
                                        </Col>
                                    </Row>

                                </Card>
                            </Col>
                            <Col span={24} md={8}>
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Card bordered={false} style={{padding: "10px"}}>
                                            <Divider orientation="left"
                                                     style={{fontSize: "18px", color: "#096dd9"}}>
                                                Thông tin doanh nghiệp
                                            </Divider>
                                            {jobData.business ? (
                                                <Row gutter={[16, 16]}>

                                                    <Col span={24}>
                                                        <Row>
                                                            <Col>
                                                                <img
                                                                    src={jobData.business.businessImageId ? `${GET_IMAGE_URI}${jobData.business.businessImageId}` : "placeholder-avatar.jpg"}
                                                                    alt="Logo Doanh Nghiệp"
                                                                    className="img-fluid logo-image rounded"
                                                                    style={{width: "80px", height: "80px", objectFit: "cover",}}
                                                                />
                                                            </Col>
                                                            <Col style={{marginLeft: "10px"}}>
                                                                <Text
                                                                    strong> {jobData.business.name || "Không xác định"}</Text>
                                                            </Col>
                                                        </Row>
                                                    </Col>

                                                    <Col span={24}>
                                                        <Text strong>
                                                            <MailOutlined style={{
                                                                color: "blue",
                                                                marginRight: "8px"
                                                            }}/>
                                                            Email:</Text>
                                                        <Text> {jobData.business.email || "Không xác định"}</Text>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Text strong>
                                                            <PhoneOutlined style={{
                                                                color: "blue",
                                                                marginRight: "8px"
                                                            }}/>
                                                            Số điện thoại:</Text>
                                                        <Text> {jobData.business.phone || "Không xác định"}</Text>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Text strong>
                                                            <LinkOutlined style={{
                                                                color: "blue",
                                                                marginRight: "8px"
                                                            }}/>
                                                            Website:</Text>
                                                        <Text> {jobData.business.website || "Không xác định"}</Text>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Text strong>
                                                            <EnvironmentOutlined style={{
                                                                color: "blue",
                                                                marginRight: "8px"
                                                            }}/>
                                                            Địa chỉ:</Text>
                                                        <Text> {jobData.business.location || "Không xác định"}</Text>
                                                    </Col>

                                                </Row>
                                            ) : (
                                                <Text>Không có thông tin doanh nghiệp.</Text>
                                            )}
                                        </Card>
                                    </Col>

                                    <Col span={24}>
                                        <Card bordered={false} style={{padding: "10px"}}>
                                            <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>
                                                Thông tin khác
                                            </Divider>
                                            <Row gutter={[16, 16]}>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong>Trạng thái:</Text>
                                                        <Text
                                                            style={{
                                                                color: jobData.status === "ACTIVE" ? "green" : "red",
                                                            }}
                                                        >
                                                            {jobData.status === "ACTIVE"
                                                                ? "Hoạt động"
                                                                : jobData.status === "INACTIVE"
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
                                                                    jobData.statusBrowse === "PENDING"
                                                                        ? "orange"
                                                                        : jobData.statusBrowse === "APPROVED"
                                                                            ? "green"
                                                                            : "red",
                                                            }}
                                                        >
                                                            {jobData.statusBrowse === "PENDING"
                                                                ? "Chờ duyệt"
                                                                : jobData.statusBrowse === "APPROVED"
                                                                    ? "Đã duyệt"
                                                                    : "Bị từ chối"}
                                                        </Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong>Người tạo:</Text>
                                                        <Text>{jobData.createBy}</Text>
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
                                                            {formatDate(jobData.createAt)}
                                                        </Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong>Người cập nhật:</Text>
                                                        <Text>{jobData.updateBy}</Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong style={{color: "#722ed1"}}>
                                                            <ClockCircleOutlined
                                                                style={{color: "#722ed1", marginRight: "8px"}}/>
                                                            Thời gian cập nhật:
                                                        </Text>
                                                        <Text>{formatDate(jobData.updateAt)}
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

export default AdminJobDetail;
