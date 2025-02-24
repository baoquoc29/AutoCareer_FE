import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI, USER_LOGIN} from "../../../Utils/Setting/Config";
import {get_candidate_id} from "../../../Redux/actions/CandidateThunk";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Card, Col, Divider, Progress, Row, Space, Typography} from "antd";
import './style/Profile.css'
import {
    CalendarOutlined,
    EnvironmentOutlined,
    HomeOutlined,
    LinkOutlined,
    MailOutlined, PhoneOutlined
} from "@ant-design/icons";

const {Text, Title} = Typography;

const ProfileCandidate = () => {
    const navigate = useNavigate();
    // Lấy thông tin trường đại học từ Redux store
    const candidate = useSelector(state => state.CandidateReducer.candidate);
    const dispatch = useDispatch();
    const data = JSON.parse(localStorage.getItem(USER_LOGIN));
    useEffect(() => {
        if (data?.candidateResponse?.id) {
            dispatch(get_candidate_id(data.candidateResponse.id));
        }
    }, [dispatch, data?.candidateResponse?.id]);

    const handleEditClick = () => {
        if (data.candidateResponse?.id) {
            navigate(`/profile-candidate-edit`);
        }
    };
    return (
        <section className="profile-university">
            <div className="m-1 mt-1">
                <div className="content__wrap">
                    <Row gutter={[16, 16]}>
                        {/* Card chính */}
                        <Col span={24} md={16}>
                            <Card bordered={false} className="profile-card">
                                {/* Header */}
                                <div className="university-header">
                                    <img
                                        src={candidate?.profileImageId ? `${GET_IMAGE_URI}${candidate.profileImageId}` : "aotucareer-logo.svg"}
                                        alt="Logo trường học"
                                        className="university-logo"
                                    />
                                    <Title level={2} className="university-title">{candidate?.fullName || "Chưa cập nhật"}</Title>
                                </div>
                                <Divider orientation="left" className="divider-title custom-divider">Mục Tiêu Nghề Nghiệp</Divider>
                                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                                    {candidate?.careerObjective ? (
                                        <div className="skill-item">
                                            <Text  className="skill-name">
                                                <span dangerouslySetInnerHTML={{ __html: candidate.careerObjective }} />
                                            </Text>
                                        </div>
                                    ) : (
                                        <Text className="empty-text">Vui lòng cập nhật mục tiêu nghề nghiệp của bạn.</Text>
                                    )}
                                </Space>
                                <Divider className="custom-divider" />
                                {/* Kỹ năng */}
                                <Divider orientation="left" className="divider-title custom-divider">Kỹ Năng</Divider>
                                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                                    {candidate?.skills ? (
                                        <div className="skill-item">
                                            <Text className="skill-name">
                                                <span dangerouslySetInnerHTML={{ __html: candidate.skills }} />
                                            </Text>
                                        </div>
                                    ) : (
                                        <Text className="empty-text">Chưa có kỹ năng nào được cập nhật.</Text>
                                    )}
                                </Space>
                                <Divider className="custom-divider" />

                                {/* Học vấn */}
                                <Divider orientation="left" className="divider-title custom-divider">Học Vấn</Divider>
                                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                                    {candidate?.education ? (
                                        <div className="education-item">
                                            <Text className="education-content">
                                                <span dangerouslySetInnerHTML={{ __html: candidate.education }} />
                                            </Text>
                                        </div>
                                    ) : (
                                        <Text className="empty-text">Chưa có thông tin học vấn.</Text>
                                    )}
                                </Space>
                                <Divider className="custom-divider" />

                                {/* Giải thưởng */}
                                <Divider orientation="left" className="divider-title custom-divider">Giải Thưởng</Divider>
                                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                                    {candidate?.awards ? (
                                        <div className="award-item">
                                            <Text className="award-content">
                                                <span dangerouslySetInnerHTML={{ __html: candidate.awards }} />
                                            </Text>
                                        </div>
                                    ) : (
                                        <Text className="empty-text">Chưa có giải thưởng nào được cập nhật.</Text>
                                    )}
                                </Space>
                                <Divider className="custom-divider" />

                                <Divider orientation="left" className="divider-title custom-divider">Kinh nghiệm làm việc</Divider>
                                <div className="description-section">
                                    <Text className="description-text">
                                        {candidate?.description ? (
                                            <span dangerouslySetInnerHTML={{ __html: candidate.description }} />
                                        ) : (
                                            "Vui lòng bổ sung thông tin chi tiết để tăng tỉ lệ tìm được việc!"
                                        )}
                                    </Text>
                                </div>
                                <Divider className="custom-divider" />

                                {/* Nút chỉnh sửa */}
                                <Row justify="end" style={{ marginTop: 24 }}>
                                    <Button type="primary" onClick={handleEditClick} className="edit-button">Chỉnh sửa</Button>
                                </Row>
                            </Card>
                        </Col>

                        {/* Card Thông tin chung (bên phải) */}
                        <Col span={24} md={8}>
                            <Card bordered={false} className="info-card">
                                <Divider orientation="left" className="divider-title custom-divider">Thông tin chung</Divider>
                                <Space direction="vertical" size={12} style={{ width: "120%" }}>
                                    <div className="info-item">
                                        <HomeOutlined className="info-icon" />
                                        <Text strong className="info-label">Tên ứng viên:</Text>
                                        <Text className="info-value">{candidate?.fullName || "Chưa cập nhật"}</Text>
                                    </div>
                                    <div className="info-item">
                                        <CalendarOutlined className="info-icon" />
                                        <Text strong className="info-label">Năm sinh:</Text>
                                        <Text className="info-value">{candidate?.birthYear || "Chưa cập nhật"}</Text>
                                    </div>
                                    <div className="info-item">
                                        <MailOutlined className="info-icon" />
                                        <Text strong className="info-label">Email:</Text>
                                        <Text className="info-value">{candidate?.email || "Chưa cập nhật"}</Text>
                                    </div>
                                    <div className="info-item">
                                        <PhoneOutlined className="info-icon" />
                                        <Text strong className="info-label">Số điện thoại:</Text>
                                        <Text className="info-value">{candidate?.phone || "Chưa cập nhật"}</Text>
                                    </div>
                                    <div className="info-item">
                                        <EnvironmentOutlined className="info-icon" />
                                        <Text strong className="info-label">Địa chỉ:</Text>
                                        <Text className="info-value">
                                            {candidate?.location?.ward?.fullName || "Chưa cập nhật"},
                                            {candidate?.location?.district?.fullName || "Chưa cập nhật"},
                                            {candidate?.location?.province?.name || "Chưa cập nhật"}.
                                        </Text>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </section>
    );


};

export default ProfileCandidate;
