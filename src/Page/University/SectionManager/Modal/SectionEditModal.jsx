import {useFormik} from "formik";
import {Button, Form, Input, Modal} from "antd";
import SectionValidation from "../../../../Utils/Validation/University/SectionValidation";

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
        validationSchema:SectionValidation,
        onSubmit: (values) => {
            Modal.confirm({
                title: 'Xác nhận chỉnh sửa',
                content: `Bạn có chắc chắn muốn chỉnh sửa khoa "${section.name}" ?`,
                okText: 'Xác nhận',
                okType: 'primary',
                cancelText: 'Hủy',
                onOk() {
                    // Khi nhấn Xác nhận, thực hiện gửi dữ liệu đi
                    onSubmit(values);
                    onClose(); // Đóng modal sau khi submit
                },
            });

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
                        <Button onClick={onClose} style={{marginRight: '10px'}}>Đóng</Button>
                        <Button type="primary" htmlType="submit">Lưu</Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}
export default SectionEditModal;