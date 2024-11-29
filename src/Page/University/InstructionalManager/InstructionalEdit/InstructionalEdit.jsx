import React, {useState} from "react";

const InstructionalEdit = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <section>
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h1 className="card-title">Chỉnh sửa giáo vụ</h1>
                                                <form className="row g-3">
                                                    <div className="col-md-6">
                                                        <h4>Tài khoản</h4>
                                                        <div className="mb-3">
                                                            <label htmlFor="email" className="form-label" >Gmail</label>
                                                            <input id="email" type="email" className="form-control" disabled={true}
                                                                   placeholder="Gmail"/>
                                                        </div>
                                                        <h4>Hình ảnh</h4>
                                                        <div className="mb-3 text-center">
                                                            <label htmlFor="profileImage" className="form-label">Ảnh đại
                                                                diện</label>
                                                            <div className="mb-3">
                                                                <input type="file" className="form-control"
                                                                       id="profileImage" onChange={handleImageChange}/>
                                                            </div>
                                                            {imagePreview && (
                                                                <img src={imagePreview} alt="Ảnh đại diện"
                                                                     className="img-thumbnail rounded-circle" style={{
                                                                    width: "200px",
                                                                    height: "200px",
                                                                    objectFit: "cover"
                                                                }}/>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h4>Thông tin cá nhân</h4>
                                                        <div className="mb-3">
                                                            <label htmlFor="employeeId" className="form-label">Mã nhân
                                                                viên</label>
                                                            <input id="employeeId" type="text" className="form-control"
                                                                   disabled={true}
                                                                   placeholder="Mã nhân viên"/>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="fullName" className="form-label">Họ và
                                                                tên</label>
                                                            <input id="fullName" type="text" className="form-control"
                                                                   placeholder="Họ và tên"/>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="phoneNumber" className="form-label">Số điện
                                                                thoại</label>
                                                            <input id="phoneNumber" type="text" className="form-control"
                                                                   placeholder="Số điện thoại"/>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="gender" className="form-label">Trạng thái</label>
                                                            <select id="gender" className="form-control">
                                                                <option>Chọn trạng thái</option>
                                                                <option>Nam</option>
                                                                <option>Nữ</option>
                                                                <option>Khác</option>
                                                            </select>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="gender" className="form-label">Giới
                                                                tính</label>
                                                            <select id="gender" className="form-control">
                                                                <option>Chọn giới tính</option>
                                                                <option>Nam</option>
                                                                <option>Nữ</option>
                                                                <option>Khác</option>
                                                            </select>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="dob" className="form-label">Ngày
                                                                sinh</label>
                                                            <input id="dob" type="date" className="form-control"
                                                                   placeholder="yyyy-mm-dd"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 text-center">
                                                        <button type="submit" className="btn btn-primary mt-3">Chỉnh sửa
                                                        </button>
                                                        <button type="submit" className="btn btn-warning mt-3">Hủy bỏ
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
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
export default InstructionalEdit;