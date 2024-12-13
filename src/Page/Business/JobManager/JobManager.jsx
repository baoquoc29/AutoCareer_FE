import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Input, Modal, Pagination} from "antd";
import {FileExcelOutlined, PlusOutlined, SearchOutlined,} from "@ant-design/icons";
import JobTable from "./JobTable";
import * as XLSX from "xlsx";
import {get_all_job_of_business_paging, get_job_detail, inactive_job} from "../../../Redux/actions/JobThunk";
import {NavLink} from "react-router-dom";
import ResultsSummary from "../../../Component/Paging/ResultsSummary"; // Import component mới

const JobManager = () => {
    const dispatch = useDispatch();
    const jobTable = useSelector((state) => state.JobReducer.jobs);
    const totalElements = useSelector((state) => state.JobReducer.totalElements);
    const currentPage = useSelector((state) => state.JobReducer.currentPage);
    const pageSize = useSelector((state) => state.JobReducer.pageSize);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);

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
            createBy: job.createBy
        }))
        : [];

    return (<>
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div className="mt-auto">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <Card title="Danh sách công việc">
                                    <div className="table-responsive">
                                        <div className="d-flex justify-content-between mb-3">
                                            <Input
                                                placeholder="Tìm kiếm..."
                                                value={searchText}
                                                onChange={handleSearch}
                                                prefix={<SearchOutlined/>}
                                                style={{width: 200}}
                                            />
                                            <div style={{display: "flex", gap: "10px"}}>
                                                <Button type="primary" icon={<PlusOutlined/>}>
                                                    <NavLink to={"/job-create"} style={{textDecoration: "none"}}>
                                                        Thêm công việc
                                                    </NavLink>
                                                </Button>
                                                <Button
                                                    icon={<FileExcelOutlined/>}
                                                    onClick={exportToExcel}
                                                >
                                                    Xuất Excel
                                                </Button>
                                            </div>
                                        </div>

                                        <JobTable
                                            data={data}
                                            onInfo={handleInfo}
                                            onDelete={(jobId) => dispatch(inactive_job(jobId))} // Gọi action
                                        />
                                        <ResultsSummary
                                            totalElements={totalElements}
                                        />
                                    </div>
                                    <div style={{display: "flex",justifyContent:"center", marginTop: "10px"}}>
                                        <Pagination
                                            current={currentPage}
                                            pageSize={pageSize}
                                            defaultPageSize={7}
                                            defaultCurrent={1}
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
    </>);
};

export default JobManager;
