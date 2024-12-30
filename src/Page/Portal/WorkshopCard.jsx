import React from "react";

import "./StylePortal/WorkshopCard.css";
import {DOMAIN} from "../../Utils/Setting/Config";
import 'font-awesome/css/font-awesome.min.css';
import {encryptId} from "../../Component/SecurityComponent/cryptoUtils";
import {Space} from "antd";

const WorkshopCard = ({workshop}) => {

    const expireDate = new Date(workshop.expireDate);
    const startDate = new Date(workshop.startDate);
    const endDate = new Date(workshop.endDate);
    const today = new Date();

    const isExpired = expireDate < today ? 'expired' : '';
    const isUpcoming = startDate > today ? 'upcoming' : '';
    const isOngoing = endDate >= today && startDate <= today ? 'ongoing' : '';

    const handleDetailsWorkShop = (id) => {
        const encryptedId = encryptId(id);  // Encrypt the ID first
        const url = `/workshop-details/${encodeURIComponent(encryptedId)}`;  // Make sure the encrypted ID is properly encoded
        window.open(url, "_blank");  // Open in a new tab
    };

    return (
        <div className="card-workshop-list">
            <div className="header-workshop-list" onClick={() => handleDetailsWorkShop(workshop.id)}>
                {/* Thêm ảnh cho workshop */}
                <img
                    src={`${DOMAIN}/api/v1/image/resource?imageId=${workshop.imageId}`}
                    alt={workshop.title}
                    className="workshop-image"
                />
                <div>
                    <h3 className="title">{workshop.title}</h3>
                    <p className="host">{workshop.hostWorkshop}</p>
                    <p className="host">
                        <i className="fa fa-map-marker"
                           aria-hidden="true"></i> {workshop.address ?? ''}, {workshop.ward ?? ''}, {workshop.district ?? ''}, {workshop.province ?? ''}
                    </p>
                </div>
            </div>
            <div className="details">

                    <span className={isUpcoming ? 'upcoming1' : ''}><i className="fa fa-calendar"
                                                                       aria-hidden="true"></i> Ngày bắt đầu: {workshop.startDate}</span>
                    <span className={isOngoing ? 'ongoing' : ''}><i className="fa fa-calendar" aria-hidden="true"></i> Ngày kết thúc: {workshop.endDate}</span>
                    <span className={isExpired ? 'expired' : ''}><i className="fa fa-calendar-times-o"
                                                                    aria-hidden="true"></i> Ngày hết hạn: {workshop.expireDate}</span>
                    {workshop.totalCompany ?
                        <span><i className="fa fa-building"
                                 aria-hidden="true"></i> Số công ty tham gia: {workshop.totalCompany}</span>
                        : null
                    }

            </div>
        </div>
    );
};

export default WorkshopCard;
