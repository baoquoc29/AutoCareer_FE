import React, {useEffect} from 'react';
import {Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js';
import {useDispatch, useSelector} from "react-redux";
import {get_university_id} from "../../Redux/actions/UniversityThunk";
import {GET_IMAGE_URI} from "../../Utils/Setting/Config";
import {Card, Divider} from "antd";
import {get_total_ins} from "../../Redux/actions/InstructionalThunk";
import {get_count_major_by_section, get_total_section} from "../../Redux/actions/SectionThunk";
import {count_student_major, get_total_major, get_total_student} from "../../Redux/actions/MajorThunk";
import {get_approved_workShop, get_status_workShop, get_total_workshop} from "../../Redux/actions/WorkShopThunk";
import {get_total_cooperation} from "../../Redux/actions/CooperationThunk";
import './Style/University.css'
import CountUp from "react-countup";
import BarChartComponent from "../../Component/ChartComponent/BarChartComponent";
import {FireOutlined} from "@ant-design/icons";
import {FaCalendarAlt, FaChalkboardTeacher, FaHandshake, FaLaptop, FaSchool, FaUsers} from "react-icons/fa";


Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function University() {
    const dispatch = useDispatch();

    // Lấy thông tin trường đại học từ Redux store
    const university = useSelector(state => state.UserReducer.userData?.university);
    const universityDetails = useSelector(state => state.UniversityReducer.university);
    const totalInstruction = useSelector(state => state.InstructionalReducer.totalInstruction)
    const {totalSections} = useSelector(state => state.SectionReducer)
    const {totalStudent, totalMajor, countStudentMajor} = useSelector(state => state.MajorReducer)
    const {totalWorkShop, statusWorkShop,totalApprovedWorkShop} = useSelector(state => state.WorkShopReducer)
    const totalCooperation = useSelector(state => state.CooperationReducer.totalCooperation)

    useEffect(() => {
        dispatch(get_total_ins(university?.id))
        dispatch(get_total_section(university?.id))
        dispatch(get_total_major(university?.id))
        dispatch(get_total_workshop(university?.id))
        dispatch(get_total_student(university?.id))
        dispatch(get_total_cooperation(university?.id))
        dispatch(get_count_major_by_section())
        dispatch(count_student_major(university?.id))
        dispatch(get_status_workShop())
        dispatch(get_approved_workShop(university?.id))
    }, [dispatch]);
    useEffect(() => {
        if (university?.id) {
            dispatch(get_university_id(university.id));
        }
    }, [university, dispatch]);
    const formattedDate = new Date().toLocaleDateString();


    console.log('data',totalApprovedWorkShop)

    // Dữ liệu cho Bar Chart từ countStudentMajor
    const chartBarData2 = Object.values(countStudentMajor);
    const chartLabelsBar2 = Object.keys(countStudentMajor);

    // Tìm khoa có số sinh viên nhiều nhất và ít nhất
    const maxStudentCount = Math.max(...chartBarData2);
    const minStudentCount = Math.min(...chartBarData2);

    const maxStudentMajors = chartLabelsBar2.filter(
        (major, index) => chartBarData2[index] === maxStudentCount
    );

    const minStudentMajors = chartLabelsBar2.filter(
        (major, index) => chartBarData2[index] === minStudentCount
    );


    // Dữ liệu cho Bar Chart từ totalApprovedWorkShop
    const chartBarData = totalApprovedWorkShop.map(workshop => workshop["countApproved"]);
    const chartLabelsBar = totalApprovedWorkShop.map(workshop => workshop["nameWorkshop"]);

    // Tìm sự kiện có số lượng được phê duyệt nhiều nhất và ít nhất
    const maxCountApproved = Math.max(...chartBarData);
    const minCountApproved = Math.min(...chartBarData);

    const maxApprovedWorkshops = totalApprovedWorkShop.filter(workshop => workshop["countApproved"] === maxCountApproved);
    const minApprovedWorkshops = totalApprovedWorkShop.filter(workshop => workshop["countApproved"] === minCountApproved);

    // Kiểm tra nếu không có sự kiện nào hoặc tất cả các sự kiện đều có countApproved bằng 0
    const noData = totalApprovedWorkShop.length === 0 || maxCountApproved === 0;

    return (
        <>
            <section className="section-university">
                <div className="m-5 mt-1">
                    <header className="header-university mb-4 d-flex align-items-center justify-content-between">
                        <div className="header-logo d-flex align-items-center">
                            <img src={`${GET_IMAGE_URI}${universityDetails.logoImageId}`} alt="logo"
                                 className="me-2"/>
                            <span>{universityDetails.name}</span>
                        </div>
                        <div className="header-date-time">
                            <span>{formattedDate}</span>
                        </div>
                    </header>
                    <div className="row g-4 card-container">
                        <div className="col-md-2">
                            <Card className="card-total-instructional">
                                <h4 >Tổng giáo vụ</h4>
                                <div className="card-body-header">
                                    <FaChalkboardTeacher className="icon"/>
                                    <p className="card-title">
                                        <CountUp end={totalInstruction} duration={5}/>
                                    </p>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card className="card-total-section">
                                <h4>Tổng khoa</h4>
                                <div className="card-body-header">
                                    <FaSchool className="icon" />
                                    <p className="card-title">
                                        <CountUp end={totalSections} duration={5}/>
                                    </p>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card className="card-total-major">
                                <h4>Tổng chuyên ngành</h4>
                                <div className="card-body-header">
                                    <FaLaptop className="icon" />
                                    <h2 className="card-title">
                                        <CountUp end={totalMajor} duration={5}/>
                                    </h2>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card className="card-total-student">
                                <h4 >Tổng số sinh viên</h4>
                                <div className="card-body-header">
                                    <FaUsers className="icon" />
                                    <h2 className="card-title">
                                        <CountUp end={totalStudent} duration={5}/>
                                    </h2>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card className="card-total-workshop">
                                <h4>Tổng số sự kiện</h4>
                                <div className="card-body-header">
                                    <FaCalendarAlt className="icon" />
                                    <h2 className="card-title">
                                        <CountUp end={totalWorkShop} duration={5}/>
                                    </h2>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card className="card-total-cooperation">
                                <h4 >Tổng số hợp tác</h4>
                                <div className="card-body-header">
                                    <FaHandshake className="icon" />
                                    <h2 className="card-title">
                                        <CountUp end={totalCooperation} duration={5}/>
                                    </h2>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <h2 className="mt-5">Biểu đồ tổng quan</h2>
                    <div className=''>
                        <div className="row">
                            <div className="col-9">
                                <BarChartComponent
                                    data={chartBarData2}
                                    labels={chartLabelsBar2}
                                    title="Thống kê số lượng sinh viên của mỗi chuyên ngành "
                                />
                            </div>
                            <div className="col-3 mt-4">
                                <div className="info-barChart">
                                    <Card className="card-infoMajor-barChart">
                                        <Divider orientation="left">
                                            <FireOutlined style={{color: "#ff4d4f", marginRight: "8px"}}/>
                                            Ngành có nhiều sinh viên
                                        </Divider>
                                        <p style={{fontWeight: 'bold'}}>
                                            {maxStudentMajors.map((major) => (
                                                <span key={major}>
                                                {major} ({countStudentMajor[major]})
                                                    <br/>
                                                </span>
                                            ))}
                                        </p>
                                    </Card>
                                    <Card className="card-infoMajor-barChart mt-5">
                                        <Divider orientation="left">
                                            <FireOutlined style={{color: "#ff4d4f", marginRight: "8px"}}/>
                                            Ngành có ít sinh viên
                                        </Divider>
                                        <p style={{fontWeight: 'bold'}}>
                                            {minStudentMajors.map((major) => (
                                                <span key={major}>
                                                         {major} ({countStudentMajor[major]})
                                                    <br/>
                                                     </span>
                                            ))}
                                        </p>
                                    </Card>
                                </div>
                            </div>
                            <div className="col-3 mt-5">
                                <div className="info-barChart">
                                    <Card className="card-infoMajor-barChart">
                                        <Divider orientation="left">
                                            <FireOutlined style={{color: "#ff4d4f", marginRight: "8px"}}/>
                                            Sự kiện tham gia nhiều
                                        </Divider>
                                        {noData ? (
                                            <p>Không có dữ liệu</p>
                                        ) : (
                                            maxApprovedWorkshops.map((workshop, index) => (
                                                <p key={index} style={{fontWeight: 'bold'}}>
                                                    {workshop["nameWorkshop"]} - {workshop["countApproved"]} người tham gia
                                                </p>
                                            ))
                                        )}
                                    </Card>
                                    <Card className="card-infoMajor-barChart mt-5">
                                        <Divider orientation="left">
                                            <FireOutlined style={{color: "#ff4d4f", marginRight: "8px"}}/>
                                            Sự kiện tham gia ít
                                        </Divider>
                                        {noData ? (
                                            <p>Không có dữ liệu</p>
                                        ) : (
                                            minApprovedWorkshops.map((workshop, index) => (
                                                <p key={index} style={{fontWeight: 'bold'}}>
                                                    {workshop["nameWorkshop"]} - {workshop["countApproved"]} người tham gia
                                                </p>
                                            ))
                                        )}
                                    </Card>
                                </div>
                            </div>
                            <div className="col-9 mt-3">
                                <BarChartComponent data={chartBarData} labels={chartLabelsBar} title="Số lượng doanh nghiệp tham gia sự kiện " />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
