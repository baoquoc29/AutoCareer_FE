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
        validationSchema: SectionValidation,
        onSubmit: (values) => {
            Modal.confirm({
                title: 'Xác nhận chỉnh sửa',
                content: `Bạn có chắc chắn muốn chỉnh sửa khoa "${section.name}" ?`,
                okText: 'Xác nhận',
                okType: 'primary',
                cancelText: 'Hủy',
                onOk: async () => {
                    try {
                        // Khi nhấn Xác nhận, thực hiện gửi dữ liệu đi
                        await onSubmit(values); // Chờ xử lý cập nhật section
                        onClose(); // Đóng modal chỉnh sửa sau khi submit thành công
                    } catch (error) {
                        // Nếu có lỗi, chỉ đóng modal confirm
                        console.error("Lỗi khi cập nhật khoa:", error);
                        // Không đóng modal chỉnh sửa ở đây, chỉ đóng modal confirm
                    }
                },
            });

        }
    });
    const handleCancel = () => {
        formik.resetForm(); // Reset form về trạng thái ban đầu
        onClose(); // Đóng modal
    };
    return (
        <>
            <Modal open={open} onCancel={handleCancel} footer={null}>
                <h2 style={{textAlign: 'center'}}>Chỉnh sửa khoa</h2>
                <Form onFinish={formik.handleSubmit} layout={"vertical"}>
                    <Form.Item label="Tên khoa" required
                               help={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                               validateStatus={formik.errors.name && formik.touched.name ? 'error' : ''}>
                        <Input name="name" value={formik.values.name} onChange={formik.handleChange}/>
                    </Form.Item>
                    <Form.Item label="Mô tả"
                               help={formik.errors.description && formik.touched.description ? formik.errors.description : null}
                               validateStatus={formik.errors.description && formik.touched.description ? 'error' : ''}>
                        <Input.TextArea name="description" rows={6} value={formik.values.description}
                                        onChange={formik.handleChange}/>
                    </Form.Item>
                    <div className="modal-footer-right">
                        <Button onClick={handleCancel} style={{marginRight: '10px'}}>Đóng</Button>
                        <Button type="primary" htmlType="submit">Lưu</Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}
export default SectionEditModal;