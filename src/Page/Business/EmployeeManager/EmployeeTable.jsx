import {Button, Space, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, InfoCircleOutlined, ReloadOutlined} from "@ant-design/icons";
import React from "react";

const EmployeeTable=({data,onInfo, onEdit, onDetle, onRestore }) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            sorter: (a, b) => a.stt - b.stt // Hiển thị tên dưới dạng liên kết
        },
        {
            title: "Mã nhân viên",
            dataIndex: "codeEmployee",
            key: "codeEmployee",
            sorter: (a, b) => a.codeEmployee.localeCompare(b.codeEmployee),
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (status) => {
                // Gán màu dựa trên trạng thái
                let color = "";
                switch (status.toLowerCase()) {
                    case "active":
                        color = "green";
                        break;
                    case "inactive":
                        color = "volcano";
                        break;
                    default:
                        color = "geekblue"; // Mặc định cho các trạng thái khác
                }

                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()} {/* Viết hoa trạng thái */}
                    </Tag>
                );
            },
        },
        {
            title: 'Thao tác', key: 'actions', render: (text, record) => (
                <Space size="middle">
                    <Button icon={<InfoCircleOutlined/>} onClick={() => onInfo(record)}
                            disabled={record.status !== 'ACTIVE'}/>
                    <Button color="primary" icon={<EditOutlined/>} onClick={() => onEdit(record)}
                            disabled={record.status !== 'ACTIVE'}/>
                    {record.status === 'ACTIVE' ? (
                        <Button danger={true} icon={<DeleteOutlined/>} onClick={() => console.log(record)}/>
                    ) : (
                        <Button icon={<ReloadOutlined/>} onClick={() => onRestore(record)}/>
                    )}
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} />
        </>
    )
}
 export default EmployeeTable;