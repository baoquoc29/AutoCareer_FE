import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Row, Col, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { get_all_industry } from "../../Redux/actions/IndustryThunk";
import { get_all_business_feature } from "../../Redux/actions/PortalThunk";
import { DOMAIN } from "../../Utils/Setting/Config";
import "../Portal/StylePortal/BusinessPortal.css";
import {encryptId} from "../../Component/SecurityComponent/cryptoUtils";
const BusinessPortal = () => {
    const [selectedIndustryId, setSelectedIndustryId] = useState(0); // Mặc định chọn "Tất cả" (id = 0)
    const locationListRef = useRef(null);
    const dispatch = useDispatch();

    const industries = useSelector((state) => state.IndustryReducer.industriesAll || []);
    const businesses = useSelector((state) => state.PortalReducer.businessFeatures || []);
    const totalBusinessElements = useSelector((state) => state.PortalReducer.totalBusinessFeatures || 0);
    // Thêm "Tất cả" vào danh sách ngành
    const updatedIndustries = useMemo(() =>
            [{ id: 0, name: "Tất cả" }, ...industries.map((industry) => ({ id: industry.id, name: industry.name }))],
        [industries]
    );
    useEffect(() => {
        localStorage.setItem('totalBusinessElements', totalBusinessElements);
    }, [totalBusinessElements]); // Dễ dàng theo dõi thay đổi của totalElements
    // Gọi API để lấy danh sách ngành và doanh nghiệp
    useEffect(() => {
        if (!industries.length) {
            dispatch(get_all_industry());
        }
        dispatch(get_all_business_feature());
    }, [dispatch, industries.length]);

    // Cuộn mượt sang trái/phải
    const scrollLeft = () => smoothScroll(locationListRef.current, -500);
    const scrollRight = () => smoothScroll(locationListRef.current, 500);

    const smoothScroll = (element, distance) => {
        if (!element) return;
        const start = element.scrollLeft;
        const change = distance;
        const duration = 500;
        let startTime = null;

        const animateScroll = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            element.scrollLeft = start + change * progress;

            if (elapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    const handleDetailsBusinessPortal = (id) => {
        const encryptedId = encryptId(id);  // Encrypt the ID first
        const url = `/business-portal-detail/${encodeURIComponent(encryptedId)}`;  // Make sure the encrypted ID is properly encoded
        window.open(url, "_blank");  // Open in a new tab
    };

    // Thay đổi ngành được chọn
    const onChangeIndustry = useCallback((industryId) => {
        setSelectedIndustryId(industryId);
        dispatch(get_all_business_feature(industryId));
    }, [dispatch]);

    // Lọc doanh nghiệp dựa trên ngành đã chọn
    const filteredBusiness = useMemo(() =>
            selectedIndustryId === 0
                ? businesses
                : businesses.filter((business) => business.industryId === selectedIndustryId),
        [selectedIndustryId, businesses]
    );

    return (
        <Card data-aos="fade-up" className="business-portal-card-container"  >
            <div className="business-portal-header">
                Doanh nghiệp tiêu biểu
            </div>

            {/* Container cuộn ngành */}
            <div className="industry-scroll-container">
                <button className="scroll-btn" onClick={scrollLeft}>{"<"}</button>
                <div className="industry-list" ref={locationListRef}>
                    {updatedIndustries.map((industry) => (
                        <div
                            key={industry.id}
                            className={`industry-item ${selectedIndustryId === industry.id ? "active" : ""}`}
                            onClick={() => onChangeIndustry(industry.id)} // Dùng industry.id thay vì industry.name
                        >
                            {industry.name}
                        </div>
                    ))}
                </div>
                <button className="scroll-btn" onClick={scrollRight}>{">"}</button>
            </div>

            <Row gutter={[16, 16]} className="grid-business-portal">
                {filteredBusiness.length > 0 ? (
                    filteredBusiness.map((business, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <div className="business-portal-card">
                                <div
                                    className="business-portal-card-image"
                                    onClick={() => handleDetailsBusinessPortal(business.id)}
                                >
                                    <img
                                        src={`${DOMAIN}/api/v1/image/resource?imageId=${business.imageID}`}
                                        alt={business.businessName || "Job Image"}
                                    />
                                </div>
                                <div className="business-portal-card-content">
                                    <h3 className="business-portal-card-title">{business.businessName}</h3>
                                    <p className="business-portal-card-company">{business.industryName}</p>
                                    <div className="business-portal-card-location-salary">
                                        <span className="business-portal-card-tag">{business.totalJob} Việc làm</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))
                ) : (
                    <p className="no-business-message">Không có công ty nào trong ngành này</p>
                )}
            </Row>
        </Card>
    );
};

export default BusinessPortal;
