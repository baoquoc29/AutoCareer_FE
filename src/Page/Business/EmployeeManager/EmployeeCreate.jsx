import React, {useState} from "react";
import {create_employee} from "../../../Redux/actions/EmployeeThunk";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const EmployeeCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);
    const primaryColor = '#1677ff'; // Định nghĩa biến primaryColor
    const dangerColor = '#dc3545'; // Định nghĩa biến màu đỏ cho nút hủy

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        employeeImage: null,
    });

    const [errors, setErrors] = useState({});

    const validateField = (field, value) => {
        switch (field) {
            case "email":
                if (!value) return "Email là bắt buộc.";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return "Email không hợp lệ.";
                break;
            case "name":
                if (!value) return "Tên là bắt buộc.";
                break;
            case "phone":
                if (!value) return "Số điện thoại là bắt buộc.";
                const phoneRegex = /^[0-9]{10,11}$/;
                if (!phoneRegex.test(value)) return "Số điện thoại không hợp lệ.";
                break;
            default:
                break;
        }
        return null;
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({...formData, employeeImage: file});
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleInputChange = (event) => {
        const {id, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: validateField(id, value),
        }));
    };

    const handleSave = (event) => {
        event.preventDefault(); // Ngăn tải lại trang

        // Kiểm tra lỗi cho tất cả các trường
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        dispatch(create_employee(formData))
            .then((success) => {
                if (success) {
                    navigate("/employee-manager"); // Điều hướng về EmployeeManager
                }
            })
            .catch((error) => {
                console.error("Lỗi khi thêm nhân viên:", error);
                toast.error("Có lỗi xảy ra khi thêm nhân viên. Vui lòng thử lại.");
            });
    };

    const handleCancel = () => {
        setFormData({
            email: "",
            name: "",
            phone: "",
            gender: "",
            dateOfBirth: "",
            address: "",
            employeeImage: null,
        });
        setImagePreview(null);
        navigate("/employee-manager");
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
                                                            <label htmlFor="email" className="form-label">
                                                                Gmail
                                                            </label>
                                                            <input
                                                                id="email"
                                                                type="email"
                                                                className={`form-control ${
                                                                    errors.email ? "is-invalid" : ""
                                                                }`}
                                                                placeholder="Email"
                                                                onChange={handleInputChange}
                                                            />
                                                            {errors.email && (
                                                                <div className="invalid-feedback">{errors.email}</div>
                                                            )}
                                                        </div>
                                                        <h4>Hình ảnh</h4>
                                                        <div className="mb-3 text-center">
                                                            <label
                                                                htmlFor="employeeImage"
                                                                className="form-label"
                                                            >
                                                                Ảnh đại diện
                                                            </label>
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
                                                            <label htmlFor="name" className="form-label">
                                                                Họ và tên
                                                            </label>
                                                            <input
                                                                id="name"
                                                                type="text"
                                                                className={`form-control ${
                                                                    errors.name ? "is-invalid" : ""
                                                                }`}
                                                                placeholder="Họ và tên"
                                                                value={formData.name}
                                                                onChange={handleInputChange}
                                                            />
                                                            {errors.name && (
                                                                <div className="invalid-feedback">{errors.name}</div>
                                                            )}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="phone" className="form-label">
                                                                Số điện thoại
                                                            </label>
                                                            <input
                                                                id="phone"
                                                                type="text"
                                                                className={`form-control ${
                                                                    errors.phone ? "is-invalid" : ""
                                                                }`}
                                                                placeholder="Số điện thoại"
                                                                value={formData.phone}
                                                                onChange={handleInputChange}
                                                            />
                                                            {errors.phone && (
                                                                <div className="invalid-feedback">{errors.phone}</div>
                                                            )}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="gender" className="form-label">
                                                                Giới tính
                                                            </label>
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
                                                            <label htmlFor="dateOfBirth" className="form-label">
                                                                Ngày sinh
                                                            </label>
                                                            <input
                                                                id="dateOfBirth"
                                                                type="date"
                                                                className="form-control"
                                                                value={formData.dateOfBirth}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="address" className="form-label">
                                                                Địa chỉ
                                                            </label>
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
                                                            className="btn btn-outline-danger mt-3 mx-3"
                                                            onClick={handleCancel}
                                                            style={{
                                                                borderColor: dangerColor,
                                                                color: dangerColor,
                                                                transition: 'background-color 0.3s ease, color 0.3s ease'
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.target.style.backgroundColor = dangerColor;
                                                                e.target.style.color = 'white';
                                                                e.target.style.transform = 'scale(1.05)';

                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.target.style.backgroundColor = '';
                                                                e.target.style.color = dangerColor;
                                                                e.target.style.transform = 'scale(1)';

                                                            }}
                                                        >
                                                            Hủy bỏ
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="btn btn-outline-primary mt-3 mx-3"
                                                            style={{
                                                                borderColor: primaryColor,
                                                                backgroundColor: primaryColor,
                                                                color: 'white',
                                                                transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.target.style.backgroundColor = primaryColor;
                                                                e.target.style.color = 'white';
                                                                e.target.style.transform = 'scale(1.05)';
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.target.style.transform = 'scale(1)';
                                                            }}
                                                        >
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
};
export default EmployeeCreate;
