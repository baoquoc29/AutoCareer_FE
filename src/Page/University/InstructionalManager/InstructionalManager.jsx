import React, {useEffect, useState} from "react";
import {Button, Card, Input, Modal, Pagination} from "antd";
import {DeleteOutlined, FileExcelOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {CSVLink} from "react-csv";
import InstructionalTable from "./InstructionalTable";
import {useDispatch, useSelector} from "react-redux";
import {
    create_instructional,
    delete_instructional,
    get_all_instructional, refund_instructional, stop_instructional
} from "../../../Redux/actions/InstructionalThunk";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import InstructionalCreateModal from "./Modal/InstructionalCreateModal";

const InstructionalManager = () => {
    const dispatch = useDispatch();
    const {instructional = [], totalElements,currentPage,pageSize} = useSelector(state => state.InstructionalReducer);
    const userData = useSelector(state => state.UserReducer.userData);
    const [modalCreate, setModalCreate] = useState(false);
    const [universityId, setUniversityId] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Lưu trữ ID các mục đã chọn
    useEffect(() => {
        dispatch(get_all_instructional(currentPage, pageSize));
    }, [dispatch, currentPage, pageSize]);
    useEffect(() => {
        if (userData && userData["university"]) {
            setUniversityId(userData["university"].id);
        }
    }, [userData]);

    const handlePageChange = (page) => {
        dispatch(get_all_instructional(page, pageSize));
    };
    const handleCreate = async (values) => {
        await dispatch(create_instructional(values));
        dispatch(get_all_instructional(currentPage, pageSize));
        setModalCreate(false);
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
                dispatch(get_all_instructional(currentPage, pageSize)); // Lấy lại danh sách
                setSelectedRowKeys([]); // Reset lại danh sách các ID đã chọn
            },
        });
    };

    return (
        <>
            <section>
                <div className="m-5 mt-5">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <Card style={{textAlign:'center'}} title="Danh sách giáo vụ">
                                <div className="table-responsive">
                                    <div className="d-flex justify-content-between mb-3">
                                        <Input
                                            placeholder="Tìm kiếm theo tên"
                                            prefix={<SearchOutlined/>}
                                            style={{width: 200}}
                                        />
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
                                            >
                                                <CSVLink
                                                    data={""}
                                                    headers={""}
                                                    filename={"DanhSachKhoa.csv"}
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
                                        instructional={instructional}
                                        totalElements={totalElements}
                                        currentPage={currentPage}
                                        pageSize={7}
                                        handlePageChange={handlePageChange}
                                        selectedRowKeys={selectedRowKeys}
                                        setSelectedRowKeys={setSelectedRowKeys}
                                        onDelete={handleDeleteSelected}
                                    />
                                    <ResultSummary totalElements={totalElements}/>
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
                universityId={universityId}
            />
        </>
    );
};

export default InstructionalManager;
