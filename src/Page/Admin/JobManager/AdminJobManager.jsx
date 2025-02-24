import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Input, Pagination, Card, Select, Modal} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {
    approved_job,
    get_all_jobs,
    get_approved_jobs,
    get_pending_jobs,
    get_rejected_jobs, rejected_job
} from "../../../Redux/actions/AdminJobThunk";
import {doc as XLSX} from "prettier";
import {toast} from "react-toastify";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import JobTable from "./JobTable";
import {useNavigate} from "react-router-dom";
import {get_job_detail} from "../../../Redux/actions/JobThunk";
import RejectModal from "../../Modal/RejectModal";

const AdminJobManager = () => {
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.AdminJobReducer.jobs);
    const totalElements = useSelector((state) => state.AdminJobReducer.totalElements); // Tổng số bản ghi
    const [pageNo, setPageNo] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(10);
    const [filteredData, setFilteredData] = useState([]);
    const [currentTab, setCurrentTab] = useState("ALL");
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const {Option} = Select;
    const [jobData, setJobData] = useState({});
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Trả về "N/A" nếu không có ngày giờ
        const date = new Date(dateString);
        const options = {
            hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric',
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date); // Định dạng theo tiếng Việt
    };

    const fetchJobs = async (currentTab) => {
        switch (currentTab) {
            case "ALL":
                await dispatch(get_all_jobs(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "PENDING":
                await dispatch(get_pending_jobs(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "APPROVED":
                await dispatch(get_approved_jobs(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "REJECTED":
                await dispatch(get_rejected_jobs(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            default:
                break;
        }

    };
    useEffect(() => {
        setFilteredData(jobs)
    }, [jobs])

    useEffect(() => {
        fetchJobs(currentTab);
    }, [currentTab]);

    const handlePageChange = async (page, pageSize) => {
        setPageNo(page);
        setPageSize(pageSize);
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setPageNo(1)
        setKeyword(value);
        await fetchJobs();
    };

    // Dữ liệu hiển thị theo tab
    const data = Array.isArray(filteredData) ? filteredData.map((job, index) => ({
        key: job.id || "",
        stt: (pageNo - 1) * pageSize + index + 1,
        title: job.title || "",
        createdAt: formatDate(job.createdAt) || "",
        state: job.statusBrowse || "",
        expireDate: job.expireDate || "",
        industryName: job.industryName || "",
        businessName: job.businessName || "",
    })) : [];

    const handleViewDetails = (record) => {
        // setSelectedJob(record);
        console.log(record)
        dispatch(get_job_detail(record.key));
        navigate("/admin-job-detail");
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

    const handleReject = (data) => {
        setIsRejectModalVisible(true);
        setJobData(data)// Hiển thị modal từ chối
    };
    const closeModalReject = () => {
        setIsRejectModalVisible(false);
    }

    const handleConfirmReject = (message) => {
        Modal.confirm({
            title: 'Xác nhận từ chối',
            content: `Bạn có chắc chắn muốn từ chối tài khoản doanh nghiệp "${jobData?.title}"?`,
            okText: 'Từ chối',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Rejected business: ${jobData.title}`);
                let req = {id: jobData.key, message: message};
                dispatch(rejected_job(req)).then(async () => {
                    await fetchJobs(currentTab);
                })
                setIsRejectModalVisible(false); // Đóng modal
            },
        });
    };
    const handleApproved = (data) => {
        Modal.confirm({
            title: 'Xác nhận phê duyệt',
            content: `Bạn có chắc chắn muốn phê duyệt tin tuyển dụng "${data.title}"?`,
            okText: 'Phê duyệt',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Approved job: ${data.title}`);
                dispatch(approved_job({id: data.key})).then(async () => {
                    await fetchJobs(currentTab);
                })
            },
        });
    }
    const handleChangeTab = (tab) => {
        setCurrentTab(tab);
        setPageNo(1)
    }


    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div className="mt-auto">
                            <div className="row">

                                <div className={"col-md-12 mb-3 mt-3"}>
                                    <Card title="Danh sách tin tuyển dụng">
                                        <div className="table-responsive">
                                            <div className="d-flex justify-content-between mb-3">

                                                <div style={{display: 'flex', gap: '10px'}}>
                                                    <Input
                                                        placeholder="Nhập tiêu đề... "
                                                        value={keyword}
                                                        onChange={handleSearch}
                                                        prefix={<SearchOutlined/>}
                                                        style={{width: 200}}
                                                    />
                                                    <Select
                                                        placeholder="Chọn trạng thái duyệt"
                                                        value={currentTab}
                                                        showSearch
                                                        onChange={(value) => handleChangeTab(value)}
                                                        style={{width: 200}}
                                                        filterOption={(input, option) => {
                                                            const childrenText = String(option.props.children || "");
                                                            return childrenText.toLowerCase().includes(input.toLowerCase());
                                                        }}
                                                    >
                                                        <Option value="ALL">Tất cả trạng thái</Option>
                                                        <Option value="PENDING">Đang chờ duyệt</Option>
                                                        <Option value="APPROVED">Đã chấp nhập</Option>
                                                        <Option value="REJECTED">Bị từ chối</Option>
                                                    </Select>
                                                </div>
                                                {/*<div style={{display: "flex", gap: "10px"}}>*/}
                                                {/*    <Button type="default" icon={<FileExcelOutlined/>} style={{*/}
                                                {/*        backgroundColor: '#107C41',*/}
                                                {/*        color: '#FFFFFF',*/}
                                                {/*        marginLeft: '10px'*/}
                                                {/*    }}>*/}
                                                {/*        <CSVLink*/}
                                                {/*            data={""}*/}
                                                {/*            headers={""}*/}
                                                {/*            filename={"DanhSachKhoa.csv"}*/}
                                                {/*            style={{color: 'inherit', textDecoration: 'none'}}*/}
                                                {/*        >*/}
                                                {/*            Export excel*/}
                                                {/*        </CSVLink>*/}
                                                {/*    </Button>*/}
                                                {/*</div>*/}
                                            </div>

                                            <JobTable data={data} onDetail={handleViewDetails}
                                                      onApprove={handleApproved} onReject={handleReject}></JobTable>
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
            <RejectModal
                open={isRejectModalVisible}
                onClose={closeModalReject}
                handleReject={handleConfirmReject}
            ></RejectModal>
        </>
    )
};

export default AdminJobManager;
