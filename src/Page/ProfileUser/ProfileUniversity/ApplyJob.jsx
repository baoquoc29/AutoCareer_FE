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
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { get_all_job_apply } from "../../../Redux/actions/MatchingThunk";
import {USER_LOGIN} from "../../../Utils/Setting/Config";
import {CalendarOutlined, EyeOutlined, MessageOutlined} from "@ant-design/icons";
import ResultsSummary from "../../../Component/Paging/ResultsSummary";
import {encryptId} from "../../../Component/SecurityComponent/cryptoUtils";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

const ApplyJob = () => {
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
    const navigate = useNavigate();
    // Lấy dữ liệu từ Redux store
    const jobApply = useSelector((state) => state.MatchingReducer.matchingList);
    const totalElements = useSelector((state) => state.MatchingReducer.totalElements);
    const content = jobApply || []; // Lấy dữ liệu từ API
    const userData = localStorage.getItem(USER_LOGIN);
    const data = userData ? JSON.parse(userData) : null;
    const candidateId = data?.candidateResponse?.id;  // Kiểm tra null trước khi truy cập id

    useEffect(() => {
        const { dateRange } = filters;
        const [startDate, endDate] = dateRange ? dateRange : [];

        const params = {
            page: currentPage - 1, // Điều chỉnh cho trang bắt đầu từ 0
            size: pageSize,
            candidateId: candidateId,
            keyword: searchText || "",
            status: statusFilter !== "" ? statusFilter : "",
            startDate: startDate ? startDate.format("YYYY-MM-DD") : "",
            endDate: endDate ? endDate.format("YYYY-MM-DD") : "",
        };

        console.log("Params gửi lên API:", params);

        // Dispatch action để lấy dữ liệu ứng tuyển với các bộ lọc
        dispatch(get_all_job_apply(params));
    }, [dispatch, currentPage, filters, pageSize, statusFilter, searchText]);

    console.log(jobApply);
    const handleMessage = (record) => {
        navigate("/candidate-messages", {
            state: {
                businessId: record.businessUserId,
                businessName: record.businessName
            }
        });
    };

    const handleViewJob = (record) => {
        const encryptedId = encryptId(record.jobId);  // Encrypt the ID first
        const url = `/job-portal-detail/${encodeURIComponent(encryptedId)}`; // Make sure the encrypted ID is properly encoded
        window.open(url, "_blank");  // Open in a new tab
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
        NOT_MATCHED: { label: 'Phù hợp', color: 'green' },
        MATCHED: { label: 'Chưa phù hợp', color: 'red' }
    };
    const columns = [
        {
            title: 'Tên công việc',
            dataIndex: 'jobName',
            key: 'jobName',
            ellipsis: true,
            align: 'center', // Căn giữa
        },
        {
            title: 'Tên công ty',
            dataIndex: 'businessName',
            key: 'businessName',
            ellipsis: true,
            align: 'center', // Căn giữa
        },
        {
            title: 'Địa điểm',
            key: 'location',
            ellipsis: true,
            align: 'center', // Căn giữa
            render: (text, record) => `${record.districtName}, ${record.provinceName}`,
        },
        {
            title: 'Mức lương',
            key: 'salary',
            ellipsis: true,
            align: 'center', // Căn giữa
            render: (text, record) => `${record.fromSalary} - ${record.toSalary}`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'matchingStatus',
            key: 'matchingStatus',
            align: 'center', // Căn giữa
            render: status => {
                const { label, color } = statusMapping[status] || { label: 'Không xác định', color: 'default' };
                return <Tag color={color}>{label}</Tag>;
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center', // Căn giữa
            render: (text, record) => (
                <span>
                <Tooltip title="Nhắn tin">
                    <Button
                        type="text"
                        icon={<MessageOutlined />}
                        onClick={() => handleMessage(record)}
                    />
                </Tooltip>

                <Tooltip title="Xem công việc">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewJob(record)}
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
                                        <Row gutter={[16, 16]} style={{marginBottom: 24}}>
                                            <Col span={8}>
                                                <Input
                                                    placeholder="Tìm kiếm theo tên công việc hoặc công ty"
                                                    value={searchText}
                                                    onChange={handleSearch}
                                                    allowClear
                                                />
                                            </Col>
                                            <Col span={8}>
                                                <Select
                                                    placeholder="Lọc theo trạng thái"
                                                    style={{width: '100%'}}
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
                                            <Col span={8}>
                                                <RangePicker
                                                    placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                                                    className="filter-date"
                                                    onChange={handleDateRangeChange}
                                                    suffixIcon={<CalendarOutlined/>} /* Biểu tượng lịch */
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
            <Modal
                title="Chi tiết công việc"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                centered
            >
                {selectedJob && (
                    <div>
                        <p><strong>Tên công việc:</strong> {selectedJob.jobName}</p>
                        <p><strong>Tên công ty:</strong> {selectedJob.businessName}</p>
                        <p><strong>Địa điểm:</strong> {selectedJob.districtName}, {selectedJob.provinceName}</p>
                        <p><strong>Mức lương:</strong> {selectedJob.fromSalary} - {selectedJob.toSalary}</p>
                        <p><strong>Trạng thái:</strong>
                            <Tag color={selectedJob.matchingStatus === 'WAITING' ? 'geekblue' : selectedJob.matchingStatus === 'APPROVED' ? 'green' : 'red'}>
                                {selectedJob.matchingStatus.toUpperCase()}
                            </Tag>
                        </p>
                    </div>
                )}
            </Modal>
        </>
    );
};
export default ApplyJob;