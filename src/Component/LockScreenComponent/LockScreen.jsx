import {NavLink} from "react-router-dom";

const LockScreen = () => {
    return (
        <>
            <div id="root" className="root front-container">
                <section id="content" className="content">
                    <div
                        className="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <div className="content__wrap">
                            <div className="card shadow-lg hv-outline-parent">
                                <div className="card-body">


                                    <div className="text-center">
                                        <img className="hv-oc img-lg rounded-circle mb-3"
                                             src="./assets/img/profile-photos/1.png" alt="Picture profile"/>
                                        <h1 className="h3">Aaron Chavez</h1>
                                        <p>Administrator</p>
                                    </div>
                                    <form className="mt-4" action="index.html">
                                        <div className="mb-3">
                                            <input type="password" className="form-control" placeholder="Password"/>
                                        </div>
                                        <div className="d-grid mt-5">
                                            <button className="btn btn-info btn-lg" type="submit">Đăng nhâp</button>
                                        </div>
                                    </form>

                                    <div className="text-center mt-4" >
                                        <NavLink to={"/"} className="btn-link text-decoration-none"> Đăng nhập và sử dụng tài khoản khác </NavLink>
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
export default LockScreen;