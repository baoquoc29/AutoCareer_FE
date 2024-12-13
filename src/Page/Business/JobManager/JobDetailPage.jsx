import React, {useEffect} from "react";
import {Button, Card, Col, Divider, Row, Space, Typography} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {get_job_detail} from "../../../Redux/actions/JobThunk";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    ExclamationCircleOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import DisplayRichText from "../../../Component/TextEditDisplay/DisplayRichText";

const {Text, Title} = Typography;

const JobDetailPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const jobData = useSelector((state) => state.JobReducer.selectedJobDetail); // assuming job data is stored here
    const {jobId} = location.state || {}; // Lấy jobId từ state
    const navigate = useNavigate();

    const userLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
    const username = userLogin?.username; // Lấy username từ đối tượng USER_LOGIN

    useEffect(() => {
        dispatch(get_job_detail(jobId)); // Lấy chi tiết công việc
    }, [dispatch, jobId]);

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
                                <Card bordered={false}>
                                    <Title level={2} style={{textAlign: "center"}}>{jobData.title}</Title>

                                    {/* Nội dung công việc */}

                                    <Space direction="vertical" size={4} style={{width: "100%"}}>
                                        <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>Chi tiết
                                            tuyển dụng</Divider>
                                        <Text strong style={{color: "#ffafcc"}}>
                                            <ExclamationCircleOutlined  style={{color: "#ffafcc", marginRight: "8px"}}/>
                                            Mô tả công việc:
                                        </Text>
                                        <div style={{whiteSpace: "pre-wrap"}}>
                                            <DisplayRichText content={jobData.jobDescription}/>
                                        </div>

                                        <Text strong style={{color: "#52c41a"}}>
                                            <QuestionCircleOutlined style={{color: "#52c41a", marginRight: "8px"}}/>
                                            Yêu cầu:
                                        </Text>
                                        <div style={{whiteSpace: "pre-wrap"}}>
                                            <DisplayRichText content={jobData.requirement}/>
                                        </div>

                                        <Text strong style={{color: "#1890ff"}}>
                                            <CheckCircleOutlined style={{color: "#1890ff", marginRight: "8px"}}/>
                                            Quyền lợi:
                                        </Text>
                                        <div style={{whiteSpace: "pre-wrap"}}>
                                            <DisplayRichText content={jobData.benefit}/>
                                        </div>

                                        {/* Thời gian làm việc */}
                                        <Text strong style={{color: "#722ed1"}}>
                                            <ClockCircleOutlined style={{color: "#722ed1", marginRight: "8px"}}/>
                                            Thời gian làm việc:
                                        </Text>
                                        <Text>
                                            {jobData.workingTime ? jobData.workingTime : "Không xác định"}
                                        </Text>
                                    </Space>

                                    <Divider/>
                                    <Row justify="space-between">
                                        <Col>
                                            <Button type="default" danger onClick={() => navigate(-1)}>Quay lại</Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                type="primary"
                                                onClick={() => navigate("/job-update", {state: {jobId}})}
                                                disabled={username !== jobData.createBy}
                                            >
                                                Chỉnh sửa công việc
                                            </Button>
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
                                                tin cơ bản</Divider>
                                            <Row gutter={[16, 16]}>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong style={{color: "#096dd9"}}>Tiêu đề:</Text>
                                                        <Text>{jobData.title}</Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong style={{color: "#ff70a6"}}>
                                                            <DollarOutlined style={{color: "#ff70a6", marginRight: "8px"}}/>
                                                            Mức lương:
                                                        </Text>
                                                        <Text>
                                                            {formatSalary(jobData.salary)}
                                                        </Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong>Kinh nghiệm:</Text>
                                                        <Text>{jobData.level}</Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong style={{color: "#722ed1"}}>
                                                            <ClockCircleOutlined style={{color: "#722ed1", marginRight: "8px"}}/>
                                                            Ngày hết hạn:
                                                        </Text>
                                                        <Text>
                                                            {formatDate(jobData.expireDate)}
                                                        </Text>
                                                    </Space>
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
                                                                color: jobData.status === "ACTIVE" ? "green" : "red",
                                                            }}
                                                        >
                                                            {jobData.status === "ACTIVE"
                                                                ? "Hoạt động"
                                                                : jobData.status === "INACTIVE"
                                                                    ? "Không hoạt động"
                                                                    : "Bị từ chối"}
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
                                                            <ClockCircleOutlined style={{color: "#722ed1", marginRight: "8px"}}/>
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
                                                            <ClockCircleOutlined style={{color: "#722ed1", marginRight: "8px"}}/>
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
        </section>
    );
};

export default JobDetailPage;
