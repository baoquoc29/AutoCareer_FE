import {Button, Modal, Space, Table} from "antd";
import {DeleteOutlined, EyeOutlined, InfoCircleOutlined, ReloadOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";

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
                toast.success("Xóa thành công")
            },
        });
    };
    const columns = [
        {title: 'STT', dataIndex: 'stt', align: 'center', key: 'stt', sorter: (a, b) => a.stt - b.stt},
        {title: 'Mã ngành', dataIndex: 'code', align: 'center', key: 'code', sorter: (a, b) => a.code.localeCompare(b.code)},
        {title: 'Tên ngành', dataIndex: 'name', align: 'center', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name)},
        {title: 'Ngày tạo', dataIndex: 'createAt', align: 'center', key: 'createAt', sorter: (a, b) => a.createAt.localeCompare(b.createAt)},
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
                    <Button type={"primary"}  icon={<EyeOutlined/>} onClick={() => onInfo(record)}
                            disabled={record.status !== 'ACTIVE'}/>
                    {record.status === 'ACTIVE' ? (
                        <Button variant={"solid"} danger={true} color={"danger"} icon={<DeleteOutlined/>} onClick={() => confirmDelete(record)}/>
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