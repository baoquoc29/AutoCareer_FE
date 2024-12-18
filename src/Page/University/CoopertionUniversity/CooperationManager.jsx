import React, {useEffect, useState} from "react";
import {Button, Card, Input, Modal, Pagination} from "antd";
import "antd/dist/reset.css";
import {DownloadOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";

import {toast} from "react-toastify";
import {NavLink, useNavigate} from "react-router-dom";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import * as XLSX from "xlsx";
import {get_all_cooperation_of_university_page} from "../../../Redux/actions/CooperationThunk";
import CooperationTable from "./CooperationTable";
import RejectModal from "../../Modal/RejectModal";

const CooperationManager = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const list_cooperation = useSelector(state => state.CooperationReducer.cooperation);
    const [selectedCooperation, setSelectedCooperation] = useState(null);
    const currentPage = useSelector((state) => state.CooperationReducer.currentPage);
    const pageSize = useSelector((state) => state.CooperationReducer.pageSize);
    const keyword = useSelector((state) => state.CooperationReducer.keyword);
    const totalElements = useSelector((state) => state.CooperationReducer.totalElements);
    const [searchText, setSearchText] = useState("");
    const [load, setLoad] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);

    useEffect(() => {
        dispatch(get_all_cooperation_of_university_page(currentPage, pageSize, keyword));
    }, [dispatch, currentPage, pageSize, load]);

    //chinh xem chi tiết doanh nghiệp
    const handleInfo = (id) => {
        const cooperation = list_cooperation.find(c => c.id === id);
        setSelectedCooperation(cooperation);
        navigate(`/cooperation-detail`, {state: {cooperation}}); // Điều hướng với đối tượng cooperation
    };

    const handlePageChange = (page, pageSize) => {
        dispatch(get_all_cooperation_of_university_page(page, pageSize, searchText)); // Gọi API với trang và kích thước mới
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value); // Cập nhật giá trị ô tìm kiếm
        dispatch(get_all_cooperation_of_university_page(1, pageSize, value)); // Gọi API với từ khóa
    };
    //Chap thuan hop tac
    const handleRejectClick= (message)=>{
        const data =  ({"id": selectedCooperation.id, "message": message})
        console.log(data);
        // call api rejected
    }

    //Tu choi hop tac
    const handleApproveClick= (cooperation)=>{


    }
    //Xac nhan hop tac
    const confirmApprove = (cooperation) => {
        Modal.confirm({
            title: "Xác nhận hợp tác",
            content: `Bạn có chắc muốn hợp tác với doanh nghiệp ${cooperation.business?.name}?`, // Thêm tên doanh nghiệp vào content
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                handleApproveClick(cooperation);
            },
        });
    };

    //Xac nhan tu choi
    const clickButtonReject = (cooperation) => {
        setOpenRejectModal(true);
        setSelectedCooperation(cooperation)
    };

    const reject = (message) => {
        console.log(message);
        Modal.confirm({
            title: "Xác nhận hợp tác",
            content: `Bạn có chắc muốn hợp tác với doanh nghiệp ${selectedCooperation.business?.name}?`, // Thêm tên doanh nghiệp vào content
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                handleRejectClick(message);
            },
        });
    }


    const exportToExcel = () => {
        if (list_cooperation.length === 0) {
            alert("No data to export!");
            return;
        }

        // Chuyển đổi dữ liệu thành định dạng Excel
        const worksheet = XLSX.utils.json_to_sheet(
            list_cooperation.map((cooperation) => ({
                "Tên doanh nghiệp": cooperation.business?.name,
                "Website": cooperation.business?.website,
                "Ngày gửi": cooperation.createdAt,
                "Trạng thái": cooperation.statusConnected,
                "Email": cooperation.business?.email,
                "Số điện thoại": cooperation.business?.phone,
            }))
        );

        // Tạo workbook mới và thêm worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

        // Xuất file Excel
        XLSX.writeFile(workbook, "Employees.xlsx");
    }

    const data = Array.isArray(list_cooperation) ? list_cooperation.map((cooperation, index) => ({
        id: cooperation.id,
        idBusiness: cooperation.business?.id,
        business: cooperation.business,
        stt: (currentPage - 1) * pageSize + index + 1,
        businessImageId: cooperation.business?.businessImageId,
        nameBusiness: cooperation.business?.name,
        website: cooperation.business?.website,
        createdAt: cooperation.createdAt,
        statusConnected: cooperation.statusConnected,
    })) : [];
    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div className="mt-auto">
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <Card title="Danh sách hợp tác">
                                        <div className="table-responsive">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                {/* Thanh tìm kiếm */}
                                                <Input
                                                    placeholder="Tìm kiếm hợp tác..."
                                                    value={searchText}
                                                    onChange={handleSearch}
                                                    prefix={<SearchOutlined/>}
                                                    style={{width: 400}}
                                                />

                                                {/* Nút hành động */}
                                                <div className="d-flex">
                                                    <Button
                                                        type="default"
                                                        icon={<DownloadOutlined/>}
                                                        onClick={exportToExcel}
                                                        style={{
                                                            backgroundColor: '#1d8f29',  // Màu xanh lá đậm (Excel)
                                                            borderColor: '#1d8f29',      // Màu viền
                                                            color: 'white',              // Màu chữ
                                                        }}
                                                    >
                                                        Xuất Excel
                                                    </Button>
                                                </div>
                                            </div>

                                            <CooperationTable
                                                data={data}
                                                onInfo={handleInfo}
                                                onApprove={confirmApprove}
                                                onReject={clickButtonReject}
                                            />
                                            <ResultSummary totalElements={totalElements}/>
                                        </div>
                                        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                            <Pagination
                                                current={currentPage} // Gán mặc định nếu currentPage không hợp lệ
                                                pageSize={pageSize}   // Gán mặc định nếu pageSize không hợp lệ
                                                defaultPageSize={7}
                                                defaultCurrent={1}
                                                total={totalElements} // Gán mặc định nếu totalElements không hợp lệ
                                                onChange={handlePageChange}
                                                showSizeChanger={true}
                                                pageSizeOptions={[7, 10, 20, 50, 100]} // Đảm bảo mọi giá trị trong mảng là chuỗi
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
                open={openRejectModal}
                onClose={() => setOpenRejectModal(false)}
                handleReject={reject}
            ></RejectModal>
        </>
    );
}
export default CooperationManager;