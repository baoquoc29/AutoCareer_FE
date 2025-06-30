import React, { useEffect, useState } from "react";
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
import HeroSection from "./HeroSection";
import TestimonialsSection from "./Quote";
import CareerTips from "./StylePortal/CareerTips";
import CareerDevelopment from "./CareerDevelopment";
import MotivationalSteps from "./MotivationalSteps";
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
            <HeaderPortal/>
            <HeroSection></HeroSection>
            <BannerPortal/>

                <div className="job-all-portal">
                    <JobPortal/>
                </div>

                <div className="business-section">
                    <BusinessPortal/>
                </div>


            <div className="industry-section">
                <IndustryPortal/>
            </div>
            <TestimonialsSection></TestimonialsSection>
            <CareerTips></CareerTips>
            <CareerDevelopment></CareerDevelopment>
            <MotivationalSteps></MotivationalSteps>
            <FooterPortal/>

            <div className="chat-icon" onClick={toggleChatBox}>
                <img src="/kh.png" alt="Chat Icon"/>
            </div>

            {/* Gọi component ChatBox */}
            <ChatBox showChatBox={showChatBox} toggleChatBox={toggleChatBox}/>
        </div>
    );
};

export default HomeScreen;
