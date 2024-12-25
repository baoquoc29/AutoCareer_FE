import React from "react";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { GET_IMAGE_URI } from "../../../Utils/Setting/Config";

const SubAdminTable = ({ data, onInfo, onEdit, onDelete }) => {

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Trả về "N/A" nếu không có ngày giờ
        const date = new Date(dateString);
        const options = {
            hour: '2-digit', minute: '2-digit', second: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric',
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date); // Định dạng theo tiếng Việt
    };
    const columns = [
        {
            title:"STT",
            dataIndex: "stt",
            key: "stt",
            align: 'center', // Giữ căn giữa
        }, {
            title:"Mã quản trị viên",
            dataIndex: "subAdminCode",
            key: "subAdminCode",
            align: 'left', // Giữ căn giữa
        }, {
            title:"Ảnh",
            dataIndex: "subAdminImageId",
            key: "subAdminImageId",
            align: 'center', // Giữ căn giữa
            render: (subAdminImageId) => (
                <img
                    src={subAdminImageId ? `${GET_IMAGE_URI}${subAdminImageId}` : 'placeholder-avatar.jpg'}
                    alt="Ảnh đại diện"
                    className="img-fluid logo-image"
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "2px solid #ccc"
                    }}
                />
            ),
        }, {
            title:"Họ và tên",
            dataIndex: "name",
            key: "name",
            align: 'left', // Căn trái
            render: (name) => {
                return name && name.length > 35 ? `${name.slice(0, 35)} ....` : name;
            },
        }, {
            title:"Email",
            dataIndex: "email",
            key: "email",
            align: 'left', // Căn trái
            render: (email) => {
                return email && email.length > 40 ? `${email.slice(0, 40)} ....` : email;
            },
        }, {
            title: "Thời gian tạo", dataIndex: "createdAt", key: "createdAt", align: "left",
            render: (createdAt) => {
                return formatDate(createdAt);
            }
        }, {
            title:"Trạng thái",
            key: "status",
            dataIndex: "status",
            align: 'center', // Giữ căn giữa
            render: (status) => {
                let color = "";
                let statusText = "";

                switch (status.toLowerCase()) {
                    case "active":
                        color = "green";
                        statusText = "Hoạt động";
                        break;
                    case "inactive":
                        color = "volcano";
                        statusText = "Không hoạt động";
                        break;
                    default:
                        color = "geekblue";
                        statusText = status;
                }

                return (
                    <Tag color={color} key={status}>
                        {statusText}
                    </Tag>
                );
            },
        }, {
            title:"Thao tác",
            key: 'actions',
            align: 'center', // Giữ căn giữa
            render: (text, record) => (
                <Space size="small" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Tooltip title="Xem chi tiết">
                        <Button type={"primary"} icon={<EyeOutlined />} onClick={() => onInfo(record)} />
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <Button style={{ backgroundColor: "yellow" }} icon={<EditOutlined />} onClick={() => onEdit(record.id)} />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button variant={"solid"} color={"danger"} icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];


    return (
        <>
            <Table  columns={columns} dataSource={data} pagination={false} rowKey="id" />
        </>
    );
};

export default SubAdminTable;
