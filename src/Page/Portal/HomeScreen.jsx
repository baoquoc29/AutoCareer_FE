import React, { useEffect, useState } from "react";
import SearchBarPortal from "./SearchBarPortal";
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import JobPortal from "./JobPortal";
import BusinessPortal from "./BusinessPortal";
import FooterPortal from "./FooterPortal";
import IndustryPortal from "./IndustryPortal";
import BannerPortal from "./BannerPortal";
import { USER_LOGIN } from "../../Utils/Setting/Config";
import { useSelector } from "react-redux";
import ChatBox from "./SupportChat"; // Import ChatBox
import "./StylePortal/HomeScreen.css";

const HomeScreen = () => {
    const { isAuthenticated } = useSelector((state) => state.UserReducer);
    const [userRole, setUserRole] = useState("");
    const [showChatBox, setShowChatBox] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            const userDetails = JSON.parse(localStorage.getItem(USER_LOGIN));
            if (userDetails && userDetails.role) {
                setUserRole(userDetails.role.name);
            }
        }
    }, [isAuthenticated]);

    const toggleChatBox = () => {
        setShowChatBox(!showChatBox);
    };

    return (
        <div className="home-screen-container">
            <HeaderPortal />
            <div className="card-slogan-portal">
                <div className="corner-image top-left"></div>
                <div className="corner-image top-right"></div>
                <div className="corner-image middle-left"></div>
                <div className="corner-image middle-right"></div>
                <div className="corner-image bottom-left"></div>
                <div className="corner-image bottom-right"></div>

                <div className="slogan-container">
                    <h1 className="slogan-portal">Nơi kết nối doanh nghiệp và trường đại học</h1>
                    <h3 className="sub-slogan-portal">Tiếp cận 400+ công ty và trường đại học</h3>
                </div>
                <SearchBarPortal />
            </div>
            <BannerPortal />

            {userRole !== "BUSINESS" && (
                <div className="job-all-portal">
                    <JobPortal />
                </div>
            )}

            {userRole !== "BUSINESS" && (
                <div className="business-section">
                    <BusinessPortal />
                </div>
            )}


            <div className="industry-section">
                <IndustryPortal />
            </div>
            <FooterPortal />

            <div className="chat-icon" onClick={toggleChatBox}>
                <img src="/kh.png" alt="Chat Icon" />
            </div>

            {/* Gọi component ChatBox */}
            <ChatBox showChatBox={showChatBox} toggleChatBox={toggleChatBox} />
        </div>
    );
};

export default HomeScreen;
