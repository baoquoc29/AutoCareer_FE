import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_business_feature } from "../../Redux/actions/PortalThunk";
import { DOMAIN } from "../../Utils/Setting/Config";
import { encryptId } from "../../Component/SecurityComponent/cryptoUtils";
import { Card, Badge, Button, Tag, Space, Empty } from "antd";
import { EnvironmentOutlined, RightOutlined } from "@ant-design/icons";
import "../Portal/StylePortal/BusinessPortal.css";
import { useNavigate } from 'react-router-dom';
const BusinessPortal = () => {
    const dispatch = useDispatch();
    const businesses = useSelector((state) => state.PortalReducer.businessFeatures || []);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(get_all_business_feature());
    }, [dispatch]);

    const handleDetailsBusinessPortal = (id) => {
        const encryptedId = encryptId(id);
        const url = `/business-portal-detail/${encodeURIComponent(encryptedId)}`;
        window.open(url, "_blank");
    };
    const handleViewAllCompanies = () => {

        navigate('/business-section');
    };

    return (
        <section className="business-portal-container">
            <div className="business-portal-header">
                <h2 className="business-portal-title">Công ty nổi bật</h2>
                <p className="business-portal-subtitle">
                    Khám phá các công ty hàng đầu đang tuyển dụng
                </p>
            </div>

            {businesses.length > 0 ? (
                <>
                    <div className="business-grid">
                        {businesses.map((company, index) => {
                            const industries = Array.isArray(company.industryName)
                                ? company.industryName.slice(0, 3)
                                : [];
                            const totalJob = company.totalJob || 0;
                            const province = company.province || "Địa điểm không xác định";

                            return (
                                <Card
                                    key={index}
                                    className="business-card"
                                    hoverable
                                    cover={
                                        <div className="business-image-container">
                                            <img
                                                src={`${DOMAIN}/api/v1/image/resource?imageId=${company.imageID}`}
                                                alt={company.businessName || "Công ty"}
                                                className="business-image"
                                                onError={(e) => {
                                                    e.target.src = '/default-company.jpg';
                                                    e.target.onerror = null;
                                                }}
                                            />
                                        </div>
                                    }
                                    onClick={() => company.id && handleDetailsBusinessPortal(company.id)}
                                >
                                    <div className="business-card-content">
                                        <div className="business-card-header">
                                            <h3 className="business-name" title={company.businessName}>
                                                {company.businessName || "Công ty không tên"}
                                            </h3>
                                            {totalJob > 0 && (
                                                <Badge
                                                    count={`${totalJob} vị trí`}
                                                    className="job-count-badge"
                                                    style={{ backgroundColor: '#1890ff' }}
                                                />
                                            )}
                                        </div>

                                        <div className="business-location">
                                            <Space>
                                                <EnvironmentOutlined className="location-icon" />
                                                <span>{company.address}</span>
                                            </Space>
                                        </div>

                                        {industries.length > 0 && (
                                            <div className="business-industries">
                                                <Space size={[4, 8]} wrap>
                                                    {industries.slice(0, 3).map((industry, idx) => (
                                                        <Tag key={idx} className="industry-tag">
                                                            {industry}
                                                        </Tag>
                                                    ))}
                                                </Space>
                                            </div>
                                        )}

                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="view-all-container">
                        <Button
                            type="primary"
                            className="view-all-button"
                            size="large"
                            onClick={handleViewAllCompanies}
                        >
                            Xem tất cả công ty
                        </Button>

                    </div>
                </>
            ) : (
                <div className="business-empty">
                    <Empty
                        description="Hiện chưa có công ty nổi bật nào"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                </div>
            )}
        </section>
    );
};

export default BusinessPortal;