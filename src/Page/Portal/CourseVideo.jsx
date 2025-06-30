import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FooterPortal from "./FooterPortal";
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";

const CoursePlayerContainer = styled.div`
`;
const CoursePlayerContainerMain = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;
const CourseHeader = styled.div`
  margin-bottom: 20px;
  
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    margin-bottom: 5px;
    
    svg {
      margin-right: 8px;
      vertical-align: middle;
    }
  }
`;

const PlayerWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin-bottom: 20px;
  background: #000;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const CourseContent = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LessonsList = styled.div`
  flex: 1;
  max-width: 300px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const LessonItem = styled.div`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background: ${props => props.active ? '#f0f7ff' : 'white'};
  color: ${props => props.active ? '#1890ff' : 'inherit'};
  
  &:hover {
    background: #f5f5f5;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const CourseDetails = styled.div`
  flex: 2;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: #e0e0e0;
  }
`;

const CourseDescription = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
`;

const CoursePlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [currentLesson, setCurrentLesson] = useState(0);
    const course = {
        title: 'Khóa học Lập trình React cơ bản',
        instructor: 'Nguyễn Văn A',
        duration: '10 giờ',
        description: 'Khóa học giúp bạn làm quen với React.js từ cơ bản đến nâng cao.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        lessons: [
            {
                title: 'Giới thiệu React',
                videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0'
            },
            {
                title: 'Component và Props',
                videoUrl: 'https://www.youtube.com/embed/MhkGQAoc7bc'
            },
            {
                title: 'State và Lifecycle',
                videoUrl: 'https://www.youtube.com/embed/DPnqb74Smug'
            }
        ]
    };

    const hasLessons = course.lessons && course.lessons.length > 0;
    return (
        <CoursePlayerContainer>
            <HeaderPortal></HeaderPortal>
            <CoursePlayerContainerMain>
            <BackButton onClick={() => navigate('/free-courses')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Quay lại danh sách khóa học
            </BackButton>

            <CourseHeader>
                <h1>{course.title}</h1>
                <p>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    Giảng viên: {course.instructor}
                </p>
                <p>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Thời lượng: {course.duration}
                </p>
            </CourseHeader>

            <CourseContent>
                {hasLessons && (
                    <LessonsList>
                        {course.lessons.map((lesson, index) => (
                            <LessonItem
                                key={index}
                                active={index === currentLesson}
                                onClick={() => setCurrentLesson(index)}
                            >
                                Bài {index + 1}: {lesson.title}
                            </LessonItem>
                        ))}
                    </LessonsList>
                )}

                <CourseDetails>
                    <PlayerWrapper>
                        {hasLessons ? (
                            <iframe
                                src={course.lessons[currentLesson].videoUrl}
                                title={`Bài ${currentLesson + 1}: ${course.lessons[currentLesson].title}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <iframe
                                src={course.videoUrl}
                                title={course.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}
                    </PlayerWrapper>

                    <CourseDescription>
                        <h3>Giới thiệu khóa học</h3>
                        <p>{course.description || 'Khóa học này chưa có mô tả chi tiết.'}</p>
                    </CourseDescription>
                </CourseDetails>
            </CourseContent>
            </CoursePlayerContainerMain>
            <FooterPortal></FooterPortal>
        </CoursePlayerContainer>
    );
};

export default CoursePlayer;