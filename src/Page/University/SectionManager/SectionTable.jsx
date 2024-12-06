import {DeleteOutlined, EditOutlined, InfoCircleOutlined,} from "@ant-design/icons";
import {Button, Space, Table} from "antd";
import {TablePaginationConfig} from "antd";

const SectionTable = ({sections, onDelete, onInfo, onEdit}) => {
    const columns = [
        {title: 'STT', dataIndex: 'stt', key: 'stt', sorter: (a, b) => a.stt - b.stt},
        {title: 'Tên khoa', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name)},
        {
            title: 'Thao tác', key: 'actions', render: (text, record) => (
                <Space size="small">
                    <Button type={"primary"} icon={<InfoCircleOutlined/>} onClick={() => onInfo(record.id)}/>
                    <Button style={{backgroundColor: "yellow"}} variant="outlined" icon={<EditOutlined/>}
                            onClick={() => onEdit(record.id)}/>
                    <Button variant={"solid"} color={"danger"} icon={<DeleteOutlined/>} onClick={() => {
                        onDelete(record.id);
                    }}/>
                </Space>
            ),
        },
    ];
    const data = sections.map((section, index) => ({
        id: section.id,
        stt: index + 1,
        name: section.name,
        status: section.status,
        description: section.description
    }));

    const pagination:TablePaginationConfig = {
        pageSize: 5,
    }
    return (
        <>
            <Table size='small' columns={columns} dataSource={data} pagination={pagination} rowKey={record => record.id}/>
        </>
    )
}
export default SectionTable;