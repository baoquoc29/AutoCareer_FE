import { useDispatch, useSelector } from "react-redux";
import { GET_IMAGE_URI, TOKEN, USER_LOGIN } from "../../Utils/Setting/Config";
import { logoutUser } from "../../Redux/actions/UserThunk";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { get_university_id } from "../../Redux/actions/UniversityThunk";
import { get_business_by_id } from "../../Redux/actions/BusinessThunk";
import {get_employee_by_id} from "../../Redux/actions/EmployeeThunk";

export const UserDropdown = ({ navigate }) => {
    const user = useSelector(state => state.UserReducer.userData);

    const getUserDetails = () => {
        if (user.university) {
            return { id: user.university.id, type: 'UNIVERSITY' };
        } else if (user.business) {
            return { id: user.business.id, type: 'BUSINESS' };
        } else if(user.employee){
            return { id: user.employee.id, type: 'EMPLOYEE' };
        }else {
            return { id: user.admin.id, type: 'ADMIN' };
        }
    };

    const { id: userId, type: userType } = getUserDetails();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userType === 'BUSINESS') {
            dispatch(get_business_by_id(userId));
        }
        if (userType === 'UNIVERSITY') {
            dispatch(get_university_id(userId));
        }
        if (userType === 'EMPLOYEE') {
            dispatch(get_employee_by_id(userId));
        }
        if (userType === 'ADMIN') {
            // dispatch(get_(userId));
        }
        // Add actions for ADMIN or additional types as needed
    }, [dispatch, userId, userType]);

    const userInfo = useSelector(state => {
        switch (userType) {
            case 'UNIVERSITY':
                return state.UniversityReducer.university;
            case 'BUSINESS':
                // Replace with correct path to business info in your store
                return state.BusinessReducer.business;
            case 'EMPLOYEE':
                // Replace with correct path to business info in your store
                return state.EmployeeReducer.employee;
            case 'ADMIN':
                // Replace with correct path to admin info in your store if needed
                return state.AdminReducer.admin;
            default:
                return null;
        }
    });

    // Function for user role checks
    const isUniversityUser = user && user.role.name === 'UNIVERSITY';
    const isBusinessUser = user && user.role.name === 'BUSINESS';
    // const isEmployee = user && user.role.name === 'EMPLOYEE';


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
                                src={
                                    user
                                        ? (userType === 'UNIVERSITY'
                                            ? (user.university.logoImageId
                                                ? `${GET_IMAGE_URI}${user.university.logoImageId}`
                                                : '/path-to-default-image.jpg') // Hình ảnh mặc định
                                            : userType === 'BUSINESS'
                                                ? (user.business.businessImageId
                                                    ? `${GET_IMAGE_URI}${user.business.businessImageId}`
                                                    : '/path-to-default-image.jpg')
                                                : userType === 'ADMIN'
                                                    ? (user.admin.adminImageId
                                                        ? `${GET_IMAGE_URI}${user.admin.adminImageId}`
                                                        : '/path-to-default-image.jpg')
                                                    : userType === 'EMPLOYEE'
                                                        ? (user.employee.employeeImageId
                                                            ? `${GET_IMAGE_URI}${user.employee.employeeImageId}`
                                                            : '/path-to-default-image.jpg')
                                                        : '/path-to-default-image.jpg')
                                        : '/path-to-default-image.jpg'
                                }
                                // src={`${GET_IMAGE_URI}${
                                //     user
                                //         ? (userType === 'UNIVERSITY'
                                //             ? user.university.logoImageId
                                //             : userType === 'BUSINESS'
                                //                 ? user.business.businessImageId
                                //                 : userType === 'ADMIN'
                                //                     ? user.admin.adminImageId
                                //                     :userType=== 'EMPLOYEE'
                                //                         ?user.employees.employeeImageId// Use the appropriate property for admin image
                                //                     : '')
                                //         : ''}`}
                                alt="UserNav Picture"
                                loading="lazy"
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
                            {isUniversityUser && (
                                <NavLink to={'/profile-university'} className="list-group-item list-group-item-action">
                                    <i className="demo-pli-male fs-5 me-2"></i> Thông tin
                                </NavLink>
                            )}
                            {isBusinessUser && (
                                <NavLink to={'/profile-business'} className="list-group-item list-group-item-action">
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