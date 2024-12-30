import React, {useEffect, useState} from "react";
import {Button, Card, Input, Modal, Pagination, Select} from "antd";
import "antd/dist/reset.css";
import {DownloadOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";

import {toast} from "react-toastify";
import {NavLink, useNavigate} from "react-router-dom";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import * as XLSX from "xlsx";
import {
    approved_cooperation,
    get_all_cooperation_of_university_page, get_detail_cooperation_business,
    reject_cooperation
} from "../../../Redux/actions/CooperationThunk";
import CooperationTable from "./CooperationTable";
import RejectModal from "../../Modal/RejectModal";

const {Option} = Select;

const CooperationManager = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const list_cooperation = useSelector(state => state.CooperationReducer.cooperation);
    const [selectedCooperation, setSelectedCooperation] = useState(null);
    const [currentPage, setCurrenPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const totalElements = useSelector((state) => state.CooperationReducer.totalElements);
    const [searchText, setSearchText] = useState("");
    const [statusConnected,setstatusConnected] = useState("");
    const [load, setLoad] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);

    useEffect(() => {
        dispatch(get_all_cooperation_of_university_page(currentPage, pageSize, encodeURIComponent(searchText), statusConnected));
        }, [dispatch, currentPage, searchText, pageSize, statusConnected, load]);

    //chinh xem chi tiết doanh nghiệp
    const handleInfo = (id) => {
        // setSelectedCooperation(cooperation);
        dispatch(get_detail_cooperation_business(id))
        navigate(`/cooperation-detail`); // Điều hướng với đối tượng cooperation
    };

    const handlePageChange = (page, pageSize) => {
        setCurrenPage(page);
        setPageSize(pageSize);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        setCurrenPage(1);
    };
    const handleChangeStatusConnected = (value) => {
        setstatusConnected(value);
        setCurrenPage(1);
    }

    //Chap thuan hop tac
    const handleApproveClick = (cooperation) => {
        dispatch(approved_cooperation({idCooperation: cooperation.id}))
            .then(() => {
                toast.success(`Chấp thuận hợp tác doanh nghiệp ${cooperation?.business.name} thành công.`);
                dispatch(get_all_cooperation_of_university_page())
            })
            .catch((error) => {
                toast.error(error.message);
            })

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

    //Tu choi hop tac
    const handleRejectClick = (message) => {
        const data = ({"idCooperation": selectedCooperation.id, "message": message})
        console.log(data);
        dispatch(reject_cooperation(data))
            .then(() => {
                toast.success(`Từ chối doanh nghiệp ${selectedCooperation.business?.name} thành công`)
                dispatch(get_all_cooperation_of_university_page())
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }
    //Xac nhan tu choi
    const clickButtonReject = (cooperation) => {
        setOpenRejectModal(true);
        setSelectedCooperation(cooperation)
    };

    const rejectTextBox = (message) => {
        console.log(message);
        Modal.confirm({
            title: "Xác nhận hợp tác",
            content: `Bạn có chắc muốn hợp tác với doanh nghiệp ${selectedCooperation.business?.name}?`, // Thêm tên doanh nghiệp vào content
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                handleRejectClick(message);
                setOpenRejectModal(false);
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
                                                <div style={{display: 'flex', gap: '10px'}}>
                                                    <Input
                                                        placeholder="Tìm kiếm nhân viên..."
                                                        value={searchText}
                                                        onChange={handleSearch}
                                                        prefix={<SearchOutlined/>}
                                                        style={{width: 400}}
                                                    />
                                                    <Select
                                                        placeholder="Chọn trạng thái duyệt"
                                                        value={statusConnected}
                                                        showSearch
                                                        onChange={(value) => handleChangeStatusConnected(value)}
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
                                                {/* Nút hành động */}
                                                {/*<div style={{display: 'flex', gap: '10px'}}>*/}

                                                {/*    <div className="d-flex">*/}
                                                {/*        <Button*/}
                                                {/*            type="default"*/}
                                                {/*            icon={<DownloadOutlined/>}*/}
                                                {/*            onClick={exportToExcel}*/}
                                                {/*            style={{*/}
                                                {/*                backgroundColor: '#1d8f29',  // Màu xanh lá đậm (Excel)*/}
                                                {/*                borderColor: '#1d8f29',      // Màu viền*/}
                                                {/*                color: 'white',              // Màu chữ*/}
                                                {/*            }}*/}
                                                {/*        >*/}
                                                {/*            Xuất Excel*/}
                                                {/*        </Button>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
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
                handleReject={rejectTextBox}
            ></RejectModal>
        </>
    );
}
export default CooperationManager;