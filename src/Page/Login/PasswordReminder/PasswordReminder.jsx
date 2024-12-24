import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input, Button, Form, notification, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    clearResponseBusiness,
    send_code_forgot,
    send_new_password,
} from "../../../Redux/actions/UserThunk";

export const PasswordReminder = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
    const [code, setCode] = useState(""); // Store entered verification code
    const [timer, setTimer] = useState(60); // Countdown timer state
    const [canResend, setCanResend] = useState(false); // State for controlling resend button
    const response = useSelector((state) => state.UserReducer?.response); // Get response from redux store
    const responseSendNewPassword = useSelector((state) => state.UserReducer?.responseSendNewPassword);
    useEffect(() => {
        return () => {
            dispatch(clearResponseBusiness());
        };
    }, [dispatch]);

    useEffect(() => {
        if (responseSendNewPassword?.code === 200) {
            notification.success({ message: 'Mật mới đã được cấp trong email. Vui lòng đăng nhập để đổi mật khẩu!' });
            navigate("/");
        } else if (responseSendNewPassword?.message) {
            notification.error({ message: responseSendNewPassword.message || 'Mã xác minh không chính xác!' });
        }
    }, [responseSendNewPassword, navigate]);
    // Handle form submission for email
    const onFinish = (values) => {
        const { email } = values;
        const requestBody = { email };
        dispatch(send_code_forgot(requestBody)); // Dispatch the action to send code
    };

    // Handle changes in the response from the backend
    useEffect(() => {
        if (response) {
            if (response.code === 200) {
                notification.success({ message: 'Mã xác nhận đã được gửi thành công!' });
                setModalVisible(true);
                startTimer(); // Start the timer when the code is sent successfully
            } else if (response.message) {
                notification.error({ message: response.message || 'Lỗi trong quá trình gửi mã xác nhận' });
            }
        }
    }, [response]);

    // Start countdown timer for verification code expiration
    const startTimer = () => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    setCanResend(true); // Enable resend button after the timer runs out
                    clearInterval(interval); // Clear the interval when the timer reaches 0
                    return prevTimer;
                }
                return prevTimer - 1; // Decrease timer each second
            });
        }, 1000);
    };

    // Handle changes in the verification code input
    const handleCodeChange = (e) => {
        setCode(e.target.value); // Update code state when the user types
    };

    // Handle code verification submission
    const handleSubmitCode = () => {
        const requestBody = {
            forgotCode: code ,
            email : response?.data?.email,
        };
        console.log(requestBody);
        dispatch(send_new_password(requestBody));

    };

    // Handle resend verification code
    const handleResendCode = () => {
        if (!canResend) return; // Only allow resend if the timer is finished
        setTimer(60); // Reset timer
        setCanResend(false); // Disable resend button while timer is counting down
        form.submit(); // Submit the form to resend the code
    };

    // Reset the modal and timer when the component mounts (or when user navigates back)
    useEffect(() => {
        setModalVisible(false);
        setTimer(60);
        setCanResend(false);
    }, []); // This effect will run when the component is first mounted

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
                                        rules={[
                                            { required: true, message: "Vui lòng nhập email hợp lệ!" },
                                            { type: "email", message: "Định dạng email không hợp lệ!" },
                                            { pattern: /^[^\s].*$/, message: "Email không được có dấu cách ở đầu." },
                                            { min: 5,max:50, message: 'Email không hợp lệ!' },
                                        ]}
                                    >
                                        <Input placeholder="Nhập email" autoFocus/>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" block>
                                            Đặt lại mật khẩu
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div className="text-center mt-3">
                                    <NavLink to={"/login"} className="btn-link text-decoration-none">
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
