import React from 'react';
import './SignIn.css'
import {NavLink} from "react-router-dom";
export const SignIn = () => {
    return (
        <>
            <div className="root signin-root front-container ">
                <section className="content">
                    <div className="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <div className="content__wrap">
                            <div className="card shadow-lg">
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h1 className="h3">Đăng nhập</h1>
                                        <p>Đăng nhập vào tài khoản của bạn</p>
                                    </div>
                                    <form className="mt-4" action="">
                                        <div className="mb-3">
                                            <input type="email" className="form-control" placeholder="Email" autoFocus/>
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" className="form-control" placeholder="Mật khẩu"/>
                                        </div>
                                        <div className="form-check">
                                            <input id="_dm-loginCheck" className="form-check-input" type="checkbox"/>
                                            <label htmlFor="_dm-loginCheck" className="form-check-label">Ghi nhớ đăng nhập</label>
                                        </div>
                                        <div className="d-grid mt-5">
                                            <button className="btn btn-primary btn-lg" type="submit">Đăng nhập</button>
                                        </div>
                                    </form>
                                    <div className="d-flex justify-content-between gap-md-5 mt-4">
                                        <NavLink to={"/reset-password"} className="btn-link text-decoration-none">Quên mật khẩu ?</NavLink>
                                        <NavLink to={"/account-type-selection"} className="btn-link text-decoration-none">Đăng ký tài khoản</NavLink>
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
