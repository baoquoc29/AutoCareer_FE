import {EditOutlined, EyeOutlined, ReloadOutlined, StopOutlined} from "@ant-design/icons";
import {Button, Modal, Space, Table, Tooltip} from "antd";
import {statusRender} from "../../../Component/RenderFunctions/RenderFunctions";

const SectionTable = ({
                          sections,
                          onDelete,
                          onInfo,
                          onEdit,
                          currentPage,
                          pageSize,
                          onStop,
                          onRefund,
                          selectedRowKeys,
                          setSelectedRowKeys
                      }) => {
    const showConfirm = (title, content, onConfirm) => {
        Modal.confirm({
            title: title,
            content: content,
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk: onConfirm,
        });
    };
    const columns = [
        {title: 'STT', dataIndex: 'stt', key: 'stt', align: 'center', sorter: (a, b) => a.stt - b.stt},
        {
            title: 'Tên khoa', dataIndex: 'name', key: 'name', align: 'center', render: (text) => {
                if (text && text.length > 30) {
                    return text.slice(0, 30) + '...';  // Cắt tên nếu dài hơn 15 ký tự và thêm "..."
                }
                return text;
            },
            ellipsis: true,  // Dùng ellipsis cho việc hiển thị "..."
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: statusRender,
        },
        {
            title: 'Thao tác', key: 'actions', align: 'center', render: (text, record) => {
                return (
                    <Space size="middle">
                        <Tooltip title="Xem thông tin">
                            <Button type={"primary"} icon={<EyeOutlined/>} onClick={() => onInfo(record.id)}/>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <Button style={{backgroundColor: "yellow"}} variant="outlined" icon={<EditOutlined/>}
                                    onClick={() => onEdit(record.id)} disabled={record.status !== 'ACTIVE'}/>
                        </Tooltip>
                        {record.status === 'ACTIVE' ? (
                            <Tooltip title="Tạm ngưng">
                                <Button variant={"solid"} danger={true} color={"danger"} icon={<StopOutlined/>}
                                        style={{backgroundColor: '#FF8C00', color: 'white'}}
                                        disabled={record.status !== 'ACTIVE'} onClick={() => showConfirm(
                                    'Bạn chắc chắn muốn tạm ngưng?',
                                    'Hành động này sẽ tạm ngưng khoa này.',
                                    () => onStop(record.id)
                                )}/>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Khôi phục">
                                <Button style={{backgroundColor: '#32CD32', color: 'white'}} icon={<ReloadOutlined/>}
                                        onClick={() => showConfirm(
                                            'Bạn chắc chắn muốn khôi phục?',
                                            'Hành động này sẽ khôi phục khoa này.',
                                            () => onRefund(record.id)
                                        )}/>
                            </Tooltip>
                        )}
                    </Space>
                );
            }
        },
    ];

    const data = sections.map((section, index) => ({
        key: section.id,
        id: section.id,
        stt: (currentPage - 1) * pageSize + index + 1,
        name: section.name,
        status: section.status,
        description: section.description
    }));
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };
    return (
        <>
            <Table locale={{emptyText: "Không tìm thấy kết quả tương ứng."}} size='small' columns={columns}
                   dataSource={data} pagination={false}
                   rowSelection={rowSelection} rowKey={record => record.id}/>
        </>
    )
}
export default SectionTable;
