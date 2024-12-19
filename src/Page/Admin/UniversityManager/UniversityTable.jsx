import React from "react";
import {Button, Modal, Space, Table, Tag} from "antd";
import {EyeOutlined} from "@ant-design/icons";

const UniversityTable = ({data, onDetail}) => {
    const confirmDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa doanh nghiệp "${record.name}"?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                console.log(`Deleted business: ${record.name}`);
            },
        });
    };

    const columns = [{
        title: "STT", dataIndex: "stt", key: "stt", align: "center",
    }, {
        title: "Tên trường học", dataIndex: "name", key: "name", align: "center",
    }, {
        title: "Email", dataIndex: "email", key: "email", align: "center",
    }, {
        title: "Số điện thoại", dataIndex: "phone", key: "phone", align: "center",
    }, {
        title: "Thời gian tạo", dataIndex: "createdAt", key: "createdAt", align: "center",
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
                <Button type="link" icon={<EyeOutlined/>} title="Xem chi tiết" onClick={() => onDetail(record)}/>
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

export default UniversityTable;
