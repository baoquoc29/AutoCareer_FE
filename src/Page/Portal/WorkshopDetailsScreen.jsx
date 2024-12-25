import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import {Card, Button, Typography, Image, Col, Row, Modal} from "antd";
import "./StylePortal/WorkshopDetails.css";
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import FooterPortal from "./FooterPortal";
import { DOMAIN } from "../../Utils/Setting/Config";
import dayjs from "dayjs";
import {useParams, NavLink, useNavigate, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {get_work_shop_by_id, request_work_shop, status_work_shop} from "../../Redux/actions/PortalThunk";
import { decryptId } from '../../Component/SecurityComponent/cryptoUtils';
import PageError from "../PageError404/PageError"

const { Title, Text } = Typography;

const WorkshopDetailsScreen = () => {
  const { id } = useParams();
  const workshop = useSelector((state) => state.PortalReducer.workShopDetails);
  const status = useSelector((state) => state.PortalReducer.statusWorkshop);
  const {isAuthenticated, userData} = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const [encryptedId, setEncryptedId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);
  const navigate = useNavigate();
  useEffect(() => {
    setEncryptedId(id);
  }, [id]);
  useEffect(() => {
    if (encryptedId) {
        dispatch(get_work_shop_by_id(decryptId(encryptedId)));
      if (userData) {
        if(userData?.business?.id !== undefined){
          dispatch(status_work_shop(decryptId(encryptedId), userData.business.id));
        }
        else{
          console.log("Người dùng không phải doanh nghiệp");
          navigate('/');
        }
      }
    }
  }, [dispatch, encryptedId]);
  useEffect(() => {
    setLocalStatus(status); // Cập nhật localStatus khi status từ Redux store thay đổi
  }, [status]);

  if (!workshop) {
      return <PageError></PageError>
  }
  const getButtonStyle = () => {
    switch (localStatus) {
      case "PENDING":
        return { backgroundColor: '#bcb9b9', color: '#FFFFFF' }; // Màu cam
      case "APPROVED":
        return { backgroundColor: '#4CAF50', color: '#FFFFFF' }; // Màu xanh lá
      case "REJECTED":
        return { backgroundColor: '#F44336', color: '#FFFFFF' }; // Màu đỏ
      default:
        return { backgroundColor: '#1890ff', color: '#FFFFFF' }; // Màu xanh dương mặc định
    }
  };

  const handleRegister = async () => {
    if (userData) {
      const body = {
        businessID: userData.business.id,
        workshopID: workshop.id,
      };
      await dispatch(request_work_shop(body));
      setLocalStatus("PENDING");
      Modal.success({
        title: "Đăng ký thành công",
        content: "Bạn đã đăng ký tham gia workshop thành công, vui lòng chờ duyệt!",
      });
    } else {
      const currentUrl = window.location.pathname; // Lấy URL hiện tại
      window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`; // Lưu URL vào query param
    }
    setIsModalVisible(false);
  };
  const getButtonContent = () => {
    switch (localStatus) {
      case "PENDING":
        return "Đang chờ duyệt";
      case "APPROVED":
        return "Đã phê duyệt";
      case "REJECTED":
        return "Từ chối";
      default:
        return "Đăng ký tham gia";
    }
  };

  const showConfirmModal = () => {
    setIsModalVisible(true);
  };
  const isButtonDisabled = () => {
    return localStatus === "PENDING" || localStatus === "APPROVED" || localStatus === "REJECTED";
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
      <div className={"app-container-workshop-details-root"}>
        <HeaderPortal />
        <div className="app-container-workshop-details">
          <div className="content-wrapper-workshop-details">
            {/* Main Content */}
            <div className="main-content-workshop-details">
              <Card className="card-workshop-details">
                <div className="image-section-workshop-details">
                  <Image
                      src={`${DOMAIN}/api/v1/image/resource?imageId=${workshop.imageId}`}
                      alt="Workshop Image"
                      className="workshop-image"
                  />
                </div>
                <div className="title-section-workshop-details">
                  <Title level={3}>{workshop.title}</Title>
                  <Button
                      type="primary"
                      style={getButtonStyle()}
                      className="register-btn-workshop-details"
                      onClick={showConfirmModal}
                      disabled={isButtonDisabled()}
                  >
                    {getButtonContent()}
                  </Button>
                  <Modal
                      title="Xác nhận đăng ký"
                      open={isModalVisible}
                      onOk={handleRegister}
                      onCancel={handleCancel}
                      okText="Đồng ý"
                      cancelText="Hủy bỏ"
                  >
                    <p>Bạn có chắc chắn muốn đăng ký tham gia workshop này không?</p>
                  </Modal>
                </div>
                <div className="details-section-workshop-details">
                  <div className="details-item-workshop-details">
                    <FaCalendarAlt /> <Text>{dayjs(workshop.startDate, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY')}</Text>
                  </div>
                  <div className="details-item-workshop-details">
                    <FaCalendarAlt /> <Text>{dayjs(workshop.endDate, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY')}</Text>
                  </div>
                  <div className="details-item-workshop-details">
                    <FaClock /> <Text>{dayjs(workshop.startDate, 'DD/MM/YYYY HH:mm').format('HH:mm')} : {dayjs(workshop.endDate, 'DD/MM/YYYY HH:mm').format('HH:mm')}</Text>
                  </div>
                  <div className="details-item-workshop-details">
                    <FaMapMarkerAlt /> <Text>{workshop.address ?? ''}, {workshop.ward ?? ''}, {workshop.district ?? ''}, {workshop.province ?? ''}</Text>
                  </div>
                </div>
              </Card>

              {/* Workshop Description */}
              <Card className="card-workshop-details">
                <Title level={3}>Mô tả</Title>
                <div
                    dangerouslySetInnerHTML={{
                      __html: workshop.description,
                    }}
                />
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="sidebar-info-workshop-details">
              <Card className="card-workshop-details" hoverable>
                <Row gutter={[16, 16]} align="middle">
                  <Col span={6}>
                    <Image
                        src={`${DOMAIN}/api/v1/image/resource?imageId=${workshop.imageUniversity}`}
                        width={80}
                        height={80}
                        className="university-logo"
                        style={{ borderRadius: '8px', objectFit: 'cover' }}
                    />
                  </Col>
                  <Col span={18}>
                    <Title level={5} className="university-name" style={{ paddingTop: 50 }}>
                      {workshop.hostWorkshop}
                    </Title>
                    <div className="info-item-workshop-details">
                      <NavLink to={`/workshop/${workshop.id}`} style={{ fontWeight: 'bold', justifyContent: "center", marginLeft: "50px", color: '#1890ff' }}>
                        Xem chi tiết
                      </NavLink>
                    </div>
                  </Col>
                </Row>
              </Card>

              {/* General Info */}
              <Card className="card-workshop-details">
                <Title level={3}>Thông tin chung</Title>
                <div className="info-item-workshop-details">
                  <Text>Số lượng công ty dự kiến: {workshop.totalCompany} công ty</Text>
                </div>
                <div className="info-item-workshop-details">
                  <Text>Trạng thái: Sẵn sàng </Text>
                </div>
                <div className="info-item-workshop-details">
                  <Text>Ngày tạo: {dayjs(workshop.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
                </div>
                <div className="info-item-workshop-details">
                  <Text>
                    Cập nhật lần cuối: {
                    workshop.updatedAt && dayjs(workshop.updatedAt).isValid()
                        ? dayjs(workshop.updatedAt).format('DD/MM/YYYY HH:mm')
                        : (workshop.createdAt && dayjs(workshop.createdAt).isValid() ? dayjs(workshop.createdAt).format('DD/MM/YYYY HH:mm') : 'Không có thông tin')
                  }
                  </Text>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <FooterPortal />
      </div>
  );
};

export default WorkshopDetailsScreen;
