import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card, Input, Modal, Pagination, Select} from "antd";
import {SearchOutlined,} from "@ant-design/icons";
import {get_job_detail} from "../../../Redux/actions/JobThunk";
import ResultsSummary from "../../../Component/Paging/ResultsSummary";
import {cancel_request, get_all_cooperation_of_business} from "../../../Redux/actions/CooperationThunk";
import CooperationBusinessTable from "./CooperationBusinessTable";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const {Option} = Select; // Ensure this line is included

const CooperationBusinessManager = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cooperationList = useSelector((state) => state.CooperationReducer.cooperationBusiness);
    const totalElements = useSelector((state) => state.CooperationReducer.totalElements);
    const currentPage = useSelector((state) => state.CooperationReducer.currentPage);
    const pageSize = useSelector((state) => state.CooperationReducer.pageSize);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [statusConnected, setStatusConnected] = useState();

    useEffect(() => {
        dispatch(get_all_cooperation_of_business(currentPage, pageSize, searchText, statusConnected));
    }, [dispatch, currentPage, pageSize, searchText, statusConnected]);

    useEffect(() => {
        setFilteredData(cooperationList);
    }, [cooperationList]);

    const handlePageChange = (page, pageSize) => {
        dispatch(get_all_cooperation_of_business(page, pageSize, searchText, statusConnected));
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value); // Cập nhật giá trị ô tìm kiếm
    };

    const handleInfo = (id) => {
        // Lưu ID vào localStorage
        localStorage.setItem("universityId", id);

        // Chuyển hướng đến trang chi tiết
        navigate("/cooperation-business-detail");
    };

    const handleCancelRequest = (universityId) => {
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn hủy yêu cầu này không?",
            okText: "Có",
            cancelText: "Không",
            onOk: async () => {
                try {
                    await dispatch(cancel_request(universityId));
                    toast.success("Hủy yêu cầu thành công!");
                    dispatch(get_all_cooperation_of_business(1, pageSize, searchText, statusConnected)); // Cập nhật lại danh sách
                } catch (error) {
                    toast.error("Đã xảy ra lỗi khi hủy yêu cầu!");
                }
            },
        });
    };

    const data = Array.isArray(filteredData)
        ? filteredData.map((cooperation, index) => ({
            key: cooperation.id,
            stt: (currentPage - 1) * pageSize + index + 1,
            businessId: cooperation.businessId,
            businessName: cooperation.businessName,
            universityId: cooperation.universityId,
            universityName: cooperation.universityName,
            universityImageId: cooperation.universityImageId,
            statusConnected: cooperation.statusConnected,
            status: cooperation.status,
            createAt: cooperation.createAt,
            createBy: cooperation.createBy,
            updateAt: cooperation.updateAt,
            updateBy: cooperation.updateBy,
        }))
        : [];

    return (<>
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div className="mt-auto">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <Card title="Danh sách yêu cầu">
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
                                                    placeholder="Chọn trạng thái duyệt"
                                                    value={statusConnected}
                                                    showSearch
                                                    onChange={(value) => setStatusConnected(value)}
                                                    style={{width: 200}}
                                                    filterOption={(input, option) => {
                                                        const childrenText = String(option.props.children || ""); // Chuyển thành chuỗi nếu không phải
                                                        return childrenText.toLowerCase().includes(input.toLowerCase()); // So sánh chữ thường
                                                    }}
                                                >
                                                    <Option value="">Tất cả trạng thái</Option>
                                                    <Option value="PENDING">Chờ chấp thuận</Option>
                                                    <Option value="APPROVED">Đang hợp tác</Option>
                                                    <Option value="REJECTED">Đã từ chối</Option>
                                                </Select>
                                            </div>
                                        </div>

                                        <CooperationBusinessTable
                                            data={data}
                                            onInfo={handleInfo}
                                            page={currentPage}
                                            onCancelRequest={handleCancelRequest}
                                            size={pageSize}
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

export default CooperationBusinessManager;
