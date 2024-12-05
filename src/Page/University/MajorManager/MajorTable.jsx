import {Button, Space, Table, TablePaginationConfig} from "antd";
import {DeleteOutlined, EditOutlined, InfoCircleOutlined} from "@ant-design/icons";

const MajorTable = ({ data, onInfo, onEdit, onDelete }) => {

     const columns = [
         { title: 'STT', dataIndex: 'stt', key: 'stt', sorter: (a, b) => a.stt - b.stt },
         { title: 'Tên ngành', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
         { title: 'Mã ngành', dataIndex: 'code', key: 'code', sorter: (a, b) => a.code.localeCompare(b.code) },
         { title: 'Số lượng sinh viên', dataIndex: 'numberStudent', key: 'numberStudent' },
         {
             title: 'Thao tác', key: 'actions', render: (text, record) => (
                 <Space size="small">
                     <Button type={"primary"}  icon={<InfoCircleOutlined />} onClick={() => onInfo(record.id)}  />
                     <Button style={{backgroundColor:"yellow"}} icon={<EditOutlined />} onClick={() => onEdit(record.id)}  />
                     <Button variant={"solid"} color={"danger"} icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
                 </Space>
             ),
         },
     ];

    const pagination: TablePaginationConfig = {
        pageSize: 7,
        showQuickJumper: true,
        // showSizeChanger: true
    };
    return (
        <>
            <Table size="small" columns={columns} dataSource={data} pagination={pagination} rowKey={record => record.id} />
        </>
    )
}
export default MajorTable;