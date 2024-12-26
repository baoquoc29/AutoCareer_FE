import React from "react";
import {Button, Space, Table, Tag, Tooltip} from "antd";
import {EyeOutlined} from "@ant-design/icons";

const JobTable = ({data, onDetail}) => {

    const columns = [{
        title: "STT", dataIndex: "stt", key: "stt", align: "center",
    }, {
        title: "Tin tuyển dụng", dataIndex: "title", key: "title", align: "left",
    }, {
        title: "Doanh nghiệp", dataIndex: "businessName", key: "businessName", align: "left",
    },{
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
