import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const UserNav = ({profileImg, userName, userRole}) => {

    const {userData} = useSelector((state) => state.UserReducer);
    const isUniversityUser = userData && userData.role.name === 'UNIVERSITY';
    const isBusinessUser = userData && userData.role.name === 'BUSINESS';

    return (
        <>
            <div id="_dm-mainnavProfile" className="mainnav__widget my-3 hv-outline-parent" bis_skin_checked="1">
                <div className="mininav-toggle text-center py-2" bis_skin_checked="1">
                    <img className="mainnav__avatar img-md rounded-circle hv-oc" src={profileImg}
                         alt="UserNav Picture"/>
                </div>
                <div className="mininav-content collapse d-mn-max" bis_skin_checked="1">
                    <span data-popper-arrow="" className="arrow"></span>
                    <div className="d-grid" bis_skin_checked="1">
                        <button className="mainnav-widget-toggle d-block btn border-0 p-2 collapsed"
                                data-bs-toggle="collapse" data-bs-target="#usernav" aria-expanded="false"
                                aria-controls="usernav">
                        <span className="dropdown-toggle d-flex justify-content-center align-items-center">
                            <h5 className="mb-0 me-3">{userName}</h5>
                        </span>
                            <small className="text-body-secondary">Vai trò: {userRole}</small>
                        </button>
                        <div id="usernav" className="nav flex-column collapse" bis_skin_checked="1">
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
                            <NavLink to={"/"} className="nav-link">
                                <i className="demo-pli-unlock fs-5 me-2"></i>
                                <span className="ms-1">Đăng xuất</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserNav;