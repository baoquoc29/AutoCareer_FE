import {Link} from "react-router-dom";
import React from 'react';
import './AccountTypeSelection.css'

const NavLinkButton = React.memo(({ to, className, children }) => (
    <Link to={to} className={className}>
        {children}
    </Link>
));
export function AccountTypeSelection() {
    return (

            <div className="root account-type-selection-root front-container" >
                <section className="content">
                    <div
                        className="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <div className="content__wrap">
                            <div className="card shadow-lg">
                                <div className="card-body p-4 text-center">
                                    <h1 className="h3">Chọn loại tài khoản</h1>
                                    <p>Vui lòng chọn loại tài khoản bạn muốn đăng ký</p>
                                    <div className="d-grid gap-3 mt-4">
                                        <NavLinkButton to="/signup-university" className="btn btn-primary btn-lg">
                                            Trường đại học
                                        </NavLinkButton>
                                        <NavLinkButton to="/signup-business" className="btn btn-secondary btn-lg">
                                            Doanh nghiệp
                                        </NavLinkButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

    )
}