import {DeleteOutlined, EditOutlined, InfoCircleOutlined,} from "@ant-design/icons";
import {Button, Space, Table} from "antd";

const SectionTable = ({ sections,onDelete }) => {
    const columns = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', sorter: (a, b) => a.stt - b.stt },
        { title: 'Tên khoa', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
        {title: 'Thao tác', key: 'actions', render: (text, record) => (
                <Space size="small">
                    <Button type={"primary"} icon={<InfoCircleOutlined />} onClick={() => console.log('info:', record)}  />
                    <Button style={{backgroundColor:"yellow"}} variant="outlined" icon={<EditOutlined />} onClick={() => console.log('edit:', record)}  />
                    <Button variant={"solid"} color={"danger"} icon={<DeleteOutlined />} onClick={() => {
                        console.log('delete:', record); // Log kiểm tra record
                        onDelete(record.key);
                    }} />
                </Space>
            ),
        },
    ];
    const data = sections.map((section, index) => ({
        key: section.id,
        stt: index + 1,
        name: section.name,
        status: section.status,
        description: section.description
    }));
    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} />
        </>
    )
}
export default SectionTable;