import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Modal, Radio, Row, Upload} from "antd";
import {useFormik} from "formik";
import {UploadOutlined} from "@ant-design/icons";
import {GET_IMAGE_URI} from "../../../../Utils/Setting/Config";
import ImgCrop from "antd-img-crop";
import {useDispatch} from "react-redux";
import {update_ins} from "../../../../Redux/actions/InstructionalThunk";
import moment from "moment";
import InstructionalValidation from "../../../../Utils/Validation/University/InstructionalValidation";

const InstructionalEditModal = ({open, onClose, instructional, onSubmit}) => {
    const dispatch = useDispatch();
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        if (instructional?.instructionalImageId) {
            setPreview(`${GET_IMAGE_URI}${instructional.instructionalImageId}`);
        } else {
            setPreview(`placeholder-avatar.jpg`);
        }
    }, [instructional]);
    // Set the initial form values and preview image
    const formik = useFormik({
        initialValues: {
            name: instructional?.name || '',
            gender: instructional?.gender || '',
            dateOfBirth: instructional?.dateOfBirth ? moment(instructional.dateOfBirth).format('YYYY-MM-DD') : '',
            address: instructional?.address || '',
            phone: instructional?.phone || '',
            instructionalCode: instructional?.instructionalCode || '',
            instructionalImageId: null,
            universityId: instructional?.universityId || "",
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            Modal.confirm({
                title: 'Xác nhận chỉnh sửa',
                content: `Bạn có chắc chắn muốn chỉnh sửa khoa "${instructional.name}" ?`,
                okText: 'Xác nhận',
                okType: 'primary',
                cancelText: 'Hủy',
                onOk: async () => {
                    try {
                        const formData = new FormData();
                        Object.keys(values).forEach((key) => {
                            if (key !== "instructionalImageId") formData.append(key, values[key]);
                        });
                        // Kiểm tra và thêm file ảnh vào FormData
                        if (values.instructionalImageId) {
                            formData.append("instructionalImageId", values.instructionalImageId);
                        }
                        await dispatch(update_ins(instructional.id, formData));
                        // Khi nhấn Xác nhận, thực hiện gửi dữ liệu đi
                        await onSubmit(values); // Chờ xử lý cập nhật section
                        onClose(); // Đóng modal chỉnh sửa sau khi submit thành công
                    } catch (error) {
                        // Nếu có lỗi, chỉ đóng modal confirm
                        console.log(error);
                        // Không đóng modal chỉnh sửa ở đây, chỉ đóng modal confirm
                    }
                },
            });
        },
    });
    // Handle image selection
    const handleImageChange = (file) => {
        formik.setFieldValue("instructionalImageId", file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    // Close modal
    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    return (
        <Modal open={open} footer={null} onCancel={handleClose}>
            <h2 style={{textAlign: 'center'}}>Chỉnh sửa giáo vụ</h2>
            <Form onFinish={formik.handleSubmit} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Mã giáo vụ" required
                            validateStatus={formik.errors.instructionalCode && formik.touched.instructionalCode ? 'error' : ''}
                            help={formik.errors.instructionalCode && formik.touched.instructionalCode ? formik.errors.instructionalCode : ''}
                        >
                            <Input onChange={formik.handleChange} value={formik.values.instructionalCode}
                                   name="instructionalCode"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Tên giáo vụ" required
                            validateStatus={formik.errors.name && formik.touched.name ? 'error' : ''}
                            help={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                        >
                            <Input onChange={formik.handleChange} value={formik.values.name} name="name"/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Số điện thoại" required
                            validateStatus={formik.errors.phone && formik.touched.phone ? 'error' : ''}
                            help={formik.errors.phone && formik.touched.phone ? formik.errors.phone : ''}
                        >
                            <Input onChange={formik.handleChange} value={formik.values.phone} name="name"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ngày sinh" required={true}>
                            <Input
                                id="dateOfBirth"
                                type="date"
                                className="form-control"
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                                disabled={true}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Địa chỉ" required
                            validateStatus={formik.errors.address && formik.touched.address ? 'error' : ''}
                            help={formik.errors.address && formik.touched.address ? formik.errors.address : ''}
                        >
                            <Input onChange={formik.handleChange} value={formik.values.address} name="address"/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Giới tính" required
                            validateStatus={formik.errors.gender && formik.touched.gender ? 'error' : ''}
                            help={formik.errors.gender && formik.touched.gender ? formik.errors.gender : ''}
                        >
                            <Radio.Group name="gender" value={formik.values.gender}
                                         onChange={formik.handleChange}>
                                <Row>
                                    <Col><Radio value="Male">Nam</Radio></Col>
                                    <Col><Radio value="Female">Nữ</Radio></Col>
                                    <Col><Radio value="Other">Khác</Radio></Col>
                                </Row>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Ảnh đại diện">
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Avatar"
                                    style={{maxWidth: '100px', height: 'auto', display: 'block', marginTop: '10px'}}
                                />
                            )}
                            <div style={{
                                marginTop: '10px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <ImgCrop rotate>
                                    <Upload
                                        accept="image/*"
                                        showUploadList={false}
                                        beforeUpload={(file) => {
                                            handleImageChange(file);
                                            return false;
                                        }}
                                    >
                                        <Button icon={<UploadOutlined/>}>Chọn ảnh mới</Button>
                                    </Upload>
                                </ImgCrop>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <div className="modal-footer-right">
                    <Button onClick={handleClose} style={{marginRight: '10px'}}>Đóng</Button>
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default InstructionalEditModal;
