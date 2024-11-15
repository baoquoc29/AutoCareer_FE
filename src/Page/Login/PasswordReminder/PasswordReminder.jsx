import {NavLink} from "react-router-dom";

export const PasswordReminder = () => {
    return (
        <>
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
                                    <form className="mt-4" action="">
                                        <div className="mb-3">
                                            <input type="email" className="form-control" placeholder="Email" autoFocus/>
                                        </div>
                                        <div className="d-grid mt-5">
                                            <button className="btn btn-warning btn-lg" type="submit">Đặt lại mật khẩu</button>
                                        </div>
                                    </form>
                                    <div className="text-center mt-3">
                                        <NavLink to={"/"} className="btn-link text-decoration-none">Quay lại đăng nhập</NavLink>
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
