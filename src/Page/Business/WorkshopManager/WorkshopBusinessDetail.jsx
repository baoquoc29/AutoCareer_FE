import React  from "react";
import {Card, Typography, Button, Row, Col, Space, Divider} from "antd";
import {
    ClockCircleOutlined, EnvironmentOutlined,
    ExclamationCircleOutlined, LinkOutlined,
    MailOutlined,
    PhoneOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";
import DisplayRichText from "../../../Component/TextEditDisplay/DisplayRichText";
import {useLocation, useNavigate} from "react-router-dom";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";

const {Text, Title} = Typography;


const WorkshopBusinessDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const workshopData = location.state;
    console.log(workshopData);


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
                                            {workshopData?.startDate}
                                        </Text>
                                        <Text strong style={{color: "#722ed1"}}>
                                            <ClockCircleOutlined
                                                style={{color: "#722ed1", marginRight: "8px"}}/>
                                            Ngày kết thúc:
                                        </Text>
                                        <Text>
                                            {workshopData?.endDate}
                                        </Text>
                                        <Text strong style={{color: "#722ed1"}}>
                                            <ClockCircleOutlined
                                                style={{color: "#722ed1", marginRight: "8px"}}/>
                                            Ngày hết hạn:
                                        </Text>
                                        <Text>
                                            {workshopData?.expireDate}
                                        </Text>
                                        <Text strong style={{color: "#52c41a"}}>
                                            <QuestionCircleOutlined style={{color: "#52c41a", marginRight: "8px"}}/>
                                            Địa chỉ:
                                        </Text>
                                        <span style={{whiteSpace: "pre-wrap"}}>
                                            <DisplayRichText
                                                content={`${workshopData?.address}, ${workshopData?.ward}, ${workshopData?.district}, ${workshopData?.province}`}/>
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
                                            {workshopData ? (
                                                <Row gutter={[16, 16]}>
                                                    <Col span={24}>
                                                        <Row>
                                                            <Col>
                                                                <img
                                                                    src={workshopData.logoImageUniversityId ? `${GET_IMAGE_URI}${workshopData.logoImageUniversityId}` : "placeholder-avatar.jpg"}
                                                                    alt="Logo trờng học"
                                                                    className="img-fluid logo-image rounded"
                                                                    style={{
                                                                        width: "80px",
                                                                        height: "80px",
                                                                        objectFit: "cover",
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col style={{marginLeft: "10px"}}>
                                                                <Text
                                                                    strong> {workshopData.nameUniversity || "Không xác định"}</Text>
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
                                                        <Text> {workshopData.email || "Không xác định"}</Text>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Text strong>
                                                            <PhoneOutlined style={{
                                                                color: "blue",
                                                                marginRight: "8px"
                                                            }}/>
                                                            Số điện thoại:</Text>
                                                        <Text> {workshopData.phoneNumber || "Không xác định"}</Text>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Text strong>
                                                            <LinkOutlined style={{
                                                                color: "blue",
                                                                marginRight: "8px"
                                                            }}/>
                                                            Website:</Text>
                                                        <Text> {workshopData.website || "Không xác định"}</Text>
                                                    </Col>
                                                </Row>
                                            ) : (
                                                <Text>Không có thông tin doanh nghiệp.</Text>
                                            )}
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
                                                        <Text strong style={{color: "#722ed1"}}>
                                                            <ClockCircleOutlined
                                                                style={{color: "#722ed1", marginRight: "8px"}}/>
                                                            Thời gian tạo:
                                                        </Text>
                                                        <Text>
                                                            {workshopData?.createdAt}
                                                        </Text>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space direction="vertical" size={4}>
                                                        <Text strong style={{color: "#722ed1"}}>
                                                            <ClockCircleOutlined
                                                                style={{color: "#722ed1", marginRight: "8px"}}/>
                                                            Thời gian cập nhật:
                                                        </Text>
                                                        <Text>{workshopData?.updatedAt}
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


export default WorkshopBusinessDetail;
