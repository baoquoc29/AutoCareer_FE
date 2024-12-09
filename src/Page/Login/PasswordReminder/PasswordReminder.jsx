import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input, Button, Form, notification, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    resetResponse,
    send_code_forgot,
    send_new_password,
} from "../../../Redux/actions/UserThunk";

export const PasswordReminder = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
    const [code, setCode] = useState(""); // State for storing entered code
    const [timer, setTimer] = useState(60); // State for countdown timer
    const [canResend, setCanResend] = useState(false); // State for controlling resend button
    const response = useSelector((state) => state.UserReducer?.response);
    const onFinish = (values) => {
        const { email } = values;
        const requestBody = {
            email:  email
        };
        dispatch(send_code_forgot(requestBody));
    };

    useEffect(() => {
        if (response && response.code === 200) {
            notification.success({ message: 'Mã xác nhận đã được gửi thành công!' });
            setModalVisible(true);
            startTimer();
        } else if (response && response.message) {
            notification.error({ message: response?.message || 'Lỗi trong quá trình gửi mã xác nhận' });
        }
        dispatch(resetResponse());
    }, [response]);


    // Start countdown timer for verification code expiration
    const startTimer = () => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    setCanResend(true); // Enable resend after timer runs out
                    clearInterval(interval);
                    return prevTimer;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    // Handle code input change
    const handleCodeChange = (e) => {
        setCode(e.target.value); // Update code state when the user types
    };

    // Handle code verification submission
    const handleSubmitCode = () => {
        if (code === response?.data?.verificationCode) {
            notification.success({
                message: "Mã xác minh hợp lệ!",
                description: "Mã xác minh đã được xác nhận.",
            });
            const requestBody = {
                email:  response?.data?.email,
                forgotCode: code
            };
            dispatch(send_new_password(requestBody));
            notification.success({ message: 'Mật mới dã được cấp trong email vui lòng đăng nhập để đổi mật khẩu!' });
            navigate("/");
        } else {
            notification.error({
                message: "Mã xác minh không hợp lệ!",
                description: "Vui lòng nhập mã chính xác.",
            });
        }
    };

    const handleResendCode = () => {
        if (!canResend) {
            return; // Chỉ cho phép gửi lại khi hết thời gian
        }
        setTimer(60); // Reset lại timer
        setCanResend(false); // Disable nút gửi lại trong khi đang đếm ngược
        form.submit();
        
    };


    return (
        <div id="root" className="root front-container">
            <section id="content" className="content">
                <div className="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <div className="content__wrap">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <div className="text-center">
                                    <h1 className="h3">Quên mật khẩu</h1>
                                    <p>Nhập địa chỉ email của bạn để khôi phục mật khẩu.</p>
                                </div>
                                <Form
                                    form={form}
                                    name="password-reminder"
                                    className="mt-4"
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ!" }]}
                                    >
                                        <Input placeholder="Email" autoFocus />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button  type="primary" htmlType="submit" block>
                                            Đặt lại mật khẩu
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div className="text-center mt-3">
                                    <NavLink to={"/"} className="btn-link text-decoration-none">
                                        Quay lại đăng nhập
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal for entering the verification code */}
            <Modal
                open={modalVisible}
                title="Nhập mã xác minh"
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleSubmitCode}
                        disabled={!code} // Disable the submit button if the code is empty
                    >
                        Xác nhận
                    </Button>,
                ]}
            >
                <Input
                    placeholder="Nhập mã xác minh"
                    value={code}
                    onChange={handleCodeChange}
                    style={{ marginBottom: 10 }}
                />
                <p>Thời gian còn lại: <b>{timer}s</b></p> {/* Display remaining time */}
                {canResend && (
                    <Button
                        type="link"
                        onClick={handleResendCode}
                        style={{ marginTop: 10 }}
                        block
                    >
                        Gửi lại mã xác minh
                    </Button>
                )}
            </Modal>
        </div>
    );
};
