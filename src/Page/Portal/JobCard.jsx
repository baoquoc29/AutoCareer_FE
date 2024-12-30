import React from "react";

import {useNavigate} from "react-router-dom";
import "./StylePortal/JobCard.css";
import {GET_IMAGE_URI} from "../../Utils/Setting/Config";
import 'font-awesome/css/font-awesome.min.css';
import dayjs from 'dayjs';
import {encryptId} from "../../Component/SecurityComponent/cryptoUtils";

const JobCard = ({job}) => {
    const navigate = useNavigate();
    const expireDate = new Date(job.expireDate);
    const startDate = new Date(job.createAt);
    const today = new Date();

    const isExpired = expireDate < today ? 'expired' : '';
    const isUpcoming = startDate > today ? 'upcoming' : '';

    const handleDetailsJob = (id) => {
        const encryptedId = encryptId(id);  // Encrypt the ID first
        const url = `/job-portal-detail/${encodeURIComponent(encryptedId)}`; // Make sure the encrypted ID is properly encoded
        window.open(url, "_blank");  // Open in a new tab
    };

    return (<div className="card-job-list">
        <div className="header-job-list" onClick={() => handleDetailsJob(job.jobId)}>
            {/* Thêm ảnh cho workshop */}
            <img
                src={`${GET_IMAGE_URI}${job?.businessImageId}`}
                alt={job.title}
                className="job-image"
            />
            <div>
                <h3 className="title">{job.title}</h3>
                <p className="host">
                    <i className="fa fa-map-marker"
                       aria-hidden="true"></i> {job.wards ?? ''}, {job.districts ?? ''}, {job.province ?? ''}
                </p>
            </div>
        </div>
        <div className="details">
            <span className={isUpcoming ? 'upcoming1' : ''}>
                <i className="fa fa-calendar" aria-hidden="true"></i>
                 Ngày bắt đầu: {dayjs(job.createAt).format("DD-MM-YYYY")}
            </span>
            <span className={isExpired ? 'expired' : ''}>
                <i className="fa fa-calendar-times-o" aria-hidden="true"></i>
                Ngày hết hạn: {dayjs(job.expireDate).format("DD-MM-YYYY")}
            </span>
            <span>
                <i className="fa fa-building" aria-hidden="true"></i>
                Lương: {new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(job.fromSalary)} -
                {new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(job.toSalary)}
            </span>
            <span>
                <i className="fa fa-users" aria-hidden="true"></i>
                        Số lượng tuyển: {job.quantity}
            </span>
        </div>
    </div>);
};

export default JobCard;
