import {Button, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, InfoCircleOutlined} from "@ant-design/icons";

const MajorTable = ({ data, onInfo, onEdit, onDelete }) => {
     const columns = [
         { title: 'STT', dataIndex: 'stt', key: 'stt', sorter: (a, b) => a.stt - b.stt },
         { title: 'Tên ngành', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
         { title: 'Mã ngành', dataIndex: 'code', key: 'code', sorter: (a, b) => a.code.localeCompare(b.code) },
         { title: 'Số lượng sinh viên', dataIndex: 'numberStudent', key: 'numberStudent' },
         {
             title: 'Thao tác', key: 'actions', render: (text, record) => (
                 <Space size="middle">
                     <Button icon={<InfoCircleOutlined />} onClick={() => onInfo(record)}  />
                     <Button color="primary" icon={<EditOutlined />} onClick={() => onEdit(record.id)}  />
                     <Button danger={true} icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
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