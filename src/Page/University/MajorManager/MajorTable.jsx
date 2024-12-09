import {Button, Space, Table, TablePaginationConfig, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, InfoCircleOutlined} from "@ant-design/icons";

const MajorTable = ({data, onInfo, onEdit, onDelete}) => {

    const columns = [
        {title: 'STT', dataIndex: 'stt', key: 'stt', align: 'center', sorter: (a, b) => a.stt - b.stt},
        {title: 'Tên ngành', dataIndex: 'name', key: 'name', align: 'center', sorter: (a, b) => a.name.localeCompare(b.name)},
        {title: 'Mã ngành', dataIndex: 'code', key: 'code', align: 'center', sorter: (a, b) => a.code.localeCompare(b.code)},
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
                               onClick={() => onDelete(record.id)}/>
                   </Tooltip>
                </Space>
            ),
        },
    ];

    const pagination: TablePaginationConfig = {
        pageSize: 5,
    };
    return (
        <>
            <Table size="small" columns={columns} dataSource={data} pagination={pagination}
                   rowKey={record => record.id}/>
        </>
    )
}
export default MajorTable;