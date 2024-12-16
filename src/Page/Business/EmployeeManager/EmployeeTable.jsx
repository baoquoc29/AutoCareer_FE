import {Button, Space, Table, Tag, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, InfoCircleOutlined, ReloadOutlined} from "@ant-design/icons";
import React from "react";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";

const EmployeeTable=({data,onInfo, onEdit, onDetle, onRestore }) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            align: 'center',
            sorter: (a, b) => a.stt - b.stt // Hiển thị tên dưới dạng liên kết
        },
        {
            title: "Mã nhân viên",
            dataIndex: "employeeCode",
            key: "employeeCode",
            align: 'center',
            sorter: (a, b) => a.employeeCode.localeCompare(b.employeeCode),
        },
        {
            title: "Ảnh",
            dataIndex: "employeeImageId",
            key: "employeeImageId",
            align: 'center',
            render: (employeeImageId) => (
                <img
                    src={`${GET_IMAGE_URI}${employeeImageId}`}
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
        },
        {
            title: "Họ Và Tên",
            dataIndex: "name",
            key: "name",
            align: 'center',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: 'center',
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            align: 'center',
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            align: 'center',
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
                        statusText = "Không hoạt động"; // Hiển thị "Không hoạt động"
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
            title: 'Thao tác', key: 'actions',align: 'center', render: (text, record) => (
                <Space size="small" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Tooltip title="Xem chi tiết">
                        <Button type={"primary"} icon={<EyeOutlined/>} onClick={() => onInfo(record)}/>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <Button style={{backgroundColor: "yellow"}} icon={<EditOutlined/>}
                                onClick={() => onEdit(record.id)}/>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button variant={"solid"} color={"danger"} icon={<DeleteOutlined/>}
                                onClick={() => onDetle(record.id)}/>
                    </Tooltip>
                </Space>
                // <Space size="middle">
                //     <Button icon={<InfoCircleOutlined/>} onClick={() => onInfo(record)}
                //             /*disabled={record.status !== 'ACTIVE'}*//>
                //     <Button color="primary" icon={<EditOutlined/>} onClick={() => onEdit(record)}
                //             disabled={record.status !== 'ACTIVE'}/>
                //     {record.status === 'ACTIVE' ? (
                //         <Button danger={true} icon={<DeleteOutlined/>} onClick={() => onDetle(record.id)}/>
                //     ) : (
                //         <Button icon={<ReloadOutlined/>} onClick={() => onRestore(record)}/>
                //     )}
                // </Space>
            ),
        },
    ];
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} rowKey="id" />
        </>
    )
}
 export default EmployeeTable;