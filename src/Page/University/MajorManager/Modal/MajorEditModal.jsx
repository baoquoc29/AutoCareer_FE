import {Button, Col, Form, Input, Modal, Row} from "antd";
import {useFormik} from "formik";
import MajorValidation from "../../../../Utils/Validation/University/MajorValidation";
import '../Style/Major.css'

const MajorEditModal = ({open, onClose, major, onSubmit}) => {

    const initialValues = {
        name: major?.name || '',
        code: major?.code || '',
        numberStudent: major?.numberStudent || '',
        description: major?.description || ''
    };
    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: MajorValidation(false),
        onSubmit: (values) => {
            Modal.confirm({
                title: 'Xác nhận chỉnh sửa',
                content: `Bạn có chắc chắn muốn chỉnh sửa chuyên ngành "${major.name}" ?`,
                okText: 'Xác nhận',
                okType: 'primary',
                cancelText: 'Hủy',
                onOk: async () => {
                    try {
                        await onSubmit(values);
                        onClose();
                    } catch (error) {
                        console.error("er:", error);
                    }
                    // Khi nhấn Xác nhận, thực hiện gửi dữ liệu đi
                }
            });
        }
    });
    const handleClose = () => {
        formik.resetForm(); // Reset form về trạng thái ban đầu
        onClose(); // Đóng modal
    };

    return (
        <Modal className='modal-major' open={open} onCancel={handleClose} footer={null}>
            <h2 style={{textAlign: 'center'}}>Chỉnh sửa chuyên ngành</h2>

            <Form onFinish={formik.handleSubmit} layout="vertical">
                <Form.Item label="Tên chuyên ngành" required={true}
                           validateStatus={formik.errors.name && formik.touched.name ? 'error' : ''}
                           help={formik.errors.name && formik.touched.name ? formik.errors.name : ''}>
                    <Input name="name" value={formik.values.name} onChange={formik.handleChange}/>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Mã chuyên ngành" required={true}
                                   validateStatus={formik.errors.code && formik.touched.code ? 'error' : ''}
                                   help={formik.errors.code && formik.touched.code ? formik.errors.code : ''}>
                            <Input name="code" value={formik.values.code} onChange={formik.handleChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Số lượng sinh viên" required={true}
                                   validateStatus={formik.errors.numberStudent && formik.touched.numberStudent ? 'error' : ''}
                                   help={formik.errors.numberStudent && formik.touched.numberStudent ? formik.errors.numberStudent : ''}>
                            <Input type={'number'} name="numberStudent" value={formik.values.numberStudent}
                                   onChange={formik.handleChange}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Mô tả"
                           help={formik.errors.description && formik.touched.description ? formik.errors.description : null}
                           validateStatus={formik.errors.description && formik.touched.description ? 'error' : ''}>
                    <Input.TextArea name="description" value={formik.values.description} onChange={formik.handleChange}
                                    rows={6}/>
                </Form.Item>
                <div className="modal-footer-right">
                    <Button onClick={handleClose} style={{marginRight: '10px'}}>Đóng</Button>
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </div>
            </Form>
        </Modal>
    )
}
export default MajorEditModal;
