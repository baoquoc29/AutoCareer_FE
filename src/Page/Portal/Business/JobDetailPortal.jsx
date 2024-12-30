import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row, Space, Typography} from "antd";
import "../StylePortal/JobDetails.css";
import HeaderPortal from "../../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import FooterPortal from "../FooterPortal";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {get_job_detail} from "../../../Redux/actions/JobThunk";
import {decryptId} from '../../../Component/SecurityComponent/cryptoUtils';
import PageError from "../../PageError404/PageError"
import DisplayRichText from "../../../Component/TextEditDisplay/DisplayRichText";
import {
    AppstoreAddOutlined,
    EnvironmentOutlined,
    HomeOutlined,
    TeamOutlined,
    TrophyOutlined,
    UserOutlined
} from "@ant-design/icons";
import {DOMAIN, GET_IMAGE_URI} from "../../../Utils/Setting/Config";

const {Title, Text} = Typography;

const JobDetailPortal = () => {
    const {id} = useParams();
    const job = useSelector((state) => state.JobReducer.selectedJobDetail);
    const dispatch = useDispatch();
    const [encryptedId, setEncryptedId] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setEncryptedId(id);
    }, [id]);

    useEffect(() => {
        if (encryptedId) {
            setLoading(true);
            try {
                dispatch(get_job_detail(decryptId(encryptedId))).finally(() => setLoading(false));
            } catch (error) {
                setLoading(false);
            }
        }
    }, [dispatch, encryptedId]);
    const formatSalary = (salary) => {
        if (!salary) return "Không xác định";
        return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    };
    if (loading) {
        return <div>Đang tải...</div>;
    }
    if (!job) {
        return <PageError></PageError>
    }

    return (
        <div className={"app-container-job-details-root"}>
            <HeaderPortal/>
            <div style={{padding: "20px", maxWidth: "1110px", margin: "auto"}}>
                <Row gutter={[16, 16]} style={{display: 'flex', flexWrap: 'wrap'}}>
                    {/* Khối chia phần giới thiệu công ty và thông tin tuyển dụng */}
                    <Col span={17} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <Row gutter={[16, 16]} style={{display: 'flex', flexWrap: 'wrap'}}>
                            <Col span={24}>
                                <Row gutter={[16, 16]} style={{display: 'flex', flexWrap: 'wrap'}}>
                                    <Col span={24}>
                                        <Card bordered={true} style={{ boxShadow: "0 0 5px rgba(169, 169, 169, 0.5)" }}>
                                            <div>
                                                {/* Tiêu đề công việc */}
                                                <Text strong style={{
                                                    textAlign: "center",
                                                    fontSize: "23px",
                                                    color: "#000103"
                                                }}>{job.title}</Text>
                                                {/* Tên công ty */}
                                                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                                    <Col span={8}>
                                                        <Space direction="vertical"
                                                               size={4}>  {/* Tăng size từ 4 lên 8 */}
                                                            <Text strong style={{color: "#1d56c8", fontSize: "16px"}}>
                                                                Mức lương
                                                            </Text>
                                                            <Text>
                                                                {job.fromSalary === 1 && job.toSalary === 1
                                                                    ? "Lương thỏa thuận"
                                                                    : `${formatSalary(job.fromSalary)} - ${formatSalary(job.toSalary)}`}
                                                            </Text> </Space>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Space direction="vertical"
                                                               size={4}>  {/* Tăng size từ 4 lên 8 */}
                                                            <Text strong style={{color: "#1d56c8", fontSize: "16px"}}>
                                                                Địa điểm
                                                            </Text>
                                                            <Text>
                                                                {job.wards} - {job.districts} - {job.province}
                                                            </Text> </Space>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Space direction="vertical"
                                                               size={4}>  {/* Tăng size từ 4 lên 8 */}
                                                            <Text strong style={{color: "#1d56c8", fontSize: "16px"}}>
                                                                Kinh nghiệm
                                                            </Text>
                                                            <Text>
                                                                {job.level}
                                                            </Text> </Space>
                                                    </Col>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            {/* Thông tin tuyển dụng */}
                            <Col span={24}>
                                <Card bordered={true} style={{ boxShadow: "0 0 5px rgba(169, 169, 169, 0.5)" }}>
                                    <div>
                                        <div>
                                            <Text strong style={{
                                                textAlign: "center",
                                                fontSize: "20px",
                                                color: "#000103"
                                            }}>Chi tiết tin tuyển dụng</Text>
                                        </div>
                                        {/* Tiêu đề công việc */}

                                        {/* Tên công ty */}
                                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                            <Col span={24}>
                                                <Space direction="vertical"
                                                       size={4}>  {/* Tăng size từ 4 lên 8 */}
                                                    <Text strong style={{color: "#1d56c8", fontSize: "16px"}}>Mô tả công
                                                        việc</Text>
                                                    <DisplayRichText content={job.jobDescription}></DisplayRichText>
                                                </Space>
                                            </Col>
                                            <Col span={24}>
                                                <Space direction="vertical"
                                                       size={8}>  {/* Tăng size từ 4 lên 8 */}
                                                    <Text strong style={{color: "#1d56c8", fontSize: "16px"}}>Yêu cầu
                                                        ứng viên</Text>
                                                    <DisplayRichText content={job.requirement}></DisplayRichText>
                                                </Space>
                                            </Col>
                                            <Col span={24}>
                                                <Space direction="vertical"
                                                       size={8}>  {/* Tăng size từ 4 lên 8 */}
                                                    <Text strong style={{color: "#1d56c8", fontSize: "16px"}}>Quyền
                                                        lợi</Text>
                                                    <DisplayRichText content={job.benefit}></DisplayRichText>
                                                </Space>
                                            </Col>
                                        </div>
                                    </div>
                                </Card>
                            </Col>

                        </Row>
                    </Col>

                    {/* Thông tin liên hệ */}
                    <Col span={7} style={{justifyContent: 'space-between'}}>
                        <Card style={{marginBottom: '16px', boxShadow: "0 0 5px rgba(169, 169, 169, 0.5)" }}> {/* Thêm marginBottom để cách nhau */}
                            <Row gutter={[16, 16]} style={{display: 'flex', flexWrap: 'wrap'}}>
                                <Col span={8} style={{marginBottom: 16}}>
                                    <Space direction="vertical" size={4}>
                                        <img
                                            src={job?.business?.businessImageId ? `${GET_IMAGE_URI}${job?.business?.businessImageId}` : "/placeholder-avatar.jpg"}
                                            alt="Logo công ty"
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                objectFit: "scale-down",
                                            }}
                                        />
                                    </Space>
                                </Col>
                                <Col span={16} style={{marginBottom: 16}}>
                                    <Col span={24} style={{marginBottom: 16}}>
                                        <Space direction="vertical" size={4}>
                                            <Text strong style={{
                                                textAlign: "center",
                                                fontSize: "20px",
                                                color: "#000103",
                                            }}>{job?.business?.name || "Thông tin công ty không có sẵn"}</Text>

                                        </Space>
                                    </Col>

                                </Col>
                                <Col span={24}>
                                    <Space size={4}>
                                        <Text style={{color: "#00040b", fontSize: "15px"}}>
                                            <TeamOutlined style={{marginRight: "8px"}}/>
                                            Quy mô: <strong>{job?.business?.companySize} nhân viên</strong>
                                        </Text>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space size={4}>
                                        <Text style={{color: "#00040b", fontSize: "15px"}}>
                                            <AppstoreAddOutlined style={{marginRight: "8px"}}/>
                                            Lĩnh vực: <strong>{job?.industry?.name || "Chưa có thông tin"}</strong>
                                        </Text>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space size={4}>
                                        <Text style={{color: "#00040b", fontSize: "15px"}}>
                                            <EnvironmentOutlined style={{marginRight: "8px"}}/>
                                            Địa
                                            điểm: <strong> {job.wards} - {job.districts} - {job.province}</strong>
                                        </Text>
                                    </Space>
                                </Col>
                                <Col span={24} style={{textAlign: 'center'}}>
                                    <Button
                                        type="link"
                                        onClick={() => navigate(`/job-detail/${job.id}`)}
                                        style={{padding: 0}}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                        <Card bordered={false} style={{ boxShadow: "0 0 5px rgba(169, 169, 169, 0.5)" }}>
                            {/* Tiêu đề công việc */}
                            <Text strong style={{
                                textAlign: "center",
                                fontSize: "20px",
                                color: "#000103",
                            }}>Thông tin chung</Text>
                            {/* Kinh nghiệm */}
                            <Col span={24}>
                                <Space direction="vertical"
                                       size={8}>  {/* Tăng size từ 4 lên 8 */}
                                    <Text style={{color: "#1d56c8", fontSize: "16px"}}>
                                        <UserOutlined style={{marginRight: "8px"}}/>Kinh nghiệm</Text>
                                    <Text><strong>{job.level}</strong></Text>
                                </Space>
                            </Col>
                            {/* Thời gian làm việc */}
                            <Col span={24}>
                                <Space direction="vertical"
                                       size={8}>  {/* Tăng size từ 4 lên 8 */}
                                    <Text style={{color: "#1d56c8", fontSize: "16px"}}>
                                        <TrophyOutlined style={{marginRight: "8px"}}/>Cấp bậc</Text>
                                    <Text><strong>{job.rank}</strong></Text>
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction="vertical"
                                       size={8}>  {/* Tăng size từ 4 lên 8 */}
                                    <Text style={{color: "#1d56c8", fontSize: "16px"}}>
                                        <EnvironmentOutlined style={{marginRight: "8px"}}/>Số lượng tuyển</Text>
                                    <Text><strong>{job.quantity} người </strong></Text>
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction="vertical"
                                       size={8}>  {/* Tăng size từ 4 lên 8 */}
                                    <Text style={{color: "#1d56c8", fontSize: "16px"}}>
                                        <HomeOutlined style={{marginRight: "8px"}}/>Hình thức làm việc</Text>
                                    <Text><strong>{job.workForm} </strong></Text>
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space direction="vertical"
                                       size={8}>  {/* Tăng size từ 4 lên 8 */}
                                    <Text style={{color: "#1d56c8", fontSize: "16px"}}>
                                        <UserOutlined style={{marginRight: "8px"}}/>Giới tính</Text>
                                    <Text><strong>{job.gender} </strong></Text>
                                </Space>
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </div>
            <FooterPortal/>
        </div>
    );
};

export default JobDetailPortal;
