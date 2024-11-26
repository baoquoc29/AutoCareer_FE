import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Button from "../ButtonComponent/Button";
import {logoutUser} from "../../Redux/actions/UserThunk";
import {TOKEN, USER_LOGIN} from "../../Utils/Setting/Config";


export function Header({toggleSidebar, link}) {
    const {userData} = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            dispatch(logoutUser(token));
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(USER_LOGIN);
            setTimeout(() => {
                navigate('/');
            }, 2000)

        } else {
            console.log('No token found');
        }
    };
    return (
        <>
            <header className="header">
                <div className="header__inner">
                    <div className="header__brand">
                        <div className="brand-wrap">
                            <NavLink to={link} className="brand-img stretched-link">
                                <img src="./assets/img/logo.svg" alt="Nifty Logo" className="Career Bridge" width="16"
                                     height="16"/>
                            </NavLink>
                            <div className="brand-title">Career Bridge</div>
                        </div>
                    </div>
                    <div className="header__content">
                        <div className="header__content-start">
                            <button type="button" className="nav-toggler header__btn btn btn-icon btn-sm"
                                    aria-label="Nav Toggler"
                                    onClick={toggleSidebar}>
                                <i className="demo-psi-list-view"></i>
                            </button>
                            <div className="vr mx-1 d-none d-md-block"></div>

                        </div>
                        <div className="header__content-end">
                            <div className="dropdown">
                                <button className="header__btn btn btn-icon btn-sm" type="button"
                                        data-bs-toggle="dropdown" aria-label="Notification dropdown"
                                        aria-expanded="false">
                        <span className="d-block position-relative">
                           <i className="demo-psi-bell"></i>
                           <span className="badge badge-super rounded-pill bg-danger p-1">
                              <span className="visually-hidden">unread messages</span>
                           </span>
                        </span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end w-md-300px">
                                    <div className="border-bottom px-3 py-2 mb-3">
                                        <h5>Thông báo</h5>
                                    </div>
                                    <div className="list-group list-group-borderless">
                                        <div
                                            className="list-group-item list-group-item-action d-flex align-items-center mb-3">
                                            <div className="flex-shrink-0 me-3">
                                                <i className="demo-psi-pen-5 text-info fs-2"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <a href="#"
                                                   className="h6 fw-normal d-block mb-0 stretched-link text-decoration-none">Writing
                                                    a New Article</a>
                                                <small className="text-body-secondary">Wrote a news article for the
                                                    John Mike</small>
                                            </div>
                                        </div>
                                        <div
                                            className="list-group-item list-group-item-action d-flex align-items-start mb-3">
                                            <div className="flex-shrink-0 me-3">
                                                <i className="demo-psi-speech-bubble-3 text-success fs-2"></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <a href="#"
                                                       className="h6 fw-normal mb-0 stretched-link text-decoration-none">Comment
                                                        sorting</a>
                                                    <span className="badge bg-info rounded ms-auto">NEW</span>
                                                </div>
                                                <small className="text-body-secondary">You have 1,256 unsorted
                                                    comments.</small>
                                            </div>
                                        </div>

                                        <div
                                            className="list-group-item list-group-item-action d-flex align-items-start mb-3">
                                            <div className="flex-shrink-0 me-3">
                                                <img className="img-xs rounded-circle"
                                                     src="./assets/img/profile-photos/7.png" alt="UserNav Picture"
                                                     loading="lazy"/>
                                            </div>
                                            <div className="flex-grow-1">
                                                <a href="#"
                                                   className="h6 fw-normal d-block mb-0 stretched-link text-decoration-none">Lucy
                                                    Sent you a message</a>
                                                <small className="text-body-secondary">30 minutes ago</small>
                                            </div>
                                        </div>

                                        <div
                                            className="list-group-item list-group-item-action d-flex align-items-start mb-3">
                                            <div className="flex-shrink-0 me-3">
                                                <img className="img-xs rounded-circle"
                                                     src="./assets/img/profile-photos/3.png" alt="UserNav Picture"
                                                     loading="lazy"/>
                                            </div>
                                            <div className="flex-grow-1">
                                                <a href="#"
                                                   className="h6 fw-normal d-block mb-0 stretched-link text-decoration-none">Jackson
                                                    Sent you a message</a>
                                                <small className="text-body-secondary">1 hours ago</small>
                                            </div>
                                        </div>

                                        <div className="text-center mb-2">
                                            <a href="#" className="btn-link text-primary icon-link icon-link-hover">
                                                Hiển thị tất cả thông báo
                                                <i className="bi demo-psi-arrow-out-right"></i>
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="dropdown">
                                <button className="header__btn btn btn-icon btn-sm" type="button"
                                        data-bs-toggle="dropdown" aria-label="User dropdown" aria-expanded="false">
                                    <i className="demo-psi-male"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end w-md-200px">
                                    <div className="d-flex align-items-center border-bottom px-3 py-2">
                                        <div className="flex-shrink-0">
                                            <img className="img-sm rounded-circle"
                                                 src="./assets/img/profile-photos/4.png" alt="UserNav Picture"
                                                 loading="lazy"/>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h5 className="mb-0">{userData.username.length > 20 ? userData.username.slice(0, 15) + "..." : userData.username}</h5>
                                            <span
                                                className="text-body-secondary fst-italic">Vai trò:{userData.role.name}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="list-group list-group-borderless h-100 py-3">
                                            <NavLink to={'/profile-user'}
                                                     className="list-group-item list-group-item-action">
                                                <i className="demo-pli-male fs-5 me-2"></i> Thông tin
                                            </NavLink>
                                            <NavLink
                                                className="list-group-item list-group-item-action mt-auto"
                                                to={"/lock-screen"}>
                                                <i className="demo-pli-computer-secure fs-5 me-2"></i> Khóa màn hình
                                            </NavLink>
                                            <Button onClick={handleLogout}
                                                    className={"list-group-item list-group-item-action"}>
                                                Đăng xuất
                                            </Button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}