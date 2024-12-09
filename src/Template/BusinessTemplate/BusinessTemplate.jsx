import {Header} from "../../Component/HeaderComponent/HeaderCRM/Header";
import {SideBar} from "../../Component/SideBarComponent/SideBar";
import {Outlet} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../Utils/Setting/Config";

export function BusinessTemplate() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData } = useSelector((state) => state.UserReducer);
  const toggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen); // Đảo ngược trạng thái sidebar khi nhấn vào nút
  };
  const menuItems = [
    {
      label: "Doanh nghiệp",
      icon: "fa-solid fa-school",
      subMenu: [
        {
          label: "Danh sách ngành",
          link: "/industry-manager",
          icon: "",
        },
        { label: "Danh sách nhân viên", link: "/employee-manager", icon: "" },
        { label: "Danh sách ngành ", link: "/major-manager", icon: "" },
      ],
    },
    {
      label: "Sự kiện",
      icon: "fa-solid fa-store",
      subMenu: [
        { label: "Danh sách sự kiện", link: "/workshop-manager", icon: "" },
        { label: "Công ty tham gia", link: "/section-manager", icon: "" },
        { label: "Công ty chờ duyệt", link: "/major-manager", icon: "" },
      ],
    },
    {
      label: "Công việc",
      icon: "fa-solid fa-briefcase",
      subMenu: [
        { label: "Danh sách công việc", link: "/workshop-manager", icon: "" },
        { label: "Đề xuất công việc", link: "/section-manager", icon: "" },
        { label: "Yêu cầu hợp tác", link: "/section-manager", icon: "" },
      ],
    },
    {
      label: "Thống kê",
      icon: "home",
      subMenu: [{ label: "123", link: "", icon: "" }],
    },
  ];
  return (
    <>
      <div
        id="root"
        className={`root tm--primary-mn ${isMenuOpen ? "mn--max" : "mn--min"}`}
      >
        <Header toggleSidebar={toggleSidebar} link={"/profile-business"} />
        <SideBar
          userName={userData.username}
          userRole={userData.role.name}
          profileImg={`${GET_IMAGE_URI}${userData.business.businessImageId}`}
          caption="Quản lý doanh nghiệp"
          menuItems={menuItems}
        />
        <Outlet />
      </div>
    </>
  );
}
