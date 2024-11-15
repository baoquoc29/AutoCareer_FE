import React from 'react';
import {NavLink} from "react-router-dom";
import './SignUp.css';

export const SignUpUniversity = () => {
    return (
        <>
            <div className="root signup-root front-container">
                <section id="content" className="content">
                    <div
                        className="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <div className="content__wrap">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <div className="text-center">
                                        <h1 className="h3">Đăng ký tài khoản trường đại học</h1>
                                        <p>Tham gia cộng đồng Auto career bridge! Hãy thiết lập tài khoản của bạn</p>
                                    </div>
                                    <form className="mt-5">
                                        <div className="w-md-400px d-inline-flex row g-3 mb-4">
                                            <div className="col-12">
                                                <label htmlFor="name-university" className="form-label">Tên trường đại học <span className="required">*</span></label>
                                                <input type="text" className="form-control" id="name-university"
                                                       autoFocus/>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="email" className="form-label">Email <span className="required">*</span></label>
                                                <input type="email" className="form-control" id="email" autoFocus/>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="phone" className="form-label">Số điện thoại liên hệ <span className="required">*</span></label>
                                                <input type="text" className="form-control" id="phone" autoFocus/>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="password" className="form-label">Mật khẩu <span className="required">*</span></label>
                                                <input type="password" className="form-control" id="password" autoFocus/>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="confirm-password" className="form-label">Xác nhận mật khẩu <span className="required">*</span></label>
                                                <input type="password" className="form-control" id="confirm-password" autoFocus/>
                                            </div>
                                        </div>
                                        <div className="d-grid mt-1">
                                            <button className="btn btn-primary btn-lg" type="submit">Đăng ký</button>
                                        </div>
                                    </form>
                                    <div className="d-flex justify-content-between mt-4">Bạn đã có tài khoản?
                                        <NavLink to="/" className="btn-link text-decoration-none">Đăng nhập</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
