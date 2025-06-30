import React from 'react';
import { StarFilled } from '@ant-design/icons';
import "./StylePortal/TestimonialsSection.css"; // We'll create this CSS file next

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Nguyễn Thị B",
            position: "UI/UX Designer tại Creative Studio",
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            quote: "JobConnect đã giúp tôi tìm được công việc mơ ước chỉ sau 2 tuần...",
        },
        {
            name: "Trần Văn C",
            position: "Kỹ sư phần mềm tại Tech Solutions",
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            quote: "Tôi đã thử nhiều trang tuyển dụng khác nhau...",
        },
        {
            name: "Lê Thị D",
            position: "Chuyên viên Marketing tại Global Media",
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            quote: "Nhờ JobConnect, tôi đã có cơ hội làm việc...",
        },
    ];

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <h2 className="testimonials-title">Câu chuyện thành công</h2>
                    <p className="testimonials-subtitle">
                        Những người đã tìm được công việc mơ ước thông qua JobConnect
                    </p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-header">
                                <div className="testimonial-avatar">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        onError={(e) => {
                                            e.target.src = '/default-avatar.svg';
                                            e.target.onerror = null;
                                        }}
                                    />
                                </div>
                                <div className="testimonial-author">
                                    <h3>{testimonial.name}</h3>
                                    <p>{testimonial.position}</p>
                                </div>
                            </div>

                            <div className="testimonial-rating">
                                {[...Array(5)].map((_, i) => (
                                    <StarFilled key={i} className="star-icon" />
                                ))}
                            </div>

                            <blockquote className="testimonial-quote">
                                "{testimonial.quote}"
                            </blockquote>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;