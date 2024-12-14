import {Button, Modal, Space, Table} from "antd";
import {DeleteOutlined, EyeOutlined, ReloadOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";

const IndustryTable = ({data, onInfo, onDelete, onRestore, selectedRows, onSelectChange}) => {

    const confirmDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa ngành nghề "${record.name}" khỏi doanh nghiệp?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                onDelete(record);
                toast.success("Xóa ngành nghề thành công")
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
        {title: 'STT', dataIndex: 'stt', align: 'center', key: 'stt', sorter: (a, b) => a.stt - b.stt},
        {
            title: 'Mã ngành',
            dataIndex: 'code',
            align: 'center',
            key: 'code',
            sorter: (a, b) => a.code.localeCompare(b.code)
        },
        {
            title: 'Tên ngành',
            dataIndex: 'name',
            align: 'center',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createAt',
            align: 'center',
            key: 'createAt',
            sorter: (a, b) => a.createAt.localeCompare(b.createAt),
            render: (text) => formatDateTime(text), // Hiển thị theo định dạng
        },
        // {
        //     title: 'Trạng thái',
        //     dataIndex: 'status',
        //     key: 'status',
        //     sorter: (a, b) => a.status.localeCompare(b.status),
        //     render: (text) => (text === 'ACTIVE' ? 'Hoạt động' : 'Tạm ngưng')
        // },
        {
            title: 'Thao tác', key: 'actions', render: (text, record) => (
                <Space size="middle">
                    <Button type={"primary"} icon={<EyeOutlined/>} onClick={() => onInfo(record)}
                            disabled={record.status !== 'ACTIVE'}/>
                    {record.status === 'ACTIVE' ? (
                        <Button variant={"solid"} danger={true} color={"danger"} icon={<DeleteOutlined/>}
                                onClick={() => confirmDelete(record)}/>
                    ) : (
                        <Button icon={<ReloadOutlined/>} onClick={() => onRestore(record)}/>
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
                    emptyText: "Không có dữ liệu", // Hiển thị khi bảng trống
                }}
            />
        </>
    )
}
export default IndustryTable;