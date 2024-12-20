import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import {get_all_sections} from "../../../Redux/actions/SectionThunk";
import {get_all_majors} from "../../../Redux/actions/MajorThunk";
import {get_university_id} from "../../../Redux/actions/UniversityThunk";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Card, Col, Divider, Row, Space, Typography} from "antd";
import './style/Profile.css'
import {
    CalendarOutlined,
    EnvironmentOutlined,
    HomeOutlined,
    LinkOutlined,
    MailOutlined, PhoneOutlined
} from "@ant-design/icons";

const {Text, Title} = Typography;

const ProfileUniversity = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy danh sách khoa và ngành từ Redux store
    const sections = useSelector(state => state.SectionReducer.sections);
    const majors = useSelector(state => state.MajorReducer.majors);

    // Lấy thông tin trường đại học từ Redux store
    const university = useSelector(state => state.UserReducer.userData?.university);
    const universityDetails = useSelector(state => state.UniversityReducer.university);

    // Dispatch các action để lấy thông tin khoa và ngành
    useEffect(() => {
        dispatch(get_all_sections());
        dispatch(get_all_majors());
    }, [dispatch]);

    // Dispatch action để lấy thông tin trường đại học khi có ID
    useEffect(() => {
        if (university?.id) {
            dispatch(get_university_id(university.id));
        }
    }, [university, dispatch]);

    // Xử lý sự kiện chỉnh sửa
    const handleEditClick = () => {
        if (university?.id) {
            navigate(`/profile-university-edit`);
        }
    };

    // Kiểm tra nếu không có trường đại học
    if (!university || !universityDetails) {
        return <p>Loading...</p>;
    }
    return (
        <section className="profile-university">
            <div className="m-1 mt-1">
                <div className="content__wrap">
                    <div className="profile-university">
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={16}>
                                <Card bordered={false}>
                                    <div className="university-header">
                                        <img
                                            src={`${GET_IMAGE_URI}${universityDetails.logoImageId}`}
                                            alt="Logo truong hoc"
                                            className="university-logo"
                                        />
                                        <Title level={2} className="university-title">{universityDetails.name}</Title>
                                    </div>
                                    <Text>{universityDetails.description}</Text>
                                    <Divider orientation="left" className="divider-title">Thông tin
                                        chung</Divider>
                                    <Space direction="vertical" size={4} style={{width: "100%"}}>
                                        <Row gutter={[16, 16]}>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <HomeOutlined style={{marginRight: "8px"}}/>
                                                        Tên doanh nghiệp:
                                                    </Text>
                                                    <Text>{universityDetails.name}</Text>
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
                                                            to={universityDetails.website}>{universityDetails.website}</NavLink>
                                                    </Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <CalendarOutlined style={{marginRight: "8px"}}/>
                                                        Năm thành lập:
                                                    </Text>
                                                    <Text>{universityDetails.foundedYear}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <MailOutlined style={{marginRight: "8px"}}/>
                                                        Email:
                                                    </Text>
                                                    <Text>{universityDetails.email}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <PhoneOutlined style={{marginRight: "8px"}}/>
                                                        Điện thoại:
                                                    </Text>
                                                    <Text>{universityDetails.phone}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <EnvironmentOutlined style={{marginRight: "8px"}}/>
                                                        Địa chỉ:
                                                    </Text>
                                                    <Text>
                                                        {universityDetails.locationId}
                                                    </Text>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                    <Divider/>
                                    <Row justify="end">
                                        <Button type="primary" onClick={handleEditClick}>Chỉnh sửa</Button>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={24} md={8}>
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Card bordered={false}>
                                            <Divider orientation="left"
                                                     className="divider-title">Khoa </Divider>
                                            {sections.map((item, index) => (
                                                <span className="badge badge-pill badge-blue mt-2 mx-2"
                                                      key={index}>{item.name}</span>
                                            ))}
                                        </Card>
                                    </Col>
                                    <Col span={24}>
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

export default ProfileUniversity;
