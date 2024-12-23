import React, {useEffect, useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // import stylesheet AOS
import "./StylePortal/BannerPortal.css";
import {get_university_total} from "../../Redux/actions/PortalThunk";
import { useDispatch, useSelector } from "react-redux";

const BannerPortal = () => {
    const dispatch = useDispatch();
    const {universities} = useSelector(state => state.PortalReducer);
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            easing: "ease-out", // Easing method for the animation
            once: true, // Animation triggers only once
        });
    }, []);

    useEffect(() => {
        dispatch(get_university_total());
    }, [dispatch]);
    const [totalJobElements, setTotalJobElements] = useState(0);
    const [totalWorkShopElements, setTotalWorkShopElements] = useState(0);
    const [totalBusinessElements, setTotalBusinessEmelemts] = useState(0);
    // Lấy totalElements từ localStorage khi component được mount
    useEffect(() => {
        const storedJobTotalElements = localStorage.getItem('totalJobElements');
        const storedTotalWorkShopElements = localStorage.getItem('totalWorkshopElements');
        const storedTotalBusinessElements = localStorage.getItem('totalBusinessElements');
        if (storedJobTotalElements && storedTotalWorkShopElements && storedTotalBusinessElements) {
            setTotalJobElements(parseInt(storedJobTotalElements, 10));
            setTotalBusinessEmelemts(parseInt(storedTotalBusinessElements, 10));
            setTotalWorkShopElements(parseInt(storedTotalWorkShopElements, 10));
        }
    }, []); // Chạy 1 lần khi component mount

    return (
        <div className="banner-portal" data-aos="fade-up">
            <div className="banner-content-portal">
                {/* Left content with text and logos */}
                <div className="left-content-portal" data-aos="fade-up">
                    <h2>
                        Sự hợp tác giữa trường học và doanh nghiệp: Kết nối tri thức với thực tiễn, mở ra cơ hội nghề nghiệp, và xây dựng nền tảng vững chắc cho tương lai. Cùng nhau phát triển, cùng nhau thành công!
                    </h2>
                    <div className="companies-portal">
                        <img src="/spotify.png" alt="Spotify" />
                        <img src="/gg.png" alt="Google" />
                        <img src="/McAfee-Logo.png" alt="McAfee" />
                        <img src="/vinfast.png" alt="Vinfast" />
                    </div>
                </div>
                {/* Right content with statistics */}
                <div className="right-stats-portal">
                    <div className="stat-item-portal" data-aos="fade-up">
                        <h2>{universities?.length || 0}</h2>
                        <p>Trường đại học</p>
                    </div>
                    <div className="stat-item-portal" data-aos="fade-up">
                        <h2>{totalJobElements}</h2>
                        <p>Việc làm</p>
                    </div>
                    <div className="stat-item-portal" data-aos="fade-up">
                        <h2>{totalBusinessElements}</h2>
                        <p>Doanh nghiệp</p>
                    </div>
                    <div className="stat-item-portal" data-aos="fade-up">
                        <h2>{totalWorkShopElements}</h2>
                        <p>Hội thảo</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerPortal;
