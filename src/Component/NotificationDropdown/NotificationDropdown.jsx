import React from 'react';

const NotificationDropdown = () => {
    return (
        <>
            <div className="dropdown">
                <button className="header__btn btn btn-icon btn-sm" type="button" data-bs-toggle="dropdown"
                        aria-label="Notification dropdown" aria-expanded="false">
            <span className="d-block position-relative">
                <i className="demo-psi-bell"></i>
                <span className="badge badge-super rounded-pill bg-danger p-1">
                    <span className="visually-hidden">unread messages</span>
                </span>
            </span>
                </button>
                <div className="dropdown-menu dropdown-menu-end w-md-300px">
                    <div className="border-bottom px-3 py-2 mb-3">
                        <h5>Thông báo</h5>
                    </div>

                    <div className="list-group list-group-borderless">
                        {/* Add your notification items here */}
                        <div className="list-group-item list-group-item-action d-flex align-items-center mb-3">
                            <div className="flex-shrink-0 me-3">
                                <i className="demo-psi-pen-5 text-info fs-2"></i>
                            </div>
                            <div className="flex-grow-1">
                                <a href="#"
                                   className="h6 fw-normal d-block mb-0 stretched-link text-decoration-none">Writing
                                    a New Article</a>
                                <small className="text-body-secondary">Wrote a news article for the
                                    John Mike</small>
                            </div>
                        </div>
                        <div
                            className="list-group-item list-group-item-action d-flex align-items-start mb-3">
                            <div className="flex-shrink-0 me-3">
                                <i className="demo-psi-speech-bubble-3 text-success fs-2"></i>
                            </div>
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start">
                                    <a href="#"
                                       className="h6 fw-normal mb-0 stretched-link text-decoration-none">Comment
                                        sorting</a>
                                    <span className="badge bg-info rounded ms-auto">NEW</span>
                                </div>
                                <small className="text-body-secondary">You have 1,256 unsorted
                                    comments.</small>
                            </div>
                        </div>

                        <div
                            className="list-group-item list-group-item-action d-flex align-items-start mb-3">
                            <div className="flex-shrink-0 me-3">
                                <img className="img-xs rounded-circle"
                                     src="./assets/img/profile-photos/7.png" alt="UserNav Picture"
                                     loading="lazy"/>
                            </div>
                            <div className="flex-grow-1">
                                <a href="#"
                                   className="h6 fw-normal d-block mb-0 stretched-link text-decoration-none">Lucy
                                    Sent you a message</a>
                                <small className="text-body-secondary">30 minutes ago</small>
                            </div>
                        </div>
                        <div className="text-center mb-2">
                            <a href="#" className="btn-link text-primary icon-link icon-link-hover">
                                Hiển thị tất cả thông báo
                                <i className="bi demo-psi-arrow-out-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NotificationDropdown;