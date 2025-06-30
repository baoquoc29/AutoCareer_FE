import React, {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Row, Space, Typography, Input, Select, Pagination, Tag, notification} from "antd";
import {useParams} from "react-router-dom";
import DisplayRichText from "../../../src/Component/TextEditDisplay/DisplayRichText";
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import {get_business_by_id} from "../../Redux/actions/BusinessThunk";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../Utils/Setting/Config";
import {get_all_job_of_business_paging_portal} from "../../Redux/actions/JobThunk";
import dayjs from "dayjs";
import {decryptId, encryptId} from "../../Component/SecurityComponent/cryptoUtils";
import {
    ApartmentOutlined,
    ArrowRightOutlined, BankOutlined,
    BulbOutlined,
    CalendarOutlined, CheckOutlined,
    ContactsOutlined,
    EnvironmentOutlined,
    GlobalOutlined, InfoCircleOutlined,
    MailOutlined,
    PhoneOutlined,
    PlusOutlined, SearchOutlined, TeamOutlined, UsergroupAddOutlined
} from "@ant-design/icons";
import FooterPortal from "./FooterPortal";
import "./StylePortal/BusinessDetail.css";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {check_follow, count_follower, post_follow, un_follow} from "../../Redux/actions/CandidateThunk";
import {toast} from "react-toastify";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const BusinessDetailPage = () => {
    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState(""); // Từ khóa tìm kiếm
    const [currentPage, setCurrenPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const totalElements = useSelector((state) => state.JobReducer.totalElements);
    const [locationFilter, setLocationFilter] = useState(""); // Lọc theo địa điểm
    const businessData = useSelector((state) => state.BusinessReducer.business);
    const jobData = useSelector((state) => state.JobReducer.listJopPortal);
    const { id } = useParams();
    const [encryptedId, setEncryptedId] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const user = useSelector(state => state.UserReducer.userData);
    const [totalFollowing, setTotalFollowing] = useState(0);
    useEffect(() => {
        setEncryptedId(id);
    }, [id]);

    useEffect(() => {
        dispatch(get_business_by_id(decryptId(encryptedId)));
        dispatch(get_all_job_of_business_paging_portal(currentPage, pageSize, encodeURIComponent(searchKeyword), decryptId(encryptedId),));
    }, [dispatch,currentPage, searchKeyword, pageSize, encryptedId]);

    useEffect(() => {
        if (user) {
            const checkFollowStatus = async () => {
                try {
                    const res = await dispatch(check_follow(decryptId(encryptedId), user.candidateResponse.id));
                    if (res.success && res.payload.data === true) {
                        setIsFollowing(true);
                    } else {
                        setIsFollowing(false);
                    }
                } catch (error) {
                    toast.error(error.response?.data?.message || "Lỗi kiểm tra trạng thái theo dõi");
                }
            };

            checkFollowStatus(); // ✅ Gọi trong if
        }
    }, [businessData, user]);



    useEffect(() => {
        const countFollow = async () => {
            try {
                const res = await dispatch(count_follower(decryptId(encryptedId)));
                if (res.payload.data !== 0) {
                    setTotalFollowing(res.payload.data);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Lỗi kiểm tra trạng thái theo dõi");
            }
        };
         countFollow();
    }, [encryptedId,isFollowing]);

    const handleDetailsJob = (id) => {
        const encryptedId = encryptId(id)
        ;  // Encrypt the ID first
        const url = `/job-portal-detail/${id}`; // Make sure the encrypted ID is properly encoded
        window.open(url, "_blank");  // Open in a new tab
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchKeyword(value); // Cập nhật giá trị ô tìm kiếm
        setCurrenPage(1);
    };

    const handlePageChange = (page, pageSize) => {
        setCurrenPage(page);
        setPageSize(pageSize);
    };

    if (!businessData) {
        return (
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
                            <div>Không tìm thấy thông tin doanh nghiệp.</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const followBusiness = async () => {
        if (!decryptId(encryptedId) || !user?.candidateResponse?.id) {
            toast.error("Dữ liệu không hợp lệ, vui lòng kiểm tra lại dữ liệu đầu vào.");
            return;
        }

        try {
            await dispatch(post_follow(decryptId(encryptedId), user.candidateResponse.id));

            setIsFollowing(true);
            toast.success("Đã theo dõi công ty!");
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };
    const unfollowBusiness = async () => {
        if (!businessData?.id || !user?.candidateResponse?.id) {
            toast.error("Dữ liệu không hợp lệ, vui lòng kiểm tra lại dữ liệu đầu vào.");
            return;
        }

        try {
            await dispatch(un_follow(decryptId(encryptedId), user.candidateResponse.id));

            setIsFollowing(false);
            toast.success("Đã huỷ theo dõi công ty!");
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };


    return (
        <div className="company-profile-page">
            <HeaderPortal/>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div className="company-profile-container">
                            {/* Company Header Section */}
                            <Row gutter={[24, 24]}>
                                <Col span={24}>
                                    <Card
                                        bordered={false}
                                        className="company-header-card"
                                        bodyStyle={{ padding: '24px' }}
                                    >
                                        <Row align="middle" gutter={[24, 16]}>
                                            {/* Company Logo */}
                                            <Col flex="none">
                                                <div className="company-logo-container">
                                                    <img
                                                        src={businessData?.businessImageId
                                                            ? `${GET_IMAGE_URI}${businessData["businessImageId"]}`
                                                            : "/images/default-company-logo.png"}
                                                        alt="Company logo"
                                                        className="company-logo"
                                                        onError={(e) => {
                                                            e.target.src = "/images/default-company-logo.png"
                                                        }}
                                                    />
                                                </div>
                                            </Col>

                                            {/* Company Info */}
                                            <Col flex="auto">
                                                <div className="company-info">
                                                    <h1 className="company-name">{businessData.name}</h1>

                                                    <div className="company-meta">
                                                        <div className="meta-item">
                                                            <MailOutlined className="meta-icon"/>
                                                            <span>{businessData.email || "Email not provided"}</span>
                                                        </div>
                                                        <div className="meta-item">
                                                            <BankOutlined   className="meta-icon"/>
                                                            <span>{businessData.companySize || "Not specified"} nhân viên</span>
                                                        </div>
                                                        <div className="meta-item">
                                                            <UsergroupAddOutlined className="meta-icon"/>
                                                            <span>{totalFollowing || "0"} người theo dõi</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>

                                            {/* Follow Button */}
                                            <Col flex="none">
                                                <Button
                                                    type="primary"
                                                    shape="round"
                                                    size="large"
                                                    icon={isFollowing ? <CheckOutlined /> : <PlusOutlined />}
                                                    className={`follow-btn ${isFollowing ? "unfollow" : "follow"}`}
                                                    onClick={isFollowing ? unfollowBusiness : followBusiness}
                                                    danger={isFollowing}
                                                >
                                                    {isFollowing ? "Huỷ theo dõi" : "Theo dõi công ty"}
                                                </Button>
                                            </Col>

                                        </Row>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Main Content Section */}
                            <Row gutter={[24, 24]} className="main-content">
                                {/* Left Column - Company Info & Jobs */}
                                <Col xs={18} md={18}>
                                    {/* Company Description */}
                                    <Card
                                        bordered={false}
                                        className="info-card"
                                    >
                                        <div className="section-header">
                                            <InfoCircleOutlined className="section-icon" />
                                            <h2>Giới thiệu</h2>
                                        </div>
                                        <div className="description-content">
                                            <DisplayRichText content={businessData.description}/>
                                        </div>
                                    </Card>

                                    {/* Job Openings */}
                                    <Card
                                        bordered={false}
                                        className="info-card jobs-card"
                                    >
                                        <div className="section-header">
                                            <BulbOutlined className="section-icon" />
                                            <h2>Danh sách công việc</h2>
                                        </div>

                                        {/* Search and Filter */}
                                        <div className="job-search-filters">
                                            <Input
                                                placeholder="Tìm kiếm công việc..."
                                                value={searchKeyword}
                                                onChange={handleSearch}
                                                prefix={<SearchOutlined />}
                                                className="search-input"
                                            />
                                            <Select
                                                placeholder="Lọc theo địa chỉ"
                                                value={locationFilter}
                                                onChange={(value) => setLocationFilter(value)}
                                                className="location-filter"
                                                suffixIcon={<EnvironmentOutlined />}
                                            >
                                                <Select.Option value="">Tất cả</Select.Option>
                                                <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                                                <Select.Option value="TP.HCM">TP.HCM</Select.Option>
                                            </Select>
                                        </div>

                                        {/* Job Listings */}
                                        <div className="job-listings">
                                            {jobData.map((job) => (
                                                <Card
                                                    key={job.jobId}
                                                    bordered={false}
                                                    className="job-card"
                                                    onClick={() => handleDetailsJob(job.jobId)}
                                                >
                                                    <Row gutter={[16, 16]} align="middle">
                                                        {/* Company Logo */}
                                                        <Col xs={24} sm={5}>
                                                            <div className="job-company-logo">
                                                                <img
                                                                    src={`${GET_IMAGE_URI}${job?.businessImageId}`}
                                                                    alt="Company logo"
                                                                    onError={(e) => {
                                                                        e.target.src = "/images/default-company-logo.png"
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>

                                                        {/* Job Details */}
                                                        <Col xs={24} sm={19}>
                                                            <div className="job-details">
                                                                <div className="job-title-row">
                                                                    <h3 className="job-title">{job.title}</h3>
                                                                    <div className="job-salary">
                                                                        {job.fromSalary !== 1
                                                                            ? `${new Intl.NumberFormat("vi-VN").format(job.fromSalary)} VND`
                                                                            : "Negotiable"}
                                                                    </div>
                                                                </div>

                                                                <div className="company-name">
                                                                    {businessData.name}
                                                                </div>

                                                                <div className="job-tags">
                                                                    <Tag icon={<EnvironmentOutlined />}>
                                                                        {job?.province || "Location not specified"}
                                                                    </Tag>
                                                                    <Tag icon={<CalendarOutlined />}>
                                                                        {job.expireDate
                                                                            ? dayjs(job.expireDate).format("DD/MM/YYYY")
                                                                            : "No deadline"}
                                                                    </Tag>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <div className="view-details-btn">
                                                        <Button
                                                            type="link"
                                                            className="details-link"
                                                        >
                                                            Xem chi tiết <ArrowRightOutlined />
                                                        </Button>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>

                                        {/* Pagination */}
                                        <div className="jobs-pagination">
                                            <Pagination
                                                current={currentPage}
                                                pageSize={pageSize}
                                                total={totalElements}
                                                onChange={handlePageChange}
                                                showSizeChanger={true}
                                                pageSizeOptions={['5', '10', '20', '50', '100']}
                                                showTotal={(total, range) => `${range[0]}-${range[1]} trong ${total} công việc`}
                                            />
                                        </div>
                                    </Card>
                                </Col>


                                <Col xs={24} md={6}>
                                    <Card bordered={false} className="info-card contact-card">
                                        <div className="section-header">
                                            <ContactsOutlined className="section-icon" />
                                            <h2>Thông tin liên hệ</h2>
                                        </div>

                                        <div className="contact-info">
                                            <div className="contact-item">
                                                <div className="contact-icon">
                                                    <EnvironmentOutlined />
                                                </div>
                                                <div className="contact-details">
                                                    <div className="contact-label">Địa chỉ</div>
                                                    <div className="contact-value">
                                                        {businessData.location?.ward.fullName},
                                                        {businessData.location?.district.fullName},
                                                        {businessData.location?.province.fullName}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="contact-item">
                                                <div className="contact-icon">
                                                    <MailOutlined />
                                                </div>
                                                <div className="contact-details">
                                                    <div className="contact-label">Email</div>
                                                    <div className="contact-value">
                                                        {businessData.email || "Not provided"}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="contact-item">
                                                <div className="contact-icon">
                                                    <PhoneOutlined />
                                                </div>
                                                <div className="contact-details">
                                                    <div className="contact-label">Phone</div>
                                                    <div className="contact-value">
                                                        {businessData.phone || "Not provided"}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="contact-item">
                                                <div className="contact-icon">
                                                    <GlobalOutlined />
                                                </div>
                                                <div className="contact-details">
                                                    <div className="contact-label">Website</div>
                                                    <div className="contact-value">
                                                        {businessData.website ? (
                                                            <a href={businessData.website} target="_blank" rel="noopener noreferrer">
                                                                {businessData.website}
                                                            </a>
                                                        ) : "Not provided"}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bản đồ ở đây */}
                                            {/*{position && (*/}
                                            {/*    <div style={{ marginTop: 20 }}>*/}
                                            {/*        <MapContainer*/}
                                            {/*            center={position}*/}
                                            {/*            zoom={16}*/}
                                            {/*            scrollWheelZoom={false}*/}
                                            {/*            style={{ height: "300px", width: "100%", borderRadius: "10px" }}*/}
                                            {/*        >*/}
                                            {/*            <TileLayer*/}
                                            {/*                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                                            {/*                attribution='&copy; OpenStreetMap contributors'*/}
                                            {/*            />*/}
                                            {/*            <Marker position={position}>*/}
                                            {/*                <Popup>*/}
                                            {/*                    {businessData.location?.ward.fullName}, {businessData.location?.district.fullName}, {businessData.location?.province.fullName}*/}
                                            {/*                </Popup>*/}
                                            {/*            </Marker>*/}
                                            {/*        </MapContainer>*/}
                                            {/*    </div>*/}
                                            {/*)}*/}
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <FooterPortal/>
            </section>
        </div>
    );
};

export default BusinessDetailPage;
