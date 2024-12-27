import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Input, Modal, Pagination, Select} from "antd";
import {PlusOutlined, SearchOutlined,} from "@ant-design/icons";
import JobTable from "./JobTable";
import * as XLSX from "xlsx";
import {get_all_job_of_business_paging, get_job_detail, inactive_job} from "../../../Redux/actions/JobThunk";
import {NavLink} from "react-router-dom";
import ResultsSummary from "../../../Component/Paging/ResultsSummary";
import {get_all_industry_business_no_pag} from "../../../Redux/actions/IndustryThunk";
import DeleteSelectedButton from "../../../Component/DeleteSelectedButton/DeleteSelectedButton";

const {Option} = Select; // Ensure this line is included

const JobManager = () => {
    const dispatch = useDispatch();
    const jobTable = useSelector((state) => state.JobReducer.jobs);
    const totalElements = useSelector((state) => state.JobReducer.totalElements);
    const currentPage = useSelector((state) => state.JobReducer.currentPage);
    const pageSize = useSelector((state) => state.JobReducer.pageSize);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [industryId, setIndustryId] = useState('');
    const [statusBrowse, setStatusBrowse] = useState('');
    const industries = useSelector(state => state.IndustryReducer.industriesNoPag); // assuming industryList holds the industries data
    const [selectedRows, setSelectedRows] = useState([]); // Lưu trữ các bản ghi đã chọn
    const userLogin = JSON.parse(localStorage.getItem("USER_LOGIN")); // Lấy thông tin người dùng
    const role = userLogin?.role.name; // Lấy role từ đối tượng USER_LOGIN

    useEffect(() => {
        dispatch(get_all_job_of_business_paging(currentPage, pageSize, encodeURIComponent(searchText), statusBrowse, industryId));
        dispatch(get_all_industry_business_no_pag());
    }, [dispatch, currentPage, pageSize, searchText, statusBrowse, industryId]);

    useEffect(() => {
        setFilteredData(jobTable);
    }, [jobTable]);

    const handlePageChange = (page, pageSize) => {
        dispatch(get_all_job_of_business_paging(page, pageSize, searchText, statusBrowse, industryId));
    };

    const handleSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedRows(selectedRows); // Cập nhật danh sách bản ghi đã chọn
    };

    const handleDeleteMultiple = async (records) => {
        if (records.length === 0) {
            alert("Chưa chọn bản ghi để xóa!");
            return;
        }
        const idsToDelete = records.map(record => record.key).filter(id => id !== undefined);

        // Sử dụng Promise.all để xóa song song
        try {
            await Promise.all(idsToDelete.map(id => dispatch(inactive_job(id))));
            setSelectedRows([]);
            //toast.success(`Xóa ${records.length} ngành nghề thành công`);
        } catch (error) {
            console.error("Lỗi khi xóa các bản ghi:", error);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value); // Cập nhật giá trị ô tìm kiếm
    };

    const handleInfo = (record) => {
        dispatch(get_job_detail(record.key));
    };

    const exportToExcel = () => {
        if (filteredData.length === 0) {
            Modal.warning({
                title: "Thông báo",
                content: "Không có dữ liệu để xuất!",
            });
            return;
        }

        // Hàm chuyển đổi trạng thái duyệt và trạng thái sang tiếng Việt
        const translateStatus = (status) => {
            switch (status) {
                case "APPROVED":
                    return "Đã duyệt";
                case "PENDING":
                    return "Chờ duyệt";
                case "REJECTED":
                    return "Bị từ chối";
                default:
                    return "Không xác định";
            }
        };

        const translateJobStatus = (status) => {
            switch (status) {
                case "ACTIVE":
                    return "Hoạt động";
                case "INACTIVE":
                    return "Không hoạt động";
                default:
                    return "Không xác định";
            }
        };

        // Chuẩn bị dữ liệu để xuất
        const worksheetData = filteredData.map((job, index) => ({
            "STT": (currentPage - 1) * pageSize + index + 1,
            "Tên Công việc": job.title,
            "Ngày hết hạn": job.expireDate,
            "Cấp bậc": job.level,
            "Mức lương": job.salary,
            "Thời gian làm việc": job.workingTime,
            "Mô tả công việc": job.jobDescription,
            "Yêu cầu công việc": job.requirement,
            "Phúc lợi": job.benefit,
            "Trạng thái duyệt": translateStatus(job.statusBrowse), // Chuyển sang tiếng Việt
            "Trạng thái": translateJobStatus(job.status), // Chuyển sang tiếng Việt
            "Người tạo": job.createBy,
        }));

        // Tạo worksheet từ dữ liệu
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // Tạo workbook và thêm worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách công việc");

        // Xuất file Excel
        XLSX.writeFile(workbook, "DanhSachCongViec.xlsx");
    };

    const data = Array.isArray(filteredData)
        ? filteredData.map((job, index) => ({
            key: job.jobId,
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
                                            <div style={{display: 'flex', gap: '10px'}}>
                                                <Input
                                                    placeholder="Tìm kiếm..."
                                                    value={searchText}
                                                    onChange={handleSearch}
                                                    prefix={<SearchOutlined/>}
                                                    style={{width: 200}}
                                                />
                                                <Select
                                                    placeholder="Chọn ngành nghề"
                                                    value={industryId}
                                                    onChange={(value) => setIndustryId(value)}
                                                    showSearch
                                                    style={{width: 200}}
                                                    filterOption={(input, option) => {
                                                        const childrenText = String(option.props.children || ""); // Chuyển thành chuỗi nếu không phải
                                                        return childrenText.toLowerCase().includes(input.toLowerCase()); // So sánh chữ thường
                                                    }}
                                                >
                                                    <Option value="">Tất cả ngành nghề</Option>
                                                    {industries.map(industry => (
                                                        <Option key={industry.industryId} value={industry.industryId}>
                                                            {industry.industryName} {/* Hiển thị tên ngành nghề */}
                                                        </Option>
                                                    ))}
                                                </Select>
                                                <Select
                                                    placeholder="Chọn trạng thái duyệt"
                                                    value={statusBrowse}
                                                    showSearch
                                                    onChange={(value) => setStatusBrowse(value)}
                                                    style={{width: 200}}
                                                    filterOption={(input, option) => {
                                                        const childrenText = String(option.props.children || ""); // Chuyển thành chuỗi nếu không phải
                                                        return childrenText.toLowerCase().includes(input.toLowerCase()); // So sánh chữ thường
                                                    }}
                                                >
                                                    <Option value="">Tất cả trạng thái</Option>
                                                    <Option value="APPROVED">Đã duyệt</Option>
                                                    <Option value="PENDING">Chờ duyệt</Option>
                                                    <Option value="REJECTED">Bị từ chối</Option>
                                                </Select>
                                            </div>

                                            <div style={{display: "flex", gap: "10px"}}>
                                                {role === "EMPLOYEE" && (
                                                    <Button type="primary" icon={<PlusOutlined />}>
                                                        <NavLink to={"/job-create"} style={{ textDecoration: "none" }}>
                                                            Thêm công việc
                                                        </NavLink>
                                                    </Button>
                                                )}
                                                <DeleteSelectedButton
                                                    selectedRows={selectedRows}
                                                    onDeleteMultiple={handleDeleteMultiple}
                                                />
                                                {/*<Button*/}
                                                {/*    icon={<DownloadOutlined/>}*/}
                                                {/*    onClick={exportToExcel}*/}
                                                {/*    style={{*/}
                                                {/*        backgroundColor: '#1d8f29',  // Màu xanh lá đậm (Excel)*/}
                                                {/*        borderColor: '#1d8f29',      // Màu viền*/}
                                                {/*        color: 'white',              // Màu chữ*/}
                                                {/*    }}*/}
                                                {/*>*/}
                                                {/*    Xuất Excel*/}
                                                {/*</Button>*/}
                                            </div>
                                        </div>

                                        <JobTable
                                            data={data}
                                            onInfo={handleInfo}
                                            onDelete={(jobId) => dispatch(inactive_job(jobId))} // Gọi action
                                            selectedRows={selectedRows}
                                            page={currentPage}
                                            size={pageSize}
                                            onSelectChange={handleSelectChange}
                                        />
                                        <ResultsSummary
                                            totalElements={totalElements}
                                        />
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
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
