import React, {useEffect, useState} from 'react';
import SearchBarPortal from "./SearchBarPortal";
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import JobPortal from "./JobPortal";
import BusinessPortal from "./BusinessPortal";
import WorkshopPortal from "./WorkshopPortal";
import FooterPortal from "./FooterPortal";
import IndustryPortal from "./IndustryPortal";
import BannerPortal from "./BannerPortal";
import {USER_LOGIN} from "../../Utils/Setting/Config";
import {useSelector} from "react-redux";

const HomeScreen = () => {
    const {isAuthenticated} = useSelector(state => state.UserReducer);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            const userDetails = JSON.parse(localStorage.getItem(USER_LOGIN));
            if (userDetails && userDetails.role) {
                setUserRole(userDetails.role.name);
            }
        }
    }, [isAuthenticated]);

    return (
        <div className="home-screen-container">
            <HeaderPortal/>
            <div className="card-slogan-portal">
                {/* 6 Hình ảnh trang trí */}
                <div className="corner-image top-left"></div>
                <div className="corner-image top-right"></div>
                <div className="corner-image middle-left"></div>
                <div className="corner-image middle-right"></div>
                <div className="corner-image bottom-left"></div>
                <div className="corner-image bottom-right"></div>

                {/* Nội dung chính */}
                <div className="slogan-container">
                    <h1 className="slogan-portal">Nơi kết nối doanh nghiệp và trường đại học</h1>
                    <h3 className="sub-slogan-portal">Tiếp cận 400+ công ty và trường đại học</h3>
                </div>
                <SearchBarPortal/>
            </div>
            <BannerPortal/>

            {/* Phần hiển thị tùy thuộc vào vai trò */}
            {userRole !== "BUSINESS" && (
                <div className="job-section">
                    <JobPortal/>
                </div>
            )}

            {userRole !== "BUSINESS" && (
                <div className="business-section">
                    <BusinessPortal/>
                </div>
            )}

            {userRole !== "UNIVERSITY" && (
                <div className="workshop-section">
                    <WorkshopPortal/>
                </div>
            )}

            <div className="industry-section">
                <IndustryPortal/>
            </div>
            <FooterPortal/>
        </div>
    );
};

export default HomeScreen;
