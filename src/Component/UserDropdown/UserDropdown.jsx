import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI, TOKEN, USER_LOGIN} from "../../Utils/Setting/Config";
import {clearLocalStorage, logoutUser} from "../../Redux/actions/UserThunk";
import {Button} from "antd";
import {NavLink} from "react-router-dom";
import {useEffect} from "react";

export const UserDropdown = ({navigate}) => {
    const user = useSelector(state => state.UserReducer.userData);
    // Kiểm tra loại người dùng
    const isUniversityUser = user && user.role.name === 'UNIVERSITY';
    const isBusinessUser = user && user.role.name === 'BUSINESS';
    const isAdminUser = user && user.role.name === 'ADMIN';
    const isSubAdminUser = user && user.role.name === 'SUB_ADMIN';
    const isEmployeeUser = user && user.role.name === 'EMPLOYEE';

    const dispatch = useDispatch();
    const userId = user ? user.id : null;
    const userType = user ? user.role.name : null;
    useEffect(() => {
        return () => {
            dispatch(clearLocalStorage());
        };
    }, [dispatch]);
    const handleLogout = async () => {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            dispatch(logoutUser(token));
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(USER_LOGIN);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            console.log('No token found');
        }
    };
    const getUserImage = () => {
        if (!user) return "aotucareer-logo.svg";

        switch (userType) {
            case 'UNIVERSITY':
                return `${GET_IMAGE_URI}${user.university.logoImageId}`;
            case 'BUSINESS':
                return `${GET_IMAGE_URI}${user.business.businessImageId}`;
            case 'SUB_ADMIN':
                return `${GET_IMAGE_URI}${user.subAdmin.subAdminImageId}`;
            case 'EMPLOYEE':
                return `${GET_IMAGE_URI}${user.employee.employeeImageId}`;
            default:
                return "aotucareer-logo.svg"; // Fallback ảnh mặc định
        }
    };
    const getUserProfileLink = () => {
        if (isUniversityUser) return '/profile-university';
        if (isBusinessUser) return '/profile-business';
        if (isSubAdminUser) return '/admin-dashboard';
        if (isEmployeeUser) return '/business';
        return null;
    };

    return (
        <>
            <div className="dropdown">
                <button
                    className="header__btn btn btn-icon btn-sm"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-label="User dropdown"
                    aria-expanded="false"
                >
                    <i className="demo-psi-male"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-end w-md-200px">
                    <div className="d-flex align-items-center border-bottom px-3 py-2">
                        <div className="flex-shrink-0">
                            <img
                                className="img-sm rounded-circle"
                                src={getUserImage()}
                                alt="UserNav Picture"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null; // Ngăn lặp vô hạn
                                    e.target.src = "aotucareer-logo.svg"; // Fallback nếu ảnh không tồn tại
                                }}
                            />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h5 className="mb-0">
                                {user.username.length > 20 ? user.username.slice(0, 14) + "..." : user.username}
                            </h5>
                            <span className="text-body-secondary fst-italic">Vai trò: {user.role.name}</span>
                        </div>
                    </div>
                    <div>
                        <div className="list-group list-group-borderless h-100 py-3">
                            {getUserProfileLink() && (
                                <NavLink to={getUserProfileLink()} className="list-group-item list-group-item-action">
                                    <i className="demo-pli-male fs-5 me-2"></i> Thông tin
                                </NavLink>
                            )}
                            <NavLink className="list-group-item list-group-item-action mt-auto" to={"/lock-screen"}>
                                <i className="demo-pli-computer-secure fs-5 me-2"></i> Khóa màn hình
                            </NavLink>
                            <Button onClick={handleLogout} className={"list-group-item list-group-item-action"}>
                                Đăng xuất
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};