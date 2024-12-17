import React from 'react';
import SearchBarPortal from "./SearchBarPortal";
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import JobPortal from "./JobPortal";
import BusinessPortal from "./BusinessPortal";
import WorkshopPortal from "./WorkshopPortal";
import FooterPortal from "./FooterPortal";
import IndustryPortal from "./IndustryPortal";

const HomeScreen = () => {
    return (
        <div className="home-screen-container">
            <HeaderPortal/>
            <div className={"card-slogan-portal"}>
                <div className="slogan-container">
                    <h1 className="slogan-portal">Nơi kết nối doanh nghiệp và trường đại học</h1>
                    <h3 className="sub-slogan-portal">Tiếp cận 400+ công ty và trường đại học</h3>
                </div>
                <SearchBarPortal/>
            </div>
            <div className="job-section">
                <JobPortal></JobPortal>
            </div>

            <div className="business-section">
                <BusinessPortal></BusinessPortal>
            </div>
            <div className={"workshop-section"}>
                <WorkshopPortal></WorkshopPortal>
            </div>
            <div className={"industry-section"}>
                <IndustryPortal></IndustryPortal>
            </div>
            <FooterPortal/>
        </div>
    );
};

export default HomeScreen;
