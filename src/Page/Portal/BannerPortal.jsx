import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import stylesheet AOS
import "./StylePortal/BannerPortal.css";
import { get_university_total } from "../../Redux/actions/PortalThunk";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";

const BannerPortal = () => {
    const dispatch = useDispatch();
    const { totalUniversities } = useSelector(state => state.PortalReducer);
    const { totalBusinessFeatures } = useSelector(state => state.PortalReducer);
    const { totalWorkShopFeatures } = useSelector(state => state.PortalReducer);
    const { totalJobFeatures } = useSelector(state => state.PortalReducer);

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
                        <h2>
                            <CountUp start={0} end={totalUniversities || 0} duration={2.5} />
                        </h2>
                        <p>Trường đại học</p>
                    </div>
                    <div className="stat-item-portal" data-aos="fade-up">
                        <h2>
                            <CountUp start={0} end={totalJobFeatures || 0} duration={2.5} />
                        </h2>
                        <p>Việc làm</p>
                    </div>
                    <div className="stat-item-portal" data-aos="fade-up">
                        <h2>
                            <CountUp start={0} end={totalBusinessFeatures || 0} duration={2.5} />
                        </h2>
                        <p>Doanh nghiệp</p>
                    </div>
                    <div className="stat-item-portal" data-aos="fade-up">
                        <h2>
                            <CountUp start={0} end={totalWorkShopFeatures || 0} duration={2.5} />
                        </h2>
                        <p>Hội thảo</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerPortal;
