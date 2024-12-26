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
import "./StylePortal/HomeScreen.css";
import {CloseOutlined} from "@ant-design/icons";
const HomeScreen = () => {
    const {isAuthenticated} = useSelector(state => state.UserReducer);
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

            {/* Biểu tượng nhắn tin */}
            <div className="chat-icon" onClick={toggleChatBox}>
                <img src="/kh.png" alt="Chat Icon"/>
            </div>

            {/* Hộp thoại nhắn tin */}
            {showChatBox && (
                <div className="chat-box">
                    <div className="chat-header">
                        <span>Trò chuyện với hỗ trợ viên</span>
                        <button onClick={toggleChatBox}>
                            <CloseOutlined/>
                        </button>
                    </div>
                    <div className="chat-content">
                        <p>Chào bạn! Tôi có thể giúp gì?</p>
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Nhập tin nhắn..."/>
                        <button>Gửi</button>
                    </div>
                </div>

            )}
        </div>
    );
};

export default HomeScreen;
