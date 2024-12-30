import React from "react";
import {Button, Space, Table, Tag, Tooltip} from "antd";
import {DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const WorkShopBusinessTable = ({workshops, onDelete, onView, page, size}) => {
        const columns = [
            {
                title: "STT",
                key: "stt",
                align: "center",
                render: (_, __, index) => index + 1 + (page - 1) * size, // Tính số thứ tự dựa trên trang hiện tại
                sorter: (a, b) => a.id - b.id,
                // width: 80, // Adjust the width as needed
                // ellipsis: true, // Optional: Adds ellipsis if the content overflows
            },
            {
                title: <div style={{textAlign: 'center'}}>Tiêu đề</div>, // Center the column header
                dataIndex: "title",
                key: "title",
                sorter: (a, b) => a.title.localeCompare(b.title), // Sắp xếp chuỗi
                render: (text) => (
                    <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {text}
                    </div>
                ),
                // width: 280,
                // ellipsis: true, // Tự động cắt và thêm dấu ba chấm
                align: "left", // Keep the content aligned to the left (or you can use "center" if needed)
            }
            ,
            {
                title: "Ngày bắt đầu",
                dataIndex: "startDate",
                key: "startDate",
                align: "center",
                // width: 150,
                sorter: (a, b) =>
                    dayjs(a.startDate, "DD/MM/YYYY HH:mm").unix() -
                    dayjs(b.startDate, "DD/MM/YYYY HH:mm").unix(),
                render: (startDate) =>
                    startDate
                        ? dayjs(startDate, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY")
                        : "N/A",
                // ellipsis: true,
            },
            {
                title: "Ngày kết thúc",
                dataIndex: "endDate",
                // width: 150,
                align: "center",
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
                // width: 150,
                align: "center",
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
                dataIndex: "province",
                align: "center",
                key: "province",
                render: (province) => (
                    <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {province ? province : "N/A"}
                    </div>
                ),
                // ellipsis: true, // Tự động cắt và thêm dấu ba chấm
            },
            {
                title: "Trạng thái",
                dataIndex: "statusBusiness",
                align: "center",
                key: "statusBusiness",
                // width: 170,
                sorter: (a, b) => a.statusBusiness.localeCompare(b.statusBusiness),
                render: (status) => {

                    const statusMap = {
                        approved: {color: "green", label: "Đã duyệt"},
                        pending: {color: "orange", label: "Chờ duyệt"},
                        rejected: {color: "red", label: "Từ chối"},
                    };

                    const normalizedStatus = status.toLowerCase();
                    const {color, label} = statusMap[normalizedStatus] || {
                        color: "default",
                        label: "N/A",
                    };

                    return <Tag color={color}>{label}</Tag>;
                },
            },
            {
                title: "Hành động",
                align: "center",
                key: "action",
                render: (_, record) => {
                    const isApproved = record.statusBusiness.toLowerCase() === "approved"; // Kiểm tra nếu trạng thái là "approved"
                    return (
                        <Space size="middle" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Tooltip title="Xem chi tiết">
                                <Button
                                    type="primary"
                                    icon={<EyeOutlined/>}
                                    onClick={() => onView(record)}
                                />
                            </Tooltip>
                            <Tooltip title={isApproved ? "Huỷ hợp tác" : "Không thể huỷ khi chưa được duyệt"}>
                                <Button
                                    variant="solid"
                                    color="danger"
                                    icon={<DeleteOutlined/>}
                                    onClick={() => onDelete(record.id, record.title)}
                                    disabled={!isApproved} // Vô hiệu hoá nếu trạng thái không phải "approved"
                                />
                            </Tooltip>

                        </Space>
                    );
                },
            }


        ];

        return (
            <>
                <Table
                    locale={{
                        emptyText: "Không tìm thấy kết quả tương ứng."
                    }}
                    columns={columns}
                    dataSource={workshops}
                    rowKey="id"
                    // bordered
                    pagination={false}
                />
            </>
        );
    }
;
export default WorkShopBusinessTable;
