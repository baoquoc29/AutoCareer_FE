import React, {useCallback, useEffect, useMemo, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_work_shop, get_all_workshop_by_university } from "../../../Redux/actions/WorkShopThunk";
import WorkShopTable from "./WorkShopTable";
import AddWorkShop from "./AddWorkShop";
import WorkShopDetails from "./WorkShopDetails";
import { Button, Card, Input, Modal, Pagination, Select } from "antd";
import EditWorkShop from "./EditWorkShop";
import { PlusOutlined } from "@ant-design/icons";
import ResultsSummary from "../../../Component/Paging/ResultsSummary";

const { Option } = Select;

const WorkShopManager = () => {
    const dispatch = useDispatch();
    const workshops = useSelector((state) => state.WorkShopReducer.workshops || []);
    const totalRecords = useSelector((state) => state.WorkShopReducer.totalRecords);
    const [isAdding, setIsAdding] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filterStatus, setFilterStatus] = useState(""); // Trạng thái lọc mới
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [viewMode, setViewMode] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(7);

    const userInfo = JSON.parse(localStorage.getItem("USER_LOGIN")) || {};
    const idUniversity = userInfo.university?.id || null;
    const [content, setContent] = useState(""); // State để lưu giá trị content
    // Fetch workshops when dependencies change
    useEffect(() => {
        const fetchWorkshops = async () => {
            if (idUniversity) {
                try {
                    await dispatch(get_all_workshop_by_university(idUniversity, page - 1, size)); // Page is 0-based
                } catch (error) {
                    console.error("Error fetching workshops:", error);
                }
            }
        };
        fetchWorkshops();
    }, [dispatch, idUniversity, page, size]);

    // Filter workshops by search keyword and status
    const filteredWorkshops = useMemo(() => {
        return workshops.filter((workshop) => {
            const matchesKeyword =
                workshop.title &&
                typeof workshop.title === "string" &&
                workshop.title.toLowerCase().includes(searchKeyword.toLowerCase());
            const matchesStatus =
                !filterStatus || workshop.statusBrowse === filterStatus; // Lọc theo trạng thái
            return matchesKeyword && matchesStatus;
        });
    }, [workshops, searchKeyword, filterStatus]);

    const handleViewDetails = (workshop) => {
        setSelectedWorkshop(workshop);
        setViewMode("details");
    };

    const handleViewEdit = (workshop) => {
        setSelectedWorkshop(workshop);
        setViewMode("edit");
    };

    const handleSearch = (e) => {
        setSearchKeyword(e.target.value);
        setPage(1); // Reset to page 1 when searching
    };

    const handleStatusChange = (value) => {
        setFilterStatus(value);
        setPage(1); // Reset trang về 1 khi thay đổi trạng thái
    };
    const handleDelete = async (id, title) => {
        let reason = ""; // Tạo biến nội bộ để quản lý lý do xóa
        Modal.confirm({
            title: "Xác nhận xóa",
            content: (
                <div>
                    <p>
                        Bạn có chắc chắn muốn xóa <strong>{title}</strong>?
                    </p>
                    <Input
                        placeholder="Nhập lý do xóa"
                        onChange={(e) => {
                            reason = e.target.value; // Cập nhật giá trị lý do xóa
                        }}
                    />
                </div>
            ),
            okText: "Xóa",
            cancelText: "Hủy",
            centered: true,
            okButtonProps: { danger: true },
            onOk: async () => {
                if (!reason.trim()) {
                    Modal.warning({
                        title: "Lý do xóa không được để trống",
                    });
                    return Promise.reject(); // Ngăn Modal đóng khi lý do bị trống
                }
                try {
                    // Gửi yêu cầu xóa
                    await dispatch(delete_work_shop(id, reason));
                    // Làm mới danh sách sau khi xóa thành công
                    await dispatch(get_all_workshop_by_university(idUniversity, page - 1, size));
                } catch (error) {
                    console.error("Error deleting workshop:", error);
                    Modal.error({
                        title: "Xóa thất bại",
                        content: "Đã xảy ra lỗi khi xóa hội thảo.",
                    });
                }
            },
        });
    };



    const resetView = async () => {
        setSelectedWorkshop(null);
        setViewMode(null);
        setIsAdding(false);
        await dispatch(get_all_workshop_by_university(idUniversity, page - 1, size));
    };

    const handlePageChange = async (newPage, newSize) => {
        setPage(newPage);
        setSize(newSize);
        try {
            await dispatch(get_all_workshop_by_university(idUniversity, newPage - 1, newSize));
        } catch (error) {
            console.error("Error changing page:", error);
        }
    };

    // Calculate the total records based on whether a search term is applied
    const totalItems = searchKeyword || filterStatus ? filteredWorkshops.length : totalRecords;

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div className="mt-auto">
                        <div className="row">
                            <Card title="Quản lý hội thảo">
                                {viewMode === "details" && selectedWorkshop ? (
                                    <WorkShopDetails workshop={selectedWorkshop} onBack={resetView}/>
                                ) : viewMode === "edit" && selectedWorkshop ? (
                                    <EditWorkShop
                                        visible={true}
                                        workshop={selectedWorkshop}
                                        onCancel={resetView}
                                        onFinish={resetView}
                                    />
                                ) : (
                                    <>
                                        {!isAdding ? (
                                            <>
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    marginBottom: 16
                                                }}>
                                                    <div style={{display: "flex", gap: 8}}>
                                                        <Input
                                                            placeholder="Tìm kiếm theo tiêu đề"
                                                            onChange={handleSearch}
                                                            style={{width: 200}}
                                                        />
                                                        <Select
                                                            placeholder="Chọn trạng thái"
                                                            style={{width: 150}}
                                                            onChange={handleStatusChange}
                                                            allowClear
                                                        >
                                                            <Option value="REJECTED">Từ chối</Option>
                                                            <Option value="APPROVED">Chấp nhận</Option>
                                                            <Option value="PENDING">Chờ duyệt</Option>
                                                        </Select>
                                                    </div>
                                                    <Button icon={<PlusOutlined/>} type="primary"
                                                            onClick={() => setIsAdding(true)}>
                                                        Thêm hội thảo
                                                    </Button>
                                                </div>
                                                <WorkShopTable
                                                    workshops={filteredWorkshops}
                                                    onEdit={handleViewEdit}
                                                    onDelete={handleDelete}
                                                    onView={handleViewDetails}
                                                    page={page}
                                                    size={size}
                                                />
                                                <ResultsSummary totalElements={totalItems} />
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginTop: 16,
                                                    }}
                                                >
                                                        <Pagination
                                                            current={page}
                                                            pageSize={size}
                                                            total={totalItems}
                                                            onChange={handlePageChange}
                                                            pageSizeOptions={[7, 10, 20, 50, 100]}
                                                            showSizeChanger={true}
                                                        />
                                                    </div>

                                            </>
                                        ) : (
                                            <AddWorkShop visible={isAdding} onFinish={resetView} onCancel={resetView}/>
                                        )}
                                    </>
                                )}
                            </Card>

                        </div>
                    </div>
                </div>
            </div>
        </section>
                            );
                            };

                            export default WorkShopManager;
