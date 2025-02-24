import React, { useEffect } from 'react';
import './SignIn.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Redux/actions/UserThunk";
import { useFormik } from "formik";
import SigninValidation from "../../../Utils/Validation/User/SigninValidation";
import { Form, Input } from "antd";
import {USER_LOGIN} from "../../../Utils/Setting/Config";

export const SignIn = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, userData } = useSelector(state => state.UserReducer); // Lấy lỗi từ Redux
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: SigninValidation,
        onSubmit: (values) => {
            dispatch(loginUser(values.username, values.password));
        }
    });


    useEffect(() => {
        if (isAuthenticated) {
            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirect');
            const userDetails = JSON.parse(localStorage.getItem(USER_LOGIN));
            console.log(userDetails);
            if (redirectUrl && userDetails.role.name === "CANDIDATE") {
                navigate(redirectUrl);
            } else if(userDetails.role.name === "BUSINESS") {
                navigate('/profile-business');
            }
            else if(userDetails.role.name === "EMPLOYEE") {
                navigate('/job-manager');
            }
            else if(userDetails.username === "admin@domain.com") {
                navigate('/admin');
            }
            else {
                navigate('/');
            }
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="signin-container">
            <div className="signin-image">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/012/912/110/non_2x/character-hand-holding-smartphone-with-sms-authentication-key-and-typing-password-on-laptop-with-online-login-form-on-screen-secure-user-authorization-concept-isometric-modern-illustration-vector.jpg"
                    alt="Placeholder Image"
                />
            </div>
            <section className="signin-content">
                <div className="signin-boxed">
                    <div className="signin-wrap">
                        <div className="card shadow-lg">
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h1 className="h3">Đăng nhập</h1>
                                    <p>Đăng nhập vào tài khoản của bạn</p>
                                </div>
                                <Form layout="vertical" onFinish={formik.handleSubmit}>
                                    <Form.Item
                                        label="Email"
                                        name="username"
                                        validateStatus={formik.touched.username && formik.errors.username ? 'error' : ''}
                                        help={formik.touched.username && formik.errors.username ? formik.errors.username : null}
                                    >
                                        <Input
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            placeholder="Nhập email của bạn"
                                            className="input-field"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mật khẩu"
                                        name="password"
                                        validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
                                        help={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                                    >
                                        <Input.Password
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            placeholder="Nhập mật khẩu của bạn"
                                            className="input-field"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary btn-lg" type="submit">
                                                Đăng nhập
                                            </button>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div className="d-grid">
                                            <button
                                                className="btn custom-btn btn-lg shadow-sm"
                                                onClick={() => navigate('/')}
                                                type="button"
                                            >
                                                Trở về màn hình chính
                                            </button>
                                        </div>
                                    </Form.Item>
                                </Form>
                                <div className="d-flex justify-content-between gap-md-5 mt-4">
                                    <NavLink to="/reset-password" className="btn-link text-decoration-none">Quên mật
                                        khẩu?</NavLink>
                                    <NavLink to="/account-type-selection" className="btn-link text-decoration-none">Đăng
                                        ký tài khoản</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
