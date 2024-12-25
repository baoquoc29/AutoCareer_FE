import React, { useEffect } from "react";
import { Card, Button, Row, Col, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import "./StylePortal/WorkshopPortal.css";
import { useDispatch, useSelector } from "react-redux";
import { get_work_shop_feature } from "../../Redux/actions/PortalThunk";
import { DOMAIN } from "../../Utils/Setting/Config";
import { encryptId } from '../../Component/SecurityComponent/cryptoUtils';
const { Text } = Typography;

export default function WorkshopPortal() {
    const dispatch = useDispatch();
    const workshops = useSelector((state) => state.PortalReducer.workShopFeatures || []);
    const totalWorkshops = useSelector((state) => state.PortalReducer.totalWorkShopFeatures || 0);

    useEffect(() => {
        localStorage.setItem("totalWorkshopElements", totalWorkshops);
    }, [totalWorkshops]);

    useEffect(() => {
        dispatch(
            get_work_shop_feature({
                page: 0,
                size: 4,
                startDate: "",
                endDate: "",
                provinceId: "",
                keyword: "",
            })
        );
    }, [dispatch]);

    const handleOpenNewTab = () => {
        window.open("/work-shop-all", "_blank");  // Opens in a new tab
    };


    const handleDetailsWorkShop = (id) => {
        const encryptedId = encryptId(id);  // Encrypt the ID first
        const url = `/workshop-details/${encodeURIComponent(encryptedId)}`;  // Make sure the encrypted ID is properly encoded
        window.location.href = url;  // Navigate to the new URL in the current tab
    };


    return (
        <div className="home-screen-workshop" data-aos="fade-up">
            <header className="workshop-header">
                <h2 className={"workshop-header-title"}>
                    <Typography.Title level={3} className={"workshop-portal-title"}>
                        Hội thảo gần đây
                    </Typography.Title>
                </h2>
                <Button
                    type="link"
                    className="see-all-button"
                    onClick={handleOpenNewTab}
                >
                    Xem tất cả
                </Button>
            </header>
            <Row gutter={[16, 16]} className="workshop-container">
                {workshops.map((workshop, index) => (
                    <Col key={workshop.id} xs={24} sm={12} md={6}>
                        <Card
                            hoverable
                            onClick={() => handleDetailsWorkShop(workshop.id)} // Đặt onClick ở đây
                            cover={
                                <img
                                    className="workshop-image-portal"
                                    src={`${DOMAIN}/api/v1/image/resource?imageId=${workshop.imageId}`}
                                    alt={workshop.title}
                                />
                            }
                            className={`workshop-card`}
                            data-index={index}
                            style={{
                                "--delay": `${index * 0.2}s`, // Tạo độ trễ 0.2 giây cho từng card
                            }}
                        >
                            <h3 className="workshop-title">{workshop.title}</h3>
                            <Text type="secondary" className="workshop-host">
                                {workshop.hostWorkshop}
                            </Text>
                            <div className="workshop-info">
                                <CalendarOutlined /> <span>{workshop.startDate}</span>
                            </div>
                            <div className="workshop-info">
                                <CalendarOutlined /> <span>{workshop.endDate}</span>
                            </div>
                            <div className="workshop-info">
                                <span className="workshop-price">Hạn đăng ký: {workshop.expireDate}</span>
                            </div>
                            <div className="workshop-info">
                                <span className="workshop-company">Số công ty tham gia: {workshop.totalCompany}</span>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
