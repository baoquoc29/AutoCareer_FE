import {Button, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, InfoCircleOutlined, ReloadOutlined} from "@ant-design/icons";

const MajorTable = ({ data, onInfo, onEdit, onDelete, onRestore }) => {
     const columns = [
         { title: 'STT', dataIndex: 'stt', key: 'stt', sorter: (a, b) => a.stt - b.stt },
         { title: 'Tên ngành', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
         { title: 'Mã ngành', dataIndex: 'code', key: 'code', sorter: (a, b) => a.code.localeCompare(b.code) },
         { title: 'Số lượng sinh viên', dataIndex: 'numberStudent', key: 'numberStudent' },
         {
             title: 'Thao tác', key: 'actions', render: (text, record) => (
                 <Space size="middle">
                     <Button icon={<InfoCircleOutlined />} onClick={() => onInfo(record)} disabled={record.status !== 'ACTIVE'} />
                     <Button color="primary" icon={<EditOutlined />} onClick={() => onEdit(record)} disabled={record.status !== 'ACTIVE'} />
                     {record.status === 'ACTIVE' ? (
                         <Button danger={true} icon={<DeleteOutlined />} onClick={() => onDelete(record)} />
                     ) : (
                         <Button icon={<ReloadOutlined />} onClick={() => onRestore(record)} />
                     )}
                 </Space>
             ),
         },
     ];
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} />
        </>
    )
}
export default MajorTable;