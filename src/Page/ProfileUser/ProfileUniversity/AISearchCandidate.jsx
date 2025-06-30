import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Pagination,
    Select,
    Table,
    DatePicker,
    Row,
    Col,
    Typography,
    Tooltip
} from "antd";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import {listCandidateMatch, listJobsApplyByBusinessId, listJobsByBusiness} from "../../../Redux/actions/MatchingThunk";
import {USER_LOGIN} from "../../../Utils/Setting/Config";
import {EyeOutlined,MessageOutlined} from "@ant-design/icons";
import ResultsSummary from "../../../Component/Paging/ResultsSummary";
import {encryptId} from "../../../Component/SecurityComponent/cryptoUtils";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {useNavigate} from "react-router-dom";

pdfMake.vfs = pdfFonts ? pdfFonts.pdfMake?.vfs : {}; // Kiểm tra nếu pdfFonts tồn tại trước khi gán

const { Option } = Select;
const { Title } = Typography;
const AISearchCandidate = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedJob, setSelectedJob] = useState(null);

    const jobBusiness = useSelector((state) => state.MatchingReducer.totalJob);
    const candidates = useSelector((state) => state.MatchingReducer.candidates);
    const totalElements = useSelector((state) => state.MatchingReducer.totalElements);

    const userData = localStorage.getItem(USER_LOGIN);
    const data = userData ? JSON.parse(userData) : null;
    const businessId = data?.business?.id;
    const navigate = useNavigate();

    useEffect(() => {
        const jobParam = {
            businessId: businessId
        };
        dispatch(listJobsByBusiness(jobParam));
    }, [dispatch, businessId]);


    useEffect(() => {
        if (selectedJob) {
            dispatch(listCandidateMatch(selectedJob));
        }
    }, [dispatch, selectedJob]);

    const handleMessage = (record) => {
        navigate("/message-manager-business", {
            state: {
                candidateId: record.userId,
                candidateName: record.candidate_name
            }
        });
    };

    const handleJobFilter = (value) => {
        setSelectedJob(value);
        setCurrentPage(1);
    };


    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleViewProfile = (id) => {
        const encryptedId = encryptId(id);
        const url = `/profile-candidate-apply?id=${encodeURIComponent(encryptedId)}}`;
        window.open(url, "_blank");
    };
    useEffect(() => {
        if (jobBusiness.length > 0 && !selectedJob) {
            setSelectedJob(jobBusiness[0].jobId);
            handleJobFilter(jobBusiness[0].jobId);
        }
    }, [jobBusiness]);
    const columns = [
        {
            title: 'STT',
            key: 'index',
            align: 'center',
            width: 60,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên ứng viên',
            dataIndex: 'candidate_name',
            key: 'candidate_name',
            ellipsis: true,
            align: 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
            align: 'center',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            ellipsis: true,
            align: 'center',
        },
        {
            title: 'Mức độ phù hợp',
            dataIndex: 'similarity',
            key: 'similarity',
            ellipsis: true,
            align: 'center',
            render: (value) => `${(value * 100).toFixed(2)}%`
        }
,
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
                            onClick={() => handleViewProfile(record.candidate_id)}
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
                            <Title level={2} style={{ marginBottom: 24, textAlign: 'center' }}>Danh sách ứng viên tiềm năng</Title>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <Card>
                                        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
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

                                        </Row>
                                        <Table
                                            columns={columns}
                                            rowKey="id"
                                            dataSource={candidates}
                                            pagination={false}
                                            bordered
                                        />
                                        {/*<ResultsSummary*/}
                                        {/*    totalElements={totalElements}*/}
                                        {/*/>*/}
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
export default AISearchCandidate;