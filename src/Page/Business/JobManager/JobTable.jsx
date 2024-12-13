import {Button, Modal, Space, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, ReloadOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";

const JobTable = ({data, onDelete, onRestore, userPermissions }) => {
    const navigate = useNavigate();

    const userLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
    const username = userLogin?.username; // Lấy username từ đối tượng USER_LOGIN

    const confirmDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận vô hiệu hóa',
            content: `Bạn có chắc chắn muốn vô hiệu hóa công viêc "${record.title}"?`,
            okText: 'Vô hiệu hóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                onDelete(record.id);
            },
        });
    };

    const handleInfo = (id) => {
        // Navigate to the JobUpdatePage and pass the job ID in the URL
        navigate('/job-detail', { state: { jobId: id } });
    };


    const handleEdit = (id) => {
        // Navigate to the JobUpdatePage and pass the job ID in the URL
        navigate('/job-update', { state: { jobId: id } });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Không xác định";
        return dayjs(dateString).locale('vi').format('DD-MM-YYYY');
    };

    const columns = [
        {title: 'STT', dataIndex: 'stt', align: 'center', key: 'stt', sorter: (a, b) => a.stt - b.stt},
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            align: 'center',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (text) => {
                const maxLength = 45; // Giới hạn số ký tự trước khi thêm ">>>"

                // Kiểm tra và xử lý chuỗi nếu dài hơn maxLength
                const displayText = text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

                return (
                    <div style={{
                        whiteSpace: 'nowrap', // Không xuống dòng
                        overflow: 'hidden',  // Ẩn phần văn bản tràn
                        textOverflow: 'ellipsis', // Hiển thị dấu "..."
                    }}>
                        {displayText}
                    </div>
                );
            },
        },

        {
            title: 'Ngày hết hạn',
            dataIndex: 'expireDate',
            key: 'expireDate',
            align: 'center',
            sorter: (a, b) => a.expireDate.localeCompare(b.expireDate),
            render: (text) => formatDate(text), // Sử dụng hàm formatDate

        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            align: 'center',
            render: (status) => {
                // Gán màu dựa trên trạng thái
                let color = "";
                let statusText ;

                switch (status.toLowerCase()) {
                    case "active":
                        color = "green";
                        statusText = "Hoạt động"; // Hiển thị "Hoạt động"
                        break;
                    case "inactive":
                        color = "volcano";
                        statusText = "Không hoạt động"; // Hiển thị "Không hoạt động"
                        break;
                    default:
                        color = "geekblue"; // Mặc định cho các trạng thái khác
                        statusText = status; // Giữ nguyên trạng thái nếu không phải "active" hoặc "inactive"
                }

                return (
                    <Tag color={color} key={status}>
                        {statusText} {/* Hiển thị trạng thái với chữ được thay đổi */}
                    </Tag>
                );
            },
        },
        {
            title: 'Trạng thái duyệt',
            dataIndex: 'statusBrowse',
            align: 'center',
            key: 'statusBrowse',
            sorter: (a, b) => a.statusBrowse.localeCompare(b.statusBrowse),
            render: (statusBrowse) => {
                // Gán màu và trạng thái hiển thị dựa trên trạng thái duyệt
                let color = "";
                let statusText = "";

                switch (statusBrowse.toLowerCase()) {
                    case "pending":
                        color = "orange";
                        statusText = "Chờ duyệt"; // Hiển thị "Chờ duyệt"
                        break;
                    case "approved":
                        color = "green";
                        statusText = "Đã duyệt"; // Hiển thị "Đã duyệt"
                        break;
                    default:
                        color = "red"; // Mặc định cho trạng thái khác
                        statusText = "Bị từ chối"; // Hiển thị "Bị từ chối"
                }

                return (
                    <Tag color={color} key={statusBrowse}>
                        {statusText} {/* Hiển thị trạng thái duyệt */}
                    </Tag>
                );
            },
        },
        {
            title: 'Thao tác', key: 'actions', align: 'center', render: (text, record) => (
                <Space size="middle">
                    <Button type={"primary"} icon={<EyeOutlined/>} onClick={() => handleInfo(record.id)}
                            // disabled={record.status !== 'ACTIVE'}
                    />


                    <Button style={{backgroundColor: "yellow"}} variant="outlined" icon={<EditOutlined/>}
                            onClick={() => handleEdit(record.id)}
                            disabled={username !== record.createBy}/>
                    {record.status === 'ACTIVE' ? (
                        <Button variant={"solid"} danger={true} color={"danger"} icon={<DeleteOutlined/>}
                                onClick={() => confirmDelete(record, record.createBy)}
                                disabled={username !== record.createBy}/>
                    ) : (
                        <Button icon={<ReloadOutlined/>} onClick={() => onRestore(record)}/>
                    )}
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table columns={columns}
                   dataSource={data}
                   pagination={false}
                   locale={{
                       emptyText: "Không có dữ liệu", // Hiển thị khi bảng trống
                   }}/>
        </>
    )
}
export default JobTable;