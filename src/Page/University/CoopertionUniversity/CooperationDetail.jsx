import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import {get_all_industries_of_business} from "../../../Redux/actions/IndustryThunk";
import {useNavigate} from "react-router-dom";
import {Button, Card, Col, Divider, Modal, Row, Space, Tag, Typography} from "antd";
import {
    MailOutlined,
    PhoneOutlined,
    LinkOutlined,
    CalendarOutlined,
    HomeOutlined,
    NumberOutlined,
    EnvironmentOutlined, TeamOutlined
} from "@ant-design/icons";
import RejectModal from "../../Modal/RejectModal";
import {
    approved_cooperation,
    get_detail_cooperation_business,
    reject_cooperation
} from "../../../Redux/actions/CooperationThunk";
import {toast} from "react-toastify";

const {Text, Title} = Typography;


const CooperationDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cooperation = useSelector(state => state.CooperationReducer.cooperationDetail);
    const industry = useSelector(state => state.IndustryReducer.industriesNoPag);
    const [businessDetail, setBusinessDetail] = useState();
    const [openRejectModal, setOpenRejectModal] = useState(false);
    useEffect(() => {
        console.log(cooperation);
        if (cooperation?.business) {
            setBusinessDetail(cooperation?.business)
            dispatch(get_all_industries_of_business(cooperation?.business?.id));
        }
    }, [dispatch, cooperation]);

    //Chap thuan hop tac
    const handleApproveClick = () => {
        Modal.confirm({
            title: "Xác nhận hợp tác",
            content: `Bạn có chắc muốn hợp tác với doanh nghiệp ${cooperation?.business?.name}?`, // Thêm tên doanh nghiệp vào content
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                dispatch(approved_cooperation({idCooperation: cooperation?.id}))
                    .then(async () => {
                        toast.success(`Chấp thuận hợp tác doanh nghiệp ${cooperation?.business?.name} thành công.`);
                        await dispatch(get_detail_cooperation_business(cooperation?.id));
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    })
            },
        });
    }

    const rejectTextBox = (message) => {
        console.log(message);
        Modal.confirm({
            title: "Xác nhận hợp tác",
            content: `Bạn có chắc muốn hợp tác với doanh nghiệp ${cooperation.business?.name}?`, // Thêm tên doanh nghiệp vào content
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                const data = ({"idCooperation": cooperation?.id, "message": message})
                console.log(data);
                dispatch(reject_cooperation(data))
                    .then(async () => {
                        toast.success(`Từ chối doanh nghiệp ${cooperation?.business?.name} thành công`)
                        await dispatch(get_detail_cooperation_business(cooperation?.id));
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    })
                setOpenRejectModal(false);
            },
        });
    }

    // if (!businessDetail) {
    //     return (
    //         <section id="content" className="content">
    //             <div className="content__header content__boxed rounded-0">
    //                 <div className="content__wrap">
    //                     <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
    //                         <div>Loading...</div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </section>
    //     );
    // }
    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
                        <Row gutter={[16, 16]}>
                            <Col span={24} md={16}>
                                <Card bordered={false}>
                                    <div style={{display: "flex", alignItems: "center", marginBottom: "20px"}}>
                                        <img
                                            src={
                                                businessDetail?.businessImageId
                                                    ? `${GET_IMAGE_URI}${businessDetail["businessImageId"]}`
                                                    : "placeholder-avatar.jpg"
                                            }
                                            alt="Logo Doanh Nghiệp"
                                            style={{
                                                maxWidth: "100px",
                                                maxHeight: "100px",
                                                marginRight: "20px",
                                                borderRadius: "8px"
                                            }}
                                        />
                                        <div className="col-md-9">
                                            <Title level={2} style={{margin: 0}}>{businessDetail?.name}</Title>
                                            <Tag
                                                color={cooperation?.statusConnected === "APPROVED" ? "green" : cooperation?.statusConnected === "REJECTED" ? "red" : "orange"}>
                                                {cooperation?.statusConnected === "APPROVED" ? "Đã phê duyệt" : cooperation?.statusConnected === "REJECTED" ? "Đã từ chối" : "Đang chờ duyệt"}
                                            </Tag>
                                        </div>
                                    </div>
                                    <Text>{businessDetail?.description}</Text>
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
                                                    <Text>{businessDetail?.name}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <LinkOutlined style={{marginRight: "8px"}}/>
                                                        Website:
                                                    </Text>
                                                    <Text>
                                                        <a href={businessDetail?.website} target="_blank"
                                                           rel="noopener noreferrer">
                                                            {businessDetail?.website}
                                                        </a>
                                                    </Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <CalendarOutlined style={{marginRight: "8px"}}/>
                                                        Năm thành lập:
                                                    </Text>
                                                    <Text>{businessDetail?.foundYear}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <NumberOutlined style={{marginRight: "8px"}}/>
                                                        Mã số thuế:
                                                    </Text>
                                                    <Text>{businessDetail?.taxCode}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <TeamOutlined style={{marginRight: "8px"}}/>
                                                        Quy mô doanh nghiệp:
                                                    </Text>
                                                    <Text>{businessDetail?.companySize}</Text>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" size={4}>
                                                    <Text strong style={{color: "#096dd9"}}>
                                                        <EnvironmentOutlined style={{marginRight: "8px"}}/>
                                                        Địa chỉ:
                                                    </Text>
                                                    <Text>
                                                        {businessDetail?.location?.province.fullName},
                                                        {businessDetail?.location?.district.fullName},
                                                        {businessDetail?.location?.ward.fullName},
                                                        {businessDetail?.location?.description}
                                                    </Text>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Space>
                                    <Divider/>
                                    <Row justify="space-between" style={{marginTop: "20px"}}>
                                        <Button
                                            type="default"
                                            onClick={() => navigate(-1)} // Quay lại trang trước
                                        >
                                            Quay lại
                                        </Button>
                                        <div>
                                            <Space>

                                                <Button
                                                    type="primary"
                                                    onClick={() => setOpenRejectModal(true)}
                                                    danger
                                                    disabled={cooperation?.statusConnected !== "PENDING"}
                                                >
                                                    Từ chối
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    onClick={handleApproveClick}
                                                    disabled={cooperation?.statusConnected !== "PENDING"}
                                                >
                                                    Chấp nhận
                                                </Button>
                                            </Space>
                                        </div>

                                    </Row>
                                </Card>
                            </Col>
                            <Col span={24} md={8}>
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Card bordered={false}>
                                            <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>Liên
                                                hệ</Divider>
                                            <Space direction="vertical" size={4} style={{width: "100%"}}>
                                                <Row gutter={[16, 16]}>
                                                    <Col span={24}>
                                                        <Space direction="vertical" size={4}>
                                                            <Text strong style={{color: "#096dd9"}}>
                                                                <MailOutlined style={{marginRight: "8px"}}/>
                                                                Email:
                                                            </Text>
                                                            <Text>{businessDetail?.email}</Text>
                                                        </Space>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Space direction="vertical" size={4}>
                                                            <Text strong style={{color: "#096dd9"}}>
                                                                <PhoneOutlined style={{marginRight: "8px"}}/>
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
                                            <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>Chuyên
                                                ngành kinh doanh</Divider>
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
            <RejectModal
                open={openRejectModal}
                onClose={() => setOpenRejectModal(false)}
                handleReject={rejectTextBox}
            ></RejectModal>
        </section>
    );
};

export default CooperationDetail;