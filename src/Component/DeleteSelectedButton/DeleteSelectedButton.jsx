// DeleteSelectedButton.js
import React from 'react';
import {Button, Modal} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';

const DeleteSelectedButton = ({selectedRows, onDeleteMultiple}) => {

    const confirmDeleteMultiple = () => {
        Modal.confirm({
            title: 'Xác nhận xóa nhiều',
            content: `Bạn có chắc chắn muốn xóa ${selectedRows.length} bản ghi ?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                onDeleteMultiple(selectedRows);
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
            Xóa ({selectedRows.length})
        </Button>
    );
};

export default DeleteSelectedButton;
