import {Button, Modal, Space, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, ReloadOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";


const JobTable = ({data, onDelete, onRestore, selectedRows, onSelectChange, page, size}) => {
    const navigate = useNavigate();

    const userLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
    const username = userLogin?.username; // Lấy username từ đối tượng USER_LOGIN

    const confirmDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa công viêc "${record.title}"?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                onDelete(record.key);
            },
        });
    };

    const handleInfo = (id) => {
        // Navigate to the JobUpdatePage and pass the job ID in the URL
        localStorage.setItem("jobId", id);
        navigate('/job-detail');
    };

    const handleEdit = (id) => {
        // Navigate to the JobUpdatePage and pass the job ID in the URL
        localStorage.setItem("jobId", id);
        navigate('/job-update');
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "Không xác định";
        const date = new Date(dateString);

        // Định dạng thời gian
        const time = date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        // Định dạng ngày
        const day = date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        // Kết hợp giờ và ngày bằng dấu "-"
        return `${time} - ${day}`;
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            align: 'center',
            key: 'stt',
            sorter: (a, b) => a.stt - b.stt,
            render: (_, __, index) => index + 1 + (page - 1) * size, // Tính số thứ tự dựa trên trang hiện tại
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            align: 'left',
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
            align: 'left',
            sorter: (a, b) => a.expireDate.localeCompare(b.expireDate),
            render: (text) => formatDateTime(text), // Sử dụng hàm formatDate

        },
        {
            title: 'Trạng thái duyệt',
            dataIndex: 'statusBrowse',
            align: 'center',
            key: 'statusBrowse',
            sorter: (a, b) => a.statusBrowse.localeCompare(b.statusBrowse),
            render: (statusBrowse) => {
                // Gán màu và trạng thái hiển thị dựa trên trạng thái duyệt
                let color;
                let statusText;

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
                    <Button type={"primary"} icon={<EyeOutlined/>} onClick={() => handleInfo(record.key)}
                        // disabled={record.status !== 'ACTIVE'}
                    />

                    <Button style={{backgroundColor: "yellow"}} variant="outlined" icon={<EditOutlined/>}
                            onClick={() => handleEdit(record.key)}
                          />
                    {record.status === 'ACTIVE' ? (
                        <Button variant={"solid"} danger={true} color={"danger"} icon={<DeleteOutlined/>}
                                onClick={() => confirmDelete(record, record.createBy)}
                                />
                    ) : (
                        <Button icon={<ReloadOutlined/>} onClick={() => onRestore(record)}/>
                    )}
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table
                rowSelection={{
                    selectedRowKeys: selectedRows.map(row => row.key),
                    onChange: (selectedRowKeys, selectedRows) => {
                        // Kiểm tra nếu tất cả các hàng được chọn đều hợp lệ
                        const isValidSelection = selectedRows.every(row => row.createBy === username);
                        if (isValidSelection) {
                            onSelectChange(selectedRowKeys, selectedRows);
                        } else {
                            // Hiển thị thông báo lỗi hoặc không thực hiện thay đổi
                            Modal.warning({
                                title: 'Lỗi',
                                content: 'Bạn chỉ có thể chọn những hàng do bạn tạo.',
                            });
                        }
                    },
                    getCheckboxProps: (record) => ({
                        // Chỉ cho phép chọn nếu record.createBy === username
                        disabled: record.createBy !== username,
                    }),
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
                locale={{
                    emptyText: "Không có dữ liệu", // Hiển thị khi bảng trống
                }}/>
        </>
    )
}
export default JobTable;