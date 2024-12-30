import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderPortal from "../../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import { GET_IMAGE_URI } from "../../../Utils/Setting/Config";
import { get_all_result_search_business_page } from "../../../Redux/actions/BusinessThunk";
import "./CSS/HomeSearchBusiness.css";
import {Pagination} from "antd";
import {get_all_business_home_portal} from "../../../Redux/actions/PortalThunk";
import {encryptId} from "../../../Component/SecurityComponent/cryptoUtils";

const HomeSearchBusiness = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(location.search);
    const keywordFromURL = queryParams.get("keyword") || "";
    const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || keywordFromURL ||  "");
    const [currentPage, setCurrenPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const totalElements = useSelector((state) => state.BusinessReducer.totalElements);
    const [load, setLoad] = useState(false);
    const resultSearchBusiness = useSelector((state) => state.BusinessReducer.resultSearchBusiness);
    const businessTop= useSelector((state) => state.PortalReducer.businessListHome);

    console.log(resultSearchBusiness)
    useEffect(() => {
        dispatch(get_all_result_search_business_page(currentPage, pageSize, encodeURIComponent(searchQuery)));
        dispatch(get_all_business_home_portal())
    }, [dispatch, currentPage, searchQuery, pageSize, load]);

    const handleDetailsBusinessPortal = (id) => {
        const encryptedId = encryptId(id);  // Encrypt the ID first
        const url = `/business-portal-detail/${encodeURIComponent(encryptedId)}`;  // Make sure the encrypted ID is properly encoded
        window.open(url, "_blank");  // Open in a new tab
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setCurrenPage(1);
    };
    const handlePageChange = (page, pageSize) => {
        setCurrenPage(page);
        setPageSize(pageSize);
    };

    const truncateDescription = (description, length) => {
        if (!description) {
            return "";
        }
        return description.length > length ? `${description.substring(0, length)}...` : description;
    };
    return (
        <div className="contain-search-business">
            <HeaderPortal />
            <div className="header-search-business">
                <div className="header-contain-search-business">
                    <div className="header-left-search-business">
                        <h1 className="h1-title-search-business">
                            Tìm kiếm thông tin công ty để Career Bridge kết nối bạn với những cơ hội việc làm phù hợp nhất
                        </h1>
                        <div className="search-container-search-business">
                            <i className="fa-solid fa-magnifying-glass search-icon-search-business"></i>
                            <input
                                type="text"
                                placeholder="Nhập tên công ty"
                                className="search-input-search-business"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button
                                className="search-button-search-business"
                                // onClick={}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                    <div className="header-right-search-business">
                        <img
                            className="header-left-image"
                            src="/HomeSearchBusinessImage.png"
                            alt="header-right"
                            style={{ width: "190px" }}
                        />
                    </div>
                </div>
            </div>
            <div className="body-content-search-business">
                <div className="main-content-search-business">
                    <div className="result-search-business">
                        <p className="content-left-header">
                            <strong>Tìm thấy <span style={{color: "blue"}}>{totalElements? totalElements : 0} công ty</span> phù hợp với yêu cầu của
                                bạn</strong>
                        </p>
                        <div className="company-list">
                            {resultSearchBusiness.map((business) => (
                                <div className="company-item company-item-hover">
                                    <a onClick={() => handleDetailsBusinessPortal(business.id)} className="item-logo-business">
                                        <img className="item-logo-business-img"
                                             src={business?.imageID ? `${GET_IMAGE_URI}${business?.imageID}` : 'placeholder-avatar.jpg'}
                                             alt="FPT Shop"
                                        />
                                    </a>
                                    <div className="item-info-business">
                                        <div className="item-info-business-title">
                                            <strong>
                                                <a className="item-info-business-company-name"
                                                   onClick={() => handleDetailsBusinessPortal(business.id)}
                                                   target="_blank">{business?.name}
                                                </a>
                                            </strong>
                                            <span className="item-info-business-countJob">
                                            <i className="fa-solid fa-circle circle"></i>
                                            Đang tuyển {business?.totalJobRecruit} vị trí
                                        </span>
                                        </div>

                                        <div className="item-info-business-location">
                                            <i className="fa-solid fa-map-location-dot"></i>
                                            <span style={{fontSize: '15px', color: 'black'}}>
                                            <span style={{
                                                fontWeight: 'bold',
                                                color: 'black',
                                                marginRight: '5px',
                                                marginLeft: '2px',
                                                fontSize: '16px'
                                            }}>
                                                Trụ sở chính:
                                            </span>
                                                {business?.province}, {business?.district}, {business?.ward}, {business?.locationDescription}.
                                        </span>
                                        </div>

                                        <div className="item-info-business-description">
                                            <i className="fa-solid fa-circle-info"></i>
                                            <p style={{color: 'black'}}>
                                                {truncateDescription(business?.description, 170)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                            <Pagination
                                current={currentPage} // Gán mặc định nếu currentPage không hợp lệ
                                pageSize={pageSize}   // Gán mặc định nếu pageSize không hợp lệ
                                defaultPageSize={5}
                                defaultCurrent={1}
                                total={totalElements} // Gán mặc định nếu totalElements không hợp lệ
                                onChange={handlePageChange}
                                showSizeChanger={true}
                                pageSizeOptions={[5, 10, 20, 50, 100]} // Đảm bảo mọi giá trị trong mảng là chuỗi
                            />
                        </div>
                    </div>

                    <div className="sidebar-business-search">
                        <h3 className="sidebar-business-search-h3">Nhà tuyển dụng hàng đầu</h3>
                        <div className="image-business-home-search">
                            {businessTop.map((business) => (
                                <div class="featured-company-img">
                                    <div class="box-img">
                                        <div onClick={()=>handleDetailsBusinessPortal(business.id)} target="_blank">
                                        <img src={business?.imageID ? `${GET_IMAGE_URI}${business?.imageID}` : 'placeholder-avatar.jpg'} alt="employer"/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSearchBusiness;
