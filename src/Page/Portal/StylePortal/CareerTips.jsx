import React from 'react';
import './CareerType.css'; // We'll create this CSS file

const CareerTips = () => {
    const careerTips = [
        {
            title: "10 kỹ năng cần thiết cho sự nghiệp trong thời đại số",
            excerpt: "Khám phá những kỹ năng quan trọng giúp bạn thành công trong môi trường làm việc hiện đại và cách phát triển chúng.",
            image: "/assets/img/coverblog-text-phu.jpg",
            date: "15/04/2023",
        },
        {
            title: "Cách viết CV thu hút nhà tuyển dụng trong thời đại số",
            excerpt: "Những bí quyết để tạo một CV nổi bật, thu hút sự chú ý của nhà tuyển dụng ngay từ cái nhìn đầu tiên và cách phát triển chúng.",
            image: "/assets/img/xx.jpg",
            date: "28/03/2023",
        },
        {
            title: "5 chiến lược đàm phán lương hiệu quả trong thời đại số",
            excerpt: "Học cách đàm phán mức lương xứng đáng với năng lực của bạn và tạo ấn tượng tốt với nhà tuyển dụng.",
            image: "/assets/img/ds.jpg",
            date: "10/03/2023",
        },
    ];

    return (
        <section className="career-tips-section">
            <div className="career-tips-container">
                <div className="section-header">
                    <h2 className="section-title">Lời khuyên nghề nghiệp</h2>
                    <p className="section-subtitle">
                        Những bí quyết giúp bạn thành công trong sự nghiệp
                    </p>
                </div>

                <div className="tips-grid">
                    {careerTips.map((tip, index) => (
                        <div key={index} className="tip-card">
                            <div className="image-container">
                                <img
                                    src={tip.image}
                                    alt={tip.title}
                                    className="tip-image"
                                    onError={(e) => {
                                        e.target.src = '/default-career-tip.jpg';
                                        e.target.onerror = null;
                                    }}
                                />
                                <div className="image-overlay">
                                    <p className="overlay-text">{tip.title}</p>
                                </div>
                            </div>

                            <div className="card-content">
                                <h3 className="tip-title">{tip.title}</h3>
                                <p className="tip-excerpt">{tip.excerpt}</p>

                                <div className="card-footer">
                                    <span className="tip-date">{tip.date}</span>
                                    <a href="#" className="read-more">
                                        Đọc thêm <span className="arrow">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="view-all-container">
                    <button className="view-all-button">
                        Xem tất cả bài viết
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CareerTips;