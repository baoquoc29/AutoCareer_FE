import {Header} from "../../Component/HeaderComponent/Header";
import {SideBar} from "../../Component/SideBarComponent/SideBar";
import {Outlet} from "react-router-dom";
import {useState} from "react";

export function UniversityTemplate() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);  // Quản lý trạng thái của sidebar

    const toggleSidebar = () => {
        setIsMenuOpen(!isMenuOpen);  // Đảo ngược trạng thái sidebar khi nhấn vào nút
    };
    const menuItems = [
        {
            label: 'Các màn hình chính',
            icon: '',
            subMenu: [
                { label: 'Quản lý ngành học', link: '/major-manager', icon: '' },
            ]
        }
    ];
    return (
        <>
            <div id="root" className={`root tm--primary-mn ${isMenuOpen ? 'mn--max' : 'mn--min'}`}>
                <Header toggleSidebar={toggleSidebar} link={'/university'}/>
                    <SideBar
                        userName="Đại học Kinh Tế Quốc Dân"
                        userRole="University"
                        profileImg="./assets/img/profile-photos/1.png"
                        caption="Quản lý trường đại học"
                        menuItems={menuItems}
                    />
                    <Outlet/>
            </div>
        </>
    )
}