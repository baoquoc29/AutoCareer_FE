import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    delete_industry_by_id,
    get_all_industry,
    get_all_industry_business,
    get_industry_detail
} from "../../../Redux/actions/IndustryThunk";
import {Button, Card, Input, Pagination} from "antd";
import IndustryTable from "./IndustryTable";
import IndustryForm from "./IndustryForm";
import IndustryDetailModal from "./IndustryDetailModel"; // Import Modal mới

import {
    DownloadOutlined, SearchOutlined,
} from "@ant-design/icons";
import {doc as XLSX} from "prettier";


const IndustryManager = () => {
    const dispatch = useDispatch();
    const industryTable = useSelector((state) => state.IndustryReducer.industries); // Cho Table
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const industryOptions = useSelector((state) => state.IndustryReducer.industryOptions); // Cho Select
    const totalElements = useSelector((state) => state.IndustryReducer.totalElements); // Tổng số bản ghi
    const currentPage = useSelector((state) => state.IndustryReducer.currentPage); // Trang hiện tại
    const pageSize = useSelector((state) => state.IndustryReducer.pageSize);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);


    useEffect(() => {
        dispatch(get_all_industry_business(currentPage, pageSize));
        dispatch(get_all_industry());
    }, [dispatch, currentPage, pageSize, load]);

    useEffect(() => {
        setFilteredData(industryTable);
    }, [industryTable]);


    useEffect(() => {
        if (selectedIndustry) {
            dispatch(get_industry_detail(selectedIndustry.id));
        }
    }, [dispatch]);

    const handlePageChange = (page, pageSize) => {
        dispatch(get_all_industry_business(page, pageSize)); // Gọi API với trang và kích thước mới
    };

    const handleDelete = (record) => {
        dispatch(delete_industry_by_id(record.key));
    };

    const handleInfo = (record) => {
        setSelectedIndustry(record); // Set only the id of the selected industry
        setOpen(true) // Fetch the industry details
    };
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        const filtered = industryTable.filter((industry) => industry.name.toLowerCase().includes(value.toLowerCase()) || industry.description.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filtered);
    };


    const data = Array.isArray(filteredData) ? filteredData.map((industry, index) => ({
        key: industry.id,
        stt: (currentPage - 1) * pageSize + index + 1,
        name: industry.industryName,
        code: industry.industryCode,
        status: industry.status,
        createdAt: industry.createAt,
        createdBy: industry.createBy,
        updatedAt: industry.updateAt,
        updatedBy: industry.updateBy,
    })) : [];

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sections");
        XLSX.writeFile(workbook, "Sections.xlsx");
    };
    return (<>
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <section>
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-md-4 mb-3 border-5">
                                    <IndustryForm selectData={industryOptions} load={setLoad}/>
                                </div>

                                <div className="col-md-8 mb-3">
                                    <Card title="Danh sách Ngành nghề">
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
                                            <IndustryTable data={data} onInfo={handleInfo} onDelete={handleDelete}/>
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
        <IndustryDetailModal
            open={open}
            onClose={() => setOpen(false)}
            industry={selectedIndustry}
        />
    </>);
};
export default IndustryManager;
