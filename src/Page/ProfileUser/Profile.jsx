import './Profile.css'
import React from "react";
const Profile = () => {
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
                                            <img src="/" alt="Logo Trường" className="img-fluid"/>
                                        </div>
                                        <div className="col-md-9">
                                            <h4>Đại học Bách Khoa Hà Nội</h4>
                                            <p>Đại học Bách Khoa Hà Nội là một trong những trường đại học kỹ thuật hàng đầu của Việt
                                                Nam, với lịch sử phát triển hơn 60 năm.</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="header">Thông Tin Chung</div>
                                            <p><strong>Tên Trường:</strong> Đại học Bách Khoa Hà Nội</p>
                                            <p><strong>Website:</strong> <a href="http://www.hust.edu.vn">www.hust.edu.vn</a></p>
                                            <p><strong>Quy Mô Sinh Viên:</strong> Trên 30,000</p>
                                            <p><strong>Địa Chỉ:</strong> 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="header">Liên Hệ</div>
                                            <p><strong>Email:</strong> info@hust.edu.vn</p>
                                            <p><strong>Điện Thoại:</strong> 024 3869 4242</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="header">Chương Trình Đào Tạo</div>
                                        <p>Cử nhân, Thạc sĩ, Tiến sĩ</p>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="header">Ngành Học</div>
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