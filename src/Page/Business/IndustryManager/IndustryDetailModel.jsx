import React from "react";
import {Modal} from "antd";

const IndustryDetailModal = ({open, onClose, industry}) => {
    if (!industry) return null; // Nếu không có ngành, không hiển thị gì cả
    const formatDateTime = (dateTime) => {
        if (!dateTime) return "";
        const [date, timeWithMs] = dateTime.split("T");
        const time = timeWithMs?.split(".")[0]; // Loại bỏ phần mili giây
        return { date, time };
    };

    const { date, time } = formatDateTime(industry.createAt);
    return (
        <>
            <Modal
                title="Chi tiết Ngành"
                open={open}
                onCancel={onClose}
                footer={null}
            >
                <div>
                    <p><b>Mã ngành:</b> {industry.industryCode}</p>
                    <p><strong>Tên chuyên ngành:</strong> {industry.industryName}</p>
                    <p><strong>Ngày tạo:</strong> {date} - {time}</p>
                    <p><strong>Người tạo:</strong> {industry.createBy}</p>
                    <p><b>Trạng thái:</b> {industry.status === "ACTIVE" ? "Hoạt động" : "Tạm ngưng"}</p>
                </div>
            </Modal>
        </>
    );
};

export default IndustryDetailModal;
