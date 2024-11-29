import './Profile.css'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DOMAIN} from "../../../Utils/Setting/Config";
import {get_all_sections} from "../../../Redux/actions/SectionThunk";
import {get_all_majors} from "../../../Redux/actions/MajorThunk";

const Profile = () => {
    const dispatch = useDispatch();
    const sections = useSelector(state => state.SectionReducer.sections);
    const majors = useSelector(state => state.MajorReducer.majors);
    useEffect(() => {
        dispatch(get_all_sections())
        dispatch(get_all_majors())
    }, [dispatch])
    console.log(sections)
    const university = useSelector(state => state.UserReducer.userData ? state.UserReducer.userData["university"] : undefined);
    if (!university) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <section>
                            <div className="container mt-5">
                                <div className="card card-custom p-4">
                                    <div className="row mb-4">
                                        <div className="col-md-3">
                                            <img
                                                src={`${DOMAIN}/api/v1/image/resource?imageId=${university["logoImageId"]}`}
                                                alt="Logo Trường" className="img-fluid"/>
                                        </div>
                                        <div className="col-md-9">
                                            <h4>{university.name}</h4>
                                            <p>{university.description}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <h1 className="header">Thông Tin Chung</h1>
                                            <p><strong>Tên Trường:</strong> Đại học Bách Khoa Hà Nội</p>
                                            <p><strong>Website:</strong> <a
                                                href={university["website"]}>{university["website"]}</a></p>
                                            <p><strong>Năm thành lập:</strong> {university["foundedYear"]}</p>
                                            <p><strong>Địa Chỉ:</strong> {university["locationId"]}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h1 className="header">Liên Hệ</h1>
                                            <p><strong>Email:</strong> {university.email}</p>
                                            <p><strong>Điện Thoại:</strong> {university.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <h1 className="header">Khoa giảng dạy</h1>
                                        <div className="d-flex " >
                                            {sections.map((item, index) => (
                                                <strong className="mt-2 mx-2" key={index}>{item.name}</strong>
                                            ))}
                                        </div>

                                    </div>
                                    <div className="row mb-4">
                                        <h1 className="header">Ngành học</h1>
                                        <p>Công nghệ thông tin</p>
                                        <p>Kỹ thuật điện</p>
                                        <p>Kinh tế công nghiệp</p>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-primary">Chỉnh sửa</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Profile;