import React from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { Card, Button, Typography, Image, Col, Row } from "antd";
import "./StylePortal/WorkshopDetails.css";
import {NavLink} from "react-router-dom";

const { Title, Text } = Typography;

const WorkshopDetailsScreen = () => {
  const defaultLogo = "https://via.placeholder.com/80";
  const workshopData = {
    title: "Kỹ năng phỏng vấn và viết CV cho sinh viên IT",
    university: "Đại học Bách Khoa Hà Nội",
    date: "15/6/2024",
    time: "09:00 - 17:00",
    location: "Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    status: "Sắp diễn ra",
    description: "Workshop này sẽ cung cấp cho sinh viên IT những kỹ năng cần thiết để chuẩn bị CV ấn tượng và thành công trong các buổi phỏng vấn việc làm.",
    agenda: [
      "09:00 - Khai mạc",
      "10:00 - Kỹ năng viết CV",
      "13:00 - Nghỉ trưa",
      "14:00 - Kỹ năng phỏng vấn"
    ],
    universityInfo: {
      logo: "https://example.com/university-logo.png", // Đường dẫn logo của trường
      name: "Đại học Bách Khoa Hà Nội",
      address: "Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    },
    generalInfo: {
      companyCount: 20,
      creationDate: "1/5/2024",
      lastUpdate: "10/5/2024"
    }
  };

  return (
      <div className="app-container-workshop-details">
        <div className="content-wrapper-workshop-details">
          {/* Main Content */}
          <div className="main-content-workshop-details">
            {/* Workshop Title Section */}
            <Card className="card-workshop-details">
              <div className="image-section-workshop-details">
                <img
                    src={workshopData.image || '/assets/img/megamenu/img-4.jpg'}
                    alt="Workshop Image"
                    className="workshop-image"
                />
              </div>
              <div className="title-section-workshop-details">
                <Title level={3}>{workshopData.title}</Title>
                <Text className="university-text">{workshopData.university}</Text>
                <Button type="primary" className="register-btn-workshop-details">
                  Đăng ký tham gia
                </Button>
              </div>
              <div className="details-section-workshop-details">
                <div className="details-item-workshop-details">
                  <FaCalendarAlt /> <Text>{workshopData.date}</Text>
                </div>
                <div className="details-item-workshop-details">
                  <FaClock /> <Text>{workshopData.time}</Text>
                </div>
                <div className="details-item-workshop-details">
                  <FaMapMarkerAlt /> <Text>{workshopData.location}</Text>
                </div>
                <div className="details-item-workshop-details">
                  <FaCheckCircle className="upcoming-icon" />
                  <Text type="success">{workshopData.status}</Text>
                </div>
              </div>
            </Card>


            {/* Workshop Description */}
            <Card className="card-workshop-details">
              <Title level={3}>Mô tả</Title>
              <Text>{workshopData.description}</Text>
            </Card>
          </div>

          {/* Sidebar Content */}
          <div className="sidebar-info-workshop-details">
            {/* University Info */}
            <Card className="card-workshop-details">
              {/* Ảnh và tên trường song song */}
              <Row align="middle" gutter={[16, 16]}>
                <Row>
                  <Image
                      src={workshopData.universityInfo.logo || defaultLogo}
                      width={80}
                      height={80}
                      className="university-logo"
                  />
                  <Title level={4} className="university-name">
                    {workshopData.universityInfo.name}
                  </Title>
                </Row>
              </Row>
              <div className="info-item-workshop-details">
                <Text>Địa chỉ: {workshopData.universityInfo.address}</Text>
              </div>
              <div className="info-item-workshop-details">
                <NavLink>Xem chi tiết</NavLink>
              </div>
            </Card>

            {/* General Info */}
            <Card className="card-workshop-details">
              <Title level={3}>Thông tin chung</Title>
              <div className="info-item-workshop-details">
                <Text>Số lượng công ty dự kiến: {workshopData.generalInfo.companyCount} công ty</Text>
              </div>
              <div className="info-item-workshop-details">
                <Text>Trạng thái: {workshopData.status}</Text>
              </div>
              <div className="info-item-workshop-details">
                <Text>Ngày tạo: {workshopData.generalInfo.creationDate}</Text>
              </div>
              <div className="info-item-workshop-details">
                <Text>Cập nhật lần cuối: {workshopData.generalInfo.lastUpdate}</Text>
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default WorkshopDetailsScreen;
