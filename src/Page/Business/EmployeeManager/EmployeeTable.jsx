import {Button, Space, Table, Tag, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, ReloadOutlined,} from "@ant-design/icons";
import React from "react";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";

const EmployeeTable=({data,onInfo, onEdit, onDetle, onRestore }) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            align: 'center',
        },
        {
            title: "Mã nhân viên",
            dataIndex: "employeeCode",
            key: "employeeCode",
            align: 'left',
        },
        {
            title: "Ảnh",
            dataIndex: "employeeImageId",
            key: "employeeImageId",
            align: 'center',
            render: (employeeImageId) => (
                <img
                    src={employeeImageId ? `${GET_IMAGE_URI}${employeeImageId}` : 'placeholder-avatar.jpg'}
                    alt="Ảnh đại diện"
                    className="img-fluid"
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "2px solid #ccc"
                    }}
                />
            ),
        },
        {
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
            align: 'left',
            render: (name) => {
                return name && name.length > 20 ? `${name.slice(0, 20)} ....` : name;
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: 'left',
            render: (email) => {
                return email && email.length > 40 ? `${email.slice(0, 40)} ....` : email;
            },
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updatedAt",
            key: "updatedAt",
            align: 'left',
            render: (text) => {
                if (!text) return 'N/A'; // Xử lý trường hợp `text` là `null` hoặc `undefined`
                const date = new Date(text);
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
                const year = String(date.getFullYear());

                return `${hours}:${minutes} - ${day}/${month}/${year}`;
            },
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            align: 'left',
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            align: 'left',
            render: (status) => {
                // Gán màu dựa trên trạng thái
                let color = "";
                let statusText = "";

                switch (status.toLowerCase()) {
                    case "active":
                        color = "green";
                        statusText = "Hoạt động"; // Hiển thị "Hoạt động"
                        break;
                    case "inactive":
                        color = "volcano";
                        statusText = "Đã xóa"; // Hiển thị "Không hoạt động"
                        break;
                    default:
                        color = "geekblue"; // Mặc định cho các trạng thái khác
                        statusText = status;
                }

                return (
                    <Tag color={color} key={status}>
                        {statusText} {/* Hiển thị trạng thái với chữ được thay đổi */}
                    </Tag>
                );
            },
        },
        {
            title: 'Thao tác', key: 'actions', align: 'center', render: (text, record) => {
                const isInactive = record.status.toLowerCase() === 'inactive'; // Check if status is inactive
                return (
                    <Space size="small" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Tooltip title="Xem chi tiết">
                            <Button type={"primary"} icon={<EyeOutlined />} onClick={() => onInfo(record)} />
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <Button
                                style={{ backgroundColor: "yellow" }}
                                icon={<EditOutlined />}
                                onClick={() => onEdit(record.id)}
                                disabled={isInactive} // Disable if inactive
                            />
                        </Tooltip>
                        {isInactive ? (
                            <Tooltip title="Khôi phục">
                                <Button style={{ backgroundColor: '#32CD32', color: 'white' }} icon={<ReloadOutlined />} onClick={() => onRestore(record.id)} />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Xóa">
                                <Button variant={"solid"} color={"danger"} icon={<DeleteOutlined />} onClick={() => onDetle(record.id)} />
                            </Tooltip>
                        )}
                    </Space>
                );
            },
        },
    ];
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} rowKey="id" />
        </>
    )
}
 export default EmployeeTable;