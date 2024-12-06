import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_IMAGE_URI } from "../../../Utils/Setting/Config";
import { get_all_sections } from "../../../Redux/actions/SectionThunk";
import { get_all_majors } from "../../../Redux/actions/MajorThunk";
import { get_university_id } from "../../../Redux/actions/UniversityThunk";
import { useNavigate } from "react-router-dom";
import './style/Profile.css';

const ProfileUniversity = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy danh sách khoa và ngành từ Redux store
    const sections = useSelector(state => state.SectionReducer.sections);
    const majors = useSelector(state => state.MajorReducer.majors);

    // Lấy thông tin trường đại học từ Redux store
    const university = useSelector(state => state.UserReducer.userData?.university);
    const universityDetails = useSelector(state => state.UniversityReducer.university);

    // Dispatch các action để lấy thông tin khoa và ngành
    useEffect(() => {
        dispatch(get_all_sections());
        dispatch(get_all_majors());
    }, [dispatch]);

    // Dispatch action để lấy thông tin trường đại học khi có ID
    useEffect(() => {
        if (university?.id) {
            dispatch(get_university_id(university.id));
        }
    }, [university, dispatch]);

    // Xử lý sự kiện chỉnh sửa
    const handleEditClick = () => {
        if (university?.id) {
            navigate(`/profile-university-edit`);
        }
    };

    // Kiểm tra nếu không có trường đại học
    if (!university || !universityDetails) {
        return <p>Loading...</p>;
    }

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <section>
                        <div className="container">
                            <div className="card card-profile-university p-4">
                                <div className="row mb-4">
                                    <div className="col-md-3 text-center">
                                        <img
                                            src={`${GET_IMAGE_URI}${universityDetails.logoImageId}`}
                                            alt="Logo Trường"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <h1>{universityDetails.name}</h1>
                                        <p>{universityDetails.description}</p>
                                    </div>
                                </div>

                                {/* Thông tin chung */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <h2 className="header">Thông Tin Chung</h2>
                                        <p><strong>Tên Trường:</strong> {universityDetails.name}</p>
                                        <p><strong>Website:</strong> <a href={universityDetails.website}>{universityDetails.website}</a></p>
                                        <p><strong>Năm thành lập:</strong> {universityDetails.foundedYear}</p>
                                        <p><strong>Địa Chỉ:</strong> {universityDetails.locationId}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h2 className="header">Liên Hệ</h2>
                                        <p><strong>Email:</strong> {universityDetails.email}</p>
                                        <p><strong>Điện Thoại:</strong> {universityDetails.phone}</p>
                                    </div>
                                </div>

                                {/* Khoa giảng dạy */}
                                <div className="row mb-3">
                                    <h2 className="header">Khoa Giảng Dạy</h2>
                                    <div className="d-flex flex-wrap">
                                        {sections.map((item, index) => (
                                            <span className="badge badge-pill badge-blue mt-2 mx-2" key={index}>{item.name}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Ngành học */}
                                <div className="row mb-4">
                                    <h2 className="header">Ngành Học</h2>
                                    <div className="d-flex flex-wrap">
                                        {majors.map((item, index) => (
                                            <span className="badge badge-pill badge-blue-dark mt-3 mx-2" key={index}>{item.name}</span>
                                        ))}
                                    </div>
                                </div>

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
                    </section>
                </div>
            </div>
        </section>
    );
};

export default ProfileUniversity;
