import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Tabs, Button, Input, Pagination, Card} from "antd";
import {FileExcelOutlined, SearchOutlined} from "@ant-design/icons";
import {
    approved_job,
    get_all_jobs,
    get_approved_jobs,
    get_pending_jobs,
    get_rejected_jobs, rejected_job,
} from "../../../Redux/actions/AdminJobThunk";
import {doc as XLSX} from "prettier";
import {toast} from "react-toastify";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import {CSVLink} from "react-csv";
import JobDetail from "./JobDetail";
import JobTable from "./JobTable";

const AdminJobManager = () => {
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.AdminJobReducer.jobs);
    const totalElements = useSelector((state) => state.AdminJobReducer.totalElements); // Tổng số bản ghi
    const [pageNo, setPageNo] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(10);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [currentTab, setCurrentTab] = useState("Tất cả");
    const [keyword, setKeyword] = useState("");


    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Trả về "N/A" nếu không có ngày giờ
        const date = new Date(dateString);
        const options = {
            hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric',
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date); // Định dạng theo tiếng Việt
    };

    // useEffect(() => {
    //     setFilteredData(jobs || []);
    // }, [jobs]);

    const fetchJobs = async (currentTab) => {
        switch (currentTab) {
            case "Tất cả":
                await dispatch(get_all_jobs(pageNo - 1, pageSize, keyword));
                break;
            case "Chờ duyệt":
                await dispatch(get_pending_jobs(pageNo - 1, pageSize, keyword));
                break;
            case "Đã phê duyệt":
                await dispatch(get_approved_jobs(pageNo - 1, pageSize, keyword));
                break;
            case "Bị từ chối":
                await dispatch(get_rejected_jobs(pageNo - 1, pageSize, keyword));
                break;
            default:
                break;
        }
        console.log(jobs)
    };
    // Fetch data khi thay đổi tab, trang, kích thước trang hoặc keyword
    // useEffect(() => {
    //     fetchJobs();
    // }, [fetchJobs]);
    useEffect(() => {
        setFilteredData(jobs)
    }, [jobs])

    useEffect(() => {
        fetchJobs(currentTab);
    }, [currentTab]);

    const handlePageChange = async (page, pageSize) => {
        setPageNo(page);
        setPageSize(pageSize);
        await fetchJobs(page, pageSize, keyword);
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setKeyword(value);
        await fetchJobs();
    };

    // Dữ liệu hiển thị theo tab
    const data = Array.isArray(filteredData) ? filteredData.map((job, index) => ({
        key: job.jobId || "",
        stt: (pageNo - 1) * pageSize + index + 1,
        title: job.title || "",
        level: job.level || "",
        salary: job.salary || "",
        createdAt: formatDate(job.createdAt) || "",
        createdBy: job.createdBy || "",
        updatedAt: job.updatedAt || "",
        updatedBy: job.updatedBy || "",
        // location: job.workLocation|| "",
        state: job.statusBrowse || "",
        workingTime: job.workingTime || "",
        expireDate: job.expireDate || "",
        benefit: job.benefit || "",
        jobDescription: job.jobDescription || "",
        requirement: job.requirement || "",
        industry: job.industry || "",
        employee: job.employee || "",
        business: job.business || "",
    })) : [];

    const handleViewDetails = (record) => {
        setSelectedJob(record);
    };
    const handleReject = async (req) => {
        console.log(req);
        dispatch(rejected_job(req));
        await fetchJobs(currentTab);
        handleViewDetails(selectedJob);
    };
    const handleApprove = async (req) => {
        console.log(req);
        dispatch(approved_job(req));
        await fetchJobs(currentTab);
        for (let b of filteredData) {
            if (b.key === selectedJob.key) {
                setSelectedJob(b);
            }
        }
        handleViewDetails(selectedJob);
    }
    const handleCloseDetail = () => {
        setSelectedJob(null); // Đóng chi tiết
    };
    const exportToExcel = () => {
        if (filteredData && filteredData.length > 0) {
            // Chuyển dữ liệu thành bảng tính Excel
            const worksheet = XLSX.utils.json_to_sheet(filteredData);
            const adminJobs = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(adminJobs, worksheet, 'Danh sách jobs');

            // Xuất file Excel
            XLSX.writeFile(adminJobs, 'Danh sách doanh nghiệp.xlsx');
        } else {
            // Nếu không có dữ liệu, hiển thị thông báo lỗi
            toast.error("Không có dữ liệu để xuất");
        }
    };

    const tabs = [{label: "Tất cả", key: "Tất cả"}, {label: "Chờ duyệt", key: "Chờ duyệt"}, {
        label: "Đã phê duyệt",
        key: "Đã phê duyệt"
    }, {label: "Bị từ chối", key: "Bị từ chối"},];

    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div className="mt-auto">
                            <div className="row">
                                {selectedJob ? (
                                    <div className="col-md-4 mb-3 border-5">
                                        <JobDetail
                                            job={selectedJob}
                                            onReject={handleReject}
                                            onApprove={handleApprove}
                                            onClose={handleCloseDetail}
                                        />
                                    </div>
                                ) : null}
                                <div className={selectedJob ? "col-md-8 mb-3 mt-3" : "col-md-12 mb-3 mt-3"}>
                                    <Card title="Danh sách tài khoản doanh nghiệp">

                                        <Tabs
                                            defaultActiveKey="Tất cả"
                                            onChange={(key) => setCurrentTab(key)}
                                            items={tabs}
                                        />
                                        <div className="table-responsive">
                                            <div className="d-flex justify-content-between mb-3">
                                                <Input
                                                    placeholder="Nhập tên hoặc email... "
                                                    value={keyword}
                                                    onChange={handleSearch}
                                                    prefix={<SearchOutlined/>}
                                                    style={{width: 200}}
                                                />
                                                <div style={{display: "flex", gap: "10px"}}>
                                                    <Button type="default" icon={<FileExcelOutlined/>} style={{
                                                        backgroundColor: '#107C41',
                                                        color: '#FFFFFF',
                                                        marginLeft: '10px'
                                                    }}>
                                                        <CSVLink
                                                            data={""}
                                                            headers={""}
                                                            filename={"DanhSachKhoa.csv"}
                                                            style={{color: 'inherit', textDecoration: 'none'}}
                                                        >
                                                            Export excel
                                                        </CSVLink>
                                                    </Button>
                                                </div>
                                            </div>

                                            <JobTable data={data} onDetail={handleViewDetails}></JobTable>
                                            <ResultSummary totalElements={totalElements}></ResultSummary>
                                        </div>
                                        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                            <Pagination
                                                current={pageNo}
                                                pageSize={pageSize}
                                                defaultPageSize={10}
                                                defaultCurrent={1}
                                                total={totalElements}
                                                onChange={handlePageChange}
                                                className="text-center mt-5"
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
    )
};

export default AdminJobManager;
