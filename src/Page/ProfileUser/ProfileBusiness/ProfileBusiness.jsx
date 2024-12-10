import './ProfileBusiness.css'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DOMAIN, GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import {get_all_industry} from "../../../Redux/actions/IndustryThunk";
import {useNavigate} from "react-router-dom";


const ProfileBusiness = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const industry = useSelector(state => state.IndustryReducer.industries);
    useEffect(() => {
        dispatch(get_all_industry())
    }, [dispatch])

    console.log("industry ----------",industry)

    const handleEditClick = () => {
        if (business?.id) {
            navigate(`/profile-business-edit`);
        }
    };

    const business = useSelector(state => state.UserReducer.userData ? state.UserReducer.userData["business"] : undefined);
    console.log(business)
    if (!business) {
        return <p>Loading...</p>;
    }
    return (

        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div>
                        <div className="container">
                            <div className="card card-profile-university p-4">
                                <div className="row mb-4">
                                    <div className="col-md-3 text-center">
                                        <img
                                            src={`${GET_IMAGE_URI}${business["businessImageId"]}`}
                                            alt="Logo Doanh Nghiệp" className="img-fluid logo-image"
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <h1>{business.name}</h1>
                                        <p>{business.description}</p>
                                    </div>
                                </div>

                                {/* Thông tin chung */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <h1 className="header">Thông Tin Chung</h1>
                                        <p><strong>Tên Doanh Nghiệp:</strong> {business.name}</p>
                                        <p><strong>Website:</strong> <a
                                            href={business["website"]}>{business["website"]}</a></p>
                                        <p><strong>Năm thành lập:</strong> {business["foundYear"]}</p>
                                        <p><strong>Mã số thuế:</strong> {business["taxCode"]}</p>
                                        <p><strong>Quy mô doanh nghiệp:</strong> {business["companySize"]}
                                        </p>
                                        <p><strong>Địa Chỉ:</strong> {business.location.province.fullName},
                                            {business.location.district.fullName},
                                            {business.location.ward.fullName},
                                            {business.location.description},
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <h1 className="header">Liên Hệ</h1>
                                        <p><strong>Email:</strong> {business.email}</p>
                                        <p><strong>Điện Thoại:</strong> {business.phone}</p>
                                    </div>
                                </div>

                                {/* Khoa giảng dạy */}
                                <div className="row mb-3">
                                    <h2 className="header">Chuyên ngành kinh doanh</h2>
                                    <div className="d-flex flex-wrap">
                                        {industry.map((item, index) => (
                                            <span className="badge badge-pill badge-blue mt-2 mx-2"
                                                  key={index}>{item.name}</span>
                                        ))}
                                    </div>
                                </div>

                                {/*/!* Ngành học *!/*/}
                                {/*<div className="row mb-4">*/}
                                {/*    <h2 className="header">Ngành Học</h2>*/}
                                {/*    <div className="d-flex flex-wrap">*/}
                                {/*        {majors.map((item, index) => (*/}
                                {/*            <span className="badge badge-pill badge-blue-dark mt-3 mx-2"*/}
                                {/*                  key={index}>{item.name}</span>*/}
                                {/*        ))}*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/* Nút chỉnh sửa */}
                                <div className="text-center">
                                    <button
                                        onClick={handleEditClick}
                                        className="btn btn-warning btn-profile-university-custom"
                                    >
                                        Chỉnh Sửa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ProfileBusiness;