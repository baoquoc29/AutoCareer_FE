import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Input, Pagination, Card, Select, Modal} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import UniversityTable from "./UniversityTable";
import UniversityDetail from "./UniversityDetail";
import {
    approved_university,
    get_all_universities,
    get_approved_universities,
    get_detail_university,
    get_pending_universities,
    get_rejected_universities, rejected_university,
} from "../../../Redux/actions/AdminUniversityThunk";
import RejectModal from "../../Modal/RejectModal";

const UniversityManager = () => {
    const dispatch = useDispatch();
    const universities = useSelector((state) => state.AdminUniversityReducer.universities);
    const totalElements = useSelector((state) => state.AdminUniversityReducer.totalElements); // Tổng số bản ghi
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [filteredData, setFilteredData] = useState([]);
    const [currentTab, setCurrentTab] = useState("ALL");
    const [keyword, setKeyword] = useState("");
    const {Option} = Select;
    const [open, setOpen] = useState(false);
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [university, setUniversity] = useState({});
    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Trả về "N/A" nếu không có ngày giờ
        const date = new Date(dateString);
        const options = {
            hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric',
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date); // Định dạng theo tiếng Việt
    };

    const fetchUniversities = (currentTab) => {
        switch (currentTab) {
            case "ALL":
                dispatch(get_all_universities(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "PENDING":
                dispatch(get_pending_universities(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "APPROVED":
                dispatch(get_approved_universities(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            case "REJECTED":
                dispatch(get_rejected_universities(pageNo - 1, pageSize, encodeURIComponent(keyword)));
                break;
            default:
                break;
        }
        console.log(universities)
    };

    useEffect(() => {
        setFilteredData(universities)
    }, [universities])

    useEffect(() => {
        fetchUniversities(currentTab);
    }, [currentTab, pageNo, pageSize, keyword]);

    const handlePageChange = (page, pageSize) => {
        setPageNo(page);
        setPageSize(pageSize);
        fetchUniversities(page, pageSize, keyword);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setPageNo(1);
        setKeyword(value);
        fetchUniversities();
    };

    // Dữ liệu hiển thị theo tab
    const data = Array.isArray(filteredData) ? filteredData.map((university, index) => ({
        key: university.id,
        stt: (pageNo - 1) * pageSize + index + 1,
        name: university.name,
        phone: university.phone,
        email: university.email,
        createdAt: formatDate(university.createdAt),
        universityImageId: university.logoImageId,
        location: university.location,
        state: university?.userAccount?.state,
    })) : [];

    const handleViewDetails = (record) => {
        dispatch(get_detail_university(record.key))
        setOpen(true);
    };
    const handleCloseDetail = async () => {
        setOpen(false);
        await fetchUniversities(currentTab);
    };
    const handleChangeTab = (tab) => {
        setCurrentTab(tab);
        setPageNo(1)
    }

    const handleReject = (data) => {
        setUniversity(data)
        setIsRejectModalVisible(true); // Hiển thị modal từ chối
    };
    const closeModalReject = () => {
        setIsRejectModalVisible(false);
    }

    const handleConfirmReject = (message) => {
        Modal.confirm({
            title: 'Xác nhận từ chối',
            content: `Bạn có chắc chắn muốn từ chối tài khoản trường học "${university.name}"?`,
            okText: 'Từ chối',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Rejected university: ${university.name}`);
                let req = {id: university.key, message: message};
                dispatch(rejected_university(req)).then(async () => {
                    await fetchUniversities(currentTab)
                }) // Gửi lý do từ chối
                setIsRejectModalVisible(false); // Đóng modal
            },
        });
    };

    const handleApproved = (university) => {
        Modal.confirm({
            title: 'Xác nhận phê duyệt',
            content: `Bạn có chắc chắn muốn phê duyệt tài khoản trường học "${university.name}"?`,
            okText: 'Phê duyệt',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Approved university: ${university.name}`);
                dispatch(approved_university({id: university.key})).then(async () => {
                    await fetchUniversities(currentTab)
                });
            },
        });
    }

    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div className="mt-auto">
                            <div className="row">
                                <UniversityDetail
                                    open={open}
                                    onClose={handleCloseDetail}
                                />
                                <div className={"col-md-12 mb-3 mt-3"}>
                                    <Card title="Danh sách tài khoản trường học">
                                        <div className="table-responsive">
                                            <div className="d-flex justify-content-between mb-3">
                                                <div style={{display: 'flex', gap: '10px'}}>
                                                    <Input
                                                        placeholder="Nhập tên hoặc email... "
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
                                            </div>

                                            <UniversityTable data={data} onDetail={handleViewDetails} onReject={handleReject} onApprove={handleApproved}></UniversityTable>
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

export default UniversityManager;
