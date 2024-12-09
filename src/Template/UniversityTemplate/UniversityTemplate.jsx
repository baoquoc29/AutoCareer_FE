import {Header} from "../../Component/HeaderComponent/Header";
import {SideBar} from "../../Component/SideBarComponent/SideBar";
import {Outlet} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URL} from "../../Utils/Setting/Config";
import {get_university_id} from "../../Redux/actions/UniversityThunk";
import {Footer} from "../../Component/FooterComponent/Footer";


export function UniversityTemplate() {
    const user = useSelector(state => state.UserReducer.userData);
    const universityId = user.university.id;
    const uni = useSelector(state => state.UniversityReducer.university);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_university_id(universityId));
    }, [dispatch]);
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
                {label: 'Công ty tham gia', link: '/section-manager', icon: ''},
                {label: 'Công ty chờ duyệt', link: '/major-manager', icon: ''},
            ]
        },
        {
            label: 'Công việc',
            icon: 'fa-solid fa-briefcase',
            subMenu: [
                {label: 'Danh sách công việc', link: '/workshop-manager', icon: ''},
                {label: 'Đề xuất công việc', link: '/section-manager', icon: ''},
                {label: 'Yêu cầu hợp tác', link: '/section-manager', icon: ''}
            ]
        },
        {
            label: 'Thống kê',
            icon: 'home',
            subMenu: [
                {label: '123', link: '', icon: ''},
            ]
        }
    ];
    return (
        <>
            <div id="root" className={`root tm--primary-mn ${isMenuOpen ? 'mn--max' : 'mn--min'}`}>
                <Header toggleSidebar={toggleSidebar} link={'/university'}/>
                <SideBar
                    userName={userData.username}
                    userRole={userData.role.name}
                    profileImg={`${GET_IMAGE_URL}${uni.logoImageId}`}
                    caption="Quản lý trường đại học"
                    menuItems={menuItems}
                />
                {/*<Outlet/>*/}
                <section id="content" className="content">
                    <div className="content__header content__boxed rounded-0">
                        <Outlet/>
                        {/*<div className="content__wrap">*/}
                        {/*    <Outlet/>*/}
                        {/*</div>*/}
                    </div>
                    <Footer/>
                </section>
            </div>
        </>
    )
}
