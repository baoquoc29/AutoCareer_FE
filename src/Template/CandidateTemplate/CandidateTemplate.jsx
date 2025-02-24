import { Header } from "../../Component/HeaderComponent/HeaderCRM/Header";
import { SideBar } from "../../Component/SideBarComponent/SideBar";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_IMAGE_URI } from "../../Utils/Setting/Config";
import { get_candidate_id } from "../../Redux/actions/CandidateThunk";
import { Footer } from "../../Component/FooterComponent/Footer";

export function CandidateTemplate() {
    const user = useSelector(state => state.UserReducer.userData);
    const candidateId = user?.candidate?.id;
    const dispatch = useDispatch();

    useEffect(() => {
        if (candidateId) {
            dispatch(get_candidate_id(candidateId));
        }
    }, [dispatch, candidateId]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userData } = useSelector((state) => state.UserReducer);

    const toggleSidebar = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuItems = [
        {
            label: " Quản lý tìm việc",
            icon: "fa-solid fa-briefcase",
            subMenu: [
                { label: "Việc làm đã ứng tuyển"  , link: "/apply-job",},
                { label: " Việc làm đã lưu" , link: "/saved-job"},
            ],
        },
        {
            label: " Quản lý tương tác",
            icon: "fa-solid fa-handshake",
            subMenu: [
                { label: "  Công ty đang theo dõi" },
            ],
        },
        {
            label: " Hộp thư thoại",
            icon: "fa-solid fa-envelope",
            subMenu: [
                { label: "Kết nối doanh nghiệp"  , link: "/candidate-messages",},
            ],
        },
        {
            label: " Cài đặt nâng cao",
            icon: "fa-solid fa-gear",
            subMenu: [
                { label: "  Cài đặt gợi ý việc làm" },
                { label: "  AI gợi ý việc làm" },
            ],
        },
    ];

    const getProfileImage = () => {
        return user?.candidateResponse.profileImageId ? `${GET_IMAGE_URI}${user?.candidateResponse.profileImageId}` : "placeholder-avatar.jpg";
    };

    const truncateUserName = (userName) => {
        return userName?.length > 20 ? userName.slice(0, 20) + "..." : userName;
    };

    return (
        <>
            <div id="root" className={`root tm--primary-mn ${isMenuOpen ? "mn--max" : "mn--min"}`}>
                <Header toggleSidebar={toggleSidebar} link={'/'} />
                <SideBar
                    userName={truncateUserName(userData?.username)}
                    userRole={userData?.role?.name}
                    profileImg={getProfileImage()}
                    caption="Quản lý cá nhân"
                    menuItems={menuItems}
                    itemStyle={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                />
                <section id="content" className="content">
                    <div className="content__header content__boxed rounded-0">
                        <Outlet />
                    </div>
                    <Footer />
                </section>
            </div>
        </>
    );
}
