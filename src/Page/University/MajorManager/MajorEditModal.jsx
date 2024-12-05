import {Button, Col, Form, Input, Modal, Row} from "antd";
import { useFormik} from "formik";
import {validateField} from "../../../Utils/Validation/MajorValidation";

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
        onSubmit: (values) => {
            onSubmit(values);
            onClose(); // Close modal after submit
        }
    });
    return (
        <Modal open={open} onCancel={onClose} footer={null}>
            <h2>Chỉnh sửa chuyên ngành</h2>
            <Form onFinish={formik.handleSubmit} layout="vertical">
                <Form.Item label="Tên chuyên ngành" required={true} rules={validateField("name")}>
                    <Input name="name" value={formik.values.name} onChange={formik.handleChange}/>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Mã chuyên ngành" required={true} rules={validateField("code")}>
                            <Input name="code" value={formik.values.code} onChange={formik.handleChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Số lượng sinh viên" required={true} rules={validateField("numberStudent")}>
                            <Input name="numberStudent" value={formik.values.numberStudent} onChange={formik.handleChange}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Mô tả" >
                    <Input.TextArea name="description" value={formik.values.description} onChange={formik.handleChange}/>
                </Form.Item>
                <div className="modal-footer-right">
                    <Button type="primary" htmlType="submit">Lưu</Button>
                    <Button onClick={onClose} style={{marginLeft: '10px'}}>Đóng</Button>
                </div>
            </Form>
        </Modal>
    )
}
export default MajorEditModal;
