import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_IMAGE_URI } from "../../../Utils/Setting/Config";
import { get_all_industry_business_no_pag } from "../../../Redux/actions/IndustryThunk";
import { useNavigate } from "react-router-dom";
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


const ProfileBusiness = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const industry = useSelector(state => state.IndustryReducer.industriesNoPag);
    const business = useSelector(state => state.UserReducer.userData?.business);
    const businessDetail = useSelector(state => state.BusinessReducer.business);

    useEffect(() => {
        if (business?.id) {
            dispatch(get_all_industry_business_no_pag());
            dispatch(get_business_by_id(business.id));
        }
    }, [dispatch, business]);


    const handleEditClick = () => {
        if (business?.id) {
            navigate(`/profile-business-edit`, { state: { businessId: business.id }});
        }
    };


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
                                            src={`${GET_IMAGE_URI}${businessDetail["businessImageId"]}`}
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
                                    <Row justify="end">
                                        <Button type="primary" onClick={handleEditClick}>Chỉnh sửa</Button>
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

export default ProfileBusiness;