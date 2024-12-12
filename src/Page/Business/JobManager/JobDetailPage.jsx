import React, {useEffect} from "react";
import {Button, Card, Col, Divider, Row, Space, Typography} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {get_job_detail} from "../../../Redux/actions/JobThunk";
import {ClockCircleOutlined, DollarOutlined,} from "@ant-design/icons";

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

    if (!jobData) {
        return <div>Không tìm thấy công việc.</div>;
    }

    const formatSalary = (salary) => {
        if (!salary) return "Không xác định";
        return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Không xác định";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);
    };

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div style={{padding: "20px", maxWidth: "1000px", margin: "0 auto"}}>
                        <Card bordered={false}>
                            <Title level={2} style={{textAlign: "center"}}>Chi tiết công việc</Title>
                            <Divider/>

                            <Row gutter={[16, 16]}>
                                {/* Phần thông tin cơ bản */}
                                <Col span={12}>
                                    <Space direction="vertical" size={8}>
                                        <Text strong style={{color: "#096dd9"}}>Tiêu đề:</Text>
                                        <Text>{jobData.title}</Text>
                                    </Space>
                                </Col>
                                <Col span={12}>
                                    <Space direction="vertical" size={8}>
                                        <Text strong>Ngày hết hạn:</Text>
                                        <Text>
                                            <ClockCircleOutlined/> {formatDate(jobData.expireDate)}
                                        </Text>
                                    </Space>
                                </Col>

                                <Col span={12}>
                                    <Space direction="vertical" size={8}>
                                        <Text strong>Trình độ:</Text>
                                        <Text>{jobData.level}</Text>
                                    </Space>
                                </Col>
                                <Col span={12}>
                                    <Space direction="vertical" size={8}>
                                        <Text strong>Mức lương:</Text>
                                        <Text>
                                            <DollarOutlined/> {formatSalary(jobData.salary)}
                                        </Text>
                                    </Space>
                                </Col>

                                {/* Nội dung công việc */}
                                <Col span={24}>
                                    <Divider orientation="left">Nội dung công việc</Divider>
                                    <Space direction="vertical" size={16} style={{width: "100%"}}>
                                        <Text strong>Chi tiết công việc:</Text>
                                        <div style={{whiteSpace: 'pre-wrap'}}>{jobData.jobDescription}</div>

                                        <Text strong>Yêu cầu:</Text>
                                        <div style={{whiteSpace: 'pre-wrap'}}>{jobData.requirement}</div>

                                        <Text strong>Quyền lợi:</Text>
                                        <div style={{whiteSpace: 'pre-wrap'}}>{jobData.benefit}</div>
                                    </Space>
                                </Col>

                                {/* Thông tin bổ sung */}
                                <Divider orientation="left">Thông tin khác</Divider>
                                <Col span={12}>
                                    <Space direction="vertical" size={8}>
                                        <Text strong>Thời gian làm việc:</Text>
                                        <Text>{jobData.workingTime}</Text>
                                    </Space>
                                </Col>
                                <Col span={12}>
                                    <Space direction="vertical" size={8}>
                                        <Text strong>Ngày tạo:</Text>
                                        <Text>
                                            <ClockCircleOutlined/> {formatDate(jobData.createAt)}
                                        </Text>
                                    </Space>
                                </Col>
                                <Col span={12}>
                                    <Space direction="vertical" size={8}>
                                        <Text strong>Trạng thái:</Text>
                                        <Text
                                            style={{
                                                color: jobData.status === "ACTIVE" ? "green" : "orange",
                                            }}
                                        >
                                            {jobData.status === "ACTIVE"
                                                ? "Hoạt động"
                                                : jobData.status === "INACTIVE"
                                                    ? "Tạm ngưng"
                                                    : "Bị từ chối"}
                                        </Text>
                                    </Space>
                                </Col>
                                <Col span={12}>
                                    <Space direction="vertical" size={8}>
                                        <Text strong>Người tạo:</Text>
                                        <Text>{jobData.createBy}</Text>
                                    </Space>
                                </Col>
                                <Col span={12}>
                                    <Space direction="vertical" size={8}>
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
                            </Row>

                            <Divider/>
                            <Row justify="space-between">
                                <Col>
                                    <Button type="default" danger onClick={() => navigate("/job-manager")}>Quay
                                        lại</Button>
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobDetailPage;
