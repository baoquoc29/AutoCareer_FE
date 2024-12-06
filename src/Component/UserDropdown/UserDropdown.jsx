import {useDispatch, useSelector} from "react-redux";
import {DOMAIN, GET_IMAGE_URL, TOKEN, USER_LOGIN} from "../../Utils/Setting/Config";
import {logoutUser} from "../../Redux/actions/UserThunk";
import {Button} from "antd";
import {NavLink} from "react-router-dom";
import {useEffect} from "react";
import {get_university_id} from "../../Redux/actions/UniversityThunk";

export const UserDropdown = ({navigate}) => {
    const user = useSelector(state => state.UserReducer.userData);
    const universityId = user.university.id;
    const uni = useSelector(state => state.UniversityReducer.university)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_university_id(universityId));
    }, [dispatch]);

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
            <div className="dropdown">
                <button className="header__btn btn btn-icon btn-sm" type="button" data-bs-toggle="dropdown"
                        aria-label="User dropdown" aria-expanded="false">
                    <i className="demo-psi-male"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-end w-md-200px">
                    <div className="d-flex align-items-center border-bottom px-3 py-2">
                        <div className="flex-shrink-0">
                            <img className="img-sm rounded-circle"
                                 src={`${GET_IMAGE_URL}${uni.logoImageId}`}
                                 alt="UserNav Picture" loading="lazy"/>
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h5 className="mb-0">{user.username.length > 20 ? user.username.slice(0, 14) + "..." : user.username}</h5>
                            <span className="text-body-secondary fst-italic">Vai trò:{user.role.name}</span>
                        </div>
                    </div>
                    <div>
                        <div className="list-group list-group-borderless h-100 py-3">
                            <NavLink to={'/profile-user'} className="list-group-item list-group-item-action">
                                <i className="demo-pli-male fs-5 me-2"></i> Thông tin
                            </NavLink>
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
    )
}