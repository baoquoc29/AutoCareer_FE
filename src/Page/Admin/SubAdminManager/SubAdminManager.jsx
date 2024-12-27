import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Card, Col, Input, Modal, Pagination, Row} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { GET_IMAGE_URI } from "../../../Utils/Setting/Config";
import SubAdminTable from "./SubAdminTable";
import SubAdminDetailModal from "./SubAdminDetailModal";
import SubAdminCreateForm from "./SubAdminCreateForm";
import SubAdminUpdate from "./SubAdminUpdate";
import {
    delete_sub_admin,
    get_all_paging_sub_admin,
    get_detail_sub_admin
} from "../../../Redux/actions/SubAdminThunk";
import ResultSummary from "../../../Component/Paging/ResultsSummary";

const SubAdminManager = () => {
    const dispatch = useDispatch();
    const subAdmins = useSelector((state) => state.SubAdminReducer.subAdmins);
    const [data, setData] = useState([]);
    const [selectedSubAdmin, setSelectedSubAdmin] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalElements = useSelector((state) => state.SubAdminReducer.totalElements);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(get_all_paging_sub_admin(pageNo - 1, pageSize, encodeURIComponent(keyword)));
    }, [dispatch, pageNo, pageSize, keyword]);

    useEffect(() => {
        setData(
            subAdmins.map((item, index) => ({
                ...item,
                stt: (pageNo - 1) * pageSize + index + 1
            }))
        );
    }, [subAdmins, pageNo, pageSize]);

    const handleDetail = (subAdmin) => {
        dispatch(get_detail_sub_admin(subAdmin.id));
        setSelectedSubAdmin(subAdmin);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedSubAdmin(null);
    };

    const handleUpdate = (subAdminId) => {
        const subAdmin = subAdmins.find((item) => item.id === subAdminId);
        setSelectedSubAdmin(subAdmin);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedSubAdmin(null);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc muốn xóa nhân viên này",
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                dispatch(delete_sub_admin(id))
                    .then(() => {
                        toast.success("Xóa quản trị viên thành công");
                        dispatch(get_all_paging_sub_admin(pageNo - 1, pageSize, keyword));
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    });
            },
        });
    };

    const handlePageChange = (page, pageSize) => {
        setPageNo(page);
        setPageSize(pageSize);
    };

    const handleSearch = (e) => {
        setPageNo(1);
        setKeyword(e.target.value);
    };

    const closeCreateModal = async () => {
        setIsCreateModalOpen(false);
        await dispatch(get_all_paging_sub_admin(pageNo - 1, pageSize, keyword));
    }

    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0 ">
                    <div className="content__wrap">
                        <Card title={"Các quản trị viên hệ thống"}>
                            <div className="d-flex justify-content-between mb-3">
                                <Input
                                    placeholder="Nhập tên hoặc email... "
                                    value={keyword}
                                    onChange={handleSearch}
                                    prefix={<SearchOutlined/>}
                                    style={{width: 200}}
                                />
                                <Button
                                    icon={<PlusOutlined/>}
                                    type="primary"
                                    onClick={() => setIsCreateModalOpen(true)}
                                >
                                    Thêm quản trị viên
                                </Button>
                            </div>
                            <div className="table-responsive">
                                <SubAdminTable
                                    data={data}
                                    onInfo={handleDetail}
                                    onEdit={handleUpdate}
                                    onDelete={handleDelete}
                                /></div>
                                <ResultSummary totalElements={totalElements}></ResultSummary>
                                <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                    <Pagination
                                        current={pageNo}
                                        pageSize={pageSize}
                                        total={totalElements}
                                        onChange={handlePageChange}
                                        pageSizeOptions={[7, 10, 20, 50, 100]}
                                        showSizeChanger={true}
                                    />
                                </div>

                                <SubAdminDetailModal
                                    open={isDetailModalOpen}
                                    onClose={closeDetailModal}
                                />

                                <SubAdminCreateForm
                                    open={isCreateModalOpen}
                                    onClose={closeCreateModal}
                                />

                                <SubAdminUpdate
                                    open={isUpdateModalOpen}
                                    onClose={closeUpdateModal}
                                    subAdminData={selectedSubAdmin}
                                />
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SubAdminManager;
