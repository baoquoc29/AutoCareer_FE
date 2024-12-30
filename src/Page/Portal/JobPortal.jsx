import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Dropdown, Menu, Pagination, Popover } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { get_all_industry } from "../../Redux/actions/IndustryThunk";
import {
    get_all_job,
    get_all_job_by_industry,
    get_all_job_by_province,
    get_all_job_by_region
} from "../../Redux/actions/PortalThunk";
import "../Portal/StylePortal/JobPortal.css";
import DOMPurify from 'dompurify';
import { DOMAIN } from "../../Utils/Setting/Config";
import {
    FaCalendarAlt,
    FaExternalLinkAlt,
    FaFileAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";
import {encryptId} from "../../Component/SecurityComponent/cryptoUtils";

const defaultLocations = [
    { id: 0, name: "Tất cả" },
    { id: 1, name: "Hà Nội" },
    { id: 79, name: "Thành phố Hồ Chí Minh" },
];


const JobPortal = () => {

    const response = useSelector((state) => state.PortalReducer || []);
    const industries = useSelector((state) => state.IndustryReducer.industriesAll || []);
    const totalElements = useSelector((state) => state.PortalReducer.totalJobFeatures || 0);
    const [filter, setFilter] = useState("location");
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const [size, setSize] = useState(9);
    const locationListRef = useRef(null);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(get_all_job(0, size));
        dispatch(get_all_industry());
    }, [dispatch, size]);
    useEffect(() => {
        localStorage.setItem('totalJobElements', totalElements);
    }, [totalElements]); // Dễ dàng theo dõi thay đổi của totalElements
    // Cập nhật các option lọc khi filter thay đổi
    useEffect(() => {
        switch (filter) {
            case "location":
                setFilteredOptions(defaultLocations);
                setSelectedOption(0); // Đặt tùy chọn mặc định là "Tất cả"
                break;
            case "industry":
                if (industries.length > 0) {
                    const updatedIndustries = [{ id: 0, name: "Tất cả" }, ...industries.map((industry) => ({ id: industry.id, name: industry.name }))];
                    setFilteredOptions(updatedIndustries);
                } else {
                    setFilteredOptions([]);
                }
                break;
            default:
                setFilteredOptions([]);
                setSelectedOption(0); // Đặt tùy chọn mặc định là "Tất cả"
                break;
        }
    }, [filter, industries]);


    // Lọc dữ liệu theo ngành nghề
    const onHandleChangeIndustry = (industryId) => {
        setSelectedOption(industryId);
        if (filter === "industry") {
            if(industryId === 0){
                dispatch(get_all_job(currentPage-1,size));
            }
            else{
                dispatch(get_all_job_by_industry(currentPage - 1, size, industryId));
            }
        }
    };

    const handleDetailsJob = (id) => {
        const encryptedId = encryptId(id);  // Encrypt the ID first
        const url = `/job-portal-detail/${encodeURIComponent(encryptedId)}`; // Make sure the encrypted ID is properly encoded
        window.open(url, "_blank");  // Open in a new tab
    };

    // Lọc dữ liệu theo tỉnh thành hoặc vùng miền
    const onHandleChangeProvince = (provinceId) => {
        setSelectedOption(provinceId);
        if (filter === "location") {
            if (provinceId === 3 || provinceId === 7) {
                dispatch(get_all_job_by_region(currentPage - 1, size, provinceId));
            } else if (provinceId === 0) {
                dispatch(get_all_job(currentPage - 1, size));
            } else {
                dispatch(get_all_job_by_province(currentPage - 1, size, provinceId));
            }
        }
    };

    // Đổi bộ lọc
    const handleMenuClick = (e) => {
        setFilter(e.key);
        setSelectedOption(0);
        setCurrentPage(1);

        if (e.key === "location" || e.key === "industry") {
            dispatch(get_all_job(0, size));
        }
    };

    // Thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
        switch (filter) {
            case "location":
                if (selectedOption === 0) {
                    dispatch(get_all_job(page - 1, size));
                } else if (selectedOption === 3 || selectedOption === 7) {
                    dispatch(get_all_job_by_region(page - 1, size, selectedOption));
                } else {
                    dispatch(get_all_job_by_province(page - 1, size, selectedOption));
                }
                break;

            case "industry":
                if (selectedOption === 0) {
                    dispatch(get_all_job(page - 1, size));
                } else {
                    dispatch(get_all_job_by_industry(page - 1, size, selectedOption));
                }
                break;

            // case "salary":
            //     // Tùy chỉnh nếu bạn muốn xử lý lọc theo mức lương
            //     dispatch(get_all_job(page - 1, size));
            //     break;
            //
            // case "experience":
            //     // Tùy chỉnh nếu bạn muốn xử lý lọc theo năm học
            //     dispatch(get_all_job(page - 1, size));
            //     break;

            default:
                dispatch(get_all_job(page - 1, size));
                break;
        }
    };

    // Cuộn danh sách
    const smoothScroll = (element, distance) => {
        const start = element.scrollLeft;
        const change = distance;
        const duration = 500;
        let startTime = null;

        const animateScroll = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            element.scrollLeft = start + change * progress;

            if (elapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    const scrollLeft = () => {
        if (locationListRef.current) {
            smoothScroll(locationListRef.current, -500);
        }
    };

    const scrollRight = () => {
        if (locationListRef.current) {
            smoothScroll(locationListRef.current, 500);
        }
    };

    // Tạo menu dropdown
    const generateMenu = (handleMenuClick) => (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="location">
                <i className="fas fa-map-pin"></i> Địa điểm
            </Menu.Item>
            {/*<Menu.Item key="salary">*/}
            {/*    <i className="fas fa-money-bill"></i> Mức lương*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="experience">*/}
            {/*    <i className="fas fa-user-tie"></i> Năm học*/}
            {/*</Menu.Item>*/}
            <Menu.Item key="industry">
                <i className="fas fa-industry"></i> Ngành nghề
            </Menu.Item>
        </Menu>
    );

    const jobPopoverContent = (job) => (
        <div className="popover-content">

            {/* Header với hình ảnh và thông tin job */}
            <div className="popover-header">
                <div className="header-left">
                    <img
                        src={`${DOMAIN}/api/v1/image/resource?imageId=${job.imageBusinessId}`}
                        alt="job-img"
                        className="job-img"
                    />
                </div>
                <div className="header-right">
                    <h3>
                        <p className="icon-title"/> {job.title}
                    </h3>
                    <p className="business-name">
                        <p className="icon-business"/> {job.businessName}
                    </p>
                    <p className="salary">
                        <p className="icon-salary">
                            {job.fromSalary && job.fromSalary !== 1
                                ? new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(job.fromSalary)
                                : 'Thoả thuận'}
                        </p>


                    </p>
                </div>

            </div>

            {/* Nội dung chính */}
            <div className="popover-body">
                <p className={"job-location-popover"}>
                    <FaMapMarkerAlt className="icon-location"/> {job.province}
                </p>
                <p className={"job-location-requirement"}>
                    <FaFileAlt className="icon-requirement"/> Sinh viên năm {job.level}
                </p>
                <p className={"job-location-expireDate"}>
                    <FaCalendarAlt className="icon-calendar"/> {job.expireDate}
                </p>
            </div>

            {/* Chi tiết công việc */}
            <div className="popover-details">
                <p>
                    <strong>Mô tả công việc: </strong>
                    <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(job.description)}}/>
                </p>
                <p>
                    <strong>Yêu cầu công việc: </strong>
                    <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(job.requirement)}}/>
                </p>
                <p>
                    <strong>Quyền lợi: </strong>
                    <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(job.benefit)}}/>
                </p>
                <p className="popover-job-location">
                    <strong>Địa điểm làm việc: </strong>
                    <span>{job.address}, {job.ward}, {job.district}, {job.province}</span>
                </p>
            </div>
            <div className="popover-footer">
                <a
                    onClick={() => handleDetailsJob(job.jobId)}
                    className="view-details-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaExternalLinkAlt className="icon-link"
                    /> Xem chi tiết
                </a>
            </div>

        </div>
    );


    return (
        <div className="job-portal-container" data-aos="fade-up">
            <p className="title-job-portal">Việc làm tốt nhất</p>
            <Card className="search-bar">
                <div className="filter-location-container">
                    <div className="filter-container">
                        <i className="fas fa-filter filter-icon"></i>
                        <span className="filter-label">Lọc theo:</span>
                        <Dropdown overlay={generateMenu(handleMenuClick)} trigger={["click"]}>
                            <div className="dropdown-container">
                                <span className="selected-filter">
                                    {filter === "location" ? "Địa điểm" : filter === "salary" ? "Mức lương" : filter === "experience" ? "Kinh nghiệm" : filter === "industry" ? "Ngành nghề" : "Vị trí"}
                                </span>
                                <DownOutlined className="dropdown-icon" />
                            </div>
                        </Dropdown>
                    </div>

                    <div className="location-scroll-container">
                        <button className="scroll-btn" onClick={scrollLeft}>{"<"}</button>
                        <div className="location-list" ref={locationListRef}>
                            {filteredOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className={`location-item ${selectedOption === option.id ? "active" : ""}`}
                                    onClick={() => {
                                        if (filter === "location") onHandleChangeProvince(option.id);
                                        if (filter === "industry") onHandleChangeIndustry(option.id);
                                        setSelectedOption(option.id); // Cập nhật selectedOption
                                    }}
                                >
                                    {option.name}
                                </div>
                            ))}
                        </div>
                        <button className="scroll-btn" onClick={scrollRight}>{">"}</button>
                    </div>
                </div>
            </Card>

            <Row gutter={[16, 2]} className="grid">
                {!response?.jobList?.length ? (
                    <Col span={24}>
                        <div className="no-jobs-message">
                            <p>Không có công việc nào phù hợp.</p>
                        </div>
                    </Col>
                ) : (
                    response?.jobList?.map((job, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <div className="job-portal-card">
                                <div className="job-portal-card-image">
                                    <img src={`${DOMAIN}/api/v1/image/resource?imageId=${job.imageBusinessId}`} alt="job-img" />
                                </div>
                                <div className="job-portal-card-content">
                                    <Popover content={jobPopoverContent(job)}  placement="right"
                                             trigger="hover">
                                        <h3 className="job-portal-card-title">{job.title}</h3>
                                    </Popover>
                                    <p className="job-portal-card-company">{job.businessName}</p>
                                    <div className="job-portal-card-location-salary">
                           <span className="job-portal-card-tag">
{job.fromSalary && job.fromSalary !== 1
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(job.fromSalary)
    : 'Thoả thuận'}

</span>

                                        <span className="job-portal-card-tag">{job.province}</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))
                )}
            </Row>

            <Pagination
                style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
                className="job-portal-pagination"
                current={currentPage}
                pageSize={size}
                total={totalElements}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default JobPortal;
