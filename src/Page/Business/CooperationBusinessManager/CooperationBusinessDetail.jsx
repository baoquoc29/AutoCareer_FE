import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Card, Col, Divider, Row, Space, Typography} from "antd";
import {
    CalendarOutlined,
    EnvironmentOutlined,
    HomeOutlined,
    LinkOutlined,
    MailOutlined,
    NumberOutlined,
    PhoneOutlined
} from "@ant-design/icons";
import {get_university_details} from "../../../Redux/actions/UniversityThunk";
import {get_all_sections} from "../../../Redux/actions/SectionThunk";
import {get_all_majors} from "../../../Redux/actions/MajorThunk";

const {Text, Title} = Typography;


const CooperationBusinessDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const universityId = localStorage.getItem("universityId");
    const universityDetail = useSelector((state) => state.UniversityReducer.universityDetails); // assuming job data is stored here
    const sections = useSelector(state => state.SectionReducer.sections);
    const majors = useSelector(state => state.MajorReducer.majors);

    useEffect(() => {
        dispatch(get_university_details(universityId));
        console.log(universityDetail)
    }, [dispatch, universityId]);

    useEffect(() => {
        dispatch(get_all_sections());
        dispatch(get_all_majors());
    }, [dispatch]);
    const handleRejectClick = () => {

    }

    const handleApproveClick = () => {

    }

    if (!universityDetail) {
        return (
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
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
                    <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={16}>
                                <Card bordered={false}>
                                    <div className="university-header">
                                        <img
                                            src={`${GET_IMAGE_URI}${universityDetail.logoImageId}`}
                                            alt="Logo truong hoc"
                                            className="university-logo"
                                            style={{
                                                maxWidth: "100px",
                                                maxHeight: "100px",
                                                marginRight: "20px",
                                                borderRadius: "8px"
                                            }}
                                        />
                                        <Title level={2} className="university-title">{universityDetail.name}</Title>
                                    </div>
                                    <Text>{universityDetail?.description}</Text>
                                    <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>Thông
                                        tin
                                        chung</Divider>
                                    <Space direction="vertical" size={4} style={{width: "100%"}}>
                                        <Row gutter={[16, 16]}>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <HomeOutlined style={{marginRight: "8px"}}/>
                                                        Tên doanh nghiệp:
                                                    </Text>
                                                    <Text>{universityDetail.name}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <LinkOutlined style={{marginRight: "8px"}}/>
                                                        Website:
                                                    </Text>
                                                    <Text>
                                                        <NavLink
                                                            to={universityDetail.website}>{universityDetail.website}</NavLink>
                                                    </Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <CalendarOutlined style={{marginRight: "8px"}}/>
                                                        Năm thành lập:
                                                    </Text>
                                                    <Text>{universityDetail.foundedYear}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <MailOutlined style={{marginRight: "8px"}}/>
                                                        Email:
                                                    </Text>
                                                    <Text>{universityDetail.email}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <PhoneOutlined style={{marginRight: "8px"}}/>
                                                        Điện thoại:
                                                    </Text>
                                                    <Text>{universityDetail.phone}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <EnvironmentOutlined style={{marginRight: "8px"}}/>
                                                        Địa chỉ:
                                                    </Text>
                                                    <Text>
                                                        {universityDetail.location?.province?.fullName},
                                                        {universityDetail.location?.district?.fullName},
                                                        {universityDetail.location?.ward?.fullName}.
                                                    </Text>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                    <Divider/>
                                    <Row justify="space-between" style={{marginTop: "20px"}}>
                                        <Button
                                            type="default"
                                            danger
                                            onClick={() => navigate(-1)} // Quay lại trang trước
                                        >
                                            Quay lại
                                        </Button>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={24} md={8}>
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Card bordered={false} style={{ marginBottom: '16px' }}>                                            <Divider orientation="left"
                                                     className="divider-title">Khoa </Divider>
                                            {sections.map((item, index) => (
                                                <span className="badge badge-pill badge-blue mt-2 mx-2"
                                                      key={index}>{item.name}</span>
                                            ))}
                                        </Card>
                                        <Card bordered={false}>
                                            <Divider orientation="left" className="divider-title">Chuyên
                                                ngành </Divider>
                                            {majors.map((item, index) => (
                                                <span className="badge badge-pill badge-blue mt-2 mx-2"
                                                      key={index}>{item.name}</span>
                                            ))}
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

export default CooperationBusinessDetail;