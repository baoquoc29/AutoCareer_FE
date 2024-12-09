import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Input, Modal, Pagination} from "antd";
import {DownloadOutlined, SearchOutlined,} from "@ant-design/icons";
import JobTable from "./JobTable";
import JobDetailModal from "./JobDetailModel";
import * as XLSX from "xlsx";
import {get_all_job_of_business_paging, get_job_detail} from "../../../Redux/actions/JobThunk";
import {NavLink} from "react-router-dom";

const JobManager = () => {
    const dispatch = useDispatch();
    const jobTable = useSelector((state) => state.JobReducer.jobs);
    const selectedJobDetail = useSelector((state) => state.JobReducer.selectedJobDetail);
    const totalElements = useSelector((state) => state.JobReducer.totalElements);
    const currentPage = useSelector((state) => state.JobReducer.currentPage);
    const pageSize = useSelector((state) => state.JobReducer.pageSize);

    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        dispatch(get_all_job_of_business_paging(currentPage, pageSize, ""));
    }, [dispatch, currentPage, pageSize]);

    useEffect(() => {
        setFilteredData(jobTable);
    }, [jobTable]);

    const handlePageChange = (page, pageSize) => {
        dispatch(get_all_job_of_business_paging(page, pageSize, searchText));
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value); // Cập nhật giá trị ô tìm kiếm
        dispatch(get_all_job_of_business_paging(1, pageSize, value)); // Gọi API với từ khóa
    };

    const handleInfo = (record) => {
        dispatch(get_job_detail(record.id));
        setOpen(true);
    };

    const exportToExcel = () => {
        if (filteredData.length === 0) {
            Modal.warning({
                title: "Thông báo",
                content: "Không có dữ liệu để xuất!",
            });
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(filteredData.map((job) => ({
            "Tên Công việc": job.title,
            "Mức lương": job.salary,
            "Thời gian làm việc": job.workingTime,
            "Mô tả": job.jobDescription,
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách công việc");
        XLSX.writeFile(workbook, "DanhSachCongViec.xlsx");
    };

    const data = Array.isArray(filteredData)
        ? filteredData.map((job, index) => ({
            id: job.jobId,
            stt: (currentPage - 1) * pageSize + index + 1,
            title: job.title,
            expireDate: job.expireDate,
            level: job.level,
            salary: job.salary,
            jobDescription: job.jobDescription,
            requirement: job.requirement,
            benefit: job.benefit,
            workingTime: job.workingTime,
            statusBrowse: job.statusBrowse,
            status: job.status,
        }))
        : [];

    return (
        <section className="job-manager-container" style={{padding: "20px"}}>
            <Card title="Danh sách Công việc">
                <div className="mb-3 text-end">

                </div>
                <div className="table-responsive">
                    <div className="d-flex justify-content-between mb-3">
                        <Input
                            placeholder="Search..."
                            value={searchText}
                            onChange={handleSearch}
                            prefix={<SearchOutlined/>}
                            style={{width: 200}}
                        />
                        <Button type="primary" onClick={() => setIsCreateOpen(true)}>
                            <NavLink to={"/job-create"} style={{textDecoration: "none"}}>
                                Tạo Công Việc
                            </NavLink>
                        </Button>
                    </div>

                    <JobTable data={data} onInfo={handleInfo}/>
                </div>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalElements}
                    onChange={handlePageChange}
                    className="text-center mt-5"
                />
            </Card>

            <Button
                type="link"
                icon={<DownloadOutlined/>}
                onClick={exportToExcel}
                style={{marginTop: "10px"}}
            >
                Xuất danh sách công việc
            </Button>
            <JobDetailModal
                open={open}
                onClose={() => setOpen(false)}
                job={selectedJobDetail}
            />
        </section>
    );
};

export default JobManager;
