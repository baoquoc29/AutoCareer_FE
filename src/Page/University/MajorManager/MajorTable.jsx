import {Button, Modal, Space, Table, Tooltip} from "antd";
import {EditOutlined, EyeOutlined, ReloadOutlined, StopOutlined} from "@ant-design/icons";
import {statusRender} from "../../../Component/RenderFunctions/RenderFunctions";

const MajorTable = ({
                        data,
                        onInfo,
                        onEdit,
                        onDelete,
                        onStop,
                        onRefund,
                        selectedRowKeys,
                        setSelectedRowKeys,
                        sections
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
        {title: 'STT', dataIndex: 'stt', key: 'stt', align: 'center',width: 50},
        {
            title: 'Khoa', // Cột cho tên khoa
            dataIndex: 'sectionName', // Sử dụng sectionName trong data
            key: 'sectionName',
            align: 'center',
            render: (text, record) => {
                // Tìm tên khoa dựa trên sectionId
                const section = sections.find(section => section.id === record.sectionId);
                return section ? section.name : 'Không có thông tin';
            },
            ellipsis: true,
            width: 100,
        },
        {title: 'Tên ngành', dataIndex: 'name', key: 'name', align: 'center', ellipsis: true},
        {title: 'Mã ngành', dataIndex: 'code', key: 'code', align: 'center'},
        {title: 'Số sinh viên', dataIndex: 'numberStudent', key: 'numberStudent', align: 'center',},
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
                    <Space size="small">
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
                                    'Hành động này sẽ tạm ngưng chuyên ngành này.',
                                    () => onStop(record.id)
                                )}/>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Khôi phục">
                                <Button style={{backgroundColor: '#32CD32', color: 'white'}} icon={<ReloadOutlined/>}
                                        onClick={() => showConfirm(
                                            'Bạn chắc chắn muốn khôi phục?',
                                            'Hành động này sẽ khôi phục chuyên ngành này.',
                                            () => onRefund(record.id)
                                        )}/>
                            </Tooltip>
                        )}
                    </Space>
                );
            }
        },
    ];
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };
    return (
        <>
            <Table locale={{emptyText: 'Không tìm thấy kết quả tương ứng.'}} size="small" columns={columns}
                   rowSelection={rowSelection} dataSource={data} pagination={false}
                   rowKey={record => record.id}/>
        </>
    )
}
export default MajorTable;
