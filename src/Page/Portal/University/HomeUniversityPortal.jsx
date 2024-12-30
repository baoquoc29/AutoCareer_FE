import HeaderPortal from "../../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import './CSS/HomeUniversityPortal.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {get_all_university_home_portal} from "../../../Redux/actions/PortalThunk";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import {useNavigate} from "react-router-dom";

const HomeBusinessPortal = () => {
    const university = useSelector((state) => state.PortalReducer.universityListHome || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(get_all_university_home_portal());
        console.log(university);
    }, [dispatch]);

    const truncateDescription = (description, wordLimit = 80) => {
        if (!description)
            description = "Không có nội dung";
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    };

    const handleSearch=()=>{
        navigate('/home-search-university', { state: { searchQuery: search } });
    }

    return (
        <>
            <HeaderPortal/>
            <div className="contain-portal-business">
                <div className="header-portal-business">
                    <div className="header-contain-portal-business">
                        <div className="header-left">
                            <h1 className="h1-title-portal-business">Khám phá 10.000+ trường học nổi bật</h1>
                            <p className='p-header-portal-business'>Tra cứu thông tin trường học và tìm kiếm nguồn nhân lực tốt nhất dành cho doanh nghiệp của bạn</p>
                            <div className="search-container-portal-business">
                                <i className="fa-solid fa-magnifying-glass search-icon-portal-business"></i>
                                <input
                                    type="text"
                                    placeholder="Nhập tên truong hoc"
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
                    <h1 className="title-body-portal-business">DANH SÁCH CÁC TRƯỜNG HỌC NỔI BẬT</h1>
                    </div>
                    <div className='body-content-pb'>
                    <div className="body-content-portal-business">
                        {university.map((univer) => (
                            <div className="card-portal-business" key={univer.id}>
                                <div className="logo-section">
                                    <img
                                        className="banner-image"
                                        alt="anh nền"
                                        src={univer.licenseImageId ? `${GET_IMAGE_URI}${univer.licenseImageId}` : 'background-business.jpeg'}
                                    />
                                    <img
                                        className="logo-iamge-bp"
                                        src={univer.imageID ? `${GET_IMAGE_URI}${univer.imageID}` : 'placeholder-avatar.jpg'}
                                        alt="logo"
                                    />
                                </div>

                                <h3>{univer.universityName}</h3>
                                <p>{truncateDescription(univer.description)}</p>
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
