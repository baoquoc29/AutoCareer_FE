import {Button, Space, Table, Tag, Tooltip} from "antd";
import {
    CloseOutlined,
    EyeOutlined,

} from "@ant-design/icons";
import React from "react";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";

const formatDateTime = (dateString) => {
    if (!dateString) return "Không xác định";
    const date = new Date(dateString);

    // Định dạng thời gian
    const time = date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    // Định dạng ngày
    const day = date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    // Kết hợp giờ và ngày bằng dấu "-"
    return `${time} - ${day}`;
};
const CooperationBusinessTable = ({data, onInfo, onCancelRequest}) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            align: 'center',
        },
        {
            title: "Ảnh",
            dataIndex: "universityImageId",
            key: "universityImageId",
            align: 'center',
            render: (universityImageId) => (
                <img
                    src={universityImageId ? `${GET_IMAGE_URI}${universityImageId}` : 'placeholder-avatar.jpg'}
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
            title: "Tên trường học",
            dataIndex: "universityName",
            key: "universityName",
            align: 'left',
            render: (nameBusiness) => {
                return nameBusiness && nameBusiness.length > 40 ? `${nameBusiness.slice(0, 40)} ....` : nameBusiness;
            },
        },
        {
            title: "Ngày gửi",
            dataIndex: "createAt",
            key: "createAt",
            align: 'left',
            render: (text) => formatDateTime(text), // Sử dụng hàm formatDate
        },
        {
            title: "Trạng thái",
            key: "statusConnected",
            dataIndex: "statusConnected",
            align: 'left',
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
                <Space size="small" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                    <Tooltip title="Xem chi tiết">
                        <Button
                            type="primary"
                            icon={<EyeOutlined/>}
                            onClick={() => onInfo(record.universityId)}
                        />
                    </Tooltip>

                    <>
                        <Tooltip title="Hủy yêu cầu">
                            <Button
                                type="default"
                                icon={<CloseOutlined />}
                                onClick={() => onCancelRequest(record.universityId)} // Thêm hàm xử lý sự kiện
                                style={{
                                    backgroundColor: record.statusConnected.toLowerCase() === "pending" || record.statusConnected.toLowerCase() === "approved"
                                        ? 'rgb(255, 99, 71)' // Màu đỏ nếu là pending hoặc approved
                                        : 'lightgray', // Màu xám nếu không phải pending/approved
                                    borderColor: 'transparent',
                                    color: 'white',
                                    cursor: record.statusConnected.toLowerCase() === "pending" || record.statusConnected.toLowerCase() === "approved"
                                        ? 'pointer'
                                        : 'not-allowed', // Hiển thị con trỏ phù hợp
                                    opacity: record.statusConnected.toLowerCase() === "pending" || record.statusConnected.toLowerCase() === "approved" ? 1 : 0.5, // Làm mờ nút nếu không hoạt động
                                }}
                                disabled={!(record.statusConnected.toLowerCase() === "pending" || record.statusConnected.toLowerCase() === "approved")} // Vô hiệu hóa nút khi không phải pending/approved
                            />
                        </Tooltip>
                    </>
                </Space>
            ),

        },

    ];
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} rowKey="id"/>
        </>
    )
}
export default CooperationBusinessTable;