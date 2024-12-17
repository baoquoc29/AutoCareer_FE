import React from "react";
import { Card, Button, Row, Col, Typography,Select } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import "./StylePortal/WorkshopPortal.css"


const { Text } = Typography;

const workshops = [
    {
        id: 1,
        title: "Make friends & BlaBla Language Exchange Hanoi",
        host: "Make friends & BlaBla Language Exchange Hanoi",
        date: "Thu, Dec 12 · 7:30 PM GMT+7",
        attendees: 45,
        price: "Free",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=60",
    },
    {
        id: 2,
        title: "Hanoi English Club",
        host: "Hanoi English Club",
        date: "Fri, Dec 13 · 7:30 PM GMT+7",
        attendees: 4,
        price: "Free",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=60",
    },
    {
        id: 3,
        title: "Make friends & BlaBla Language Exchange Hanoi #2",
        host: "Make friends  Hanoi 2",
        date: "Fri, Dec 20 · 8:00 PM GMT+7",
        attendees: 18,
        price: "Free",
        image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?auto=format&fit=crop&w=400&q=60",
    },
    {
        id: 4,
        title: "Make Friends & BlaBla Language Exchange - Special Secret Santa Hanoi",
        host: "Make friends & BlaBla Language",
        date: "Thu, Dec 19 · 7:30 PM GMT+7",
        attendees: 27,
        price: "Free",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=60",
    },
];

export default function WorkshopPortal() {
    return (
        <div className="home-screen-workshop">
            <header className="workshop-header">
                <h2 className={"workshop-header-title"}>
                    <Typography.Title level={3}>
                        Hội thảo tại

                    </Typography.Title>
                    <div className="workshop-actions">
                        <Select
                            defaultValue="Tất cả"
                            style={{width: 150, marginRight: '10px'}}
                            className="region-select"
                        >
                            <Select.Option value="Tất cả">Tất cả</Select.Option>
                            <Select.Option value="Miền Bắc">Miền Bắc</Select.Option>
                            <Select.Option value="Miền Trung">Miền Trung</Select.Option>
                            <Select.Option value="Miền Nam">Miền Nam</Select.Option>
                        </Select>
                    </div>
                </h2>
                <Button type="link" className="see-all-button">Xem tất cả</Button>
            </header>
            <Row gutter={[16, 16]} className="workshop-container">
                {workshops.map((workshop) => (
                    <Col key={workshop.id} xs={24} sm={12} md={6}>
                        <Card
                            hoverable
                            cover={<img alt={workshop.title} src={workshop.image} className="workshop-image"/>}
                            className="workshop-card"
                        >
                            <h3 className="workshop-title">{workshop.title}</h3>
                            <Text type="secondary" className="workshop-host">Hosted by: {workshop.host}</Text>
                            <div className="workshop-info">
                                <CalendarOutlined/> <span>{workshop.date}</span>
                            </div>
                            <div className="workshop-info">
                                <UserOutlined/> <span>{workshop.attendees} going</span>
                            </div>
                            <div className="workshop-info">
                                <span className="workshop-price">{workshop.price}</span>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
