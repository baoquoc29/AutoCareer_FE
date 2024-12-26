import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import HeaderPortal from "../../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import {get_all_result_search_business_page} from "../../../Redux/actions/BusinessThunk";
import {useDispatch, useSelector} from "react-redux";

const HomeSearchBusiness =()=>{
    const location = useLocation();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || ""); // Lấy giá trị từ state
    const currentPage = useSelector((state) => state.CooperationReducer.currentPage);
    const pageSize = useSelector((state) => state.CooperationReducer.pageSize);
    const totalElements = useSelector((state) => state.CooperationReducer.totalElements);
    const [load, setLoad] = useState(false);
    const resultSearchBusiness=useSelector((state)=>state.BusinessReducer.resultSearchBusiness);

    useEffect(() => {
        dispatch(get_all_result_search_business_page(currentPage, pageSize, searchQuery));
    }, [dispatch, currentPage, searchQuery, pageSize, load]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Cập nhật giá trị tìm kiếm
    };

    return(
        <div>
            <>
                <HeaderPortal/>
                <div className="contain-portal-business">
                    <div className="header-portal-business">
                        <div className="header-contain-portal-business">
                            <div className="header-left">
                                <h1 className="h1-title-portal-business">Khám phá 100.000+ công ty nổi bật</h1>
                                <p className='p-header-portal-business'>Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn</p>
                                <div className="search-container-portal-business">
                                    <i className="fa-solid fa-magnifying-glass search-icon-portal-business"></i>
                                    <input
                                        type="text"
                                        placeholder="Nhập tên công ty"
                                        className="search-input-portal-business"
                                        value={searchQuery} // Liên kết với state
                                        onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật state khi nhập
                                    />
                                    <button className="search-button-portal-business" onClick={handleSearchChange}>Tìm kiếm
                                    </button>
                                </div>
                            </div>
                            <div className="header-right-portal-business">
                                <img className="header-left-image" src='image-header-right.png' style={{width: '272px'}}/>
                            </div>
                        </div>
                    </div>
                    <div className="body-portal-business">
                        <div className="body-title-portal-business">
                            <h1 className="title-body-portal-business">DANH SÁCH CÁC CÔNG TY NỔI BẬT</h1>
                        </div>
                        <div className='body-content-pb'>
                            <div className="body-content-portal-business">
                                {resultSearchBusiness.map((business) => (
                                    <div className="card-portal-business" key={business.id}>
                                        <div className="logo-section">
                                            <img
                                                className="banner-image"
                                                alt="anh nền"
                                                src={business.licenseImageId ? `${GET_IMAGE_URI}${business.licenseImageId}` : 'background-business.jpeg'}
                                            />
                                            <img
                                                className="logo-iamge-bp"
                                                src={business.imageID ? `${GET_IMAGE_URI}${business.imageID}` : 'placeholder-avatar.jpg'}
                                                alt="logo"
                                            />
                                        </div>

                                        <h3>{business.businessName}</h3>

                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </>
        </div>
    )
}
export default HomeSearchBusiness;