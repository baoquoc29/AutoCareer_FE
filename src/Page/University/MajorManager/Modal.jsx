import {Button, Modal} from "antd";

const MajorDetailModal = ({open, onClose, major}) => {
    if (!major) return null; // Nếu không có major, không hiển thị gì cả
    return (
        <>
            <Modal open={open} onCancel={onClose} footer={null}>
                <h2>Chi tiết chuyên ngành</h2>
                <p><strong>Tên chuyên ngành:</strong> {major.name}</p>
                <p><strong>Mã chuyên ngành:</strong> {major.code}</p>
                <p><strong>Số lượng sinh viên:</strong> {major.numberStudent}</p>
                <p><strong>Mô tả:</strong> {major.description}</p>
                <div className="modal-footer-right">
                    <Button type="primary" onClick={onClose}>Đóng</Button>
                </div>

            </Modal>
        </>
    )
}
export default MajorDetailModal;