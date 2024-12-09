import {Button, Modal, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, InfoCircleOutlined, ReloadOutlined} from "@ant-design/icons";
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
        {title: 'STT', dataIndex: 'stt', align: 'center' , key: 'stt', sorter: (a, b) => a.stt - b.stt},
        {title: 'Tiêu đề', dataIndex: 'title', align: 'center', key: 'title', sorter: (a, b) => a.title.localeCompare(b.title)},
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expireDate',
            key: 'expireDate',
            align: 'center',
            sorter: (a, b) => a.expireDate.localeCompare(b.expireDate)
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (text) => (text === 'ACTIVE' ? 'Hoạt động' : 'Tạm ngưng')
        },
        {
            title: 'Trạng thái duyệt',
            dataIndex: 'statusBrowse',
            align: 'center',
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
            title: 'Thao tác', key: 'actions', align: 'center', render: (text, record) => (
                <Space size="middle">
                    <Button type={"primary"}  icon={<EyeOutlined/>} onClick={() => onInfo(record)}
                            disabled={record.status !== 'ACTIVE'}/>
                    <Button style={{backgroundColor: "yellow"}} variant="outlined" icon={<EditOutlined/>} onClick={() => onEdit(record.id)}/>
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
export default JobTable;