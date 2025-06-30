import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_job } from "../../Redux/actions/PortalThunk";
import { DOMAIN } from "../../Utils/Setting/Config";
import { encryptId } from "../../Component/SecurityComponent/cryptoUtils";
import {FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaUserTie} from "react-icons/fa";
import "./StylePortal/JobDetailPortal.css";

const JobPortal = () => {
    const dispatch = useDispatch();
    const { jobList = [] } = useSelector((state) => state.PortalReducer || {});

    useEffect(() => {
        dispatch(get_all_job(0, 6));
    }, [dispatch]);

    const handleDetailsJob = (id) => {
        const url = `/job-portal-detail/${id}`;
        window.open(url, "_blank");
    };

    const formatSalary = (fromSalary, toSalary, salaryType) => {
        if (!fromSalary && !toSalary) return "Thương lượng";
        if (salaryType === "FIXED") return `${(fromSalary / 1000000).toFixed(0)} triệu`;
        return `${(fromSalary / 1000000).toFixed(0)}-${(toSalary / 1000000).toFixed(0)} triệu`;
    };

    return (
        <div className="compact-job-portal">
            {/* Thêm header với tiêu đề và nút xem tất cả */}
            <div className="compact-portal-header">
                <h2 className="compact-portal-title">Việc làm mới nhất</h2>
                <button
                    className="compact-view-all-btn"
                    onClick={() => window.open('/job-all-portal', '_blank')}
                >
                    Xem tất cả
                </button>
            </div>

            <div className="compact-jobs-grid">
                {jobList.map((job) => (
                    <div key={job.jobId} className="compact-job-card">
                        <div className="compact-card-header">
                            <img
                                src={`${DOMAIN}/api/v1/image/resource?imageId=${job.imageBusinessId}`}
                                alt={job.businessName}
                                className="compact-company-logo"
                            />
                            <div>
                                <h3 className="compact-job-title">{job.title}</h3>
                                <p className="compact-company-name">{job.businessName}</p>
                            </div>
                        </div>

                        <div className="compact-job-details">
                            <div className="compact-detail-item">
                                <FaMapMarkerAlt size={12}/>
                                <span>{job.province}</span>
                            </div>

                            <div className="compact-detail-item">
                                <FaMoneyBillWave size={12}/>
                                <span>{formatSalary(job.toSalary, job.fromSalary, job.salaryType)}</span>
                            </div>

                            <div className="compact-detail-item">
                                <FaUserTie size={12}/>
                                <span>{job.level || "Không yêu cầu"}</span>
                            </div>
                            <div className="compact-detail-item expire-date">
                                <FaCalendarAlt size={12} color="#e74c3c"/>
                                <span style={{color: '#e74c3c'}}>Hết hạn sau: {job.expireDate}</span>
                            </div>
                        </div>

                        <button
                            className="compact-apply-btn"
                            onClick={() => handleDetailsJob(job.jobId)}
                        >
                        Ứng tuyển
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobPortal;