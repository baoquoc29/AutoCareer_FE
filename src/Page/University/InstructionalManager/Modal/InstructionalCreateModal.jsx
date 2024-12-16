import {Button, Col, DatePicker, Form, Input, Modal, Radio, Row} from "antd";
import {useFormik} from "formik";
import moment from "moment";
import {useEffect} from "react";

const InstructionalCreateModal = ({open, onClose, onCreate, universityId}) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            gender: "",
            dateOfBirth: "",
            email: "",
            address: "",
            instructionalCode: "",
            phone: "",
            universityId: universityId || "",

        },
        onSubmit: (values, {resetForm}) => {
            console.log("Form submitted with values:", values);
            onCreate(values);
            resetForm();
            onClose();
        },
    });
    useEffect(() => {
        // Update universityId in formik whenever it changes
        if (universityId) {
            formik.setFieldValue("universityId", universityId);
        }
    }, [universityId]);
    const handleDateChange = (date, dateString) => {
        formik.setFieldValue("dateOfBirth", dateString); // Update Formik value when date changes
    };
    return (
        <Modal open={open} onCancel={onClose} footer={null}>
            <h2>Thêm mới giáo vụ</h2>
            <Form onFinish={formik.handleSubmit} layout="vertical" name="trigger">
                <Form.Item label="Họ tên giáo vụ" required={true}>
                    <Input onChange={formik.handleChange} value={formik.values.name} name="name"/>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Ngày sinh" required={true}>
                            <DatePicker onChange={handleDateChange}
                                        value={formik.values.dateOfBirth ? moment(formik.values.dateOfBirth) : null} // Format value correctly
                                        name="dateOfBirth"
                                        style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email" required={true}>
                            <Input onChange={formik.handleChange} value={formik.values.email} name="email"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Địa chỉ thường chú" required={true}>
                    <Input onChange={formik.handleChange} value={formik.values.address} name="address"/>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Mã nhân viên" required={true}>
                            <Input onChange={formik.handleChange} value={formik.values.instructionalCode} name="instructionalCode" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Số điện thoại" required={true}>
                            <Input onChange={formik.handleChange} value={formik.values.phone} name="phone"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Giới tính" required={true}>
                    <Radio.Group
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <Row>
                            <Col>
                                <Radio value="Male">Nam</Radio>
                            </Col>
                            <Col>
                                <Radio value="Female">Nữ</Radio>
                            </Col>
                            <Col>
                                <Radio value="Other">Khác</Radio>
                            </Col>
                        </Row>
                    </Radio.Group>
                </Form.Item>
                <div className="modal-footer-right">
                    <Button onClick={onClose} style={{marginRight: '10px'}}>Hủy</Button>
                    <Button type="primary" htmlType="submit">Thêm</Button>
                </div>
            </Form>
        </Modal>
    )
}
export default InstructionalCreateModal;