import React, {useEffect, useState} from 'react'

import {useDispatch, useSelector} from "react-redux";
import {get_date_total_admin, get_statistic_admin} from "../../Redux/actions/AdminBusinessThunk";
import {Button, Card, DatePicker, Divider, Space} from "antd";
import {FaBriefcase, FaBuilding, FaHandshake, FaRegCalendarAlt, FaSchool, FaUsers} from "react-icons/fa";
import CountUp from "react-countup";
import { format, subDays } from 'date-fns';
import LineChartComponent from "../../Component/ChartComponent/LineChartComponent";
import {FireOutlined} from "@ant-design/icons";


const { RangePicker } = DatePicker;
// Hàm tính toán ngày bắt đầu và ngày kết thúc
const calculateDateRange = () => {
    const today = new Date();
    const endDate = format(today, 'yyyy-MM-dd');
    const startDate = format(subDays(today, 7), 'yyyy-MM-dd');
    return { startDate, endDate };
}
export function Admin() {
    const dispatch = useDispatch();
    const {totals,totals_date} = useSelector(state => state.AdminBusinessReducer);
    const user = useSelector(state => state.UserReducer.userData)
    const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'))

    useEffect(() => {
        dispatch(get_statistic_admin());
        dispatch(get_date_total_admin(startDate, endDate ))
    }, [dispatch, endDate, startDate]);

    const handleDateChange = (dates) => {
        if (dates) {
            setStartDate(format(dates[0].toDate(), 'yyyy-MM-dd'));
            setEndDate(format(dates[1].toDate(), 'yyyy-MM-dd'));
        }
    };
    const handleButtonClick = () => {
        const { startDate, endDate } = calculateDateRange();
        setStartDate(startDate);
        setEndDate(endDate);
        dispatch(get_date_total_admin(startDate, endDate));
    };
    const formattedDate = new Date().toLocaleDateString();
    const dates = Object.keys(totals_date);
    const datasets = [
        {
            label: 'Số lượng doanh nghiệp',
            data: dates.map(date => totals_date[date]["businessesNo"]),
            borderColor: 'rgba(192, 75, 75, 1)',
            backgroundColor: 'rgba(192, 75, 75, 0.2)',
            borderWidth: 1,
            fill: false,
        },
        {
            label: 'Số lượng công việc',
            data: dates.map(date => totals_date[date]["jobsNo"]),
            borderColor: 'rgba(75, 75, 192, 1)',
            backgroundColor: 'rgba(75, 75, 192, 0.2)',
            borderWidth: 1,
            fill: false,
        },
    ];

    // Tìm ngày có số lượng sự kiện cao nhất
    let maxEvents = 0;
    let maxEventDates = [];
    dates.forEach(date => {
        const workshopsNo = totals_date[date]["workshopsNo"] || 0;
        if (workshopsNo > maxEvents) {
            maxEvents = workshopsNo;
            maxEventDates = [date];
        } else if (workshopsNo === maxEvents && workshopsNo > 0) {
            maxEventDates.push(date);
        }
    });

    // Tìm ngày có số lượng hợp tác doanh nghiệp-trường học cao nhất
    let maxCooperations = 0;
    let maxCooperationDates = [];
    dates.forEach(date => {
        const universityBusinessNo = totals_date[date]["universityBusinessNo"] || 0;
        if (universityBusinessNo > maxCooperations) {
            maxCooperations = universityBusinessNo;
            maxCooperationDates = [date];
        } else if (universityBusinessNo === maxCooperations && universityBusinessNo > 0) {
            maxCooperationDates.push(date);
        }
    });

    // Tìm ngày có số lượng đăng ký sự kiện cao nhất
    let maxEventRegistrations = 0;
    let maxEventRegistrationDates = [];
    dates.forEach(date => {
        const workshopsBusinessesNo = totals_date[date]["workshopsBusinessesNo"] || 0;
        if (workshopsBusinessesNo > maxEventRegistrations) {
            maxEventRegistrations = workshopsBusinessesNo;
            maxEventRegistrationDates = [date];
        } else if (workshopsBusinessesNo === maxEventRegistrations && workshopsBusinessesNo > 0) {
            maxEventRegistrationDates.push(date);
        }
    });
    return (
        <>
            <section className="section-admin">
                <div className="m-5 mt-1">
                    <header className="header-university mb-4 d-flex align-items-center justify-content-between">
                        <div className="header-logo d-flex align-items-center">
                            <img src={'aotucareer-logo.svg'} alt="logo"
                                 className="me-2"/>
                            <span>{user.role.description}</span>
                        </div>
                        <div className="header-date-time">
                            <span>{formattedDate}</span>
                        </div>
                    </header>
                    <div className="row g-4 card-container">
                        <div className="col-md-2">
                            <Card className="card-total-instructional">
                                <h4>Tổng doanh nghiệp</h4>
                                <div className="card-body-header">
                                    <FaBuilding className="icon"/>
                                    <p className="card-title">
                                        <CountUp end={totals["businessesTotal"]} duration={5}/>
                                    </p>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card className="card-total-section">
                                <h4>Tổng công việc</h4>
                                <div className="card-body-header">
                                    <FaBriefcase className="icon"/>
                                    <p className="card-title">
                                        <CountUp end={totals["jobsTotal"]} duration={5}/>
                                    </p>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-2">
                            <Card className="card-total-major">
                                <h4>Tổng ứng viên</h4>
                                <div className="card-body-header">
                                    <FaSchool className="icon"/>
                                    <h2 className="card-title">
                                        <CountUp end={totals["universitiesTotal"]} duration={5}/>
                                    </h2>
                                </div>
                            </Card>
                        </div>

                    </div>
                    <h2 className="mt-5">Biểu đồ tổng quan</h2>
                    <div className="row g-4 card-container">
                        <div className="col-9">
                            <h4 className="mb-4">Chọn khoảng thời gian để xem dữ liệu</h4>
                            <Space direction="horizontal" size="large" className="mb-4">
                                <RangePicker onChange={handleDateChange}
                                             placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}/>
                                <Button type="primary" onClick={handleButtonClick}>Xem</Button>
                            </Space>
                            <LineChartComponent labels={dates} datasets={datasets}/>
                        </div>
                        <div className="col-3 mt-4">
                        <div className="info-barChart">
                                <Card className="card-infoMajor-barChart">
                                    <Divider orientation="left">
                                        <FireOutlined style={{color: "#ff4d4f", marginRight: "8px"}}/>
                                        Ngày có sự kiện nhiều nhất
                                    </Divider>
                                    <p style={{fontWeight: 'bold'}}>
                                        {maxEvents > 0 ? (
                                            maxEventDates.map(date => (
                                                <div key={date}>
                                                    Ngày: {date}, Số lượng sự kiện: {totals_date[date]["workshopsNo"]}
                                                </div>
                                            ))
                                        ) : (
                                            'Không có dữ liệu sự kiện.'
                                        )}
                                    </p>
                                </Card>
                                <Card className="card-infoMajor-barChart mt-3">
                                    <Divider orientation="left">
                                        <FireOutlined style={{color: "#ff4d4f", marginRight: "8px"}}/>
                                        Ngày hợp tác cao nhất.
                                    </Divider>
                                    <p style={{fontWeight: 'bold'}}>
                                        {maxCooperations > 0 ? (
                                            maxCooperationDates.map(date => (
                                                <div key={date}>
                                                    Ngày: {date}, Số lượng hợp
                                                    tác: {totals_date[date]["universityBusinessNo"]}
                                                </div>
                                            ))
                                        ) : (
                                            'Không có dữ liệu hợp tác.'
                                        )}
                                    </p>
                                </Card>
                                <Card className="card-infoMajor-barChart mt-3">
                                    <Divider orientation="left">
                                        <FireOutlined style={{color: "#ff4d4f", marginRight: "8px"}}/>
                                        Ngày đăng ký sự kiện cao nhất.
                                    </Divider>
                                    <p style={{fontWeight: 'bold'}}>
                                        {maxEventRegistrations > 0 ? (
                                            maxEventRegistrationDates.map(date => (
                                                <div key={date}>
                                                    Ngày: {date}, Số lượng đăng
                                                    ký: {totals_date[date]["workshopsBusinessesNo"]}
                                                </div>
                                            ))
                                        ) : (
                                            'Không có dữ liệu đăng ký sự kiện.'
                                        )}
                                    </p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}