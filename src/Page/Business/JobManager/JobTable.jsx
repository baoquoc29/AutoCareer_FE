import {Button, Modal, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, InfoCircleOutlined, ReloadOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const JobTable = ({data, onInfo, onEdit, onDelete, onRestore}) => {

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
        {title: 'STT', dataIndex: 'stt', key: 'stt', sorter: (a, b) => a.stt - b.stt},
        {title: 'Tiêu đề', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title.localeCompare(b.title)},
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expireDate',
            key: 'expireDate',
            sorter: (a, b) => a.expireDate.localeCompare(b.expireDate)
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (text) => (text === 'ACTIVE' ? 'Hoạt động' : 'Tạm ngưng')
        },
        {
            title: 'Trạng thái duyệt',
            dataIndex: 'statusBrowse',
            key: 'statusBrowse',
            sorter: (a, b) => a.status.localeCompare(b.statusBrowse),
            render: (text) => {
                switch (text) {
                    case 'PENDING':
                        return 'Chờ duyệt';
                    case 'APPROVED':
                        return 'Đã duyệt';
                    case 'REJECTED':
                        return 'Bị từ chối';
                    default:
                        return 'Không xác định';
                }
            }
        },
        {
            title: 'Thao tác', key: 'actions', render: (text, record) => (
                <Space size="middle">
                    <Button icon={<InfoCircleOutlined/>} onClick={() => onInfo(record)}
                            disabled={record.status !== 'ACTIVE'}/>
                    <Button color="primary" icon={<EditOutlined/>} onClick={() => onEdit(record.id)}/>
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
export default JobTable;