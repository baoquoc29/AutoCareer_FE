// DeleteSelectedButton.js
import React from 'react';
import {Button, Modal} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {toast} from 'react-toastify';

const DeleteSelectedButton = ({selectedRows, onDeleteMultiple}) => {

    const confirmDeleteMultiple = () => {
        Modal.confirm({
            title: 'Xác nhận xóa nhiều',
            content: `Bạn có chắc chắn muốn xóa ${selectedRows.length} ngành nghề khỏi doanh nghiệp?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                onDeleteMultiple(selectedRows);
                toast.success("Xóa nhiều ngành nghề thành công");
            },
        });
    };

    return (
        <Button
            type="primary"
            danger
            onClick={confirmDeleteMultiple}
            disabled={selectedRows.length === 0}
            icon={<DeleteOutlined />}
        >
            Xóa đã chọn ({selectedRows.length})
        </Button>
    );
};

export default DeleteSelectedButton;
