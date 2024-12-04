import React from "react";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { InfoCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const WorkShopTable = ({ workshops, onEdit, onDelete, onView }) => {
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id, // Sắp xếp số
        },
        {
            title: "Tiêu Đề",
            dataIndex: "title",
            key: "title",
            sorter: (a, b) => a.title.localeCompare(b.title), // Sắp xếp chuỗi
        },
        {
            title: "Ngày Bắt Đầu",
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
            title: "Ngày Kết Thúc",
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
            title: "Ngày Hết Hạn",
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
            title: "Trạng Thái",
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
            title: "Hành Động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Xem Chi Tiết">
                        <Button
                            icon={<InfoCircleOutlined />}
                            onClick={() => onView(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Chỉnh Sửa">
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => onEdit(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={workshops}
            rowKey="id"
            bordered
            pagination={false} // Vô hiệu hóa phân trang
        />
    );
};

export default WorkShopTable;
