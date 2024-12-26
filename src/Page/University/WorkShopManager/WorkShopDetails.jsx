import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Row, Col, Modal, List } from "antd";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { DOMAIN } from "../../../Utils/Setting/Config";
import { useDispatch, useSelector } from "react-redux";
import {
    accept_company_work_shop, get_all_company_accept,
    get_all_company_pending, reject_company_work_shop,
} from "../../../Redux/actions/WorkShopThunk";
import {toast} from "react-toastify";

const { Text } = Typography;

const WorkShopDetails = ({ workshop, onBack, onViewCompanyList, onViewPendingCompanies }) => {
    const { title, description, startDate, endDate, expireDate, workshopImageId, location } = workshop;
    const { province, district, ward, description: addressDescription } = location || {};
    const imageWorkshop = workshopImageId ? `${DOMAIN}/api/v1/image/resource?imageId=${workshopImageId}` : "";
    const dispatch = useDispatch();
    const { pendingCompany } = useSelector(state => state.WorkShopReducer);
    const { acceptCompany } = useSelector(state => state.WorkShopReducer);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalCompanyListVisible, setIsModalCompanyListVisible] = useState(false);
    const [isModalPendingCompaniesVisible, setIsModalPendingCompaniesVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const showModalCompanyList = () => setIsModalCompanyListVisible(true);
    const handleCancelCompanyList = () => setIsModalCompanyListVisible(false);

    const showModalPendingCompanies = () => setIsModalPendingCompaniesVisible(true);
    const handleCancelPendingCompanies = () => setIsModalPendingCompaniesVisible(false);

    useEffect(() => {
        dispatch(get_all_company_pending(workshop.id));
         dispatch(get_all_company_accept(workshop.id));
    }, [dispatch, workshop.id]);
    const handleAccept = async (idWorkShop, idCompany) => {

       const body = {
           workshopID: idWorkShop,
           businessID: idCompany,
       };

        Modal.confirm({
            title: 'Xác nhận duyệt công ty tham gia',
            cancelText: 'Hủy',
            centered: true,
            onOk: async () => {
                try {
                    await dispatch(accept_company_work_shop(body));
                    await dispatch(get_all_company_pending(idWorkShop));
                    await dispatch(get_all_company_accept(idWorkShop));
                    setIsModalPendingCompaniesVisible(false);
                    toast.success("Doanh nghiệp đã được chấp nhận");
                } catch (error) {
                    console.error('Error accepting company:', error);

                }
            },
        });
    };
    const handleReject = async (idWorkShop, idCompany) => {

        const body = {
            workshopID: idWorkShop,
            businessID: idCompany,
        };

        Modal.confirm({
            title: 'Xác nhận từ chối công ty tham gia',
            cancelText: 'Hủy',
            centered: true,
            onOk: async () => {
                try {
                    await dispatch(reject_company_work_shop(body));
                    await dispatch(get_all_company_pending(idWorkShop));

                    setIsModalPendingCompaniesVisible(false);
                    toast.success("Doanh nghiệp bị từ chối");
                } catch (error) {
                    console.error('Error accepting company:', error);
                }
            },
        });
    };

    const fullAddress = [
        addressDescription,
        ward?.fullName,
        district?.fullName,
        province?.fullName,
    ]
        .filter((part) => part)
        .join(", ") || "Không có thông tin địa chỉ";

    return (
        <Card
            title={<span style={{ color: "#1890ff" }}>Chi Tiết Hội Thảo</span>}
            style={{
                width: "100%",
                margin: "20px 0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Nút danh sách công ty */}
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
                <Button type="primary" onClick={showModalCompanyList} style={{ marginRight: "10px" }}>
                    Danh sách công ty tham gia
                </Button>
                <Button type="default" onClick={showModalPendingCompanies}>
                    Danh sách công ty chờ duyệt
                </Button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Tiêu đề */}
                <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "10px" }}>
                    <p style={{ color: "#000000" , fontWeight: "bold" }}>Tiêu Đề:</p>
                    <Text style={{ fontSize: "16px" }}>{title}</Text>
                </div>

                {/* Ngày bắt đầu, ngày kết thúc, ngày hết hạn */}
                <Row gutter={16}>
                    <Col span={8}>
                        <div>
                            <p style={{font: 'black' , fontWeight: "bold"}}>Ngày bắt đầu:</p>
                            <Text>{startDate}</Text>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <p style={{font: 'black' , fontWeight: "bold"}} >Ngày kết thúc:</p>
                            <Text>{endDate}</Text>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <p style={{font: 'black' , fontWeight: "bold"}}>Ngày hết hạn:</p>
                            <Text>{expireDate}</Text>
                        </div>
                    </Col>
                </Row>

                {/* Địa chỉ */}
                <div>
                    <p style={{font: 'black' , fontWeight: "bold"}}>Địa chỉ:</p>
                    <Text>{fullAddress}</Text>
                </div>

                {/* Mô tả */}
                <div>
                    <p style={{font: 'black' , fontWeight: "bold"}}>Mô tả:</p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: description || "<p>Không có mô tả</p>",
                        }}
                        style={{
                            width: "100%",
                            minHeight: "100px",
                            padding: "12px",
                        }}
                    />
                </div>

                {/* Nút xem ảnh */}
                <div>
                    <p style={{font: 'black' , fontWeight: "bold"}}>Ảnh:</p>
                    {imageWorkshop ? (
                        <Button onClick={showModal} type="primary">
                            Xem ảnh
                        </Button>
                    ) : (
                        <Text style={{ color: "#ff4d4f" }}>Không có ảnh</Text>
                    )}
                </div>

                {/* Nút quay lại */}
                <div style={{font: 'black' , fontWeight: "bold",textAlign: "right"}}>
                    <Button onClick={onBack} style={{ backgroundColor: "#1890ff", color: "#fff" }}>
                        Quay lại
                    </Button>
                </div>
            </div>

            {/* Modal xem ảnh */}
            <Modal open={isModalVisible} footer={null} onCancel={handleCancel} width={600}>
                <img
                    src={imageWorkshop}
                    alt="Workshop"
                    style={{
                        width: "100%",
                        objectFit: "contain",
                    }}
                />
            </Modal>

            {/* Modal danh sách công ty tham gia */}
            <Modal
                title="Danh sách công ty tham gia"
                open={isModalCompanyListVisible}
                onCancel={handleCancelCompanyList}
                footer={null}
                width={600}
            >
                <List
                    bordered
                    dataSource={acceptCompany}
                    renderItem={(item) => (
                        <List.Item key={item.id} // Add key here
                                   actions={[
                                       <Button
                                           key={`view-${item.id}`} // Unique key for this button
                                           icon={<EyeOutlined />}
                                           type="link"
                                           onClick={() => onViewCompanyList(item)}
                                       />,
                                   ]}
                        >
                            <span>{item.name}</span>
                        </List.Item>

                    )}
                />
            </Modal>

            <Modal
                title="Danh sách công ty chờ duyệt"
                open={isModalPendingCompaniesVisible}
                onCancel={handleCancelPendingCompanies}
                footer={null}
                width={600}
            >
                <List
                    bordered
                    dataSource={pendingCompany.length > 0 ? pendingCompany : []}
                    renderItem={(item) => {
                        if (typeof item === "string") {
                            return (
                                <List.Item>
                                    <span>{item}</span>
                                </List.Item>
                            );
                        }
                        return (
                            <List.Item key={item.id} // Add key to List.Item to ensure uniqueness
                                       actions={[
                                           <Button
                                               key={`approve-${item.id}`} // Unique key for this button
                                               type="link"
                                               icon={<CheckOutlined />}

                                               onClick={() => handleAccept(workshop.id,item.id)}
                                           />,
                                           <Button
                                               key={`reject-${item.id}`} // Unique key for this button
                                               type="link"
                                               icon={<CloseOutlined />}
                                               onClick={() => handleReject(workshop.id,item.id)}
                                           />,
                                           <Button
                                               key={`view-${item.id}`} // Unique key for this button
                                               type="link"
                                               icon={<EyeOutlined />}
                                               onClick={() => onViewPendingCompanies(item, "view")}
                                           />,
                                       ]}
                            >
                                <span>{item.name}</span>
                            </List.Item>
                        );
                    }}
                />
            </Modal>

        </Card>
    );
};

WorkShopDetails.propTypes = {
    workshop: PropTypes.shape({
        id : PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        expireDate: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        workshopImageId: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
        location: PropTypes.shape({
            province: PropTypes.shape({
                name: PropTypes.string,
                fullName: PropTypes.string,
            }),
            district: PropTypes.shape({
                name: PropTypes.string,
                fullName: PropTypes.string,
            }),
            ward: PropTypes.shape({
                name: PropTypes.string,
                fullName: PropTypes.string,
            }),
            description: PropTypes.string,
        }),
    }).isRequired,
    onBack: PropTypes.func.isRequired,
    onViewCompanyList: PropTypes.func.isRequired,
    onViewPendingCompanies: PropTypes.func.isRequired,
};

export default WorkShopDetails;
