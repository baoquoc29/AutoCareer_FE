import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Form, Input, Button, Upload, Modal, notification, Spin, Col, Row, Select} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {clearResponseBusiness, sign_up_business, verify_account_business} from "../../../Redux/actions/UserThunk";
import {NavLink, useNavigate} from 'react-router-dom';
import "./SignUp.css";
import {toast} from "react-toastify";
import {get_all_district, get_all_provinces, get_all_ward} from "../../../Redux/actions/LocationThunk";
export function SignUpBusiness() {
    const [form] = Form.useForm();
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {provinces, districts, wards} = useSelector(state => state.LocationReducer);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const [hasShownModal, setHasShownModal] = useState(false);

    const response = useSelector((state) => state.UserReducer?.responseBusiness);
    const responseSignUp= useSelector((state) => state.UserReducer?.responseSignUpBusiness);
    useEffect(() => {
        form.resetFields();
        return () => {
            dispatch(clearResponseBusiness());
        };
    }, [dispatch]);
    useEffect(() => {
        let interval;
        if (!canResend && timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, canResend]);
    useEffect(() => {
        dispatch(get_all_provinces());
    }, [dispatch]);
    const handleProvinceChange = (value) => {
        const provinceId = value;
        setSelectedProvince(provinceId);  // Set the selected province
        dispatch(get_all_district(provinceId));
        form.setFieldsValue({district: null, ward: null});
        setSelectedDistrict(null);  // Reset district and ward when province changes
    };

    const handleDistrictChange = (value) => {
        const districtId = value;
        setSelectedDistrict(districtId);  // Set the selected district
        dispatch(get_all_ward(districtId));
        form.setFieldsValue({ward: null});
    };

    // Xử lý phản hồi từ API
    useEffect(() => {
        if (response) {
            if (response.code === 200) {
                // notification.success({ message: 'Mã xác nhận đã được gửi thành công!' });
                setTimeout(() => {
                    setIsLoading(false);
                    if (!hasShownModal) {
                        setShowModal(true); // Hiển thị modal nếu chưa hiển thị
                        setHasShownModal(true); // Đánh dấu đã hiển thị modal
                    }
                }, 2000);
                setCanResend(false);
                setTimer(60); // Reset bộ đếm về 60 giây
            } else if (response.message) {
                setIsLoading(false);
                toast.error(response.message || 'Lỗi trong quá trình gửi mã xác nhận' );
            }

        }
    }, [response, hasShownModal]);

    useEffect(() => {
        if (responseSignUp?.code === 200) {
            toast.success('Đăng ký tài khoản của bạn sẽ được xem xét!' );
            navigate("/");
        } else if (responseSignUp?.message) {
            toast.error(responseSignUp.message || 'Mã xác minh không chính xác!' );
        }
    }, [responseSignUp, navigate]);



    // Kiểm tra và thêm ảnh giấy phép
    const validateImage = (fileList) => {
        if (!fileList.length) return null;

        const file = fileList[0];
        const isImage = file.type.startsWith('image/');
        const maxSize = 2 * 1024 * 1024;

        if (!isImage) {
            toast.error('Chỉ chấp nhận ảnh.' );
            return false;
        }

        if (file.size > maxSize) {
            toast.error('Kích thước file không được vượt quá 2MB.' );
            return false;
        }

        return file.originFileObj;
    };

    // Gửi yêu cầu mã xác nhận
    const handleSendCode = (values) => {
        const { companyName, taxCode, email, phone, password, confirmPassword,province,district,ward } = values;

        if (password !== confirmPassword) {
            toast.error('Mật khẩu và xác nhận mật khẩu không khớp.' );
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt.' );
            return;
        }

        const licenseImage = validateImage(fileList);
        if (licenseImage === false) return;

        const businessData = new FormData();
        businessData.append('name', companyName);
        businessData.append('taxCode', taxCode);
        businessData.append('email', email);
        businessData.append('phone', phone);
        businessData.append('password', password);
        businessData.append('rePassword', confirmPassword);
        businessData.append("provinceId", province);
        businessData.append("districtId", district);
        businessData.append("wardId", ward);
        businessData.append('verificationCode', 'business');
        if (licenseImage) businessData.append('logoImage', licenseImage);

        setIsLoading(true);
        dispatch(verify_account_business(businessData));
    };

    // Gửi lại mã xác nhận
    const handleResendCode = () => {
        setTimer(60);
        setCanResend(false);
        form.submit();
    };

    // Xác nhận mã
    const handleVerifyCodeSubmit = async () => {
        if (!code) {
            toast.error('Vui lòng nhập mã xác nhận.' );
            return;
        }

            // Tạo FormData và thêm các giá trị từ form vào
            const businessData = new FormData();
            businessData.set("verificationCode", code);

            const formValues = form.getFieldsValue();
            businessData.append("name", formValues.companyName);
            businessData.append("taxCode", formValues.taxCode);
            businessData.append("email", formValues.email);
            businessData.append("phone", formValues.phone);
            businessData.append("password", formValues.password);
            businessData.append("rePassword", formValues.confirmPassword);
            businessData.append("provinceId", formValues.province);
            businessData.append("districtId", formValues.district);
            businessData.append("wardId", formValues.ward);
            // Kiểm tra nếu có file ảnh giấy phép và thêm vào FormData
            const licenseImage = validateImage(fileList);
            if (licenseImage) {
                businessData.append("logoImage", licenseImage);
            }
            dispatch(sign_up_business(businessData));

    };


    const handleFileChange = ({fileList: newFileList}) => {
        const isValidFile = newFileList.every(file => file.type === "image/jpeg" || file.type === "image/png");
        if (!isValidFile) {
            toast.error("Chỉ chấp nhận file định dạng JPG/PNG.");
            return;
        }
        setFileList(newFileList);

    };
    // Xem trước ảnh
    const handleImagePreview = (file) => {
        setImagePreview(file.url || URL.createObjectURL(file.originFileObj));
        setShowImageModal(true);
    };
    const getValidationMessage = (fieldName, value) => {
        switch (fieldName) {
            case 'companyName':
                if (value.length < 10) return 'Tên doanh nghiệp không được ít hơn 10 ký tự.';
                if (value.length > 256) return 'Tên doanh nghiệp không được vượt quá 256 ký tự.';
                if (/^\s/.test(value)) return 'Tên doanh nghiệp không được có dấu cách ở đầu.';
                break;

            case 'taxCode':
                if (!value) return 'Mã số thuế là bắt buộc.';
                if (/^\s/.test(value)) return 'Mã số thuế không được có dấu cách ở đầu.';
                if (value.length <= 10) return 'Mã số thuế phải có ít nhất 10 ký tự.';
                if (value.length >= 13) return 'Mã số thuế không được vượt quá 13 ký tự.';
                if (!/^\d+$/.test(value)) return 'Mã số thuế chỉ được chứa số.';
                break;

            case 'email':
                if (!value) return 'Email là bắt buộc.';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Email không hợp lệ!';
                if (value.length < 5) return 'Email phải có ít nhất 5 ký tự.';
                if (value.length > 50) return 'Email không được vượt quá 50 ký tự.';
                break;

            case 'password':
                if (!value) return 'Mật khẩu là bắt buộc.';
                if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}/.test(value))
                    return 'Mật khẩu phải chứa ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
                break;


            default:
                return null;
        }
    };
    return (
        <div className="signup-root">
            <div className="signin-image">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/003/689/223/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
                    alt="Placeholder Image"
                />
            </div>
            <div className="signup-business">
                <div
                    className="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <div className="card shadow-lg" style={{
                        width: '90%',
                        maxWidth: 650,
                        borderRadius: '10px',
                        backgroundColor: '#f8f9fa'
                    }}>
                        <div className="card-body">
                            <h1 className="h3 text-center" style={{color: '#333'}}>
                                Đăng ký tài khoản doanh nghiệp
                            </h1>
                            <p className="text-center text-muted">Tham gia cộng đồng Auto Career!</p>
                            <Form form={form} layout="vertical" onFinish={handleSendCode}>
                                {/* Tên doanh nghiệp */}
                                <Form.Item label="Tên doanh nghiệp" name="companyName" rules={[
                                    {required: true, message: ''},
                                    {validator: (_, value) => getValidationMessage('companyName', value) ? Promise.reject(getValidationMessage('companyName', value)) : Promise.resolve()}
                                ]}>
                                    <Input placeholder="Nhập tên doanh nghiệp" size="large"/>
                                </Form.Item>

                                {/* Mã số thuế và Email */}
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Mã số thuế" name="taxCode"
                                                   rules={[{required: true, message: ''}]}>
                                            <Input placeholder="Nhập mã số thuế" size="large"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Email" name="email" rules={[
                                            {required: true, message: ''},
                                            {validator: (_, value) => getValidationMessage('email', value) ? Promise.reject(getValidationMessage('email', value)) : Promise.resolve()}
                                        ]}>
                                            <Input placeholder="Nhập email" size="large"/>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Ảnh thương hiệu */}
                                <Form.Item label="Ảnh thương hiệu" name="image"
                                           rules={[{required: true, message: 'Ảnh là bắt buộc.'}]}>
                                    <Upload listType="picture" fileList={fileList} onChange={handleFileChange}
                                            beforeUpload={() => false} maxCount={1} onPreview={handleImagePreview}>
                                        <Button icon={<UploadOutlined/>} size="large">Chọn ảnh thương hiệu</Button>
                                    </Upload>
                                </Form.Item>

                                {/* Tỉnh/Thành phố, Quận/Huyện, Xã/Phường */}
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item label="Tỉnh/Thành phố" name="province"
                                                   rules={[{required: true, message: 'Vui lòng chọn tỉnh/thành phố.'}]}>
                                            <Select placeholder="Chọn tỉnh/thành phố" onChange={handleProvinceChange}>
                                                {provinces.map((province) => (
                                                    <Select.Option key={province.id}
                                                                   value={province.id}>{province.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Quận/Huyện" name="district"
                                                   rules={[{required: true, message: 'Vui lòng chọn quận/huyện.'}]}>
                                            <Select placeholder="Chọn quận/huyện" onChange={handleDistrictChange}
                                                    disabled={!selectedProvince}>
                                                {districts.map((district) => (
                                                    <Select.Option key={district.id}
                                                                   value={district.id}>{district.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Xã/Phường" name="ward"
                                                   rules={[{required: true, message: 'Vui lòng chọn xã/phường.'}]}>
                                            <Select placeholder="Chọn xã/phường" disabled={!selectedDistrict}>
                                                {wards.map((ward) => (
                                                    <Select.Option key={ward.id}
                                                                   value={ward.id}>{ward.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Mật khẩu và Xác nhận mật khẩu */}
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Mật khẩu" name="password" rules={[
                                            {required: true, message: ''},
                                            {validator: (_, value) => getValidationMessage('password', value) ? Promise.reject(getValidationMessage('password', value)) : Promise.resolve()}
                                        ]}>
                                            <Input.Password placeholder="Nhập mật khẩu" size="large"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Xác nhận mật khẩu" name="confirmPassword" rules={[
                                            {required: true, message: 'Xác nhận mật khẩu là bắt buộc.'},
                                            ({getFieldValue}) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Xác nhận mật khẩu không trùng khớp!'));
                                                },
                                            }),
                                        ]}>
                                            <Input.Password placeholder="Nhập lại mật khẩu" size="large"/>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Submit Button */}
                                <Button type="primary" htmlType="submit" block size="large" disabled={!canResend}>
                                    {isLoading ? <Spin/> : 'Đăng ký tài khoản'}
                                </Button>
                            </Form>

                            {/* Modal for Verification Code */}
                            <Modal open={showModal} title="Nhập mã xác minh" onCancel={() => setShowModal(false)}
                                   footer={[
                                       <Button key="cancel" onClick={() => setShowModal(false)}>Hủy</Button>,
                                       <Button key="submit" type="primary" onClick={handleVerifyCodeSubmit}
                                               disabled={!code}>Xác nhận</Button>
                                   ]}>
                                <Input placeholder="Nhập mã xác minh" value={code}
                                       onChange={(e) => setCode(e.target.value)} style={{marginBottom: 10}}/>
                                <p>Thời gian còn lại: <b>{timer}s</b></p>
                                {canResend && (
                                    <Button type="link" onClick={handleResendCode} style={{marginTop: 10}} block>
                                        Gửi lại mã xác minh
                                    </Button>
                                )}
                            </Modal>

                            {/* Image Preview Modal */}
                            <Modal open={showImageModal} footer={null} onCancel={() => setShowImageModal(false)}>
                                <img alt="preview" style={{width: '100%'}} src={imagePreview}/>
                            </Modal>

                            <div className="d-flex justify-content-end align-items-center gap-md-3 mt-4">
                                <p className="mb-0 fs-6">Bạn đã có tài khoản?</p>
                                <NavLink to={"/login"} className="btn-link text-decoration-none ms-1 fs-6">Đăng
                                    nhập</NavLink>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
