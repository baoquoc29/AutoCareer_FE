import {Button, Col, Form, Input, Modal, Radio, Row} from "antd";
import {useFormik} from "formik";
import React, {useEffect} from "react";
import instructionalValidation from "../../../../Utils/Validation/University/InstructionalValidation";


const InstructionalCreateModal = ({open, onClose, onCreate, uniId}) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            gender: "",
            dateOfBirth: "",
            email: "",
            address: "",
            instructionalCode: "",
            phone: "",
            universityId: uniId || "",

        },
        validationSchema: instructionalValidation,
        onSubmit: (values, ) => {
            onCreate(values);
            onClose()
        },
    });
    // Cập nhật giá trị universityId khi giá trị thay đổi
    useEffect(() => {
        if (uniId !== null) {
            formik.setFieldValue("universityId", uniId);
        }
    }, [uniId]);
    const handleDateChange = (e) => {
        const {value} = e.target;
        // Chuyển đổi giá trị ngày thành định dạng yyyy/MM/dd
        formik.setFieldValue("dateOfBirth", value);
    };
    return (
        <Modal open={open} onCancel={onClose} footer={null}>
            <h2>Thêm mới giáo vụ</h2>
            <Form onFinish={formik.handleSubmit} layout="vertical" name="trigger">
                <Form.Item label="Họ tên giáo vụ" required={true}
                           validateStatus={formik.errors.name && formik.touched.name ? 'error' : ''}
                           help={formik.errors.name && formik.touched.name ? formik.errors.name : ''}>
                    <Input onChange={formik.handleChange} value={formik.values.name} name="name"/>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Ngày sinh" required={true}
                                   validateStatus={formik.errors.dateOfBirth && formik.touched.dateOfBirth ? 'error' : ''}
                                   help={formik.errors.dateOfBirth && formik.touched.dateOfBirth ? formik.errors.dateOfBirth : ''}>
                            <Input
                                id="dateOfBirth"
                                type="date"
                                className="form-control"
                                value={formik.values.dateOfBirth}
                                onChange={handleDateChange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email" required={true}
                                   validateStatus={formik.errors.email && formik.touched.email ? 'error' : ''}
                                   help={formik.errors.email && formik.touched.email ? formik.errors.email : ''}>
                            <Input onChange={formik.handleChange} value={formik.values.email} name="email"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Địa chỉ" required={true}
                           validateStatus={formik.errors.address && formik.touched.address ? 'error' : ''}
                           help={formik.errors.address && formik.touched.address ? formik.errors.address : ''}>
                    <Input onChange={formik.handleChange} value={formik.values.address} name="address"/>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Mã giáo vụ" required={true}
                                   validateStatus={formik.errors.instructionalCode && formik.touched.instructionalCode ? 'error' : ''}
                                   help={formik.errors.instructionalCode && formik.touched.instructionalCode ? formik.errors.instructionalCode : ''}>
                            <Input onChange={formik.handleChange} value={formik.values.instructionalCode}
                                   name="instructionalCode"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Số điện thoại" required={true}
                                   validateStatus={formik.errors.phone && formik.touched.phone ? 'error' : ''}
                                   help={formik.errors.phone && formik.touched.phone ? formik.errors.phone : ''}>
                            <Input onChange={formik.handleChange} value={formik.values.phone} name="phone"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Giới tính" required={true}
                           validateStatus={formik.errors.gender && formik.touched.gender ? 'error' : ''}
                           help={formik.errors.gender && formik.touched.gender ? formik.errors.gender : ''}>
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