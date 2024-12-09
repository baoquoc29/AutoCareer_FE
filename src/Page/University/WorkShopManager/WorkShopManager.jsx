import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {delete_work_shop, get_all_workshop_by_university,} from "../../../Redux/actions/WorkShopThunk";
import WorkShopTable from "./WorkShopTable";
import AddWorkShop from "./AddWorkShop";
import WorkShopDetails from "./WorkShopDetails";
import {Button, Card, Input, Modal, Pagination} from "antd";
import EditWorkShop from "./EditWorkShop";


const WorkShopManager = () => {
    const dispatch = useDispatch();
    const workshops = useSelector((state) => state.WorkShopReducer.workshops || []);
    const totalRecords = useSelector((state) => state.WorkShopReducer.totalRecords);
    const [isAdding, setIsAdding] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [viewMode, setViewMode] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const userInfo = JSON.parse(localStorage.getItem("USER_LOGIN")) || {};

    const idUniversity = userInfo.university?.id || null;

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
    }, [dispatch, idUniversity, page, size]); // Add page and size to the dependency array

    // Filter workshops by search keyword and status
    const filteredWorkshops = useMemo(() => {
        return workshops.filter((workshop) => {
            return workshop.title.toLowerCase().includes(searchKeyword.toLowerCase()) ;
        });
    }, [workshops, searchKeyword]);

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

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa hội thảo này?",
            okText: "Xóa",
            cancelText: "Hủy",
            centered: true,
            okButtonProps: { danger: true },
            onOk: async () => {
                try {
                    await dispatch(delete_work_shop(id));
                    await dispatch(get_all_workshop_by_university(idUniversity, page - 1, size)); // Refresh list after deletion
                } catch (error) {
                    console.error("Error deleting workshop:", error);
                    Modal.error({ title: "Xóa thất bại", content: "Đã xảy ra lỗi khi xóa hội thảo." });
                }
            },
        });
    };

    const resetView = () => {
        setSelectedWorkshop(null);
        setViewMode(null);
        setIsAdding(false);
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

    return (
        <Card title="Quản Lý Hội Thảo">
            {viewMode === "details" && selectedWorkshop ? (
                <WorkShopDetails workshop={selectedWorkshop} onBack={resetView} />
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
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <Input
                                        placeholder="Tìm kiếm theo tiêu đề"
                                        onChange={handleSearch}
                                        style={{ width: 200 }}
                                    />

                                </div>
                                <Button type="primary" onClick={() => setIsAdding(true)}>
                                    Thêm Hội Thảo
                                </Button>
                            </div>

                            <WorkShopTable
                                workshops={filteredWorkshops}
                                onEdit={handleViewEdit}
                                onDelete={handleDelete}
                                onView={handleViewDetails}
                            />

                            <Pagination
                                current={page}
                                pageSize={size}
                                total={searchKeyword  ? filteredWorkshops.length : totalRecords} // Adjust total records based on filter
                                onChange={handlePageChange}  // Handle page change
                                showSizeChanger
                                pageSizeOptions={['10', '20', '30']}  // Size options
                                style={{ marginTop: 16, textAlign: "center" }}
                            />

                        </>
                    ) : (
                        <AddWorkShop
                            visible={isAdding}
                            onFinish={resetView}
                            onCancel={resetView}
                        />
                    )}
                </>
            )}
        </Card>
    );
};

export default WorkShopManager;