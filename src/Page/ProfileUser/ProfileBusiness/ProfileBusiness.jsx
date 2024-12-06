import './ProfileBusiness.css'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DOMAIN, GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import {get_all_industry} from "../../../Redux/actions/IndustryThunk";


const ProfileBusiness = () => {
    const dispatch = useDispatch();
    const industry = useSelector(state => state.IndustryReducer.industry);
    useEffect(() => {
        dispatch(get_all_industry())
    }, [dispatch])
    const business = useSelector(state => state.UserReducer.userData ? state.UserReducer.userData["business"] : undefined);
    console.log(business)
    if (!business) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <section id="content" className="content">
                            <div className="content__header content__boxed rounded-0">
                                <div className="content__wrap">
                                    <section>
                                        <div className="container">
                                            <div className="card card-custom p-4">
                                                <div className="row mb-4">
                                                    <div className="col-md-3 text-center">
                                                        <img
                                                            src={`${GET_IMAGE_URI}${business["businessImageId"]}`}
                                                            alt="Logo Doanh Nghiệp" className="img-fluid logo-image"/>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <h1>{business.name}</h1>
                                                        <p>{business.description}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <h1 className="header">Thông Tin Chung</h1>
                                                        <p><strong>Tên Doanh Nghiệp:</strong> {business.name}</p>
                                                        <p><strong>Website:</strong> <a
                                                            href={business["website"]}>{business["website"]}</a></p>
                                                        <p><strong>Năm thành lập:</strong> {business["foundYear"]}</p>
                                                        <p><strong>Mã số thuế:</strong> {business["taxCode"]}</p>
                                                        <p><strong>Quy mô doanh nghiệp:</strong> {business["companySize"]}</p>
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
                                                {/*<div className="row mb-3">*/}
                                                {/*    <h1 className="header">Khoa giảng dạy</h1>*/}
                                                {/*    <div className="d-flex flex-wrap">*/}
                                                {/*        {sections.map((item, index) => (*/}
                                                {/*            <span className="badge badge-pill badge-blue mt-2 mx-2"*/}
                                                {/*                  key={index}>{item.name}</span>*/}
                                                {/*        ))}*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                {/*<div className="row mb-4">*/}
                                                {/*    <h1 className="header">Ngành học</h1>*/}
                                                {/*    <div className="d-flex flex-wrap">*/}
                                                {/*        {majors.map((item, index) => (*/}
                                                {/*            <span className="badge badge-pill badge-blue-dark mt-3 mx-2"*/}
                                                {/*                  key={index}>{item.name}</span>*/}
                                                {/*        ))}*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                <div className="text-center">
                                                    <button className="btn btn-warning btn-custom">Chỉnh sửa</button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ProfileBusiness;