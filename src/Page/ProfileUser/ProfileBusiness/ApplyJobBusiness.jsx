import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Input,
    Modal,
    Pagination,
    Select,
    Table,
    Tag,
    DatePicker,
    Row,
    Col,
    Typography,
    Tooltip
} from "antd";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import {get_all_job_apply, listJobsApplyByBusinessId, listJobsByBusiness} from "../../../Redux/actions/MatchingThunk";
import {DOMAIN, GET_IMAGE_URI, USER_LOGIN} from "../../../Utils/Setting/Config";
import {CalendarOutlined, EyeOutlined, FileExcelOutlined, MessageOutlined} from "@ant-design/icons";
import ResultsSummary from "../../../Component/Paging/ResultsSummary";
import {encryptId} from "../../../Component/SecurityComponent/cryptoUtils";
import moment from "moment";
import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {useNavigate} from "react-router-dom";

pdfMake.vfs = pdfFonts ? pdfFonts.pdfMake?.vfs : {}; // Kiểm tra nếu pdfFonts tồn tại trước khi gán

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;
const ApplyJobBusiness = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filters, setFilters] = useState({
        dateRange: null,
    });

    // Lấy dữ liệu từ Redux store
    const jobApply = useSelector((state) => state.MatchingReducer.matchingList);
    const jobBusiness = useSelector((state) => state.MatchingReducer.totalJob);
    const totalElements = useSelector((state) => state.MatchingReducer.totalElements);
    const content = jobApply || []; // Lấy dữ liệu từ API
    const userData = localStorage.getItem(USER_LOGIN);
    const data = userData ? JSON.parse(userData) : null;
    const businessId = data?.business?.id;  // Kiểm tra null trước khi truy cập id
    const navigate = useNavigate();
    useEffect(() => {
        const jobParam = {
            businessId: businessId,
            keyword: "",
        };
        dispatch(listJobsByBusiness(jobParam));
    }, [dispatch, businessId]);

    useEffect(() => {
        const { dateRange } = filters;
        const [startDate, endDate] = dateRange ? dateRange : [];

        const params = {
            page: currentPage - 1,
            size: pageSize,
            businessId: businessId,
            jobId: selectedJob || "",
            keyword: searchText || "",
            status: statusFilter !== "" ? statusFilter : "",
            startDate: startDate ? startDate.format("YYYY-MM-DD") : "",
            endDate: endDate ? endDate.format("YYYY-MM-DD") : "",
        };
        console.log("Fetching job applications with params:", params);
        dispatch(listJobsApplyByBusinessId(params));
    }, [dispatch, currentPage, filters, pageSize, statusFilter, searchText, selectedJob, businessId]);

    const handleMessage = (record) => {
        navigate("/message-manager-business", {
            state: {
                candidateId: record.candidateId,
                candidateName: record.fullName
            }
        });
    };

    const handleJobFilter = (value) => {
        console.log("Job selected:", value);
        setSelectedJob(value);
        setCurrentPage(1);
    };


    const handleSearch = (e) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
    };

    const handleStatusFilter = (value) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const handleDateRangeChange = (dates) => {
        setFilters((prevFilters) => ({ ...prevFilters, dateRange: dates }));
        setCurrentPage(1); // Reset to the first page after filtering
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };
    const statusMapping = {
        WAITING: { label: 'Đang chờ', color: 'geekblue' },
        MATCHED: { label: 'Phù hợp', color: 'green' },
        NOT_MATCHED: { label: 'Chưa phù hợp', color: 'red' }
    };

    const handleViewProfile = (id,job) => {
        const encryptedId = encryptId(id);  // Mã hóa ID
        const jobId = encryptId(job);
        const url = `/profile-candidate-apply?id=${encodeURIComponent(encryptedId)}&job=${encodeURIComponent(jobId)}`;  // Truyền ID qua search param
        window.open(url, "_blank");  // Mở trang trong tab mới
    };

    const columns = [
        {
            title: 'STT',
            key: 'index',
            align: 'center',
            width: 60, // Đặt chiều rộng nhỏ hơn
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên công việc',
            dataIndex: 'jobName',
            key: 'jobName',
            width: 500, // Đặt chiều rộng nhỏ hơn
            ellipsis: true,
            align: 'center',
        },
        {
            title: 'Tên ứng viên',
            dataIndex: 'candidateName',
            key: 'candidateName',
            ellipsis: true,
            align: 'center',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'provinceAddress',
            key: 'provinceAddress',
            ellipsis: true,
            align: 'center',
        },
        {
            title: 'Ngày nộp hồ sơ',
            dataIndex: 'createdAt',
            key: 'createdAt',
            ellipsis: true,
            align: 'center',
            render: (text) => text ? moment(text).format("DD/MM/YYYY") : "N/A",
        },
        {
            title: 'Trạng thái',
            dataIndex: 'matchingStatus',
            key: 'matchingStatus',
            align: 'center',
            render: status => {
                const { label, color } = statusMapping[status] || { label: 'Không xác định', color: 'default' };
                return <Tag color={color}>{label}</Tag>;
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <span>
                <Tooltip title="Nhắn tin">
                    <Button
                        type="text"
                        icon={<MessageOutlined />}
                        onClick={() => handleMessage(record)}
                    />
                </Tooltip>

                <Tooltip title="Xem chi tiết">
    <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => handleViewProfile(record.candidateId,record.jobId)}
        style={{ marginLeft: 8 }}
    />
</Tooltip>
            </span>
            ),
        },
    ];




    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div className="mt-auto">
                            <Title level={2} style={{ marginBottom: 24, textAlign: 'center' }}>Danh sách công việc ứng tuyển</Title>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <Card>
                                        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                                            {/* Ô tìm kiếm */}
                                            <Col span={6}>
                                                <Input
                                                    placeholder="Tìm kiếm theo tên công việc hoặc công ty"
                                                    value={searchText}
                                                    onChange={handleSearch}
                                                    allowClear
                                                />
                                            </Col>

                                            {/* Bộ lọc trạng thái */}
                                            <Col span={6}>
                                                <Select
                                                    placeholder="Lọc theo trạng thái"
                                                    style={{ width: '100%' }}
                                                    onChange={handleStatusFilter}
                                                    value={statusFilter}
                                                    allowClear
                                                >
                                                    <Option value="">Tất cả</Option>
                                                    <Option value="MATCHED">Phù hợp</Option>
                                                    <Option value="NOT_MATCHED">Chưa phù hợp</Option>
                                                    <Option value="WAITING">Đang chờ</Option>
                                                </Select>
                                            </Col>

                                            {/* Bộ lọc danh sách công việc */}
                                            <Col span={6}>
                                                <Select
                                                    placeholder="Chọn công việc"
                                                    style={{ width: '100%' }}
                                                    onChange={handleJobFilter}
                                                    value={selectedJob}
                                                    allowClear
                                                >
                                                    {jobBusiness.map(job => (
                                                        <Option key={job.jobId} value={job.jobId}>{job.jobName}</Option>
                                                    ))}
                                                </Select>
                                            </Col>

                                            {/* Bộ lọc ngày */}
                                            <Col span={6}>
                                                <RangePicker
                                                    placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                                                    className="filter-date"
                                                    onChange={handleDateRangeChange}
                                                    suffixIcon={<CalendarOutlined />}
                                                />
                                            </Col>

                                        </Row>
                                        <Table
                                            columns={columns}
                                            dataSource={content}
                                            rowKey="id"
                                            pagination={false} // Tắt pagination mặc định của Table
                                            bordered
                                        />
                                        <ResultsSummary
                                            totalElements={totalElements}
                                        />
                                        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                            <Pagination
                                                current={currentPage}
                                                pageSize={pageSize}
                                                total={totalElements}
                                                onChange={handlePageChange}
                                                pageSizeOptions={[7, 10, 20, 50, 100]}
                                                showSizeChanger={true}
                                            />
                                        </div>
                                    </Card>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default ApplyJobBusiness;