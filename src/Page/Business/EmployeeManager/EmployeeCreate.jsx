import React, {useState} from "react";
import {create_employee, get_all_employees} from "../../../Redux/actions/EmployeeThunk";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";

const EmployeeCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        address: '',
        employeeImage: '',
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, employeeImage: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSave = (event) => {
        event.preventDefault(); // Ngăn tải lại trang

        // Kiểm tra xem các trường bắt buộc đã được điền đầy đủ chưa
        if (!formData.email || !formData.name || !formData.phone) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }


        // Gửi dữ liệu lên api
        // dispatch(create_employee(formData))
        //     .then(() => {
        //          navigate('/employee-manager'); // Điều hướng về EmployeeManager
        //
        //     })
        //     .catch((error) => {
        //         console.error("Lỗi khi thêm nhân viên:", error);
        //         if(error?.response?.data?.message ==="Email đã tồn tại")
        //         toast.error(error.response.data.message);
        //     });
        dispatch(create_employee(formData))
            .then((success) => {
                if (success) {
                    navigate('/employee-manager'); // Điều hướng về EmployeeManager
                }
            })
            .catch((error) => {
                console.error("Lỗi khi thêm nhân viên:", error);
                // Do not navigate, the form stays on the create employee screen
                toast.error("Có lỗi xảy ra khi thêm nhân viên. Vui lòng thử lại.");
            });
    };

    const handleCancel = () => {
        // Reset trạng thái form và xóa ảnh preview
        setFormData({
            email: '',
            name: '',
            phone: '',
            gender: '',
            dateOfBirth: '',
            address: '',
            employeeImage: null,
        });
        setImagePreview(null);

        // Điều hướng về trang danh sách nhân viên
        navigate('/employee-manager');
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
                                                <h1 className="card-title">Thêm mới nhân viên</h1>
                                                <form className="row g-3" onSubmit={handleSave}>
                                                    <div className="col-md-6">
                                                        <h4>Tài khoản</h4>
                                                        <div className="mb-3">
                                                            <label htmlFor="email" className="form-label">Gmail</label>
                                                            <input
                                                                id="email"
                                                                type="email"
                                                                className="form-control"
                                                                placeholder="Email"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <h4>Hình ảnh</h4>
                                                        <div className="mb-3 text-center">
                                                            <label htmlFor="employeeImage" className="form-label">Ảnh đại diện</label>
                                                            <div className="mb-3">
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    id="employeeImage"
                                                                    onChange={handleImageChange}
                                                                />
                                                            </div>
                                                            {imagePreview && (
                                                                <img
                                                                    src={imagePreview}
                                                                    alt="Ảnh đại diện"
                                                                    className="img-thumbnail rounded-circle"
                                                                    style={{
                                                                        width: "200px",
                                                                        height: "200px",
                                                                        objectFit: "cover",
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h4>Thông tin cá nhân</h4>
                                                        <div className="mb-3">
                                                            <label htmlFor="name" className="form-label">Họ và tên</label>
                                                            <input
                                                                id="name"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Họ và tên"
                                                                value={formData.name}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="phone" className="form-label">Số điện thoại</label>
                                                            <input
                                                                id="phone"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Số điện thoại"
                                                                value={formData.phone}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="gender" className="form-label">Giới tính</label>
                                                            <select
                                                                id="gender"
                                                                className="form-control"
                                                                value={formData.gender}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="">Chọn giới tính</option>
                                                                <option value="Nam">Nam</option>
                                                                <option value="Nữ">Nữ</option>
                                                                <option value="Khác">Khác</option>
                                                            </select>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="dateOfBirth" className="form-label">Ngày sinh</label>
                                                            <input
                                                                id="dateOfBirth"
                                                                type="date"
                                                                className="form-control"
                                                                value={formData.dateOfBirth}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                                                            <input
                                                                id="address"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Địa chỉ"
                                                                value={formData.address}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 text-center">
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning mt-3 mx-3"
                                                            onClick={handleCancel}
                                                        >
                                                            Hủy bỏ
                                                        </button>
                                                        <button type="submit" className="btn btn-primary mt-3 mx-3">
                                                            Lưu lại
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
    );
}
export default EmployeeCreate;