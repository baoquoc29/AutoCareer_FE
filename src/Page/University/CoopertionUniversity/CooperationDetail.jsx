import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_IMAGE_URI } from "../../../Utils/Setting/Config";
import { get_all_industry_no_pag } from "../../../Redux/actions/IndustryThunk";
import {useLocation, useNavigate} from "react-router-dom";
import { get_business_by_id } from "../../../Redux/actions/BusinessThunk";
import { Button, Card, Col, Divider, Row, Space, Typography } from "antd";
import {
    MailOutlined,
    PhoneOutlined,
    LinkOutlined,
    CalendarOutlined,
    HomeOutlined,
    NumberOutlined,
    EnvironmentOutlined
} from "@ant-design/icons";

const { Text, Title } = Typography;


const CooperationDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { cooperation } = location.state;
    const industry = useSelector(state => state.IndustryReducer.industriesNoPag);
    const businessDetail = useSelector(state => state.BusinessReducer.business);

    useEffect(() => {
        if (cooperation.business?.id) {
            dispatch(get_all_industry_no_pag());
            dispatch(get_business_by_id(cooperation.business?.id));
        }
    }, [dispatch, cooperation]);


    const handleEditClick = () => {
        if (cooperation.business?.id) {
            navigate(`/profile-business-edit`, { state: { businessId: cooperation.business?.id }});
        }
    };

    const handleRejectClick= ()=>{

    }

    const handleApproveClick=()=>{

    }

    if (!businessDetail) {
        return (
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div style={{ padding: "20px", maxWidth: "2000px", margin: "0 auto" }}>
                            <div>Loading...</div>
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
                    <div style={{ padding: "20px", maxWidth: "2000px", margin: "0 auto" }}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={16}>
                                <Card bordered={false}>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                                        <img
                                            src={
                                                businessDetail?.businessImageId
                                                    ?`${GET_IMAGE_URI}${businessDetail["businessImageId"]}`
                                                    : "placeholder-avatar.jpg"
                                            }
                                            alt="Logo Doanh Nghiệp"
                                            style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "20px", borderRadius: "8px" }}
                                        />
                                        <Title level={2} style={{ margin: 0 }}>{businessDetail.name}</Title>
                                    </div>
                                    <Text>{businessDetail.description}</Text>
                                    <Divider orientation="left" style={{ fontSize: "18px", color: "#096dd9" }}>Thông tin chung</Divider>
                                    <Space direction="vertical" size={4} style={{ width: "100%" }}>
                                        <Row gutter={[16, 16]}>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{ color: "#096dd9" }}>
                                                        <HomeOutlined style={{ marginRight: "8px" }} />
                                                        Tên doanh nghiệp:
                                                    </Text>
                                                    <Text>{businessDetail.name}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{ color: "#096dd9" }}>
                                                        <LinkOutlined style={{ marginRight: "8px" }} />
                                                        Website:
                                                    </Text>
                                                    <Text>
                                                        <a href={businessDetail["website"]} target="_blank" rel="noopener noreferrer">
                                                            {businessDetail["website"]}
                                                        </a>
                                                    </Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{ color: "#096dd9" }}>
                                                        <CalendarOutlined style={{ marginRight: "8px" }} />
                                                        Năm thành lập:
                                                    </Text>
                                                    <Text>{businessDetail["foundYear"]}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{ color: "#096dd9" }}>
                                                        <NumberOutlined style={{ marginRight: "8px" }} />
                                                        Mã số thuế:
                                                    </Text>
                                                    <Text>{businessDetail["taxCode"]}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{ color: "#096dd9" }}>
                                                        <NumberOutlined style={{ marginRight: "8px" }} />
                                                        Quy mô doanh nghiệp:
                                                    </Text>
                                                    <Text>{businessDetail["companySize"]}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{ color: "#096dd9" }}>
                                                        <EnvironmentOutlined style={{ marginRight: "8px" }} />
                                                        Địa chỉ:
                                                    </Text>
                                                    <Text>
                                                        {businessDetail.location?.province.fullName},
                                                        {businessDetail.location?.district.fullName},
                                                        {businessDetail.location?.ward.fullName},
                                                        {businessDetail.location?.description}
                                                    </Text>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                    <Divider />
                                    <Row justify="space-between" style={{ marginTop: "20px" }}>
                                        <Button
                                            type="default"
                                            danger
                                            onClick={() => navigate(-1)} // Quay lại trang trước
                                        >
                                            Quay lại
                                        </Button>
                                        <div>
                                            <Button
                                                type="primary"
                                                onClick={handleRejectClick}
                                                style={{
                                                    backgroundColor: "#ff4d4f",  // Màu đỏ
                                                    borderColor: "#ff4d4f",
                                                    color: "white",
                                                    marginRight: "10px",  // Thêm khoảng cách giữa 2 nút
                                                }}
                                            >
                                                Từ chối
                                            </Button>
                                            <Button
                                                type="primary"
                                                onClick={handleApproveClick}
                                                style={{
                                                    backgroundColor: 'rgb(31 211 72)',  // Màu xanh lá
                                                    borderColor: 'rgb(31 211 72)',
                                                    color: "white",
                                                }}
                                            >
                                                Chấp nhận
                                            </Button>
                                        </div>

                                    </Row>
                                </Card>
                            </Col>
                            <Col span={24} md={8}>
                                <Row gutter={[16,16]}>
                                    <Col span={24}>
                                        <Card bordered={false}>
                                            <Divider orientation="left" style={{ fontSize: "18px", color: "#096dd9" }}>Liên hệ</Divider>
                                            <Space direction="vertical" size={4} style={{ width: "100%" }}>
                                                <Row gutter={[16, 16]}>
                                                    <Col span={24}>
                                                        <Space direction="vertical" size={4}>
                                                            <Text strong style={{ color: "#096dd9" }}>
                                                                <MailOutlined style={{ marginRight: "8px" }} />
                                                                Email:
                                                            </Text>
                                                            <Text>{businessDetail?.email}</Text>
                                                        </Space>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Space direction="vertical" size={4}>
                                                            <Text strong style={{ color: "#096dd9" }}>
                                                                <PhoneOutlined style={{ marginRight: "8px" }} />
                                                                Điện thoại:
                                                            </Text>
                                                            <Text>{businessDetail?.phone}</Text>
                                                        </Space>
                                                    </Col>
                                                </Row>
                                            </Space>
                                        </Card>
                                    </Col>
                                    <Col span={24}>
                                        <Card bordered={false}>
                                            <Divider orientation="left" style={{ fontSize: "18px", color: "#096dd9" }}>Chuyên ngành kinh doanh</Divider>
                                            <div className="d-flex flex-wrap">
                                                {industry.map((item, index) => (
                                                    <span className="badge badge-pill badge-blue mt-2 mx-2"
                                                          key={index}>{item.industryName}</span>
                                                ))}
                                            </div>
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

export default CooperationDetail;