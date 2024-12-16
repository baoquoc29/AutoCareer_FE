import {Button, Modal} from "antd";

const MajorDetailModal = ({open, onClose, major,sections}) => {
    if (!major) return null;
    // Tìm section tương ứng với major.sectionId
    const sectionName = sections.find(section => section.id === major.sectionId)?.name || 'Không có thông tin';
    return (
        <>
            <Modal open={open} onCancel={onClose} footer={null}>
                <h2 style={{textAlign:'center'}}>Chi tiết chuyên ngành</h2>
                <p><strong>Khoa:</strong> {sectionName}</p> {/* Hiển thị tên khoa */}
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