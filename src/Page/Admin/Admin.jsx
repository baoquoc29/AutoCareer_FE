import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { get_date_total_admin, get_statistic_admin } from "../../Redux/actions/AdminBusinessThunk";
import { Card, DatePicker, Typography, Row, Col, Divider, List, Avatar, Progress, Tag, Select, Button, Table } from "antd";
import {
    MdWork,
    MdBusiness,
    MdPeople,
    MdTrendingUp,
    MdStar,
    MdFileDownload
} from "react-icons/md";
import { FiCalendar, FiFilter, FiDownload, FiExternalLink } from "react-icons/fi";
import { RiBarChartFill, RiPieChartFill } from "react-icons/ri";
import CountUp from "react-countup";
import { format, subDays, subMonths, subYears, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import * as XLSX from 'xlsx';
import moment from "moment";
import {status_job} from "../../Redux/actions/MatchingThunk";
import {get_top_business} from "../../Redux/actions/BusinessThunk";
import {GET_IMAGE_URI} from "../../Utils/Setting/Config";
import {encryptId} from "../../Component/SecurityComponent/cryptoUtils";
import {get_job_top} from "../../Redux/actions/JobThunk";
import {count_total_candidate} from "../../Redux/actions/CandidateThunk";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Color palette
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function Admin() {
    const dispatch = useDispatch();
    const { totals, totals_date } = useSelector(state => state.AdminBusinessReducer);
    const user = useSelector(state => state.UserReducer.userData);
    const [topBusiness, setTopBusiness] = useState([]);
    const [topJobs, setTopJobs] = useState([]);
    const [totalCandidate, setTotalCandidate] = useState();
    // State for filters and view
    const [dateRange, setDateRange] = useState({
        startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd')
    });
    const [timeRange, setTimeRange] = useState('monthly');
    const [chartType, setChartType] = useState('bar');

    // Mock data - replace with your actual data
    const monthlyData = [
        { month: 'Tháng 1', jobs: 1200, candidates: 4500, businesses: 320 },
        { month: 'Tháng 2', jobs: 1800, candidates: 5200, businesses: 400 },
        { month: 'Tháng 3', jobs: 2100, candidates: 5800, businesses: 450 },
        { month: 'Tháng 4', jobs: 1900, candidates: 5100, businesses: 420 },
        { month: 'Tháng 5', jobs: 2400, candidates: 6200, businesses: 500 },
        { month: 'Tháng 6', jobs: 2600, candidates: 6800, businesses: 550 },
    ];

    const yearlyData = [
        { year: '2019', jobs: 22000, candidates: 62000, businesses: 4500 },
        { year: '2020', jobs: 28000, candidates: 75000, businesses: 5200 },
        { year: '2021', jobs: 35000, candidates: 92000, businesses: 6800 },
        { year: '2022', jobs: 42000, candidates: 110000, businesses: 8200 },
        { year: '2023', jobs: 50000, candidates: 130000, businesses: 9500 },
    ];


    useEffect(() => {
        dispatch(get_statistic_admin());
        dispatch(get_date_total_admin(dateRange.startDate, dateRange.endDate));

    }, [dispatch, dateRange]);
    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const result = await dispatch(get_top_business());
                if (result) {
                    setTopBusiness(result.map(business => ({
                        id: business.id,
                        name: business.businessName,
                        followers: business.totalFollower,
                        jobs: business.totalJob,
                        imageID: business.imageID,
                        industry: business.industry
                    })));
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách công ty:", error);
            }
        };
        const fetchJob = async () => {
            try {
                const result = await dispatch(get_job_top());
                if (result) {
                    setTopJobs(result);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách công ty:", error);
            }
        };
        const fetchCandidate = async () => {
            try {
                const result = await dispatch(count_total_candidate());
                if (result) {
                    setTotalCandidate(result);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách công ty:", error);
            }
        };
        fetchCandidate();
        fetchBusiness();
        fetchJob();
    }, [dispatch]);

    const handleDateChange = (dates) => {
        if (dates) {
            setDateRange({
                startDate: format(dates[0].toDate(), 'yyyy-MM-dd'),
                endDate: format(dates[1].toDate(), 'yyyy-MM-dd')
            });
        }
    };

    const handleTimeRangeChange = (value) => {
        setTimeRange(value);

        // Set default date range based on selection
        const now = new Date();
        if (value === 'monthly') {
            setDateRange({
                startDate: format(startOfMonth(now), 'yyyy-MM-dd'),
                endDate: format(endOfMonth(now), 'yyyy-MM-dd')
            });
        } else if (value === 'yearly') {
            setDateRange({
                startDate: format(startOfYear(now), 'yyyy-MM-dd'),
                endDate: format(endOfYear(now), 'yyyy-MM-dd')
            });
        } else if (value === 'custom') {
            setDateRange({
                startDate: format(subDays(now, 30), 'yyyy-MM-dd'),
                endDate: format(now, 'yyyy-MM-dd')
            });
        }
    };

    const exportToExcel = () => {
        // Prepare data for export
        let dataToExport = [];
        const fileName = `statistics_${timeRange}_${format(new Date(), 'yyyyMMdd')}.xlsx`;

        if (timeRange === 'monthly') {
            dataToExport = monthlyData.map(item => ({
                Period: item.month,
                Jobs: item.jobs,
                Candidates: item.candidates,
                Businesses: item.businesses
            }));
        } else {
            dataToExport = yearlyData.map(item => ({
                Period: item.year,
                Jobs: item.jobs,
                Candidates: item.candidates,
                Businesses: item.businesses
            }));
        }

        // Create workbook and worksheet
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Statistics");

        // Export the file
        XLSX.writeFile(wb, fileName);
    };

    const renderChart = () => {
        const data = timeRange === 'monthly' ? monthlyData : yearlyData;
        const xAxisKey = timeRange === 'monthly' ? 'month' : 'year';

        if (chartType === 'bar') {
            return (
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="jobs" fill="#1890ff" name="Công việc" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="candidates" fill="#52c41a" name="Ứng viên" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="businesses" fill="#fa8c16" name="Doanh nghiệp" radius={[4, 4, 0, 0]} />
                </BarChart>
            );
        } else {
            // For pie chart, we need to transform data for the last period
            const lastPeriod = data[data.length - 1];
            const pieData = [
                { name: 'Công việc', value: lastPeriod.jobs },
                { name: 'Ứng viên', value: lastPeriod.candidates },
                { name: 'Doanh nghiệp', value: lastPeriod.businesses },
            ];

            return (
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            );
        }
    };

    const formatSalary = (salary) => {
        if (!salary) return 'Thỏa thuận';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(salary);
    };

    const jobsColumns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            align: 'center', // Căn giữa tiêu đề và nội dung
            render: (text,record) => <a
                href={`/job-portal-detail/${record.id}`}
                style={{fontWeight: 500}}
            >
                {text}
            </a>,
        },
        {
            title: 'Công ty',
            dataIndex: 'company',
            key: 'company',
            align: 'center', // Căn giữa
            render: (text) => <span style={{ color: '#555' }}>{text}</span>, // Màu chữ nhẹ hơn
        },
        {
            title: 'Mức lương',
            dataIndex: 'salary',
            key: 'salary',
            align: 'center', // Căn giữa thay vì 'right'
            render: (salary) => (
                <span style={{
                    color: salary ? '#1890ff' : '#888',
                    fontWeight: salary ? 500 : 'normal'
                }}>
                {formatSalary(salary)}
            </span>
            ),
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            align: 'center', // Căn giữa
            render: (type) => {
                let color = type === 'Full-time' ? 'green' : 'geekblue';
                return (
                    <Tag
                        color={color}
                        key={type}
                        style={{
                            margin: '0 auto', // Đảm bảo tag nằm giữa ô
                            minWidth: 90, // Cân đối kích thước
                        }}
                    >
                        {type.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Ứng tuyển',
            dataIndex: 'applied',
            key: 'applied',
            align: 'center', // Căn giữa thay vì 'right'
            sorter: (a, b) => a.applied - b.applied,
            render: (text) => <strong style={{ color: '#ff4d4f' }}>{text}</strong>, // Màu đỏ nổi bật
        },
    ];

    const companiesColumns = [
        {
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        src={`${GET_IMAGE_URI}${record.imageID}`}
                        style={{
                            marginRight: 12,
                            width: 40,
                            height: 40,
                            backgroundColor: '#f0f2f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        icon={<MdBusiness size={18} color="#888" />}
                    />
                    <div>
                        <a

                            href={`/business-portal-detail/${encodeURIComponent(encryptId(record.id))}`}
                            style={{fontWeight: 500, textDecoration: 'none', color: '#1890ff'}}
                        >
                            {text}
                        </a>

                        <div style={{marginTop: 4}}>
                            {record.industry.split(', ').map((ind, i) => (
                                <Tag
                                    key={i}
                                    color={COLORS[i % COLORS.length]}
                                    style={{
                                        marginRight: 4,
                                        marginBottom: 4,
                                        borderRadius: 4,
                                        fontSize: 12
                                    }}
                                >
                                    {ind.trim()}
                                </Tag>
                            ))}
                        </div>
                    </div>
                </div>
            ),
            width: '50%'
        },
        {
            dataIndex: 'followers',
            key: 'followers',
            align: 'center',
            render: (followers) => (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{followers}</div>
                    <Text type="secondary" style={{ fontSize: 12 }}>người theo dõi</Text>
                </div>
            ),
            width: '20%'
        },
        {
            dataIndex: 'jobs',
            key: 'jobs',
            align: 'center',
            render: (jobs) => (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{jobs}</div>
                    <Text type="secondary" style={{ fontSize: 12 }}>công việc</Text>
                </div>
            ),
            width: '20%'
        }
    ];

    return (
        <div style={{ padding: '24px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
            <Row gutter={[24, 24]}>
                {/* Header */}
                <Col span={24}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px'
                    }}>
                        <div>
                            <Title level={3} style={{ margin: 0 }}>Thống kê</Title>
                            <Text type="secondary">Xin chào, {user?.name || 'Admin'}</Text>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            flexWrap: 'wrap'
                        }}>
                            {timeRange === 'custom' && (
                                <RangePicker
                                    onChange={handleDateChange}
                                    style={{ width: 250 }}
                                    value={[
                                        dateRange.startDate ? moment(dateRange.startDate) : null,
                                        dateRange.endDate ? moment(dateRange.endDate) : null
                                    ]}
                                />
                            )}

                        </div>
                    </div>

                    <Divider style={{ margin: '16px 0' }} />
                </Col>

                {/* Summary Cards */}
                <Col xs={24} sm={12} md={8}>
                    <Card
                        hoverable
                        style={{
                            borderRadius: 12,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            height: '100%',
                            borderTop: '4px solid #1890ff'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                                backgroundColor: '#e6f7ff',
                                padding: 16,
                                borderRadius: 8,
                                marginRight: 16
                            }}>
                                <MdWork size={24} color="#1890ff" />
                            </div>
                            <div>
                                <Text type="secondary">Tổng số công việc</Text>
                                <Title level={3} style={{ margin: '4px 0' }}>
                                    <CountUp end={totals?.jobsTotal || 0} duration={2} />
                                </Title>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card
                        hoverable
                        style={{
                            borderRadius: 12,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            height: '100%',
                            borderTop: '4px solid #52c41a'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                                backgroundColor: '#f6ffed',
                                padding: 16,
                                borderRadius: 8,
                                marginRight: 16
                            }}>
                                <MdPeople size={24} color="#52c41a" />
                            </div>
                            <div>
                                <Text type="secondary">Tổng số ứng viên</Text>
                                <Title level={3} style={{ margin: '4px 0' }}>
                                    <CountUp end={totalCandidate || 0} duration={2} />
                                </Title>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card
                        hoverable
                        style={{
                            borderRadius: 12,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            height: '100%',
                            borderTop: '4px solid #fa8c16'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                                backgroundColor: '#fff2e8',
                                padding: 16,
                                borderRadius: 8,
                                marginRight: 16
                            }}>
                                <MdBusiness size={24} color="#fa8c16" />
                            </div>
                            <div>
                                <Text type="secondary">Tổng số công ty</Text>
                                <Title level={3} style={{ margin: '4px 0' }}>
                                    <CountUp end={totals?.businessesTotal || 0} duration={2} />
                                </Title>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card
                        title="Top 5 công việc"
                        extra={<a href="#">Xem tất cả</a>}
                        style={{
                            borderRadius: 12,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}
                    >
                        <Table
                            columns={jobsColumns}
                            dataSource={topJobs}
                            pagination={false}
                            rowKey="id"
                            size="middle"
                            scroll={{ x: true }}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card
                        title="Top 5 Công ty"
                        extra={<a href="/business-section">Xem tất cả</a>}
                        style={{
                            borderRadius: 12,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}
                    >
                        <Table
                            columns={companiesColumns}
                            dataSource={topBusiness}
                            pagination={false}
                            rowKey="id"
                            size="middle"
                            style={{ borderRadius: 8 }}
                            bordered={false}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}