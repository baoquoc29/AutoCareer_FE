import {useFormik} from "formik";
import {Button, Form, Input, Modal} from "antd";

const SectionEditModal = ({open, onClose, section, onSubmit, universityId}) => {
    const initialValues = {
        universityId: universityId || "",
        name: section?.name || "",
        description: section?.description || "",
        status: "ACTIVE"
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
        <>
            <Modal open={open} onCancel={onClose} footer={null}>
                <h2>Chỉnh sửa khoa</h2>
                <Form onFinish={formik.handleSubmit} layout={"vertical"}>
                    <Form.Item label="Tên khoa">
                        <Input name="name" value={formik.values.name} onChange={formik.handleChange}/>
                    </Form.Item>
                    <Form.Item label="Mô tả">
                        <Input.TextArea name="description" autoSize={{minRows: 7}} value={formik.values.description}
                                        onChange={formik.handleChange}/>
                    </Form.Item>
                    <div className="modal-footer-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button onClick={onClose} style={{marginLeft: '10px'}}>Đóng</Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}
export default SectionEditModal;