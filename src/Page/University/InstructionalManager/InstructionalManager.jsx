import React, {useEffect, useMemo, useState} from "react";
import {Button, Card, Input, Modal, Pagination, Select} from "antd";
import {DeleteOutlined, FileExcelOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {CSVLink} from "react-csv";
import InstructionalTable from "./InstructionalTable";
import {useDispatch, useSelector} from "react-redux";
import {
    create_instructional,
    delete_instructional, get_all_active_ins,
    get_all_instructional, get_all_stop_ins, refund_instructional, stop_instructional
} from "../../../Redux/actions/InstructionalThunk";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import InstructionalCreateModal from "./Modal/InstructionalCreateModal";
import InstructionalDetailModal from "./Modal/InstructionalDetailModal";
import {get_university_id} from "../../../Redux/actions/UniversityThunk";
import InstructionalEditModal from "./Modal/InstructionalEditModal";
import {toast} from "react-toastify";

const InstructionalManager = () => {
    const dispatch = useDispatch();
    const {
        instructional = [],
        totalElements,
        currentPage = 1,
        pageSize = 7
    } = useSelector(state => state.InstructionalReducer);
    const university = useSelector(state => state.UserReducer.userData?.university);
    const [openDetail, setOpenDetail] = useState(false);// Trạng thái mở modal chi tiết
    const [modalCreate, setModalCreate] = useState(false);
    const [editOpen, setEditOpen] = useState(false);// Trạng thái mở modal chỉnh sửa
    const [selectedInstructional, setSelectedInstructional] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Lưu trữ ID các mục đã chọn
    const [selectedStatus, setSelectedStatus] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    // const [filteredInstructional, setFilteredInstructional] = useState(instructional);

    const filteredInstructional = useMemo(() => {
        return instructional.filter(item =>
            item.name.toLowerCase().trimStart().includes(searchKeyword.toLowerCase().trimStart()) ||
            item.instructionalCode.toLowerCase().trimStart().includes(searchKeyword.toLowerCase().trimStart()) ||
            item.email.toLowerCase().trimStart().includes(searchKeyword.toLowerCase().trimStart()) ||
            item.phone.includes(searchKeyword)
        );
    }, [searchKeyword, instructional]);
    useEffect(() => {
        if (selectedStatus === "active") {
            dispatch(get_all_active_ins(currentPage, pageSize));
        } else if (selectedStatus === "inactive") {
            dispatch(get_all_stop_ins(currentPage, pageSize));
        } else {
            dispatch(get_all_instructional(currentPage, pageSize, selectedStatus, searchKeyword));
        }
    }, [dispatch, currentPage, pageSize, selectedStatus, searchKeyword]);
    useEffect(() => {
        if (university?.id) {
            dispatch(get_university_id(university.id));
        }
    }, [university, dispatch]);

    const handlePageChange = (page) => {
        dispatch(get_all_instructional(page, pageSize));
    };
    const handleCreate = async (values) => {
        await dispatch(create_instructional(values));
        await dispatch(get_all_instructional(currentPage, pageSize));
    };
    const handleStatusChange = (value) => {
        setSelectedStatus(value); // Lưu trạng thái được chọn
        if (value === "active") {
            dispatch(get_all_active_ins(1, pageSize));
        } else if (value === "inactive") {
            dispatch(get_all_stop_ins(1, pageSize));
        } else {
            dispatch(get_all_instructional(1, pageSize, value, searchKeyword));
        }
    };
    const handleStopInstructional = async (id) => {
        await dispatch(stop_instructional(id));
        dispatch(get_all_instructional(currentPage, pageSize));
    };
    const handleRefundInstructional = async (id) => {
        await dispatch(refund_instructional(id))
        dispatch(get_all_instructional(currentPage, pageSize));
    }
    const handleDeleteSelected = async () => {
        if (selectedRowKeys.length === 0) {
            return; // Nếu không có gì được chọn thì không làm gì
        }
        Modal.confirm({
            title: 'Xác nhận xóa vĩnh viễn ',
            content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} giáo vụ đã chọn?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            okButtonProps: {
                style: {
                    backgroundColor: '#FF4D4F', // Màu nền đỏ
                    color: 'white', // Màu chữ trắng
                    borderColor: '#FF4D4F', // Viền đỏ
                }
            },
            onOk: async () => {
                // Gọi API xóa với danh sách các ID đã chọn
                await dispatch(delete_instructional(selectedRowKeys));
                await dispatch(get_all_instructional(currentPage, pageSize)); // Lấy lại danh sách
                setSelectedRowKeys([]); // Reset lại danh sách các ID đã chọn
            },
        });
    };
    const handleInfo = (id) => {
        const ins = instructional.find(s => s.id === id); // Find section by ID
        setSelectedInstructional(ins);
        setOpenDetail(true);
    };
    const handleEdit = (id) => {
        const ins = instructional.find(s => s.id === id); // Find section by ID
        setSelectedInstructional(ins);
        setEditOpen(true);
    };

    const handleEditSubmit = async () => {
        // await dispatch(update_ins(instructional.id, values));
        await dispatch(get_all_instructional(currentPage, pageSize));
    }
    const handleExportClick = () => {
        const dataExport = filteredInstructional.length > 0 ? filteredInstructional : instructional;
        if (dataExport && dataExport.length < 0) {

            toast.error('Không có dữ liệu để xuất');
        } else {
            toast.success('Tải xuống thành công');
        }
    };
    const csvHeader = [
        {label: "Tên", key: "name"},
        {label: "Mã giáo vụ", key: "instructionalCode"},
        {label: "Email", key: "email"},
        {label: "Số điện thoại", key: "phone"},
        {label: "Trạng thái", key: "status"},
        {label: "Địa chỉ", key: "address"},
    ]
    const handleSearch = (e) => {
        const value = e.target.value.trimStart();
        setSearchKeyword(value);

    };
    return (
        <>
            <section>
                <div className="m-5 mt-5">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <Card style={{textAlign: 'center'}} title="Danh sách giáo vụ">
                                <div className="table-responsive">
                                    <div className="d-flex mb-3">
                                        <Input
                                            placeholder="Tìm kiếm "
                                            prefix={<SearchOutlined/>} style={{marginRight: '10px'}}
                                            onChange={handleSearch}
                                        />
                                        <Select
                                            style={{width: 180, marginRight: '10px'}}
                                            placeholder="Trạng thái"
                                            onChange={handleStatusChange}
                                            value={selectedStatus}
                                        >
                                            <Select.Option value="">Tất cả</Select.Option>
                                            <Select.Option value="active">Hoạt động</Select.Option>
                                            <Select.Option value="inactive">Tạm ngưng</Select.Option>
                                        </Select>
                                        <div className="d-flex justify-content-end">

                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                icon={<DeleteOutlined/>}
                                                danger={true} color={"danger"}
                                                onClick={handleDeleteSelected} // Gọi hàm xóa
                                                disabled={selectedRowKeys.length === 0} // Vô hiệu hóa nút nếu không có ID nào được chọn
                                            >
                                                Xóa
                                            </Button>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                icon={<PlusOutlined/>}
                                                onClick={() => setModalCreate(true)}
                                                style={{marginLeft: '10px'}}
                                            >
                                                Thêm
                                            </Button>
                                            <Button
                                                type="default"
                                                icon={<FileExcelOutlined/>}
                                                style={{
                                                    backgroundColor: '#107C41',
                                                    color: '#FFFFFF',
                                                    marginLeft: '10px'
                                                }}
                                                onClick={handleExportClick}
                                            >
                                                <CSVLink
                                                    data={filteredInstructional.length > 0 ? filteredInstructional : instructional}
                                                    headers={csvHeader}
                                                    filename={"DanhSachGiaoVu.csv"}
                                                    style={{color: 'inherit', textDecoration: 'none'}}
                                                >
                                                    Export excel
                                                </CSVLink>
                                            </Button>
                                        </div>
                                    </div>
                                    <InstructionalTable
                                        onRefund={handleRefundInstructional}
                                        onStop={handleStopInstructional}
                                        onInfo={handleInfo}
                                        onEdit={handleEdit}
                                        instructional={filteredInstructional} // Sử dụng dữ liệu đã lọc
                                        totalElements={filteredInstructional.length} // Cập nhật tổng số phần tử
                                        currentPage={currentPage}
                                        pageSize={7}
                                        handlePageChange={handlePageChange}
                                        selectedRowKeys={selectedRowKeys}
                                        setSelectedRowKeys={setSelectedRowKeys}
                                        onDelete={handleDeleteSelected}
                                    />
                                    <ResultSummary
                                        totalElements={searchKeyword ? (filteredInstructional.length > 0 ? filteredInstructional.length : 0) : totalElements}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "50px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Pagination
                                            current={currentPage}
                                            pageSize={pageSize}
                                            total={totalElements}
                                            onChange={handlePageChange}
                                            showSizeChanger={false}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
            <InstructionalCreateModal
                open={modalCreate}
                onClose={() => setModalCreate(false)}
                onCreate={handleCreate}
                uniId={university?.id}
            />
            <InstructionalDetailModal open={openDetail} onClose={() => setOpenDetail(false)}
                                      instructional={selectedInstructional}/>
            <InstructionalEditModal open={editOpen} onClose={() => setEditOpen(false)}
                                    instructional={selectedInstructional} onSubmit={handleEditSubmit}/>
        </>
    );
};

export default InstructionalManager;
