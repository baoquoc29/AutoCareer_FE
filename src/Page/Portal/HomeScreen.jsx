import React from 'react';
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";

const HomeScreen = () => {
    return (
        <div>
            {/* Header */}
            <HeaderPortal />

            {/* Nội dung trang chính */}
            <div className="home-content">
                <h1>Chào mừng đến với TopCV</h1>
                <p>Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.</p>
                {/* Các thành phần khác */}
            </div>
        </div>
    );
};

export default HomeScreen;
