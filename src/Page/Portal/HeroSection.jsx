import React, { useState } from "react";
import { SearchIcon, MicIcon } from "lucide-react";
import { Button, Input, Badge, Image, message } from "antd";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const isSpeechRecognitionSupported = () => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  };

  const startVoiceSearch = () => {
    if (!isSpeechRecognitionSupported()) {
      message.warning("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'vi-VN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      message.info("Đang nghe... Hãy nói nội dung tìm kiếm");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchText(transcript);
      handleSearch(transcript); // Tự động tìm kiếm khi có kết quả từ giọng nói
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      message.error(`Lỗi nhận diện giọng nói: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (keyword = searchText) => {
    if (keyword.trim()) {
      navigate(`/job-all-portal?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  Tìm công việc mơ ước của bạn
                </h1>
                <p className="hero-subtitle">
                  Kết nối với hàng ngàn cơ hội việc làm hấp dẫn từ các công ty hàng đầu.
                </p>
              </div>
              <div className="hero-search-container">
                <div className="hero-search-wrapper">
                  <SearchIcon
                      className="hero-search-icon"
                      onClick={() => handleSearch()}
                      style={{ cursor: 'pointer' }}
                  />
                  <Input
                      type="search"
                      placeholder="Tìm kiếm công việc, vị trí..."
                      className="hero-search-input"
                      value={searchText}
                      onChange={handleSearchChange}
                      onPressEnter={handleKeyPress}
                  />
                  <Button
                      className={`voice-search-btn ${isListening ? 'listening' : ''}`}
                      icon={<MicIcon size={18} />}
                      onClick={startVoiceSearch}
                      type={isListening ? "primary" : "default"}
                  />
                </div>
              </div>
              <div className="hero-badges">
                <Badge className="hero-badge">
                  Công nghệ thông tin
                </Badge>
                <Badge className="hero-badge">
                  Marketing
                </Badge>
                <Badge className="hero-badge">
                  Kế toán
                </Badge>
                <Badge className="hero-badge">
                  Nhân sự
                </Badge>
                <Badge className="hero-badge">
                  Kinh doanh
                </Badge>
              </div>
            </div>
            <div className="hero-image-container">
              <Image
                  src="/assets/img/at_banner.jpg"
                  width={550}
                  height={550}
                  alt="Job search illustration"
                  className="hero-image"
                  preview={false}
              />
            </div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;