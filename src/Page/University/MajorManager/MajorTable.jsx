import {Button, Modal, Space, Table, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";
const MajorTable = ({data, onInfo, onEdit, onDelete}) => {
    const columns = [
        {title: 'STT', dataIndex: 'stt', key: 'stt', align: 'center', sorter: (a, b) => a.stt - b.stt},
        {title: 'Tên ngành', dataIndex: 'name', key: 'name', align: 'center'},
        {title: 'Mã ngành', dataIndex: 'code', key: 'code', align: 'center'},
        {title: 'Số lượng sinh viên', dataIndex: 'numberStudent', key: 'numberStudent', align: 'center',},
        {title: 'Thao tác', key: 'actions', align: 'center', render: (text, record) => (
                <Space size="small" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Tooltip title="Xem chi tiết">
                        <Button type={"primary"} icon={<EyeOutlined/>} onClick={() => onInfo(record.id)}/>
                    </Tooltip>
                   <Tooltip title="Chỉnh sửa">
                       <Button style={{backgroundColor: "yellow"}} icon={<EditOutlined/>}
                               onClick={() => onEdit(record.id)}/>
                   </Tooltip>
                   <Tooltip title="Xóa">
                       <Button variant={"solid"} color={"danger"} icon={<DeleteOutlined/>}
                               onClick={() => confirmDelete(record)}/>
                   </Tooltip>
                </Space>
            ),
        },
    ];
    const confirmDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa chuyên ngành "${record.name}" ?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                // Gọi API xóa
                onDelete(record.id);
                toast.success(`Xóa chuyên ngành "${record.name}" thành công`);
            },
        });
    };
    return (
        <>
            <Table locale={{emptyText: 'Không tìm thấy kết quả tương ứng.'}} size="small" columns={columns}
                   dataSource={data} pagination={false}
                   rowKey="id"/>
        </>
    )
}
export default MajorTable;