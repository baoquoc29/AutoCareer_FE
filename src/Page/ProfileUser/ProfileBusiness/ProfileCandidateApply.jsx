import React, {useEffect, memo, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_IMAGE_URI } from "../../../Utils/Setting/Config";
import { get_candidate_id } from "../../../Redux/actions/CandidateThunk";
import { useSearchParams } from "react-router-dom";
import {Button, Card, Col, Divider, Modal, Progress, Row, Space, Typography} from "antd";
import '../ProfileUniversity/style/Profile.css';
import {
    CalendarOutlined, DownloadOutlined,
    EnvironmentOutlined,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined,
    PrinterOutlined
} from "@ant-design/icons";
import { decryptId } from "../../../Component/SecurityComponent/cryptoUtils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {set_status_job, status_job, status_job_apply} from "../../../Redux/actions/MatchingThunk";

const { Text, Title } = Typography;

const ProfileCandidateApply = () => {
    const candidate = useSelector(state => state.CandidateReducer.candidate);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const job = searchParams.get("job");
    const [status, setStatus] = useState(null);
    useEffect(() => {
        if (id) {
            dispatch(get_candidate_id(decryptId(id)));
        }
    }, [dispatch, id]);
    useEffect(() => {
        if (!id || !job) return;

        const fetchStatus = async () => {
            try {
                const response = await dispatch(status_job_apply(decryptId(id), decryptId(job),null));

                if (response?.success && response.payload?.code === 200) {
                    const currentStatus = response.payload.data;
                    console.log(decryptId(id) + "id");
                    console.log(decryptId(job) + "job")
                    console.log(currentStatus);
                    if (currentStatus !== "WAITING") {
                        setStatus(currentStatus);
                    }
                }
            } catch (error) {
                console.error("Lỗi khi lấy trạng thái:", error);
            }
        };

        fetchStatus();
    }, [dispatch, id, job]);


    const handleMarkAsMatched = () => {
        if (status === "MATCHED") return;

        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn đánh dấu ứng viên này là phù hợp?",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: () => {
                console.log("Ứng viên phù hợp");
                dispatch(set_status_job(decryptId(id), decryptId(job), "MATCHED"));
                setStatus("MATCHED");
            },
        });
    };

    const handleMarkAsNotMatched = () => {
        if (status === "NOT_MATCHED") return;

        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn đánh dấu ứng viên này là không phù hợp?",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: () => {
                console.log("Ứng viên không phù hợp");
                dispatch(set_status_job(decryptId(id), decryptId(job), "NOT_MATCHED"));
                setStatus("NOT_MATCHED");
            },
        });
    };

    const handleExportPDF = () => {
        const input = document.getElementById("profile-content"); // Cần xác định phần nội dung
        const actionButtons = document.getElementById("action-buttons");

        if (actionButtons) actionButtons.style.display = "none"; // Ẩn nút Phù hợp & Chưa phù hợp

        setTimeout(() => {
            html2canvas(input, { scale: 2 }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 210;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
                pdf.save("profile.pdf");

                if (actionButtons) actionButtons.style.display = "flex"; // Hiện lại nút Phù hợp & Chưa phù hợp
            });
        }, 300);
    };


    const handlePrint = () => {
        window.print();
    };

    return (
        <section className="profile-university">
            {/* Header với nút Xuất PDF và In */}
            <div
                id={"header-candidate-apply"}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 24px",
                    background: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Title level={3} style={{margin: 0, fontWeight: 600}}>Hồ sơ ứng viên</Title>
                <Space style={{gap: "12px"}} id="export-buttons">
                    <Button type="primary" onClick={handleExportPDF} icon={<DownloadOutlined/>}>
                        Xuất PDF
                    </Button>
                    <Button onClick={handlePrint} icon={<PrinterOutlined/>}>
                        In
                    </Button>
                </Space>
            </div>


            <div className="m-1 mt-1" id="profile-content">
                <div className="content__wrap">
                    <Row gutter={[16, 16]}>
                        <Col span={24} md={16}>
                            <Card bordered={false} className="profile-card">
                                <div className="university-header">
                                    <img
                                        src={candidate?.profileImageId ? `${GET_IMAGE_URI}${candidate.profileImageId}` : "aotucareer-logo.svg"}
                                        alt="Logo trường học"
                                        className="university-logo"
                                    />
                                    <Title level={2}
                                           className="university-title">{candidate?.fullName || "Chưa cập nhật"}</Title>
                                </div>
                                <Divider orientation="left" className="divider-title custom-divider">Mục Tiêu Nghề
                                    Nghiệp</Divider>
                                <Space direction="vertical" size={12} style={{width: "100%"}}>
                                    {candidate?.careerObjective ? (
                                        <Text>
                                            <span dangerouslySetInnerHTML={{__html: candidate.careerObjective}}/>
                                        </Text>
                                    ) : (
                                        <Text className="empty-text">Vui lòng cập nhật mục tiêu nghề nghiệp của
                                            bạn.</Text>
                                    )}
                                </Space>
                                <Divider className="custom-divider"/>

                                <Divider orientation="left" className="divider-title custom-divider">Kỹ Năng</Divider>
                                <Space direction="vertical" size={12} style={{width: "100%"}}>
                                    {candidate?.skills ? (
                                        <Text>
                                            <span dangerouslySetInnerHTML={{__html: candidate.skills}}/>
                                        </Text>
                                    ) : (
                                        <Text className="empty-text">Chưa có kỹ năng nào được cập nhật.</Text>
                                    )}
                                </Space>
                                <Divider className="custom-divider"/>
                                <Divider orientation="left" className="divider-title custom-divider">Học Vấn</Divider>
                                <Space direction="vertical" size={12} style={{width: "100%"}}>
                                    {candidate?.education ? (
                                        <Text>
                                            <span dangerouslySetInnerHTML={{__html: candidate.education}}/>
                                        </Text>
                                    ) : (
                                        <Text className="empty-text">Chưa có học vấn nào được cập nhật.</Text>
                                    )}
                                </Space>
                                <Divider className="custom-divider"/>
                                <Divider orientation="left" className="divider-title custom-divider">Học Vấn</Divider>
                                <Space direction="vertical" size={12} style={{width: "100%"}}>
                                    {candidate?.awards ? (
                                        <Text>
                                            <span dangerouslySetInnerHTML={{__html: candidate.awards}}/>
                                        </Text>
                                    ) : (
                                        <Text className="empty-text">Chưa có giải thưởng nào được cập nhật.</Text>
                                    )}
                                </Space>
                                <Divider className="custom-divider"/>
                                <Row justify="end" style={{ marginTop: 24 }} id="action-buttons">
                                    <Space>
                                        {status !== "NOT_MATCHED" && (
                                            <Button
                                                type="primary"
                                                onClick={handleMarkAsMatched}
                                                disabled={status === "MATCHED"}
                                            >
                                                {status === "MATCHED" ? "Đã phù hợp" : "Phù hợp"}
                                            </Button>
                                        )}

                                        {status !== "MATCHED" && (
                                            <Button
                                                danger
                                                onClick={handleMarkAsNotMatched}
                                                disabled={status === "NOT_MATCHED"}
                                            >
                                                {status === "NOT_MATCHED" ? "Đã từ chối" : "Chưa phù hợp"}
                                            </Button>
                                        )}
                                    </Space>
                                </Row>





                            </Card>
                        </Col>

                        <Col span={24} md={8}>
                            <Card
                                bordered={false}
                                className="info-card"
                                style={{
                                    padding: "16px",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <Divider
                                    orientation="left"
                                    className="divider-title custom-divider"
                                    style={{ marginBottom: "16px", fontWeight: "bold" }}
                                >
                                    Thông tin chung
                                </Divider>
                                <Space
                                    direction="vertical"
                                    size={16} // Tăng khoảng cách giữa các dòng
                                    style={{ width: "100%" }}
                                >
                                    {[
                                        { icon: <HomeOutlined />, label: "Tên ứng viên:", value: candidate?.fullName },
                                        { icon: <CalendarOutlined />, label: "Năm sinh:", value: candidate?.birthYear },
                                        { icon: <MailOutlined />, label: "Email:", value: candidate?.email },
                                        { icon: <PhoneOutlined />, label: "Số điện thoại:", value: candidate?.phone },
                                        {
                                            icon: <EnvironmentOutlined />,
                                            label: "Địa chỉ:",
                                            value: `${candidate?.location?.ward?.fullName || "Chưa cập nhật"}, 
                            ${candidate?.location?.district?.fullName || "Chưa cập nhật"}, 
                            ${candidate?.location?.province?.name || "Chưa cập nhật"}.`,
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="info-item"
                                            style={{ display: "flex", alignItems: "center", gap: "10px" }}
                                        >
                                            <span style={{ fontSize: "18px", color: "#1890ff" }}>{item.icon}</span>
                                            <Text strong>{item.label}</Text>
                                            <Text>{item.value || "Chưa cập nhật"}</Text>
                                        </div>
                                    ))}
                                </Space>
                            </Card>
                        </Col>

                    </Row>
                </div>
            </div>
        </section>
    );
};

export default memo(ProfileCandidateApply);
