import {Button, Modal, Space, Table, Tooltip} from "antd";
import {EditOutlined, EyeOutlined, ReloadOutlined, StopOutlined} from "@ant-design/icons";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import {statusRender} from "../../../Component/RenderFunctions/RenderFunctions";


const InstructionalTable = ({
                                instructional,
                                onStop,
                                onRefund,
                                onInfo,
                                onEdit,
                                selectedRowKeys,
                                setSelectedRowKeys,
                                currentPage,
                                pageSize
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
        {title: 'STT', dataIndex: 'stt', key: 'stt', align: 'center'},
        {title: 'Mã giáo vụ', dataIndex: 'instructionalCode', key: 'instructionalCode', align: 'left'},
        {
            title: 'Ảnh',
            dataIndex: 'instructionalImageId',
            key: 'instructionalImageId',
            align: 'center',
            render: (instructionalImageId) => (
                <img
                    src={`${GET_IMAGE_URI}${instructionalImageId}`}
                    alt="Ảnh đại diện"
                    className="img-fluid logo-image"
                    style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "1px solid #ccc"
                    }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'placeholder-avatar.jpg';
                    }}
                />
            ),
        },
        {title: 'Họ và tên', dataIndex: 'name', key: 'name', align: 'left'},
        {title: 'Email', dataIndex: 'email', key: 'email', align: 'left'},
        {title: 'Số điện thoại', dataIndex: 'phone', key: 'phone', align: 'left'},
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
                                    'Hành động này sẽ tạm ngưng người dùng này.',
                                    () => onStop(record.id)
                                )}/>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Khôi phục">
                                <Button style={{backgroundColor: '#32CD32', color: 'white'}} icon={<ReloadOutlined/>}
                                        onClick={() => showConfirm(
                                            'Bạn chắc chắn muốn khôi phục?',
                                            'Hành động này sẽ khôi phục người dùng này.',
                                            () => onRefund(record.id)
                                        )}/>
                            </Tooltip>
                        )}
                    </Space>
                );
            }
        },
    ];
    const data = instructional.map((ins, index) => ({
        key: ins.id,
        id: ins.id,
        stt: (currentPage - 1) * pageSize + (index + 1),
        instructionalCode:ins.instructionalCode,
        instructionalImageId: ins.instructionalImageId,
        name: ins.name,
        email: ins.email,
        phone: ins.phone,
        status: ins.status,

    }));
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    return (
        <>
            <Table locale={{emptyText: "Không tìm thấy kết quả tương ứng."}} rowSelection={rowSelection} size='small' columns={columns} dataSource={data}
                   pagination={false}/>
        </>
    )
}
export default InstructionalTable;
