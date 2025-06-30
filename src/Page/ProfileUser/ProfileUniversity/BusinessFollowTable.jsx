import React from "react";
import { Button, Space, Table, Tag, Tooltip, Image } from "antd";
import { CloseOutlined, EyeOutlined, UserOutlined, ShoppingOutlined } from "@ant-design/icons";
import { GET_IMAGE_URI } from "../../../Utils/Setting/Config";

const BusinessFollowTable = ({ data,onViewDetail,onUnfollow   }) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            align: "center",
            width: 60,
        },
        {
            title: "Ảnh",
            dataIndex: "imageID",
            key: "imageID",
            align: "center",
            width: 80,
            render: (imageID) => (
                <Image
                    src={`${GET_IMAGE_URI}${imageID}`}
                    alt="Company logo"
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                    preview={false}
                />
            ),
        },
        {
            title: "Tên doanh nghiệp",
            dataIndex: "businessName",
            key: "businessName",
            align: "left",
            render: (businessName, record) => (
                <div>
                    <div style={{ fontWeight: "bold" }}>{businessName}</div>
                    <div style={{ color: "#888" }}>{record.industry}</div>
                </div>
            ),
        },
        {
            title: "Tổng số việc làm",
            dataIndex: "totalJob",
            key: "totalJob",
            align: "center",
            render: (totalJob) => (
                <Space>
                    <ShoppingOutlined />
                    <span>{totalJob}</span>
                </Space>
            ),
        },
        {
            title: "Tổng số người theo dõi",
            dataIndex: "totalFollower",
            key: "totalFollower",
            align: "center",
            render: (totalFollower) => (
                <Space>
                    <UserOutlined />
                    <span>{totalFollower}</span>
                </Space>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            align: "center",
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Xem chi tiết">
                        <Button
                            icon={<EyeOutlined />}
                            size="small"
                            onClick={() => onViewDetail(record.key)} // <-- gọi hàm xử lý
                        />
                    </Tooltip>
                    <Tooltip title="Bỏ theo dõi">
                        <Button
                            icon={<CloseOutlined />}
                            size="small"
                            danger
                            onClick={() => onUnfollow(record.key)}
                        />
                    </Tooltip>

                </Space>
            ),
        }

    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="key"
            locale={{ emptyText: "Không có dữ liệu" }}
        />
    );
};

export default BusinessFollowTable;
