import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Dropdown, Row, Select} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    EyeOutlined,
    PlusOutlined
} from "@ant-design/icons";
import {toast} from "react-toastify";
import {DOMAIN} from "../../../Utils/Setting/Config";
import SubAdminDetailModal from "./SubAdminDetailModal";
import SubAdminCreateForm from "./SubAdminCreateForm";
import SubAdminUpdate from "./SubAdminUpdate";
import {delete_sub_admin, get_all_sub_admin, get_detail_sub_admin} from "../../../Redux/actions/SubAdminThunk";


const SubAdminManager = () => {
    const dispatch = useDispatch();
    const subAdmins = useSelector((state) => state.SubAdminReducer.subAdmins);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedSubAdmin, setSelectedSubAdmin] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        dispatch(get_all_sub_admin());
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(subAdmins);
    }, [subAdmins]);

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
        <section id="content" className="content" style={{backgroundColor: "#f0f2f5", padding: "20px"}}>
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

                <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined/>}
                        style={{
                            background: "#FF7A00",
                            border: "none",
                            fontWeight: "bold",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Add new user
                    </Button>

                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <span style={{fontSize: "14px"}}>Sort by:</span>
                        <Select
                            defaultValue="date-created"
                            style={{width: 180}}
                            options={[
                                {value: "date-created", label: "Date Created"},
                                {value: "alphabetically", label: "Alphabetically"},
                            ]}
                        />
                        <Button
                            type="default"
                            style={{
                                backgroundColor: "#fff",
                                border: "1px solid #d9d9d9",
                                height: "36px",
                            }}
                        >
                            Filter
                        </Button>
                        <Button
                            style={{
                                backgroundColor: "#fff",
                                border: "1px solid #d9d9d9",
                                height: "36px",
                            }}
                        >
                            <i className="demo-pli-gear fs-5"></i>
                        </Button>
                    </div>
                </div>
            </div>

            <Row gutter={[24, 24]}>
                {filteredData.length > 0 ? (
                    filteredData.map((subAdmin) => (
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
                                                ? `${DOMAIN}/api/v1/image/resource?imageId=${subAdmin.subAdminImageId}`
                                                : "placeholder-avatar.jpg"}
                                            alt="Avatar"
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                borderRadius: "50%",
                                                border: "2px solid #f0f2f5",
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
                                    title={<span style={{fontWeight: "bold", fontSize: "16px"}}>{subAdmin.name}</span>}
                                    description={
                                        <>
                                            <div style={{color: "#888"}}>
                                                {subAdmin.email || "No description available"}
                                            </div>
                                            <div style={{color: "#888"}}>
                                                Mã quản trị viên: {subAdmin.subAdminCode || "No description available"}
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
            />
        </section>
    );
};

export default SubAdminManager;
