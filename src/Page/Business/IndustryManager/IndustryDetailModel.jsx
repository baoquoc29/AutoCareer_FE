import React from "react";
import {Modal} from "antd";

const IndustryDetailModal = ({open, onClose, industry}) => {
    if (!industry) return null; // Nếu không có ngành, không hiển thị gì cả
    return (
        <>
            <Modal
                title="Chi tiết Ngành"
                open={open}
                onCancel={onClose}
                footer={null}
            >
                <div>
                    <p><b>Mã ngành:</b> {industry.code}</p>
                    <p><strong>Tên chuyên ngành:</strong> {industry.name}</p>
                    <p><b>Trạng thái:</b> {industry.status === "ACTIVE" ? "Hoạt động" : "Tạm ngưng"}</p>
                </div>
            </Modal>
        </>
    );
};

export default IndustryDetailModal;
