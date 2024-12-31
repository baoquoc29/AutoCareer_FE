import {Header} from "../../Component/HeaderComponent/HeaderCRM/Header";
import {SideBar} from "../../Component/SideBarComponent/SideBar";
import {Outlet} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../Utils/Setting/Config";
import {get_university_id} from "../../Redux/actions/UniversityThunk";
import {Footer} from "../../Component/FooterComponent/Footer";


export function UniversityTemplate() {
    const user = useSelector(state => state.UserReducer.userData);
    const universityId = user?.university?.id;
    const uni = useSelector(state => state.UniversityReducer.university);
    const dispatch = useDispatch();
    useEffect(() => {
        if (universityId) {
            console.log('Dispatching get_university_id with universityId:', universityId); // Kiểm tra
            dispatch(get_university_id(universityId));
        }
    }, [dispatch,universityId]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {userData} = useSelector((state) => state.UserReducer);
    const toggleSidebar = () => {
        setIsMenuOpen(!isMenuOpen);  // Đảo ngược trạng thái sidebar khi nhấn vào nút
    };
    const menuItems = [
        {
            label: 'Trường đại học',
            icon: 'fa-solid fa-school',
            subMenu: [
                {label: 'Danh sách giáo vụ', link: '/instructional-manager', icon: ''},
                {label: 'Danh sách khoa', link: '/section-manager', icon: ''},
                {label: 'Danh sách ngành ', link: '/major-manager', icon: ''},
            ]
        },
        {
            label: 'Sự kiện',
            icon: 'fa-solid fa-store',
            subMenu: [
                {label: 'Danh sách sự kiện', link: '/workshop-manager', icon: ''},
            ]
        },
        {
            label: 'Công việc',
            icon: 'fa-solid fa-briefcase',
            subMenu: [
                {label: 'Danh sách công việc', link: '/workshop-manager', icon: ''},
            ]
        },
        {
            label: 'Hợp tác',
            icon: 'fa-solid fa-handshake',
            subMenu: [
                {label: 'Quản lý hợp tác', link: '/cooperation-manager', icon: ''},

            ]
        },
    ];

    const getProfileImage = () => {
        return uni.logoImageId ? `${GET_IMAGE_URI}${uni.logoImageId}` : "placeholder-avatar.jpg";
    };
    const truncateUserName = (userName) => {
        return userName?.length > 20 ? userName.slice(0, 20) + '...' : userName;
    };

    return (
        <>
            <div id="root" className={`root tm--primary-mn ${isMenuOpen ? 'mn--max' : 'mn--min'}`}>
                <Header toggleSidebar={toggleSidebar} link={'/university'}/>
                <SideBar
                    userName={truncateUserName(userData?.username)}
                    userRole={userData?.role?.name}
                    profileImg={getProfileImage()}
                    caption="Quản lý trường đại học"
                    menuItems={menuItems}
                />
                {/*<Outlet/>*/}
                <section id="content" className="content">
                    <div className="content__header content__boxed rounded-0">
                        <Outlet/>
                    </div>
                    <Footer/>
                </section>
            </div>
        </>
    )
}
