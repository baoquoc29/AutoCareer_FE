import React from 'react';
import { useNavigate} from "react-router-dom";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";
import {UserDropdown} from "../UserDropdown/UserDropdown";


export function Header({toggleSidebar, link}) {
    const navigate = useNavigate();

    return (
        <>
            <header className="header">
                <div className="header__inner">
                    <div className="header__brand">
                        <div className="brand-wrap">
                            {/*<NavLink to={link} className="brand-img stretched-link">*/}
                            {/*    <img src={`${DOMAIN}/api/v1/image/resource?imageId=${university["logoImageId"]}`} alt="Nifty Logo" className="Career Bridge" width="16"*/}
                            {/*         height="16"/>*/}
                            {/*</NavLink>*/}
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
                            <NotificationDropdown />
                            <UserDropdown navigate={navigate} />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}