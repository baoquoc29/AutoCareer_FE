const PageError = () => {
    return (
        <>
            <section id="content" className="content">
                <div
                    className="content__boxed card rounded-0 w-100 min-vh-100 d-flex flex-column align-items-stretch justify-content-center">
                    <div className="content__wrap">
                        <div className="text-center">
                            <div className="error-code page-title fw-semibold mb-3">404</div>
                            <h3 className="mb-4">
                                <div className="badge bg-warning text-uppercase px-5">Page not found !</div>
                            </h3>
                            <p className="lead mb-5 text-body-emphasis">Xin lỗi, nhưng trang bạn đang tìm kiếm không được tìm thấy trên máy chủ của chúng tôi..</p>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
export default PageError;