import React, {useEffect, useState} from "react";
import {Button, Card, Col, Modal, Row, Space, Typography} from "antd";
import "../StylePortal/JobDetails.css";
import HeaderPortal from "../../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import FooterPortal from "../FooterPortal";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {get_job_detail} from "../../../Redux/actions/JobThunk";
import {decryptId, encryptId} from '../../../Component/SecurityComponent/cryptoUtils';
import PageError from "../../PageError404/PageError"
import DisplayRichText from "../../../Component/TextEditDisplay/DisplayRichText";
import {apply_job, save_job, status_job} from "../../../Redux/actions/MatchingThunk";
import {
    AppstoreAddOutlined,
    EnvironmentOutlined,
    HomeOutlined, SaveOutlined, SendOutlined,
    TeamOutlined,
    TrophyOutlined,
    UserOutlined
} from "@ant-design/icons";
import {DOMAIN, GET_IMAGE_URI, USER_LOGIN} from "../../../Utils/Setting/Config";

const {Title, Text} = Typography;

const JobDetailPortal = () => {
    const {id} = useParams();
    const job = useSelector((state) => state.JobReducer.selectedJobDetail);
    const dispatch = useDispatch();
    const [encryptedId, setEncryptedId] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const data = JSON.parse(localStorage.getItem(USER_LOGIN));
    const [applied, setApplied] = useState(false);
    const [saved, setSaved] = useState(false);
    useEffect(() => {
        if (!data?.candidateResponse?.id) return;
        const fetchStatus = async () => {
            try {
                const waitingResponse = await dispatch(status_job(data.candidateResponse.id, decryptId(encryptedId), "WAITING"));
                const savedResponse = await dispatch(status_job(data.candidateResponse.id, decryptId(encryptedId), "SAVED"));

                // Kiểm tra response đúng cấu trúc API
                if (waitingResponse?.success && waitingResponse.payload?.code === 200) setApplied(true);
                if (savedResponse?.success && savedResponse.payload?.code === 200) setSaved(true);
            } catch (error) {
                console.error("Lỗi khi cập nhật trạng thái:", error);
            }
        };

        fetchStatus();
    }, [data?.candidateResponse?.id, decryptId(encryptedId), dispatch]);


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
    const handleApplyJob = async () => {
        if (!data?.candidateResponse?.id) {
            const redirectUrl = encodeURIComponent(window.location.pathname);
            Modal.warning({
                title: "Bạn chưa đăng nhập",
                content: "Vui lòng đăng nhập để tiếp tục ứng tuyển.",
                onOk: () => navigate(`/login?redirect=${redirectUrl}`),
            });
            return;
        }

        Modal.confirm({
            title: "Xác nhận ứng tuyển",
            content: "Bạn có chắc chắn muốn ứng tuyển vào công việc này?",
            onOk: async () => {
                try {
                    await dispatch(apply_job(data.candidateResponse.id, decryptId(encryptedId), "WAITING"));
                    setApplied(true); // Cập nhật trạng thái
                    Modal.success({
                        title: "Ứng tuyển thành công",
                        content: "Hồ sơ của bạn đã được gửi đi!",
                    });
                } catch (error) {
                    Modal.error({
                        title: "Ứng tuyển thất bại",
                        content: error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!",
                    });
                }
            },
        });
    };

    const handleSaveJob = async () => {
        if (!data?.candidateResponse?.id) {
            const redirectUrl = encodeURIComponent(window.location.pathname);
            Modal.warning({
                title: "Bạn chưa đăng nhập",
                content: "Vui lòng đăng nhập để tiếp tục lưu tin.",
                onOk: () => navigate(`/login?redirect=${redirectUrl}`),
            });
            return;
        }

        Modal.confirm({
            title: "Xác nhận lưu tin",
            content: "Bạn có chắc chắn muốn lưu công việc này?",
            onOk: async () => {
                try {
                    await dispatch(save_job(data.candidateResponse.id,decryptId(encryptedId), "SAVED"));
                    setSaved(true); // Cập nhật trạng thái
                    Modal.success({
                        title: "Lưu tin thành công",
                        content: "Công việc đã được lưu vào danh sách của bạn!",
                    });
                } catch (error) {
                    Modal.error({
                        title: "Lưu tin thất bại",
                        content: error.message || "Đã có lỗi xảy ra. Vui lòng thử lại!",
                    });
                }
            },
        });
    };

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
                                            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                                                <Col span={19}>
                                                    <Button
                                                        onClick={handleApplyJob}
                                                        type="primary"
                                                        icon={<SendOutlined />}
                                                        style={{
                                                            width: "100%",
                                                            backgroundColor: applied ? "#52c41a" : "#1d56c8", // Màu xanh nếu đã ứng tuyển
                                                            borderColor: applied ? "#52c41a" : "#1d56c8",
                                                        }}
                                                        disabled={applied} // Vô hiệu hóa nút sau khi ứng tuyển
                                                    >
                                                        {applied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
                                                    </Button>
                                                </Col>
                                                <Col span={5}>
                                                    <Button
                                                        onClick={handleSaveJob}
                                                        type="default"
                                                        icon={<SaveOutlined />}
                                                        style={{ width: "100%" }}
                                                        disabled={saved} // Vô hiệu hóa nút sau khi lưu
                                                    >
                                                        {saved ? "Đã lưu" : "Lưu tin"}
                                                    </Button>
                                                </Col>
                                            </Row>


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
                                        onClick={() => navigate(`/business-portal-detail/${encodeURIComponent(encryptId(job.business.id))}`)}
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
