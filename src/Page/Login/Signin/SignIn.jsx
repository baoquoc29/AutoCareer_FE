import React, {useEffect} from 'react';
import './SignIn.css'
import {NavLink, useNavigate} from "react-router-dom";
import FormInput from "../../../Component/FormInputComponent/FormInputComponent";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../../Redux/actions/UserThunk";
import {useFormik} from "formik";
import {USER_LOGIN} from "../../../Utils/Setting/Config";


export const SignIn = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, userData} = useSelector(state => state.UserReducer);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: (values) => {
            dispatch(loginUser(values.username, values.password));
        }
    })
    useEffect(() => {
        if (isAuthenticated) {
            const userDetails = JSON.parse(localStorage.getItem(USER_LOGIN));
            if (userDetails && userDetails.role) {
                switch (userDetails.role.name) {
                    case "UNIVERSITY":
                        navigate('/university');
                        break;
                    case "BUSINESS":
                        navigate('/business');
                        break;
                    case "ADMIN":
                        navigate('/admin');
                        break;
                    case "SUB_ADMIN":
                        navigate('/admin');
                        break;
                    default:
                        navigate('/');
                        break;
                }
            }
        }
    }, [isAuthenticated, navigate, userData])
    return (
        <>
            <div className="root signin-root front-container ">
                <section className="content">
                    <div
                        className="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <div className="content__wrap">
                            <div className="card shadow-lg">
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h1 className="h3">Đăng nhập</h1>
                                        <p>Đăng nhập vào tài khoản của bạn</p>
                                    </div>
                                    <form className="mt-4" onSubmit={formik.handleSubmit}>
                                        <div className="mb-3">
                                            <FormInput
                                                label="Email"
                                                type="email"
                                                name="username"
                                                value={formik.values.username}
                                                onChange={formik.handleChange}
                                                placeholder="Nhập email"

                                            />
                                        </div>
                                        <FormInput
                                            label="Mật khẩu"
                                            type="password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            placeholder="Nhập mật khẩu"

                                        />
                                        <div className="form-check">
                                            <input id="_dm-loginCheck" className="form-check-input" type="checkbox"/>
                                            <label htmlFor="_dm-loginCheck" className="form-check-label">Ghi nhớ đăng
                                                nhập</label>
                                        </div>
                                        <div className="d-grid mt-5">
                                            <button className="btn btn-primary btn-lg" type="submit">Đăng nhập</button>
                                        </div>
                                    </form>
                                    <div className="d-flex justify-content-between gap-md-5 mt-4">
                                        <NavLink to={"/reset-password"} className="btn-link text-decoration-none">Quên
                                            mật khẩu ?</NavLink>
                                        <NavLink to={"/account-type-selection"}
                                                 className="btn-link text-decoration-none">Đăng ký tài khoản</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
