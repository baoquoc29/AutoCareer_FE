import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import FooterPortal from "./FooterPortal";

const FreeCoursesContainer = styled.div`
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  margin-top: 40px;

  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 15px;
  }

  p {
    color: #7f8c8d;
    font-size: 1.1rem;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 40px;
  margin-top: 40px;
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const CourseThumbnail = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const FreeBadge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
`;

const CourseInfo = styled.div`
  padding: 20px;

  h3 {
    font-size: 1.2rem;
    color: #2c3e50;
    margin-bottom: 10px;
    height: 60px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  p {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-bottom: 8px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }
`;

const WatchNowBtn = styled.button`
  background: linear-gradient(90deg, #3498db, #9b59b6);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const NoCoursesMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #f8f9fa;
  border-radius: 10px;
  margin: 40px 0;
  
  h3 {
    color: #7f8c8d;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  p {
    color: #95a5a6;
    max-width: 600px;
    margin: 0 auto 20px;
  }
`;

const FreeCourses = () => {
  const [courses] = useState([
    {
      id: 'course1',
      title: 'Khóa học React cơ bản',
      instructor: 'Nguyễn Văn A',
      duration: '5 giờ',
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      canWatchNow: true,
      description: 'Khóa học React cơ bản dành cho người mới bắt đầu...',
      videoUrl: 'https://youtube.com/embed/video-id',
    },
    {
      id: 2,
      title: 'JavaScript ES6+ và các tính năng hiện đại',
      instructor: 'Trần Thị B',
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      duration: '4 giờ',
      isFree: true,
      canWatchNow: true,
      students: 980,
      lessons: 22
    },
    {
      id: 3,
      title: 'CSS3 nâng cao và Responsive Design chuyên sâu',
      instructor: 'Lê Văn C',
      thumbnail: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      duration: '3 giờ',
      isFree: true,
      canWatchNow: true,
      students: 750,
      lessons: 18
    },
    {
      id: 4,
      title: 'Node.js cơ bản và xây dựng REST API',
      instructor: 'Phạm Thị D',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      duration: '6 giờ',
      isFree: true,
      canWatchNow: false,
      students: 420,
      lessons: 24
    }
  ]);

  const navigate = useNavigate();
  const availableFreeCourses = courses.filter(course => course.isFree);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
      <FreeCoursesContainer>
        <HeaderPortal />
        <PageHeader>
          <p>Học và nâng cao kỹ năng của bạn với các khóa học chất lượng hoàn toàn miễn phí từ các chuyên gia hàng đầu</p>
        </PageHeader>

        {availableFreeCourses.length > 0 ? (
            <CoursesGrid>
              {availableFreeCourses.map(course => (
                  <CourseCard key={course.id}>
                    <CourseThumbnail>
                      <img src={course.thumbnail} alt={course.title} />
                      <FreeBadge>MIỄN PHÍ</FreeBadge>
                    </CourseThumbnail>
                    <CourseInfo>
                      <h3>{course.title}</h3>
                      <p>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        {course.instructor}
                      </p>
                      <p>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {course.duration}
                      </p>
                      <WatchNowBtn
                          onClick={() => handleCourseClick(course.id)}
                          disabled={!course.canWatchNow}
                      >
                        {course.canWatchNow ? 'XEM NGAY' : 'SẮP MỞ'}
                      </WatchNowBtn>
                    </CourseInfo>
                  </CourseCard>
              ))}
            </CoursesGrid>
        ) : (
            <NoCoursesMessage>
              <h3>Hiện không có khóa học miễn phí nào</h3>
              <p>Chúng tôi sẽ sớm cập nhật các khóa học miễn phí mới. Vui lòng quay lại sau!</p>
            </NoCoursesMessage>
        )}
        <FooterPortal />
      </FreeCoursesContainer>
  );
};

export default FreeCourses;