import React, {useEffect, useState} from 'react';
import { motion } from "framer-motion"
import {Header} from "antd/es/layout/layout";
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import FooterPortal from "./FooterPortal";
import  "./StylePortal/MBTIQuestion.css"
const questions = [
    // Hướng nội (I) - Hướng ngoại (E)
    {
        text: "Bạn cảm thấy thế nào sau một bữa tiệc đông người?",
        options: [
            { text: "Mệt mỏi và cần thời gian một mình để nạp lại năng lượng", value: "I" },
            { text: "Tràn đầy năng lượng và có thể tiếp tục giao tiếp", value: "E" }
        ]
    },
    {
        text: "Khi gặp vấn đề, bạn thường:",
        options: [
            { text: "Suy nghĩ một mình trước khi chia sẻ với người khác", value: "I" },
            { text: "Tìm ai đó để trao đổi và bàn luận ngay", value: "E" }
        ]
    },
    {
        text: "Bạn thích kiểu công việc nào hơn?",
        options: [
            { text: "Làm việc độc lập, ít tương tác", value: "I" },
            { text: "Làm việc nhóm, nhiều giao tiếp", value: "E" }
        ]
    },
    {
        text: "Trong một cuộc trò chuyện, bạn thường:",
        options: [
            { text: "Lắng nghe nhiều hơn nói", value: "I" },
            { text: "Nói nhiều hơn lắng nghe", value: "E" }
        ]
    },
    {
        text: "Bạn làm quen với người mới như thế nào?",
        options: [
            { text: "Từ từ, cần thời gian để mở lòng", value: "I" },
            { text: "Dễ dàng bắt chuyện ngay lập tức", value: "E" }
        ]
    },
    {
        text: "Bạn thích kiểu giải trí nào hơn?",
        options: [
            { text: "Ở nhà đọc sách hoặc xem phim", value: "I" },
            { text: "Đi chơi với bạn bè hoặc tham gia sự kiện", value: "E" }
        ]
    },
    {
        text: "Khi phải thuyết trình, bạn cảm thấy:",
        options: [
            { text: "Căng thẳng và cần chuẩn bị kỹ lưỡng", value: "I" },
            { text: "Hào hứng và tự tin", value: "E" }
        ]
    },
    {
        text: "Bạn thích không gian làm việc nào hơn?",
        options: [
            { text: "Yên tĩnh, ít người qua lại", value: "I" },
            { text: "Năng động, có thể trao đổi với đồng nghiệp", value: "E" }
        ]
    },
    {
        text: "Khi gặp người quen ở nơi công cộng, bạn thường:",
        options: [
            { text: "Chờ họ chào trước", value: "I" },
            { text: "Chào họ trước", value: "E" }
        ]
    },
    {
        text: "Bạn thích loại sách nào hơn?",
        options: [
            { text: "Sách về tư duy, triết lý", value: "I" },
            { text: "Sách về kỹ năng giao tiếp, xã hội", value: "E" }
        ]
    },

    // Giác quan (S) - Trực giác (N)
    {
        text: "Bạn thường chú ý đến:",
        options: [
            { text: "Những chi tiết cụ thể và thực tế", value: "S" },
            { text: "Bức tranh tổng thể và ý nghĩa ẩn sau", value: "N" }
        ]
    },
    {
        text: "Khi học một cái mới, bạn thích:",
        options: [
            { text: "Hướng dẫn từng bước cụ thể", value: "S" },
            { text: "Tổng quan và tự khám phá", value: "N" }
        ]
    },
    {
        text: "Bạn thường tin vào:",
        options: [
            { text: "Kinh nghiệm và bằng chứng thực tế", value: "S" },
            { text: "Linh cảm và khả năng tiên đoán", value: "N" }
        ]
    },
    {
        text: "Khi mô tả sự việc, bạn thường:",
        options: [
            { text: "Tập trung vào sự kiện và chi tiết", value: "S" },
            { text: "Tập trung vào ý nghĩa và mối liên hệ", value: "N" }
        ]
    },
    {
        text: "Bạn thích kiểu công việc nào hơn?",
        options: [
            { text: "Công việc đòi hỏi kỹ năng thực hành", value: "S" },
            { text: "Công việc đòi hỏi sáng tạo và tưởng tượng", value: "N" }
        ]
    },
    {
        text: "Khi giải quyết vấn đề, bạn thường:",
        options: [
            { text: "Áp dụng phương pháp đã được chứng minh", value: "S" },
            { text: "Tìm cách tiếp cận mới lạ", value: "N" }
        ]
    },
    {
        text: "Bạn thích loại phim nào hơn?",
        options: [
            { text: "Phim tài liệu, phim dựa trên sự kiện có thật", value: "S" },
            { text: "Phim khoa học viễn tưởng, phim giả tưởng", value: "N" }
        ]
    },
    {
        text: "Khi lập kế hoạch, bạn thường:",
        options: [
            { text: "Tập trung vào các bước cụ thể để đạt mục tiêu", value: "S" },
            { text: "Tập trung vào tầm nhìn và khả năng phát triển", value: "N" }
        ]
    },
    {
        text: "Bạn thích kiểu người nào hơn?",
        options: [
            { text: "Người thực tế và có óc quan sát", value: "S" },
            { text: "Người có tầm nhìn xa và sáng tạo", value: "N" }
        ]
    },
    {
        text: "Khi đánh giá một ý tưởng, bạn quan tâm đến:",
        options: [
            { text: "Tính khả thi và ứng dụng thực tế", value: "S" },
            { text: "Tính đột phá và tiềm năng phát triển", value: "N" }
        ]
    },

    // Lý trí (T) - Cảm xúc (F)
    {
        text: "Khi đưa ra quyết định quan trọng, bạn thường dựa vào:",
        options: [
            { text: "Phân tích logic và khách quan", value: "T" },
            { text: "Giá trị cá nhân và cảm nhận của người khác", value: "F" }
        ]
    },
    {
        text: "Trong tranh luận, bạn quan tâm đến:",
        options: [
            { text: "Sự chính xác của lập luận", value: "T" },
            { text: "Cảm xúc của người tham gia", value: "F" }
        ]
    },
    {
        text: "Bạn đánh giá người khác qua:",
        options: [
            { text: "Năng lực và thành tích", value: "T" },
            { text: "Tính cách và động cơ", value: "F" }
        ]
    },
    {
        text: "Khi ai đó chia sẻ vấn đề cá nhân, bạn thường:",
        options: [
            { text: "Đưa ra giải pháp cụ thể", value: "T" },
            { text: "Lắng nghe và đồng cảm", value: "F" }
        ]
    },
    {
        text: "Bạn coi trọng hơn:",
        options: [
            { text: "Sự thật và công bằng", value: "T" },
            { text: "Hòa thuận và hạnh phúc", value: "F" }
        ]
    },
    {
        text: "Khi phê bình người khác, bạn thường:",
        options: [
            { text: "Nói thẳng vấn đề một cách khách quan", value: "T" },
            { text: "Chọn cách diễn đạt nhẹ nhàng", value: "F" }
        ]
    },
    {
        text: "Bạn thích kiểu lãnh đạo nào hơn?",
        options: [
            { text: "Lãnh đạo dựa trên năng lực và hiệu quả", value: "T" },
            { text: "Lãnh đạo quan tâm đến cảm xúc nhân viên", value: "F" }
        ]
    },
    {
        text: "Trong công việc, bạn coi trọng:",
        options: [
            { text: "Kết quả và hiệu suất", value: "T" },
            { text: "Mối quan hệ đồng nghiệp", value: "F" }
        ]
    },
    {
        text: "Khi xung đột xảy ra, bạn thường:",
        options: [
            { text: "Tập trung giải quyết vấn đề", value: "T" },
            { text: "Quan tâm đến cảm xúc các bên", value: "F" }
        ]
    },
    {
        text: "Bạn đánh giá bản thân qua:",
        options: [
            { text: "Thành tích và năng lực", value: "T" },
            { text: "Giá trị đạo đức và mối quan hệ", value: "F" }
        ]
    },

    // Nguyên tắc (J) - Linh hoạt (P)
    {
        text: "Bạn thích cuộc sống:",
        options: [
            { text: "Có kế hoạch và tổ chức", value: "J" },
            { text: "Tự do và ngẫu hứng", value: "P" }
        ]
    },
    {
        text: "Khi làm việc, bạn thường:",
        options: [
            { text: "Lập kế hoạch chi tiết và tuân theo", value: "J" },
            { text: "Linh hoạt điều chỉnh khi cần", value: "P" }
        ]
    },
    {
        text: "Bạn cảm thấy thế nào về deadline?",
        options: [
            { text: "Hoàn thành trước deadline và cảm thấy thoải mái", value: "J" },
            { text: "Làm việc tốt nhất khi deadline đến gần", value: "P" }
        ]
    },
    {
        text: "Khi đi du lịch, bạn thích:",
        options: [
            { text: "Lên lịch trình chi tiết từ trước", value: "J" },
            { text: "Để mọi thứ tự nhiên và khám phá ngẫu hứng", value: "P" }
        ]
    },
    {
        text: "Bạn quản lý công việc bằng:",
        options: [
            { text: "Danh sách việc cần làm và lịch trình", value: "J" },
            { text: "Ghi nhớ và xử lý khi cần", value: "P" }
        ]
    },
    {
        text: "Bạn thích môi trường làm việc:",
        options: [
            { text: "Ngăn nắp và có trật tự", value: "J" },
            { text: "Thoải mái và sáng tạo", value: "P" }
        ]
    },
    {
        text: "Khi mua sắm, bạn thường:",
        options: [
            { text: "Lên danh sách trước và mua theo kế hoạch", value: "J" },
            { text: "Mua ngẫu hứng theo cảm hứng", value: "P" }
        ]
    },
    {
        text: "Bạn xử lý thông tin mới bằng cách:",
        options: [
            { text: "Phân loại và sắp xếp vào hệ thống có sẵn", value: "J" },
            { text: "Tiếp nhận mở và điều chỉnh khi cần", value: "P" }
        ]
    },
    {
        text: "Bạn thích kiểu quyết định nào hơn?",
        options: [
            { text: "Đưa ra kết luận rõ ràng và dứt khoát", value: "J" },
            { text: "Giữ các lựa chọn mở để điều chỉnh sau", value: "P" }
        ]
    },
    {
        text: "Khi đối mặt với thay đổi, bạn thường:",
        options: [
            { text: "Cần thời gian để điều chỉnh kế hoạch", value: "J" },
            { text: "Thích nghi nhanh và linh hoạt", value: "P" }
        ]
    }
];

// Map tính cách tới nghề nghiệp gợi ý
const careerSuggestions = {
    INFP: "Nhà văn, Nhà tâm lý học, Nghệ sĩ",
    ENFP: "Marketer, Diễn viên, Doanh nhân",
    INFJ: "Nhà tư vấn, Nhà trị liệu, Nhà giáo dục",
    ENFJ: "Giáo viên, Nhà lãnh đạo, Huấn luyện viên",
    INTJ: "Nhà khoa học, Kỹ sư, Nhà hoạch định chiến lược",
    ENTJ: "Quản lý dự án, CEO, Luật sư",
    INTP: "Nhà nghiên cứu, Lập trình viên, Nhà sáng chế",
    ENTP: "Doanh nhân, Phát minh sản phẩm, Tư vấn kinh doanh",
    ISFJ: "Y tá, Giáo viên, Cố vấn",
    ESFJ: "Chuyên viên chăm sóc khách hàng, Nhân viên tổ chức sự kiện",
    ISTJ: "Kế toán, Quản lý vận hành, Cán bộ hành chính",
    ESTJ: "Giám sát viên, Quản lý nhân sự, Nhà tổ chức sự kiện",
    ISFP: "Nghệ sĩ, Nhiếp ảnh gia, Nhà thiết kế",
    ESFP: "Diễn viên, Người mẫu, Hướng dẫn viên du lịch",
    ISTP: "Kỹ thuật viên, Lập trình viên, Nhà phân tích hệ thống",
    ESTP: "Nhà kinh doanh, Cố vấn đầu tư, Nhà báo",
};

const MBTIQuestion = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const questionsPerPage = 5;
    const totalPages = Math.ceil(questions.length / questionsPerPage);

    const handleOptionChange = (questionIndex, value) => {
        setAnswers({
            ...answers,
            [questionIndex]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Thêm hiệu ứng loading
        setTimeout(() => {
            const counts = {I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0};
            Object.values(answers).forEach((answer) => {
                if (counts[answer] !== undefined) {
                    counts[answer]++;
                }
            });
            const type =
                (counts.I > counts.E ? "I" : "E") +
                (counts.S > counts.N ? "S" : "N") +
                (counts.T > counts.F ? "T" : "F") +
                (counts.J > counts.P ? "J" : "P");

            setResult({
                type,
                career: careerSuggestions[type] || "Chưa xác định",
            });
            setLoading(false);
            setShowResult(true);
        }, 1500);
    };

    const startIndex = (currentPage - 1) * questionsPerPage;
    const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Tạo hiệu ứng cuộn mượt
        });
    };
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [currentPage]); // Sẽ chạy mỗi khi currentPage thay đổi
    return (
        <div className="container-mbti">
            <HeaderPortal/>
            <div className="content-mbti">
                <h1 className="title-mbti">Bài Trắc Nghiệm Tính Cách MBTI</h1>

                <div className="progress-bar-mbti">
                    <div
                        className="progress-bar-fill-mbti"
                        style={{width: `${(Object.keys(answers).length / questions.length) * 100}%`}}
                    ></div>
                </div>

                {showResult && result ? (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="result-container-mbti"
                    >
                        <h2 className="result-title-mbti">Kết quả của bạn:</h2>
                        <div className="result-type-mbti">
                            <p>{result.type}</p>
                        </div>
                        <p className="career-mbti">
                            Nghề nghiệp phù hợp: <span>{result.career}</span>
                        </p>
                        <button
                            onClick={() => {
                                setResult(null);
                                setShowResult(false);
                                setAnswers({});
                                setCurrentPage(1);
                            }}
                            className="retry-button-mbti"
                        >
                            Làm lại bài test
                        </button>
                    </motion.div>
                ) : loading ? (
                    <div className="loading-mbti">
                        <div className="spinner-mbti"></div>
                        <p>Đang phân tích kết quả...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <motion.div
                            key={currentPage}
                            initial={{opacity: 0, x: currentPage > 1 ? -20 : 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.3}}
                        >
                            {currentQuestions.map((q, index) => (
                                <div key={startIndex + index} className="question-mbti">
                                    <h3 className="question-text-mbti">
                                        {startIndex + index + 1}. {q.text}
                                    </h3>
                                    <div className="options-mbti">
                                        {q.options.map((option, idx) => (
                                            <label
                                                key={idx}
                                                className={`option-label-mbti ${
                                                    answers[startIndex + index] === option.value ? 'selected' : ''
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${startIndex + index}`}
                                                    value={option.value}
                                                    onChange={() => handleOptionChange(startIndex + index, option.value)}
                                                    checked={answers[startIndex + index] === option.value}
                                                    required
                                                />
                                                <span>{option.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        <div className="navigation-mbti">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                className={`nav-button prev ${currentPage === 1 ? 'disabled' : ''}`}
                            >
                                ← Trang trước
                            </button>

                            {currentPage < totalPages ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCurrentPage((prev) => prev + 1);
                                        scrollToTop();
                                    }}
                                    className="nav-button next"
                                >
                                    Trang tiếp →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    onClick={scrollToTop}
                                    className="submit-button-mbti"
                                >
                                    Xem kết quả
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </div>
            <FooterPortal/>
        </div>
    );
};
    export default MBTIQuestion;