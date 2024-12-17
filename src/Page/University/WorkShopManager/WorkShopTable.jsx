import React from "react";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import {InfoCircleOutlined, EditOutlined, DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const WorkShopTable = ({ workshops, onEdit, onDelete, onView,page,size }) => {
    const columns = [
        {
            title: "STT",
            key: "stt",
            render: (_, __, index) => index + 1 + (page - 1) * size, // Tính số thứ tự dựa trên trang hiện tại
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            sorter: (a, b) => a.title.localeCompare(b.title), // Sắp xếp chuỗi
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startDate",
            key: "startDate",
            sorter: (a, b) =>
                dayjs(a.startDate, "DD/MM/YYYY HH:mm").unix() -
                dayjs(b.startDate, "DD/MM/YYYY HH:mm").unix(),
            render: (startDate) =>
                startDate
                    ? dayjs(startDate, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY")
                    : "N/A",
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "endDate",
            key: "endDate",
            sorter: (a, b) =>
                dayjs(a.endDate, "DD/MM/YYYY HH:mm").unix() -
                dayjs(b.endDate, "DD/MM/YYYY HH:mm").unix(),
            render: (endDate) =>
                endDate
                    ? dayjs(endDate, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY")
                    : "N/A",
        },
        {
            title: "Ngày hết hạn",
            dataIndex: "expireDate",
            key: "expireDate",
            sorter: (a, b) =>
                dayjs(a.expireDate, "DD/MM/YYYY").unix() -
                dayjs(b.expireDate, "DD/MM/YYYY").unix(),
            render: (expireDate) =>
                expireDate
                    ? dayjs(expireDate, "DD/MM/YYYY").format("DD/MM/YYYY")
                    : "N/A",
        },
        {
            title: "Địa điểm",
            dataIndex: "location",
            key: "location",
            render: (location) =>
                location && location.description ? location.description : "N/A",
        },
        {
            title: "Trạng thái",
            dataIndex: "statusBrowse",
            key: "statusBrowse",
            sorter: (a, b) => a.statusBrowse.localeCompare(b.statusBrowse),
            render: (status) => {
                const statusMap = {
                    approved: { color: "green", label: "Đã duyệt" },
                    pending: { color: "orange", label: "Chờ duyệt" },
                    rejected: { color: "red", label: "Từ chối" },
                };

                const normalizedStatus = status.toLowerCase();
                const { color, label } = statusMap[normalizedStatus] || {
                    color: "default",
                    label: "N/A",
                };

                return <Tag color={color}>{label}</Tag>;
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
        <Space size="middle" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Tooltip title="Xem chi tiết ">
                <Button type={"primary"} icon={<EyeOutlined/>} onClick={() => onView(record)}/>
            </Tooltip>
            <Tooltip title=" Chỉnh sửa ">
                <Button style={{backgroundColor: "yellow"}} variant="outlined" icon={<EditOutlined/>}
                        onClick={() => onEdit(record)}/>
            </Tooltip>
            <Tooltip title="Xóa">
                <Button variant={"solid"} color={"danger"} icon={<DeleteOutlined/>}   onClick={() => onDelete(record.id,record.title)}/>
            </Tooltip>
        </Space>
            ),
        },
    ];

    return (
        <Table
            locale={{
                emptyText: "Không tìm thấy kết quả tương ứng."
            }}
            columns={columns}
            dataSource={workshops}
            rowKey="id"
            bordered
            pagination={false} // Vô hiệu hóa phân trang
        />
    );
};

export default WorkShopTable;
