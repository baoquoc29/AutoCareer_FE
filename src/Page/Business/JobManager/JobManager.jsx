import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    get_all_job, get_job_detail,
} from "../../../Redux/actions/JobThunk";
import {Button, Card, Input, Pagination} from "antd";
import JobTable from "./JobTable";

import {
    DownloadOutlined, SearchOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import JobDetailModal from "./JobDetailModel";


const JobManager = () => {
    const dispatch = useDispatch();
    const jobTable = useSelector((state) => state.JobReducer.jobs); // Cho Table
    const selectedJobDetail = useSelector((state) => state.JobReducer.selectedJobDetail);
    const totalElements = useSelector((state) => state.JobReducer.totalElements); // Tổng số bản ghi
    const currentPage = useSelector((state) => state.JobReducer.currentPage); // Trang hiện tại
    const pageSize = useSelector((state) => state.JobReducer.pageSize);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);


    useEffect(() => {
        dispatch(get_all_job(currentPage, pageSize));
    }, [dispatch, currentPage, pageSize]);

    useEffect(() => {
        setFilteredData(jobTable);
    }, [jobTable]);

    const handlePageChange = (page, pageSize) => {
        dispatch(get_all_job(page, pageSize)); // Gọi API với trang và kích thước mới
    };

    // const handleDelete = (record) => {
    //     dispatch(delete_industry_by_id(record.key));
    // };

    const handleInfo = (record) => {
        dispatch(get_job_detail(record.id));
        setOpen(true); // Mở modal
    };
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        const filtered = jobTable.filter((job) => job.name.toLowerCase().includes(value.toLowerCase()) || job.description.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filtered);
    };

    const data = Array.isArray(filteredData) ? filteredData.map((job, index) => ({
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
    })) : [];

    const exportToExcel = () => {
        if (filteredData.length === 0) {
            alert("No data to export!");
            return;
        }

        // Chuyển đổi dữ liệu thành định dạng Excel
        const worksheet = XLSX.utils.json_to_sheet(
            filteredData.map((industry) => ({
                "Industry Name": industry.industryName,
                "Industry Code": industry.industryCode,
                "Status": industry.status,
            }))
        );

        // Tạo workbook mới và thêm worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Industries");

        // Xuất file Excel
        XLSX.writeFile(workbook, "Industries.xlsx");
    }
    return (<>
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <section>
                        <div className="container mt-5">
                            <div className="row">
                                {/*<div className="col-md-4 mb-3 border-5">*/}
                                {/*    <IndustryForm selectData={industryOptions} load={setLoad}/>*/}
                                {/*</div>*/}

                                <div className="col-md-12 mb-3">
                                    <Card title="Danh sách Công việc">
                                        <div className="table-responsive">
                                            <div className="d-flex justify-content-between mb-3">
                                                <Input
                                                    placeholder="Search..."
                                                    value={searchText}
                                                    onChange={handleSearch}
                                                    prefix={<SearchOutlined/>}
                                                    style={{width: 200}}
                                                />
                                                <Button
                                                    icon={<DownloadOutlined/>}
                                                    onClick={exportToExcel}
                                                >
                                                    Xuất sang Excel
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
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
        <JobDetailModal
            open={open}
            onClose={() => setOpen(false)}
            job={selectedJobDetail}
        />
    </>);
};
export default JobManager;
