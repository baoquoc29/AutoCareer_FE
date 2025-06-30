import React from 'react';

import './MotivationalSteps.css';
import {GraduationCapIcon, TrendingUpIcon, AwardIcon} from "lucide-react"; // We'll create this CSS file

const MotivationalSteps = () => {
    return (
        <section className="motivational-steps-section">
            <div className="motivational-steps-container">
                <div className="section-header">
                    <h2 className="section-title">Hành trình sự nghiệp</h2>
                    <p className="section-subtitle">
                        Những bước đi vững chắc để đạt được thành công trong sự nghiệp
                    </p>
                </div>

                <div className="steps-grid">
                    {/* Step 1 */}
                    <div className="step-card">
                        <div className="step-icon-container">
                            <TrendingUpIcon className="step-icon" />
                        </div>
                        <h3 className="step-title">Khám phá đam mê</h3>
                        <p className="step-description">
                            "Thành công bắt đầu từ việc làm những gì bạn yêu thích. Hãy tìm kiếm đam mê và biến nó thành sự nghiệp của bạn."
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="step-card">
                        <div className="step-icon-container">
                            <GraduationCapIcon className="step-icon" />
                        </div>
                        <h3 className="step-title">Học hỏi liên tục</h3>
                        <p className="step-description">
                            "Kiến thức là sức mạnh. Hãy không ngừng học hỏi và phát triển bản thân mỗi ngày để đạt được đỉnh cao trong sự nghiệp."
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="step-card">
                        <div className="step-icon-container">
                            <AwardIcon className="step-icon" />
                        </div>
                        <h3 className="step-title">Kiên trì theo đuổi</h3>
                        <p className="step-description">
                            "Thành công không đến trong một ngày. Sự kiên trì và nỗ lực không ngừng sẽ đưa bạn đến gần hơn với mục tiêu của mình."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MotivationalSteps;