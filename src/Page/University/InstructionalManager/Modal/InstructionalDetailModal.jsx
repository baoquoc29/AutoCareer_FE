import {Button, Col, Modal, Row} from "antd";
import {GET_IMAGE_URI} from "../../../../Utils/Setting/Config";
import moment from "moment";
import {useEffect, useState} from "react";

const InstructionalDetailModal = ({open, onClose, instructional}) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (instructional) {
            const img = new Image();
            img.src = `${GET_IMAGE_URI}${instructional.instructionalImageId}`;
            img.onload = () => setImageSrc(img.src);
            img.onerror = () => setImageSrc('placeholder-avatar.jpg');
        }
    }, [instructional]);
    if (!instructional) return null;
    const formattedDateOfBirth = instructional.dateOfBirth ? moment(instructional.dateOfBirth).format('DD/MM/YYYY') : '';
    return (
        <>
            <Modal open={open} onCancel={onClose} footer={null}>
                <h2 style={{textAlign: 'center'}}>Chi tiết chuyên ngành</h2>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <p><strong>Mã giáo vụ:</strong> {instructional.instructionalCode}</p>
                        <p><strong>Họ và tên:</strong> {instructional.name}</p>
                        <p><strong>Giới tính:</strong> {instructional.gender}</p>
                        <p><strong>Ngày sinh:</strong> {formattedDateOfBirth}</p>
                    </Col>
                    <Col span={12}>
                        <p><strong>Email:</strong> {instructional.email}</p>
                        <p><strong>Địa chỉ:</strong> {instructional.address}</p>
                        <p><strong>Số điện thoại:</strong> {instructional.phone}</p>
                        <p><strong>Ảnh đại diện:</strong></p>
                        <img
                            src={imageSrc}
                            alt="Avatar"
                            style={{maxWidth: '100px', height: 'auto', display: 'block', marginTop: '10px'}}
                        />
                    </Col>
                </Row>
                <div className="modal-footer-right">
                    <Button type="primary" onClick={onClose}>Đóng</Button>
                </div>
            </Modal>
        </>
    )
}
export default InstructionalDetailModal;