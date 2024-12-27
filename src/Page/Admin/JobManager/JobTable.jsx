import React from "react";
import {Button, Space, Table, Tag, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined, EyeOutlined} from "@ant-design/icons";

const JobTable = ({data, onDetail, onApprove, onReject}) => {

    const columns = [{
        title: "STT", dataIndex: "stt", key: "stt", align: "center",
    }, {
        title: "Tin tuyển dụng", dataIndex: "title", key: "title", align: "left",
    }, {
        title: "Doanh nghiệp", dataIndex: "businessName", key: "businessName", align: "left",
    }, {
        title: "Lĩnh vực", dataIndex: "industryName", key: "industryName", align: "left",
    }, {
        title: "Thời gian hết hạn", dataIndex: "expireDate", key: "expireDate", align: "left",
    }, {
        title: "Thời gian tạo", dataIndex: "createdAt", key: "createdAt", align: "left",
    }, {
        title: "Trạng thái", dataIndex: "state", key: "state", align: "center", render: (state) => {
            let color = "";
            let stateText = "";
            switch (state) {
                case "PENDING":
                    color = "orange";
                    stateText = "Chờ phê duyệt";
                    break;
                case "APPROVED":
                    color = "green";
                    stateText = "Đã chấp nhận";
                    break;
                case "REJECTED":
                    color = "red";
                    stateText = "Bị từ chối";
                    break;
                default:
                    color = "gray";
                    stateText = "Không xác định";
            }
            return <Tag color={color}>{stateText}</Tag>;
        },
    }, {
        title: "Hành động", key: "action", align: "center", render: (_, record) => (<Space>
            <Tooltip title="Xem chi tiết">
                <Button type={"primary"} icon={<EyeOutlined/>} onClick={() => onDetail(record)}/>
            </Tooltip>
            <Tooltip title="Chấp nhận">
                <Button
                    type="default"
                    icon={<CheckOutlined/>}
                    style={{
                        backgroundColor: record?.state.toLowerCase() === "pending"
                            ? 'rgb(31 211 72)' // Màu xanh lá cây nếu là pending
                            : 'rgb(31 211 72)', // Giữ màu nếu không phải pending
                        borderColor: record?.state.toLowerCase() === "pending"
                            ? 'rgb(31 211 72)' // Viền xanh lá cây nếu là pending
                            : 'rgb(31 211 72)', // Giữ viền nếu không phải pending
                        color: 'white', // Chữ màu trắng
                        opacity: record?.state.toLowerCase() !== "pending" ? 0.5 : 1, // Mờ đi khi không phải pending
                    }}
                    disabled={record?.state.toLowerCase() !== "pending"} // Vô hiệu hóa nếu không phải pending
                    onClick={() => onApprove(record)}
                />
            </Tooltip>

            <Tooltip title="Từ chối">
                <Button
                    type="default"
                    icon={<CloseOutlined/>}
                    style={{
                        backgroundColor: (record?.state.toLowerCase() === "pending")
                            ? 'rgb(255, 99, 71)' // Màu đỏ nếu là pending hoặc approved
                            : 'rgb(255, 99, 71)', // Giữ màu nếu không phải pending/approved
                        borderColor: (record?.state.toLowerCase() === "pending")
                            ? 'rgb(255, 99, 71)' // Viền đỏ
                            : 'rgb(255, 99, 71)', // Giữ viền nếu không phải pending/approved
                        color: 'white', // Chữ màu trắng
                        opacity: (record?.state.toLowerCase() !== "pending") ? 0.5 : 1, // Mờ đi khi không phải pending/approved
                    }}
                    disabled={record?.state.toLowerCase() !== "pending"} // Vô hiệu hóa nếu không phải pending hoặc approved
                    onClick={() => onReject(record)}
                />
            </Tooltip>
        </Space>),
    },];

    return (<>
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            locale={{
                emptyText: "Không có dữ liệu", // Hiển thị khi bảng trống
            }}
        />
    </>)
};

export default JobTable;
