import {Header} from "../../Component/HeaderComponent/HeaderCRM/Header";
import {SideBar} from "../../Component/SideBarComponent/SideBar";
import {Outlet} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../Utils/Setting/Config";
import {Footer} from "../../Component/FooterComponent/Footer";
import {get_business_by_id} from "../../Redux/actions/BusinessThunk";

export function BusinessTemplate() {
    const user = useSelector(state => state.UserReducer.userData);
    let businessId = null;
    if (user?.businessId) {
        businessId = user.businessId;
    } else if (user?.business?.id) {
        businessId = user.business.id;
    }
    const bus = useSelector(state => state.BusinessReducer.business);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_business_by_id(businessId));
    }, [dispatch, businessId]);

    const {userData} = useSelector((state) => state.UserReducer);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleSidebar = () => {
        setIsMenuOpen(!isMenuOpen); // Đảo ngược trạng thái sidebar khi nhấn vào nút
    };

    const menuItems = [

        ...(user?.role?.name === "BUSINESS"
            ? [
                {
                    label: "Thống kê",
                    icon: "fa-duotone fa-solid fa-chart-line",
                    subMenu: [
                        {label: "Thống kê ngành nghề", link: "/dashboard-industry", icon: ""},
                        // {label: "Thống kê công việc", link: "/dashboard-job", icon: ""},
                    ],
                },
            ]
            : []),

        {
            label: "Quản lý doanh nghiệp",
            icon: "fa-solid fa-school",
            subMenu: [
                {
                    label: "Danh sách ngành",
                    link: "/industry-manager",
                    icon: "",
                },
                {
                    label: "Danh sách công việc",
                    link: "/job-manager",
                    icon: "",
                },
                {
                    label: "Danh sách nhân viên",
                    link: "/employee-manager",
                    icon: ""
                },
            ],
        },
        {
            label: "Quản lý hồ sơ",
            icon: "fa-solid fa-school",
            subMenu: [
                {
                    label: "Danh sách ứng viên",
                    link: "/job-business-apply",
                    icon: "",
                },
                {
                    label: "Tìm kiếm ứng viên qua AI",
                    link: "/job-business-search",
                    icon: "",
                },
            ],
        },
        {
            label: "Kết nối ứng viên",
            icon: "fa-solid fa-school",
            subMenu: [
                {
                    label: "Quản lý tin nhắn",
                    link: "/message-manager-business",
                    icon: "",
                },
            ],
        },
    ];
    const truncateUserName = (userName) => {
        return userName.length > 20 ? userName.slice(0, 20) + '...' : userName;
    };
    return (
        <>
            <div
                id="root"
                className={`root tm--primary-mn ${isMenuOpen ? "mn--max" : "mn--min"}`}
            >
                <Header toggleSidebar={toggleSidebar} link={"/profile-business"}/>
                <SideBar
                    userName={truncateUserName(userData.username)}
                    userRole={userData.role.name}
                    profileImg={bus?.businessImageId ? `${GET_IMAGE_URI}${bus.businessImageId}` : "placeholder-avatar.jpg"}
                    caption="Quản lý doanh nghiệp"
                    menuItems={menuItems}
                />
                <Outlet/>
                <section id="content" className="content">
                    <div className="content__header content__boxed rounded-2">
                        <Outlet/>
                        {/*<div className="content__wrap">*/}
                        {/*    <Outlet/>*/}
                        {/*</div>*/}
                    </div>
                    <Footer/>
                </section>
            </div>

        </>
    );
}
