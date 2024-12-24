import {Button, Modal, Space, Table, Tooltip} from "antd";
import {DeleteOutlined, EyeOutlined, ReloadOutlined} from "@ant-design/icons";

const IndustryTable = ({data, onInfo, onDelete, onRestore, selectedRows, onSelectChange, page, size}) => {

    const confirmDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa ngành nghề "${record.name}" khỏi doanh nghiệp?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                onDelete(record)
            },
        });
    };

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

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            align: 'center',
            key: 'stt',
            sorter: (a, b) => a.stt - b.stt,
            render: (_, __, index) => index + 1 + (page - 1) * size, // Tính số thứ tự dựa trên trang hiện tại
        },
        {
            title: 'Mã ngành',
            dataIndex: 'code',
            align: 'left',
            key: 'code',
            sorter: (a, b) => a.code.localeCompare(b.code)
        },
        {
            title: 'Tên ngành',
            dataIndex: 'name',
            align: 'left',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createAt',
            align: 'left',
            key: 'createAt',
            sorter: (a, b) => a.createAt.localeCompare(b.createAt),
            render: (text) => formatDateTime(text),
        },
        {
            title: 'Thao tác', key: 'actions', render: (text, record) => (
                <Space size="middle">
                    <Button type={"primary"} icon={<EyeOutlined/>} onClick={() => onInfo(record)}
                            disabled={record.status !== 'ACTIVE'}/>
                    {record.status === 'ACTIVE' ? (
                        <Tooltip title="Xóa ngành nghề">
                            <Button variant={"solid"} danger={true} color={"danger"} icon={<DeleteOutlined/>}
                                    onClick={() => confirmDelete(record)}/>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Khôi phục ngành nghề">
                            <Button icon={<ReloadOutlined/>} onClick={() => onRestore(record)}/>
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                rowSelection={{
                    selectedRowKeys: selectedRows.map(row => row.key),
                    onChange: (selectedRowKeys, selectedRows) => onSelectChange(selectedRowKeys, selectedRows),
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
                locale={{
                    emptyText: "Không có dữ liệu",
                }}
            />
        </>
    )
}

export default IndustryTable;
