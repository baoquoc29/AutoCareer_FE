import React, {useEffect, useState} from "react";
import {Button, Card, Col, Modal, Row, Space, Typography} from "antd";
import "../StylePortal/JobDetails.css";
import HeaderPortal from "../../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import FooterPortal from "../FooterPortal";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {get_job_detail} from "../../../Redux/actions/JobThunk";
import PageError from "../../PageError404/PageError"
import DisplayRichText from "../../../Component/TextEditDisplay/DisplayRichText";
import {apply_job, save_job, status_job} from "../../../Redux/actions/MatchingThunk";
import {decryptId, encryptId} from "../../../Component/SecurityComponent/cryptoUtils"
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
                const waitingResponse = await dispatch(status_job(data.candidateResponse.id, encryptedId, "WAITING"));
                const savedResponse = await dispatch(status_job(data.candidateResponse.id, encryptedId, "SAVED"));

                // Kiểm tra response đúng cấu trúc API
                if (waitingResponse?.success && waitingResponse.payload?.code === 200) setApplied(true);
                if (savedResponse?.success && savedResponse.payload?.code === 200) setSaved(true);
            } catch (error) {
                console.error("Lỗi khi cập nhật trạng thái:", error);
            }
        };

        fetchStatus();
    }, [data?.candidateResponse?.id, encryptedId, dispatch]);


    useEffect(() => {
        setEncryptedId(id);
    }, [id]);
    useEffect(() => {
        if (encryptedId) {
            setLoading(true);
            try {
                dispatch(get_job_detail(encryptedId)).finally(() => setLoading(false));
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
                    await dispatch(apply_job(data.candidateResponse.id, encryptedId, "WAITING"));
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
                    await dispatch(save_job(data.candidateResponse.id,encryptedId, "SAVED"));
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
            <div style={{padding: "32px 20px", maxWidth: "1200px", margin: "auto", backgroundColor: "#f8f9fa", minHeight: "100vh"}}>
                <Row gutter={[32, 32]} style={{display: 'flex', flexWrap: 'wrap'}}>
                    {/* Main Content - Job Details */}
                    <Col span={16} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        {/* Job Header Card */}
                        <Card 
                            bordered={false} 
                            style={{ 
                                borderRadius: "12px",
                                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                                backgroundColor: "#ffffff"
                            }}
                        >
                            <div style={{ padding: "32px 24px" }}>
                                {/* Job Title */}
                                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                                    <Title level={1} style={{
                                        color: "#1d56c8",
                                        marginBottom: "8px",
                                        fontSize: "28px",
                                        fontWeight: "700",
                                        lineHeight: "1.2"
                                    }}>{job.title}</Title>
                                    <Text style={{ 
                                        color: "#666", 
                                        fontSize: "16px",
                                        fontWeight: "500"
                                    }}>
                                        {job?.business?.name}
                                    </Text>
                                </div>
                                
                                {/* Job Info Grid */}
                                <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
                                    <Col span={8}>
                                        <div style={{ 
                                            textAlign: "center", 
                                            padding: "24px 16px", 
                                            backgroundColor: "#f0f7ff", 
                                            borderRadius: "12px",
                                            border: "1px solid #e6f4ff",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center"
                                        }}>
                                            <Text strong style={{color: "#1d56c8", fontSize: "14px", display: "block", marginBottom: "12px"}}>
                                                Mức lương
                                            </Text>
                                            <Text style={{ color: "#333", fontSize: "15px", fontWeight: "600", lineHeight: "1.4" }}>
                                                {job.fromSalary === 1 && job.toSalary === 1
                                                    ? "Lương thỏa thuận"
                                                    : `${formatSalary(job.fromSalary)} - ${formatSalary(job.toSalary)}`}
                                            </Text>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div style={{ 
                                            textAlign: "center", 
                                            padding: "24px 16px", 
                                            backgroundColor: "#f0f7ff", 
                                            borderRadius: "12px",
                                            border: "1px solid #e6f4ff",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center"
                                        }}>
                                            <Text strong style={{color: "#1d56c8", fontSize: "14px", display: "block", marginBottom: "12px"}}>
                                                Địa điểm
                                            </Text>
                                            <Text style={{ color: "#333", fontSize: "15px", fontWeight: "600", lineHeight: "1.4" }}>
                                                {job.wards} - {job.districts} - {job.province}
                                            </Text>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div style={{ 
                                            textAlign: "center", 
                                            padding: "24px 16px", 
                                            backgroundColor: "#f0f7ff", 
                                            borderRadius: "12px",
                                            border: "1px solid #e6f4ff",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center"
                                        }}>
                                            <Text strong style={{color: "#1d56c8", fontSize: "14px", display: "block", marginBottom: "12px"}}>
                                                Kinh nghiệm
                                            </Text>
                                            <Text style={{ color: "#333", fontSize: "15px", fontWeight: "600", lineHeight: "1.4" }}>
                                                {job.level}
                                            </Text>
                                        </div>
                                    </Col>
                                </Row>

                                {/* Action Buttons */}
                                <Row gutter={[20, 16]}>
                                    <Col span={16}>
                                        <Button
                                            onClick={handleApplyJob}
                                            type="primary"
                                            size="large"
                                            style={{
                                                width: "100%",
                                                height: "52px",
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                backgroundColor: applied ? "#52c41a" : "#1d56c8",
                                                borderColor: applied ? "#52c41a" : "#1d56c8",
                                                borderRadius: "10px",
                                                boxShadow: "0 4px 12px rgba(29, 86, 200, 0.2)"
                                            }}
                                            disabled={applied}
                                        >
                                            {applied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
                                        </Button>
                                    </Col>
                                    <Col span={8}>
                                        <Button
                                            onClick={handleSaveJob}
                                            type="default"
                                            size="large"
                                            style={{ 
                                                width: "100%", 
                                                height: "52px",
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                borderRadius: "10px",
                                                borderColor: saved ? "#52c41a" : "#d9d9d9",
                                                color: saved ? "#52c41a" : "#666",
                                                backgroundColor: "#ffffff"
                                            }}
                                            disabled={saved}
                                        >
                                            {saved ? "Đã lưu" : "Lưu tin"}
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>

                        {/* Job Details Card */}
                        <Card 
                            bordered={false} 
                            style={{ 
                                borderRadius: "12px",
                                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                                backgroundColor: "#ffffff"
                            }}
                        >
                            <div style={{ padding: "24px" }}>
                                <div style={{
                                    textAlign: "center",
                                    marginBottom: "32px"
                                }}>
                                    <Title level={2} style={{
                                        color: "#1d56c8",
                                        margin: 0,
                                        fontSize: "24px",
                                        fontWeight: "700"
                                    }}>Chi tiết tin tuyển dụng</Title>
                                    <Text style={{ color: "#666", fontSize: "16px", marginTop: "8px" }}>
                                        Tìm hiểu thêm về công việc này
                                    </Text>
                                </div>
                            
                            <Space direction="vertical" size={32} style={{ width: "100%" }}>
                                {/* Job Description */}
                                <div style={{ 
                                    padding: "28px", 
                                    backgroundColor: "#f8fffe", 
                                    borderRadius: "12px", 
                                    border: "1px solid #e6fffa",
                                    borderLeft: "4px solid #1d56c8"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                                        <Text strong style={{color: "#1d56c8", fontSize: "18px"}}>
                                            Mô tả công việc
                                        </Text>
                                    </div>
                                    <div style={{ lineHeight: "1.7", fontSize: "15px", color: "#333" }}>
                                        <DisplayRichText content={job.jobDescription}></DisplayRichText>
                                    </div>
                                </div>

                                {/* Job Requirements */}
                                <div style={{ 
                                    padding: "28px", 
                                    backgroundColor: "#fffef0", 
                                    borderRadius: "12px", 
                                    border: "1px solid #ffeaa7",
                                    borderLeft: "4px solid #1d56c8"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                                        <Text strong style={{color: "#1d56c8", fontSize: "18px"}}>
                                            Yêu cầu ứng viên
                                        </Text>
                                    </div>
                                    <div style={{ lineHeight: "1.7", fontSize: "15px", color: "#333" }}>
                                        <DisplayRichText content={job.requirement}></DisplayRichText>
                                    </div>
                                </div>

                                {/* Job Benefits */}
                                <div style={{ 
                                    padding: "28px", 
                                    backgroundColor: "#f0fff4", 
                                    borderRadius: "12px", 
                                    border: "1px solid #b7eb8f",
                                    borderLeft: "4px solid #1d56c8"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                                        <Text strong style={{color: "#1d56c8", fontSize: "18px"}}>
                                            Quyền lợi
                                        </Text>
                                    </div>
                                    <div style={{ lineHeight: "1.7", fontSize: "15px", color: "#333" }}>
                                        <DisplayRichText content={job.benefit}></DisplayRichText>
                                    </div>
                                </div>
                            </Space>
                            </div>
                        </Card>
                    </Col>

                    {/* Sidebar - Company & Job Info */}
                    <Col span={8} style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                        {/* Company Info Card */}
                        <Card 
                            bordered={false}
                            style={{ 
                                borderRadius: "12px",
                                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                                backgroundColor: "#ffffff"
                            }}
                        >
                            <div style={{ padding: "32px 24px" }}>
                                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                                    <div style={{ 
                                        width: "100px", 
                                        height: "100px", 
                                        margin: "0 auto 20px",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        border: "2px solid #f0f0f0",
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                                    }}>
                                        <img
                                            src={job?.business?.businessImageId ? `${GET_IMAGE_URI}${job?.business?.businessImageId}` : "/placeholder-avatar.jpg"}
                                            alt="Logo công ty"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                    <Title level={4} style={{
                                        color: "#1d56c8",
                                        marginBottom: "8px",
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        lineHeight: "1.3"
                                    }}>{job?.business?.name || "Thông tin công ty không có sẵn"}</Title>
                                    <Text style={{ color: "#666", fontSize: "14px" }}>
                                        Tìm hiểu thêm về nhà tuyển dụng
                                    </Text>
                                </div>

                                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                    <div style={{ 
                                        padding: "20px", 
                                        backgroundColor: "#f8fffe", 
                                        borderRadius: "12px",
                                        border: "1px solid #e6fffa"
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                                            <Text style={{color: "#666", fontSize: "14px", fontWeight: "500"}}>
                                                Quy mô công ty
                                            </Text>
                                        </div>
                                        <Text strong style={{color: "#333", fontSize: "16px"}}>
                                            {job?.business?.companySize} nhân viên
                                        </Text>
                                    </div>
                                    
                                    <div style={{ 
                                        padding: "20px", 
                                        backgroundColor: "#f8fffe", 
                                        borderRadius: "12px",
                                        border: "1px solid #e6fffa"
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                                            <Text style={{color: "#666", fontSize: "14px", fontWeight: "500"}}>
                                                Lĩnh vực hoạt động
                                            </Text>
                                        </div>
                                        <Text strong style={{color: "#333", fontSize: "16px"}}>
                                            {job?.industry?.name || "Chưa có thông tin"}
                                        </Text>
                                    </div>
                                    
                                    <div style={{ 
                                        padding: "20px", 
                                        backgroundColor: "#f8fffe", 
                                        borderRadius: "12px",
                                        border: "1px solid #e6fffa"
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                                            <Text style={{color: "#666", fontSize: "14px", fontWeight: "500"}}>
                                                Địa chỉ
                                            </Text>
                                        </div>
                                        <Text strong style={{color: "#333", fontSize: "16px", lineHeight: "1.4"}}>
                                            {job.wards} - {job.districts} - {job.province}
                                        </Text>
                                    </div>
                                </Space>

                                <div style={{textAlign: 'center', marginTop: "32px"}}>
                                    <Button
                                        type="primary"
                                        onClick={() => navigate(`/business-portal-detail/${encodeURIComponent(encryptId(job.business.id))}`)}
                                        style={{
                                            borderRadius: "10px",
                                            background: "#1d56c8",
                                            borderColor: "#1d56c8",
                                            fontWeight: "600",
                                            height: "44px",
                                            fontSize: "15px",
                                            paddingLeft: "24px",
                                            paddingRight: "24px",
                                            boxShadow: "0 4px 12px rgba(29, 86, 200, 0.2)"
                                        }}
                                    >
                                        Xem chi tiết công ty
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Job General Info Card */}
                        <Card 
                            bordered={false} 
                            style={{ 
                                borderRadius: "12px",
                                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                                backgroundColor: "#ffffff"
                            }}
                        >
                            <div style={{ padding: "32px 24px" }}>
                                <div style={{
                                    textAlign: "center",
                                    marginBottom: "24px"
                                }}>
                                    <Title level={4} style={{
                                        color: "#1d56c8",
                                        margin: 0,
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        marginBottom: "8px"
                                    }}>Thông tin tuyển dụng</Title>
                                    <Text style={{ color: "#666", fontSize: "14px" }}>
                                        Các yêu cầu cơ bản cho vị trí này
                                    </Text>
                                </div>
                            
                            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                <div style={{ 
                                    padding: "20px", 
                                    backgroundColor: "#fffef0", 
                                    borderRadius: "12px", 
                                    border: "1px solid #ffeaa7"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                                        <Text style={{color: "#666", fontSize: "13px", fontWeight: "500"}}>
                                            Kinh nghiệm làm việc
                                        </Text>
                                    </div>
                                    <Text strong style={{fontSize: "15px", color: "#333"}}>{job.level}</Text>
                                </div>
                                
                                <div style={{ 
                                    padding: "20px", 
                                    backgroundColor: "#fffef0", 
                                    borderRadius: "12px", 
                                    border: "1px solid #ffeaa7"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                                        <Text style={{color: "#666", fontSize: "13px", fontWeight: "500"}}>
                                            Cấp bậc
                                        </Text>
                                    </div>
                                    <Text strong style={{fontSize: "15px", color: "#333"}}>{job.rank}</Text>
                                </div>
                                
                                <div style={{ 
                                    padding: "20px", 
                                    backgroundColor: "#fffef0", 
                                    borderRadius: "12px", 
                                    border: "1px solid #ffeaa7"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                                        <Text style={{color: "#666", fontSize: "13px", fontWeight: "500"}}>
                                            Số lượng cần tuyển
                                        </Text>
                                    </div>
                                    <Text strong style={{fontSize: "15px", color: "#333"}}>{job.quantity} người</Text>
                                </div>
                                
                                <div style={{ 
                                    padding: "20px", 
                                    backgroundColor: "#fffef0", 
                                    borderRadius: "12px", 
                                    border: "1px solid #ffeaa7"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                                        <Text style={{color: "#666", fontSize: "13px", fontWeight: "500"}}>
                                            Hình thức làm việc
                                        </Text>
                                    </div>
                                    <Text strong style={{fontSize: "15px", color: "#333"}}>{job.workForm}</Text>
                                </div>
                                
                                <div style={{ 
                                    padding: "20px", 
                                    backgroundColor: "#fffef0", 
                                    borderRadius: "12px", 
                                    border: "1px solid #ffeaa7"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                                        <Text style={{color: "#666", fontSize: "13px", fontWeight: "500"}}>
                                            Yêu cầu giới tính
                                        </Text>
                                    </div>
                                    <Text strong style={{fontSize: "15px", color: "#333"}}>{job.gender}</Text>
                                </div>
                            </Space>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
            <FooterPortal/>
        </div>
    );
};

export default JobDetailPortal;
