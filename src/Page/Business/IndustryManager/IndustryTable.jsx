import {Button, Modal, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, InfoCircleOutlined, ReloadOutlined} from "@ant-design/icons";

const IndustryTable = ({data, onInfo, onEdit, onDelete, onRestore}) => {

    const confirmDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa ngành nghề "${record.name}" khỏi doanh nghiệp?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                onDelete(record);
            },
        });
    };
    const columns = [
        {title: 'STT', dataIndex: 'stt', key: 'stt', sorter: (a, b) => a.stt - b.stt},
        {title: 'Mã ngành', dataIndex: 'code', key: 'code', sorter: (a, b) => a.code.localeCompare(b.code)},
        {title: 'Tên ngành', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name)},
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (text) => (text === 'ACTIVE' ? 'Hoạt động' : 'Tạm ngưng')
        },
        {
            title: 'Thao tác', key: 'actions', render: (text, record) => (
                <Space size="middle">
                    <Button icon={<InfoCircleOutlined/>} onClick={() => onInfo(record)}
                            disabled={record.status !== 'ACTIVE'}/>
                    {record.status === 'ACTIVE' ? (
                        <Button danger={true} icon={<DeleteOutlined/>} onClick={() => confirmDelete(record)}/>
                    ) : (
                        <Button icon={<ReloadOutlined/>} onClick={() => onRestore(record)}/>
                    )}
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false}/>
        </>
    )
}
export default IndustryTable;