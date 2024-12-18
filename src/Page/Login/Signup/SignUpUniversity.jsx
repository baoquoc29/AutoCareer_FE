import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Modal, notification, Spin } from 'antd';
import {
    clearResponseBusiness,
    sign_up_university,
    verify_account_university
} from "../../../Redux/actions/UserThunk";
import {NavLink, useNavigate} from 'react-router-dom';
import "./SignUp.css";
import {toast} from "react-toastify";

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

    const response = useSelector((state) => state.UserReducer?.responseUniversity);
    const responseSignUpUniversity = useSelector((state) => state.UserReducer?.responseSignUpUniversity);
    useEffect(() => {
        return () => {
            dispatch(clearResponseBusiness());
        };
    }, [dispatch]);

    useEffect(() => {
        if (responseSignUpUniversity?.code === 200) {
            toast.success({ message: 'Đăng ký tài khoản của bạn sẽ được xem xét!' });
            navigate("/");
        } else if (responseSignUpUniversity?.message) {
            toast.error({ message: responseSignUpUniversity.message || 'Mã xác minh không chính xác!' });
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

    // Xử lý phản hồi từ API
    useEffect(() => {
        if (response) {
            if (response.code === 200) {
                toast.success({ message: 'Mã xác nhận đã được gửi thành công!' });
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
                toast.error({ message: response.message || 'Lỗi trong quá trình gửi mã xác nhận' });
            }

        }

    }, [response, hasShownModal]);


    // Gửi yêu cầu mã xác nhận
    const handleSendCode = (values) => {

        const { universityName, numberPhone, password, confirmPassword,email } = values;
        if (password !== confirmPassword) {
            toast.error('Mật khẩu và xác nhận mật khẩu không khớp.' );
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt.' );
            return;
        }

        const requestBody = {
            name: universityName,
            email:  email ,
            phone: numberPhone,
            password: password,
            rePassword: confirmPassword,
            verificationCode: 'university'
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
            notification.error({ message: 'Vui lòng nhập mã xác nhận.' });
            return;
        }

            const formValues = form.getFieldsValue();
            const requestBody = {
                verificationCode: code,
                email: formValues.email,
                name: formValues.universityName,
                phone: formValues.numberPhone,
                password: formValues.password,
                rePassword: formValues.confirmPassword
            };

            dispatch(sign_up_university(requestBody));
    };

    return (
        <div className="signup-root">
            <div className="signup-business">
                <div className="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <div className="card shadow-lg" style={{ width: '80%', maxWidth: 450 }}>
                        <div className="card-body">
                            <h1 className="h3 text-center">Đăng ký tài khoản trường đại học</h1>
                            <p className="text-center">Tham gia cộng đồng Auto Career!</p>

                            <Form form={form} layout="vertical" onFinish={handleSendCode}>
                                <Form.Item label="Tên trường đại học" name="universityName"
                                           rules={[{required: true, message: 'Tên trường là bắt buộc.'}]}>
                                    <Input placeholder="Nhập tên trường đại học"/>
                                </Form.Item>

                                <Form.Item label="Số điện thoại" name="numberPhone"
                                           rules={[{required: true, message: 'Số điện thoại là bắt buộc.'}]}>
                                    <Input placeholder="Nhập số điện thoại"/>
                                </Form.Item>

                                <Form.Item label="Email" name="email"
                                           rules={[{required: true, message: 'Email là bắt buộc.'}, {
                                               type: 'email',
                                               message: 'Email không hợp lệ!'
                                           }]}>
                                    <Input placeholder="Nhập email"/>
                                </Form.Item>

                                <Form.Item label="Mật khẩu" name="password"
                                           rules={[{required: true, message: 'Mật khẩu là bắt buộc.'}]}>
                                    <Input.Password placeholder="Nhập mật khẩu"/>
                                </Form.Item>

                                <Form.Item label="Xác nhận mật khẩu" name="confirmPassword"
                                           rules={[{required: true, message: 'Xác nhận mật khẩu là bắt buộc.'}]}>
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
                                <NavLink to={"/"} className="btn-link text-decoration-none ms-1 fs-6">Đăng
                                    nhập</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
