import {Button, Space, Table, Tag, Tooltip} from "antd";
import {
    CheckOutlined,
    CloseOutlined,
    EyeOutlined,

} from "@ant-design/icons";
import React from "react";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import dayjs from "dayjs";

const CooperationTable=({data,onInfo, onApprove, onReject}) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            align: 'center',
            sorter: (a, b) => a.stt - b.stt // Hiển thị tên dưới dạng liên kết
        },
        {
            title: "Ảnh",
            dataIndex: "businessImageId",
            key: "businessImageId",
            align: 'center',
            render: (businessImageId) => (
                <img
                    src={businessImageId ? `${GET_IMAGE_URI}${businessImageId}` : 'placeholder-avatar.jpg'}
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
            title: "Tên doanh nghiệp",
            dataIndex: "nameBusiness",
            key: "nameBusiness",
            align: 'center',
            sorter: (a, b) => a.nameBusiness.localeCompare(b.nameBusiness),
        },
        {
            title: "Website",
            dataIndex: "website",
            key: "website",
            align: 'center',
            sorter: (a, b) => a.website.localeCompare(b.website),
        },
        {
            title: "Ngày gửi",
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (createdAt) => createdAt ? dayjs(createdAt).format("DD/MM/YYYY") : "N/A"
        },
        {
            title: "Trạng thái",
            key: "statusConnected",
            dataIndex: "statusConnected",
            align: 'center',
            render: (statusConnected) => {
                // Gán màu dựa trên trạng thái
                let color = "";
                let statusText = "";

                switch (statusConnected.toLowerCase()) {
                    case "approved":
                        color = "green";
                        statusText = "Đang hợp tác"; // Hiển thị "Hoạt động"
                        break;
                    case "pending":
                        color = "blue";
                        statusText = "Chờ chấp thuận"; // Hiển thị "Không hoạt động"
                        break;
                    case "rejected":
                        color = "volcano";
                        statusText = "Đã từ chối"; // Hiển thị "Không hoạt động"
                        break;
                    default:
                        color = "geekblue"; // Mặc định cho các trạng thái khác
                        statusText = statusConnected;
                }

                return (
                    <Tag color={color} key={statusConnected}>
                        {statusText} {/* Hiển thị trạng thái với chữ được thay đổi */}
                    </Tag>
                );
            },
        },
        {
            title: 'Thao tác',
            key: 'actions',
            align: 'center',
            render: (text, record) => (
                <Space size="small" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Tooltip title="Xem chi tiết">
                        <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            onClick={() => onInfo(record.id)}
                        />
                    </Tooltip>

                    <>
                        <Tooltip title="Chấp nhận">
                            <Button
                                type="default"
                                icon={<CheckOutlined />}
                                style={{
                                    backgroundColor: record.statusConnected.toLowerCase() === "pending"
                                        ? 'rgb(31 211 72)' // Màu xanh lá cây nếu là pending
                                        : 'rgb(31 211 72)', // Giữ màu nếu không phải pending
                                    borderColor: record.statusConnected.toLowerCase() === "pending"
                                        ? 'rgb(31 211 72)' // Viền xanh lá cây nếu là pending
                                        : 'rgb(31 211 72)', // Giữ viền nếu không phải pending
                                    color: 'white', // Chữ màu trắng
                                    opacity: record.statusConnected.toLowerCase() !== "pending" ? 0.5 : 1, // Mờ đi khi không phải pending
                                }}
                                disabled={record.statusConnected.toLowerCase() !== "pending"} // Vô hiệu hóa nếu không phải pending
                                onClick={() => onApprove(record)}
                            />
                        </Tooltip>

                        <Tooltip title="Từ chối">
                            <Button
                                type="default"
                                icon={<CloseOutlined />}
                                style={{
                                    backgroundColor: (record.statusConnected.toLowerCase() === "pending" || record.statusConnected.toLowerCase() === "approved")
                                        ? 'rgb(255, 99, 71)' // Màu đỏ nếu là pending hoặc approved
                                        : 'rgb(255, 99, 71)', // Giữ màu nếu không phải pending/approved
                                    borderColor: (record.statusConnected.toLowerCase() === "pending" || record.statusConnected.toLowerCase() === "approved")
                                        ? 'rgb(255, 99, 71)' // Viền đỏ
                                        : 'rgb(255, 99, 71)', // Giữ viền nếu không phải pending/approved
                                    color: 'white', // Chữ màu trắng
                                    opacity: (record.statusConnected.toLowerCase() !== "pending" && record.statusConnected.toLowerCase() !== "approved") ? 0.5 : 1, // Mờ đi khi không phải pending/approved
                                }}
                                disabled={record.statusConnected.toLowerCase() !== "pending" && record.statusConnected.toLowerCase() !== "approved"} // Vô hiệu hóa nếu không phải pending hoặc approved
                                onClick={() => onReject(record)}
                            />
                        </Tooltip>
                    </>
                </Space>
            ),

        },

    ];
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} rowKey="id" />
        </>
    )
}
 export default CooperationTable;