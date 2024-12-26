import React from "react";
import {Button, Space, Table, Tag, Tooltip} from "antd";
import {EyeOutlined} from "@ant-design/icons";

const BusinessTable = ({data, onDetail}) => {

    const columns = [{
        title: "STT", dataIndex: "stt", key: "stt", align: "center",
    }, {
        title: "Tên doanh nghiệp", dataIndex: "name", key: "name", align: "left",
    }, {
        title: "Mã doanh nghiệp", dataIndex: "taxCode", key: "taxCode", align: "left",
    }, {
        title: "Email", dataIndex: "email", key: "email", align: "left",
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
        title: "Hành động", key: "action", align: "center", render: (_, record) => (
            <Space>
                <Tooltip title="Xem chi tiết">
                    <Button type={"primary"} icon={<EyeOutlined />} onClick={() => onDetail(record)} />
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

export default BusinessTable;
