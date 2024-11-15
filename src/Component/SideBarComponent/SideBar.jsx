import React, {useState} from 'react';
import UserNav from "../UserNavBarComponent/UserNav";
import {NavLink} from "react-router-dom";

export function SideBar({userName, userRole, profileImg, menuItems,caption }) {
    const [isOpen, setIsOpen] = useState({});

    const toggleMenu = (index) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };
    return (
        <>
            <nav id="mainnav-container" className="mainnav">
                <div className="mainnav__inner" bis_skin_checked="1">
                    <div className="mainnav__top-content scrollable-content pb-5" bis_skin_checked="1">
                      <UserNav profileImg={profileImg} userName={userName} userRole={userRole}/>
                        <div className="mainnav__categoriy py-3" bis_skin_checked="1">
                            <h5 className="mainnav__caption mt-0 fw-bold">{caption}</h5>
                            <ul className="mainnav__menu nav flex-column">
                                {menuItems && menuItems.map((item, index) => (
                                    <li key={index} className="nav-item has-sub">
                                        <a href="#"
                                           className={`mininav-toggle nav-link ${isOpen[index] ? 'active' : 'collapsed'}`}
                                           onClick={()=>toggleMenu(index)}><i
                                            className={`demo-pli-${item.icon} fs-5 me-2`}></i>
                                            <span key={index} className="nav-label ms-1">{item.label}</span>
                                        </a>
                                        {item.subMenu && (
                                            <ul className={`mininav-content nav collapse ${isOpen[index] ? 'show' : ''}`}>
                                                <li data-popper-arrow="" className="arrow"></li>
                                                {item.subMenu.map((item, index) => (
                                                    <li key={index} className="nav-item">
                                                        <NavLink to={item.link} className="nav-link">
                                                            <i className={`demo-pli-${item.icon} fs-5 me-2`}></i>
                                                            {item.label}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}