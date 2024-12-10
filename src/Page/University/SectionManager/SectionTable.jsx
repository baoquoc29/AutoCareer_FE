import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import {Button, Modal, Space, Table, Tooltip} from "antd";
import {TablePaginationConfig} from "antd";

const SectionTable = ({sections, onDelete, onInfo, onEdit}) => {
    const columns = [
        {title: 'STT', dataIndex: 'stt', key: 'stt', align: 'center', sorter: (a, b) => a.stt - b.stt},
        {title: 'Tên khoa', dataIndex: 'name', key: 'name', align: 'center', sorter: (a, b) => a.name.localeCompare(b.name)},
        {title: 'Thao tác', key: 'actions', align: 'center', render: (text, record) => (
                <Space size="middle" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Tooltip title="Xem chi tiết ">
                        <Button type={"primary"} icon={<EyeOutlined/>} onClick={() => onInfo(record.id)}/>
                    </Tooltip>
                    <Tooltip title=" Chỉnh sửa ">
                        <Button style={{backgroundColor: "yellow"}} variant="outlined" icon={<EditOutlined/>}
                                onClick={() => onEdit(record.id)}/>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button variant={"solid"} color={"danger"} icon={<DeleteOutlined/>} onClick={() => {
                            confirmDelete(record);
                        }}/>
                    </Tooltip>
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
    const confirmDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa khoa "${record.name}" ?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                // Gọi API xóa
                onDelete(record.id);
            },
        });
    };
    const pagination: TablePaginationConfig = {
        pageSize: 7,
    }
    return (
        <>
            <Table size='small' columns={columns} dataSource={data} pagination={pagination}
                   rowKey={record => record.id}/>
        </>
    )
}
export default SectionTable;