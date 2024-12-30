import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Form, Input, Button, Modal, notification, Spin, Row, Col, Select} from 'antd';
import {
    clearResponseBusiness,
    sign_up_university,
    verify_account_university
} from "../../../Redux/actions/UserThunk";
import {NavLink, useNavigate} from 'react-router-dom';
import "./SignUp.css";
import {toast} from "react-toastify";
import {get_all_district, get_all_provinces, get_all_ward} from "../../../Redux/actions/WorkShopThunk";

export function SignUpUniversity() {
    const [form] = Form.useForm();
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [hasShownModal, setHasShownModal] = useState(false);
    const {provinces, districts, wards} = useSelector(state => state.WorkShopReducer);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const response = useSelector((state) => state.UserReducer?.responseUniversity);
    const responseSignUpUniversity = useSelector((state) => state.UserReducer?.responseSignUpUniversity);
    useEffect(() => {
        return () => {
            dispatch(clearResponseBusiness());
        };
    }, [dispatch]);

    useEffect(() => {
        if (responseSignUpUniversity?.code === 200) {
            toast.success('Đăng ký tài khoản của bạn sẽ được xem xét!' );
            // navigate("/");
        } else if (responseSignUpUniversity?.message) {
            toast.error (responseSignUpUniversity.message || 'Mã xác minh không chính xác!' );
        }
    }, [responseSignUpUniversity, navigate]);

    // Quản lý thời gian và khả năng gửi lại mã
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
                toast.success('Mã xác nhận đã được gửi thành công!' );
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


    // Gửi yêu cầu mã xác nhận
    const handleSendCode = (values) => {

        const { universityName, numberPhone, password, confirmPassword,email,province,district,ward } = values;
        if (password !== confirmPassword) {
            toast.error('Mật khẩu và xác nhận mật khẩu không khớp.' );
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt.');
            return;
        }

        const requestBody = {
            name: universityName,
            email:  email ,
            phone: numberPhone,
            password: password,
            rePassword: confirmPassword,
            verificationCode: 'university',
            provinceId : province,
            districtId : district,
            wardId : ward,
        };

        setIsLoading(true);
       dispatch(verify_account_university(requestBody));
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
            notification.error( 'Vui lòng nhập mã xác nhận.' );
            return;
        }

            const formValues = form.getFieldsValue();
            const requestBody = {
                verificationCode: code,
                email: formValues.email,
                name: formValues.universityName,
                phone: formValues.numberPhone,
                password: formValues.password,
                rePassword: formValues.confirmPassword,
                provinceId : formValues.province,
                districtId : formValues.district,
                wardId : formValues.ward,
            };

            dispatch(sign_up_university(requestBody));
    };
    const getValidationMessage = (fieldName, value) => {
        switch (fieldName) {
            case 'universityName':
                if (value.length < 10) return 'Tên doanh nghiệp không được ít hơn 10 ký tự.';
                if (value.length > 256) return 'Tên doanh nghiệp không được vượt quá 256 ký tự.';
                if (/^\s/.test(value)) return 'Tên doanh nghiệp không được có dấu cách ở đầu.';
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
            case 'numberPhone':
                if (!value) return 'Số điện thoại là bắt buộc.';
                if (/^\s/.test(value)) return 'Số điện thoại không được có dấu cách ở đầu.';
                if (!/^\d{10}$/.test(value)) return 'Số điện thoại chỉ chứa 10 ký tự số.';
                break;

            default:
                return null;
        }
    };
    return (
        <div className="signup-root">
            <div className="signup-business">
                <div className="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <div className="card shadow-lg" style={{ width: '80%', maxWidth: 650 }}>
                        <div className="card-body" >
                            <h1 className="h3 text-center">Đăng ký tài khoản trường đại học</h1>
                            <p className="text-center">Tham gia cộng đồng Auto Career!</p>

                            <Form form={form} layout="vertical" onFinish={handleSendCode}>
                                <Form.Item label="Tên trường đại học" name="universityName"
                                           rules={[
                                               { required: true,message: ""  },
                                               { validator: (_, value) => getValidationMessage('universityName', value) ? Promise.reject(getValidationMessage('universityName', value)) : Promise.resolve() }
                                           ]}
                                >
                                    <Input placeholder="Nhập tên trường đại học"/>
                                </Form.Item>

                                <Form.Item label="Số điện thoại" name="numberPhone"
                                           rules={[
                                               { required: true,message: ""  },
                                               { validator: (_, value) => getValidationMessage('numberPhone', value) ? Promise.reject(getValidationMessage('numberPhone', value)) : Promise.resolve() }
                                           ]}
                                >
                                    <Input placeholder="Nhập số điện thoại"/>
                                </Form.Item>

                                <Form.Item label="Email" name="email"
                                           rules={[
                                               { required: true,message: ""  },
                                               { validator: (_, value) => getValidationMessage('email', value) ? Promise.reject(getValidationMessage('email', value)) : Promise.resolve() }
                                           ]}
                                >
                                    <Input placeholder="Nhập email"/>

                                </Form.Item>
                                    <Row gutter={16} align="middle" style={{ display: 'flex', justifyContent: 'space-between' ,marginTop: '20px'}}>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Tỉnh/Thành phố"
                                                name="province"
                                                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố.' }]}
                                            >
                                                <Select placeholder="Chọn tỉnh/thành phố" onChange={handleProvinceChange}>
                                                    {provinces.map((province) => (
                                                        <Select.Option key={province.id} value={province.id}>
                                                            {province.name}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Quận/Huyện"
                                                name="district"
                                                rules={[{ required: true, message: 'Vui lòng chọn quận/huyện.' }]}
                                            >
                                                <Select
                                                    placeholder="Chọn quận/huyện"
                                                    onChange={handleDistrictChange}
                                                    disabled={!selectedProvince}
                                                >
                                                    {districts.map((district) => (
                                                        <Select.Option key={district.id} value={district.id}>
                                                            {district.name}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Xã/Phường"
                                                name="ward"
                                                rules={[{ required: true, message: 'Vui lòng chọn xã/phường.' }]}
                                            >
                                                <Select placeholder="Chọn xã/phường" disabled={!selectedDistrict}>
                                                    {wards.map((ward) => (
                                                        <Select.Option key={ward.id} value={ward.id}>
                                                            {ward.name}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                <Form.Item label="Mật khẩu" name="password"
                                           rules={[
                                               { required: true,message: ""  },
                                               { validator: (_, value) => getValidationMessage('password', value) ? Promise.reject(getValidationMessage('password', value)) : Promise.resolve() }
                                           ]}
                                >
                                    <Input.Password placeholder="Nhập mật khẩu"/>
                                </Form.Item>

                                <Form.Item label="Xác nhận mật khẩu" name="confirmPassword"
                                           rules={[
                                               { required: true, message: 'Xác nhận mật khẩu là bắt buộc.' },
                                               ({ getFieldValue }) => ({
                                                   validator(_, value) {
                                                       if (!value || getFieldValue('password') === value) {
                                                           return Promise.resolve();
                                                       }
                                                       return Promise.reject(new Error('Xác nhận mật khẩu không trùng khớp!'));
                                                   }
                                               })
                                           ]}>
                                    <Input.Password placeholder="Nhập lại mật khẩu"/>
                                </Form.Item>

                                <Button type="primary" htmlType="submit" block disabled={!canResend}>
                                    {isLoading ? <Spin/> : 'Đăng ký tài khoản'}
                                </Button>
                            </Form>

                            <Modal
                                open={showModal}
                                title="Nhập mã xác minh"
                                onCancel={() => setShowModal(false)}
                                footer={[
                                    <Button key="cancel" onClick={() => setShowModal(false)}>
                                        Hủy
                                    </Button>,
                                    <Button
                                        key="submit"
                                        type="primary"
                                        onClick={handleVerifyCodeSubmit}
                                        disabled={!code}
                                    >
                                        Xác nhận
                                    </Button>
                                ]}
                            >
                                <Input
                                    placeholder="Nhập mã xác minh"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    style={{marginBottom: 10}}
                                />
                                <p>Thời gian còn lại: <b>{timer}s</b></p>
                                {canResend && (
                                    <Button
                                        type="link"
                                        onClick={handleResendCode}
                                        style={{marginTop: 10}}
                                        block
                                    >
                                        Gửi lại mã xác minh
                                    </Button>
                                )}
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
