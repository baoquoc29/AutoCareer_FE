import React, {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Row, Space, Typography, Input, Select} from "antd";
import {useNavigate} from "react-router-dom";
import DisplayRichText from "../../../../src/Component/TextEditDisplay/DisplayRichText.jsx";
import {PlusOutlined} from "@ant-design/icons";
import {cacheNames as chrome} from "workbox-core/src";

const {Text, Title} = Typography;

const UniversityDetailPage = () => {

    const navigate = useNavigate();

    // Dữ liệu mẫu
    const [businessData, setBusinessData] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState(""); // Từ khóa tìm kiếm
    const [locationFilter, setLocationFilter] = useState(""); // Lọc theo địa điểm

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log("Received message:", message);
        sendResponse({ response: "Message received" });
    });
    useEffect(() => {
        // Sử dụng dữ liệu tạm thời
        setBusinessData({
            name: "Công ty Công nghệ ABC",
            description: "<p>Công ty chuyên cung cấp giải pháp công nghệ thông tin</p>",
            address: "123 Đường Công nghệ, Hà Nội",
            email: "contact@abc-tech.vn",
            phone: "0123-456-789",
            website: "https://abc-tech.vn",
            recruitments: [
                {
                    id: 1,
                    title: "Lập trình viên Frontend",
                    description: "<p>Phát triển giao diện người dùng cho các ứng dụng web.</p>",
                    location: "Hà Nội"
                },
                {
                    id: 2,
                    title: "Kỹ sư Backend",
                    description: "<p>Xây dựng và quản lý hệ thống máy chủ.</p>",
                    location: "TP.HCM"
                },
            ],
        });
    }, []);

    if (!businessData) {
        return (
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
                            <div>Không tìm thấy thông tin doanh nghiệp.</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Lọc dữ liệu tuyển dụng theo từ khóa và địa điểm
    const filteredRecruitments = businessData.recruitments.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchKeyword.toLowerCase());
        const matchesLocation = locationFilter ? job.location === locationFilter : true;
        return matchesSearch && matchesLocation;
    });

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div style={{padding: "20px", maxWidth: "1200px", margin: "auto"}}>
                        <Row gutter={[16, 16]} style={{display: 'flex', flexWrap: 'wrap'}}>
                            {/ Khối chia tên công ty /}
                            <Col span={24}>
                                <Card bordered={false}>
                                    <Row align="middle" justify="start">
                                        {/ Logo hình tròn /}
                                        <Col>
                                            <img
                                                src={"aotucareer-logo.svg" || "https://via.placeholder.com/80"}
                                                alt="Logo công ty"
                                                style={{
                                                    width: 150,
                                                    height: 150,
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </Col>

                                        <Col style={{marginLeft: "12px"}}>
                                            {/ Tên công ty /}
                                            <Title level={3} style={{margin: 0, marginBottom: "10px"}}>
                                                {businessData.name}
                                            </Title>

                                            {/ Thông tin email và quy mô /}
                                            <Row gutter={[16, 8]}>
                                                <Col>
                                                    <Text
                                                        type="secondary">Email: {businessData.email || "Chưa có email"}</Text>
                                                </Col>
                                                <Col>
                                                    <Text type="secondary">Quy
                                                        mô: {businessData.size || "Không xác định"}</Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                        {/ Nút Theo dõi /}
                                        <Col flex="auto" style={{textAlign: "right"}}>
                                            <Button
                                                type="primary"
                                                style={{borderRadius: "20px"}}
                                                onClick={() => alert("Theo dõi công ty!")}
                                            >
                                                <PlusOutlined/> Theo dõi công ty
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[16, 16]} style={{display: 'flex', flexWrap: 'wrap'}}>
                                    {/ Khối chia phần giới thiệu công ty và thông tin tuyển dụng /}
                                    <Col span={18} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start'
                                    }}>
                                        {/ Giới thiệu công ty /}
                                        <Row gutter={[16, 16]} style={{display: 'flex', flexWrap: 'wrap'}}>
                                            <Col span={24}>
                                                <Card bordered={false}>
                                                    <Divider orientation="left"
                                                             style={{fontSize: "18px", color: "#096dd9"}}>
                                                        Giới thiệu công ty
                                                    </Divider>
                                                    <DisplayRichText content={businessData.description}/>
                                                </Card>
                                            </Col>
                                            {/ Thông tin tuyển dụng /}
                                            <Col span={24}>
                                                <Card bordered={false}>
                                                    <Divider orientation="left"
                                                             style={{fontSize: "18px", color: "#096dd9"}}>
                                                        Tuyển dụng
                                                    </Divider>

                                                    {/ Tìm kiếm và lọc theo địa điểm /}
                                                    <Space style={{marginBottom: "16px"}}>
                                                        {/ Thanh tìm kiếm /}
                                                        <Input
                                                            placeholder="Tìm kiếm công việc"
                                                            value={searchKeyword}
                                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                                            style={{width: "200px"}}
                                                        />
                                                        {/ Filter theo địa điểm /}
                                                        <Select
                                                            placeholder="Chọn địa điểm"
                                                            value={locationFilter}
                                                            onChange={(value) => setLocationFilter(value)}
                                                            style={{width: "200px"}}
                                                        >
                                                            <Select.Option value="">Tất cả</Select.Option>
                                                            <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                                                            <Select.Option value="TP.HCM">TP.HCM</Select.Option>
                                                        </Select>
                                                    </Space>

                                                    {filteredRecruitments.length > 0 ? (
                                                        filteredRecruitments.map((job) => (
                                                            <Card key={job.id} bordered={false}
                                                                  style={{marginBottom: "10px"}}>
                                                                <Row gutter={[16, 16]}
                                                                     style={{display: 'flex', flexWrap: 'wrap'}}>
                                                                    {/ Ảnh công ty /}
                                                                    <Col span={5} style={{
                                                                        display: "flex",
                                                                        alignItems: "center"
                                                                    }}>
                                                                        <img
                                                                            src={"aotucareer-logo.svg"} // lấy ra ảnh từ công ty
                                                                            alt="Company Logo"
                                                                            width={50}
                                                                            height={50}
                                                                            style={{
                                                                                borderRadius: "5px",
                                                                                marginRight: "10px"
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                    <Col span={19} style={{textAlign: "left"}}>
                                                                        <Row gutter={[16, 16]} style={{
                                                                            display: 'flex',
                                                                            flexWrap: 'wrap'
                                                                        }}>
                                                                            <Col span={20} style={{textAlign: "left"}}>
                                                                                {/ Nút xem chi tiết /}
                                                                                <div>
                                                                                    {/ Tiêu đề công việc /}
                                                                                    <Text strong style={{
                                                                                        fontSize: "16px",
                                                                                        color: "#096dd9"
                                                                                    }}>{job.title}</Text>
                                                                                    {/ Tên công ty /}
                                                                                    <div>
                                                                                        <DisplayRichText
                                                                                            content={businessData.name}/>
                                                                                    </div>
                                                                                </div>
                                                                                <Row gutter={[16, 16]} style={{
                                                                                    display: 'flex',
                                                                                    flexWrap: 'wrap'
                                                                                }}>
                                                                                    {/ Địa điểm làm việc /}
                                                                                    <Col span={8} style={{
                                                                                        border: '1px solid #d9d9d9',
                                                                                        backgroundColor: '#f0f0f0', // Màu xám
                                                                                        borderRadius: '8px', // Bo góc
                                                                                        padding: '5px' // Thêm padding để nội dung không sát mép
                                                                                    }}>
                                                                                        <Text style={{
                                                                                            fontSize: "13px"
                                                                                        }}>{job.location}</Text>
                                                                                    </Col>
                                                                                    {/ Ngày hết hạn /}
                                                                                    <Col span={8} style={{
                                                                                        textAlign: "left",
                                                                                        border: '1px solid #d9d9d9',
                                                                                        backgroundColor: '#f0f0f0', // Màu xám
                                                                                        borderRadius: '8px', // Bo góc
                                                                                        padding: '5px' // Thêm padding để nội dung không sát mép
                                                                                    }}>
                                                                                        <Text
                                                                                            style={{fontSize: "13px"}}>{job.remainingDays} ngày
                                                                                            còn hạn</Text>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                            {/ Lương /}
                                                                            <Col span={4}
                                                                                 style={{textAlign: "right"}}>
                                                                                <Text strong style={{
                                                                                    fontSize: "16px",
                                                                                    color: "#096dd9"
                                                                                }}>12M</Text>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>

                                                                {/ Nút xem chi tiết /}
                                                                <Row justify="end">
                                                                    <Button
                                                                        type="link"
                                                                        onClick={() => navigate(`/job-detail/${job.id}`)}
                                                                        style={{padding: 0}}
                                                                    >
                                                                        Xem chi tiết
                                                                    </Button>
                                                                </Row>
                                                            </Card>
                                                        ))
                                                    ) : (
                                                        <Text>Không có thông tin tuyển dụng.</Text>
                                                    )}
                                                </Card>
                                            </Col>

                                        </Row>
                                    </Col>

                                    {/ Thông tin liên hệ /}
                                    <Col span={6}>
                                        <Card bordered={false}>
                                            <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>
                                                Thông tin liên hệ
                                            </Divider>
                                            {/ Địa chỉ của công ty /}
                                            <Col span={24}>
                                                <Space direction="vertical" size={8}>  {/ Tăng size từ 4 lên 8 /}
                                                    <Text strong>Địa chỉ:</Text>
                                                    <Text>{businessData.address}</Text>
                                                </Space>
                                            </Col>
                                            {/ Email của công ty /}
                                            <Col span={24}>
                                                <Space direction="vertical" size={8}>  {/ Tăng size từ 4 lên 8 /}
                                                    <Text strong>Email:</Text>
                                                    <Text>{businessData.email}</Text>
                                                </Space>
                                            </Col>
                                            {/ Số điện thoại công ty /}
                                            <Col span={24}>
                                                <Space direction="vertical" size={8}>  {/ Tăng size từ 4 lên 8 /}
                                                    <Text strong>Số điện thoại:</Text>
                                                    <Text>{businessData.phone}</Text>
                                                </Space>
                                            </Col>
                                            {/ Website công ty /}
                                            <Col span={24}>
                                                <Space direction="vertical" size={8}>  {/ Tăng size từ 4 lên 8 /}
                                                    <Text strong>Website:</Text>
                                                    <Text>{businessData.website}</Text>
                                                </Space>
                                            </Col>
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

export default UniversityDetailPage;