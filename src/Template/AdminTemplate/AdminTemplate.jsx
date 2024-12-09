import {Header} from "../../Component/HeaderComponent/Header";
import {SideBar} from "../../Component/SideBarComponent/SideBar";
import {Outlet} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../Utils/Setting/Config";

export function AdminTemplate() {
    const subAdmin = useSelector(state => state.UserReducer.userData?.subAdmin);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {userData} = useSelector((state) => state.UserReducer);
    const toggleSidebar = () => {
        setIsMenuOpen(!isMenuOpen);  // Đảo ngược trạng thái sidebar khi nhấn vào nút
    };
    const menuItems = [// {
        //     label: "Trang chủ", link: '/admin',
        // },
        {
            label: 'Quản lý tài khoản',
            icon: 'fa-solid fa-school',
            subMenu: [{
                label: 'Tài khoản quản trị viên',
                link: '/sub-admin-manager',
                icon: ''
            }, {label: 'Tài khoản doanh nghiệp', link: '/section-manager', icon: ''}, {
                label: 'Tài khoản trường học',
                link: '/major-manager',
                icon: ''
            },]
        },

        {
            label: 'Quản lý tin tuyển dụng',
            icon: 'fa-solid fa-store',
            subMenu: [{label: 'Yêu cầu chờ duyệt', link: '/section-manager', icon: ''}, {
                label: 'Danh sách tuyển dụng',
                link: '/workshop-manager',
                icon: ''
            },]
        }, {
            label: 'Quản lý hội thảo',
            icon: 'fa-solid fa-briefcase',
            subMenu: [{label: 'Danh sách hội thảo', link: '/workshop-manager', icon: ''}, {
                label: 'Yêu cầu chờ duyệt',
                link: '/section-manager',
                icon: ''
            },]
        }, {
            label: 'Thống kê', icon: 'home', subMenu: [{label: '123', link: '', icon: ''},]
        }];
    const filteredMenuItems = menuItems.map(item => {
        if (item.label === 'Quản lý tài khoản' && userData.role.name === 'SUB_ADMIN') {
            return {
                ...item, subMenu: item.subMenu.filter(subItem => subItem.label !== 'Tài khoản quản trị viên')
            };
        }
        return item;
    });
    return (<>
        <div id="root" className={`root tm--primary-mn ${isMenuOpen ? 'mn--max' : 'mn--min'}`}>
            <Header toggleSidebar={toggleSidebar} link={'/admin'}/>
            <SideBar
                userName={userData.username}
                userRole={userData.role.name}
                profileImg={subAdmin?.subAdminImageId ? `${GET_IMAGE_URI}${subAdmin.subAdminImageId}` : "aotucareer-logo.svg"}
                caption="Quản lý hệ thống"
                menuItems={filteredMenuItems}
            />
            <Outlet/>
        </div>
    </>)
}
