import HeaderPortal from "../../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import './CSS/HomeBusinessPortal.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {get_all_business_home_portal} from "../../../Redux/actions/PortalThunk";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import {useNavigate} from "react-router-dom";

const HomeBusinessPortal = () => {
    const businesses = useSelector((state) => state.PortalReducer.businessListHome || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(get_all_business_home_portal());
    }, [dispatch]);

    const truncateDescription = (description, wordLimit = 80) => {
        if(!description){
            description = "Không có mô tả";
        }
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    };

    const handleSearch=()=>{
        navigate('/home-search-business', { state: { searchQuery: search } });
    }

    return (
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
                                    value={search} // Liên kết với state
                                    onChange={(e) => setSearch(e.target.value)} // Cập nhật state khi nhập
                                />
                                <button className="search-button-portal-business" onClick={handleSearch}>Tìm kiếm
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
                        {businesses.map((business) => (
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
                                <p>{truncateDescription(business.description)}</p>
                            </div>
                        ))}
                    </div>
                    </div>

                </div>
            </div>
        </>
    );
}
export default HomeBusinessPortal;
