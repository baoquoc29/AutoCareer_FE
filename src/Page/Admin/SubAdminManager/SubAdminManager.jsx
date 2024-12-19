import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Dropdown, Input, Pagination, Row, Select} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    EyeOutlined, FileExcelOutlined,
    PlusOutlined, SearchOutlined
} from "@ant-design/icons";
import {toast} from "react-toastify";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import SubAdminDetailModal from "./SubAdminDetailModal";
import SubAdminCreateForm from "./SubAdminCreateForm";
import SubAdminUpdate from "./SubAdminUpdate";
import {
    delete_sub_admin,
    get_all_paging_sub_admin,
    get_all_sub_admin,
    get_detail_sub_admin
} from "../../../Redux/actions/SubAdminThunk";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import {CSVLink} from "react-csv";


const SubAdminManager = () => {
    const dispatch = useDispatch();
    const subAdmins = useSelector((state) => state.SubAdminReducer.subAdmins);
    const [data, setData] = useState({});
    const [selectedSubAdmin, setSelectedSubAdmin] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalElements = useSelector((state) => state.SubAdminReducer.totalElements);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(get_all_paging_sub_admin(pageNo - 1, pageSize, keyword));
    }, [dispatch]);

    useEffect(() => {
        setData(subAdmins)
    }, [subAdmins])

    const handleDetail = (subAdminId) => {
        dispatch(get_detail_sub_admin(subAdminId));
        console.log("selected subAdmin", selectedSubAdmin);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedSubAdmin(null);
    };
    const handleUpdate = (subAdmin) => {
        setSelectedSubAdmin(subAdmin);
        console.log("selected subAdmin", selectedSubAdmin);
        setIsUpdateModalOpen(true);
    };
    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedSubAdmin(null);
    };

    const handleDelete = (id) => {
        dispatch(delete_sub_admin(id))
            .then(() => {
                toast.success("Xóa quản trị viên thành công");
                dispatch(get_all_sub_admin());
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    const handlePageChange = async (page, pageSize) => {
        setPageNo(page);
        setPageSize(pageSize);
        await dispatch(get_all_paging_sub_admin(page - 1, pageSize, keyword));
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        await setKeyword(value);
        await dispatch(get_all_paging_sub_admin(pageNo - 1, pageSize, value));
    };
    const menuItems = (subAdmin) => [
        {
            key: "details",
            label: "Xem chi tiết",
            icon: <EyeOutlined/>,
            onClick: () => handleDetail(subAdmin.id),
        },
        {
            key: "edit",
            label: "Chỉnh sửa",
            icon: <EditOutlined/>,
            onClick: () => handleUpdate(subAdmin),
        },
        {
            key: "remove",
            label: "Xóa",
            icon: <DeleteOutlined/>,
            danger: true,
            onClick: () => handleDelete(subAdmin.id),
        },
    ];

    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div
                            className="content__header"
                            style={{
                                padding: "20px",
                                borderRadius: "8px",
                                marginBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <h1 style={{margin: 0, fontSize: "24px", fontWeight: "bold"}}>Quản trị viên</h1>
                                <p style={{margin: 0, fontSize: "14px"}}>Các quản trị viên hiện tại của hệ thống</p>
                            </div>

                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <Input
                                placeholder="Nhập tên hoặc email... "
                                value={keyword}
                                onChange={handleSearch}
                                prefix={<SearchOutlined/>}
                                style={{width: 200}}
                            />
                            <div style={{display: "flex", gap: "10px"}}>
                                <Button icon={<PlusOutlined/>} type="primary"
                                        onClick={() => setIsCreateModalOpen(true)}
                                >
                                    Thêm quản trị viên
                                </Button>
                                <Button type="default" icon={<FileExcelOutlined/>} style={{
                                    backgroundColor: '#107C41',
                                    color: '#FFFFFF',
                                    marginLeft: '10px'
                                }}>
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
                        <Row gutter={[24, 24]}>
                            {data.length > 0 ? (
                                data.map((subAdmin) => (
                                    <Col key={subAdmin.id} xs={24} sm={12} md={8} lg={6}>
                                        <Card
                                            hoverable
                                            style={{
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                                position: "relative", // Ensure relative positioning for absolute children
                                            }}
                                            cover={
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                        paddingTop: "20px",
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}
                                                >
                                                    <img
                                                        src={subAdmin.subAdminImageId
                                                            ? `${GET_IMAGE_URI}${subAdmin.subAdminImageId}`
                                                            : "placeholder-avatar.jpg"}
                                                        alt="Avatar"
                                                        style={{
                                                            width: "80px",
                                                            height: "80px",
                                                            borderRadius: "50%",
                                                            order: "2px solid #f0f2f5",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            }
                                        >
                                            {/* Top-right positioned menu */}
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "10px", // Adjust vertical alignment
                                                    right: "10px", // Adjust horizontal alignment
                                                    zIndex: 1, // Ensure it appears above other elements
                                                }}
                                            >
                                                <Dropdown
                                                    menu={{items: menuItems(subAdmin)}}
                                                    trigger={["click"]}
                                                >
                                                    <EllipsisOutlined style={{fontSize: "20px", cursor: "pointer"}}/>
                                                </Dropdown>
                                            </div>

                                            <Card.Meta
                                                style={{textAlign: "center"}}
                                                title={<span
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "16px"
                                                    }}>{subAdmin.name}</span>}
                                                description={
                                                    <>
                                                        <div style={{color: "#888"}}>
                                                            {subAdmin.email || "No description available"}
                                                        </div>
                                                        <div style={{color: "#888"}}>
                                                            Mã quản trị
                                                            viên: {subAdmin.subAdminCode || "No description available"}
                                                        </div>
                                                    </>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <p>No data available.</p>
                            )}
                        </Row>
                        <ResultSummary totalElements={totalElements}></ResultSummary>
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
                        <SubAdminDetailModal
                            open={isDetailModalOpen}
                            onClose={closeDetailModal}
                        />

                        <SubAdminCreateForm
                            open={isCreateModalOpen}
                            onClose={() => setIsCreateModalOpen(false)}

                        />
                        <SubAdminUpdate
                            open={isUpdateModalOpen}
                            onClose={() => closeUpdateModal()}
                            subAdminData={selectedSubAdmin}
                        /></div>
                </div>
            </section>
        </>
    );
};

export default SubAdminManager;
