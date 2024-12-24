import {Button, Modal} from "antd";
import '../Style/Section.css'
const SectionDetailModal = ({open, onClose, section}) => {
    if (!section) return null;
    return (
        <>
            <Modal className='modal-section' open={open} onCancel={onClose} footer={null}>
                <h2 style={{textAlign:'center'}}>Chi tiết khoa</h2>
                <p><strong>Tên khoa:</strong> {section.name}</p>
                <p><strong>Mô tả:</strong> {section.description}</p>
                <div className="modal-footer-right">
                    <Button type="primary" onClick={onClose}>Đóng</Button>
                </div>
            </Modal>
        </>
    )
}
export default SectionDetailModal;