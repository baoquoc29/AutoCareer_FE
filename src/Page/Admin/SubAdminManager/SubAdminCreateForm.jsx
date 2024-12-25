import React from "react";
import {useFormik} from "formik";
import {Button, Col, Form, Input, Modal, Row, Select, Upload} from "antd";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {create_sub_admin, get_all_sub_admin} from "../../../Redux/actions/SubAdminThunk";
import {STATUS_CODE} from "../../../Utils/Setting/Config";
import SubAdminValidation from "../../../Utils/Validation/University/SubAdminValidation";

const SubAdminCreateForm = ({open, onClose}) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            subAdminCode: "",
            name: "",
            gender: "",
            email: "",
            phone: "",
            address: "",
            subAdminImage: "",
        },
        enableReinitialize: true,
        validationSchema: SubAdminValidation(["subAdminCode", "name", "gender", "email", "phone", "address", "subAdminImage"],),
        onSubmit: (values) => {
            handleSubmit(values); // Gọi hàm handleSubmit
        },
    });
    const handleSubmit = async (values) => {
        // Chuẩn bị dữ liệu gửi đi
        const formData = new FormData();
        // formData.append("subAdminCode", values.subAdminCode);
        formData.append("name", values.name);
        formData.append("gender", values.gender);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("address", values.address);

        if (values.subAdminImage) {
            formData.append("subAdminImage", values.subAdminImage);
        }

        // Gửi dữ liệu tới API
        dispatch(create_sub_admin(formData))
            .then((response) => {
                dispatch(get_all_sub_admin())
                handleClose();
            })
            .catch((error) => {
                toast.error(error.messages)
            });

    };
    const handleClose = () => {
        formik.resetForm(); // Xóa toàn bộ dữ liệu form
        onClose(); // Gọi hàm đóng modal
    };

    return (
        <Modal open={open} onCancel={handleClose} footer={null} width={700}>
            <h2 style={{textAlign: "center", marginBottom: "30px", fontWeight: "bold"}}>
                Thêm quản trị viên mới
            </h2>

            <Form layout="vertical" onFinish={formik.handleSubmit}>

                {/* Khu vực tải ảnh */}
                <Form.Item style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center"
                }}
                    validateStatus={formik.errors.subAdminImage && formik.touched.subAdminImage ? 'error' : ''}
                    help={formik.errors.subAdminImage && formik.touched.subAdminImage ? formik.errors.subAdminImage : ''}>
                    {/* Khung hiển thị ảnh */}
                    <div style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        position: "relative",
                        display: "flex",
                        justifyContent: "center"
                    }}>

                        {formik.values.subAdminImage ? (
                            <img
                                src={URL.createObjectURL(formik.values.subAdminImage)}
                                alt="Preview"
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    borderRadius: "50%",
                                    border: "3px solid #f0f2f5",
                                    marginBottom: "10px",
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    borderRadius: "50%",
                                    border: "2px dashed #d9d9d9",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "10px",
                                    backgroundColor: "#f9f9f9"
                                }}
                            >
                                Không có tệp
                            </div>
                        )}

                        {/* Nút upload (icon bút) */}
                        <Upload
                            name="subAdminImage"
                            beforeUpload={(file) => {
                                formik.setFieldValue("subAdminImage", file);
                                return false;
                            }}
                            showUploadList={false}
                        >
                            <i
                                className="fa-solid fa-pen"
                                style={{
                                    fontSize: "16px",
                                    color: "#007bff",
                                    position: "absolute",
                                    top: "5px",
                                    backgroundColor: "#fff",
                                    borderRadius: "50%",
                                    padding: "5px",
                                    cursor: "pointer",
                                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                                }}
                            ></i>
                        </Upload>
                    </div>
                </Form.Item>


                {/* Các trường thông tin */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Họ tên"
                                   validateStatus={formik.errors.name && formik.touched.name ? 'error' : ''}
                                   help={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                                   required>
                            <Input
                                name="name"
                                placeholder="Nhập họ tên"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Giới tính"
                                   validateStatus={formik.errors.gender && formik.touched.gender ? 'error' : ''}
                                   help={formik.errors.gender && formik.touched.gender ? formik.errors.gender : ''}
                                   required>
                            <Select
                                name="gender"
                                onChange={(value) => formik.setFieldValue("gender", value)}
                                value={formik.values.gender}
                            >
                                <Select.Option value="male">Nam</Select.Option>
                                <Select.Option value="female">Nữ</Select.Option>
                                <Select.Option value="other">Khác</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Email"
                                   validateStatus={formik.errors.email && formik.touched.email ? 'error' : ''}
                                   help={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                                   required>
                            <Input
                                name="email"
                                placeholder="Nhập email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Số điện thoại"
                                   validateStatus={formik.errors.phone && formik.touched.phone ? 'error' : ''}
                                   help={formik.errors.phone && formik.touched.phone ? formik.errors.phone : ''}
                                   required>
                            <Input
                                name="phone"
                                placeholder="Nhập số điện thoại"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Địa chỉ"
                            validateStatus={formik.errors.address && formik.touched.address ? 'error' : ''}
                            help={formik.errors.address && formik.touched.address ? formik.errors.address : ''}
                            required>
                            <Input.TextArea
                                name="address"
                                placeholder="Nhập địa chỉ"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                rows={4}
                                autoSize={{ minRows: 2, maxRows: 6 }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>

                </Row>

                {/* Nút hành động */}
                <Row gutter={16} justify="center" style={{marginTop: "20px"}}>
                    <Col span={12}>
                        <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                            Lưu
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            type="default"
                            style={{width: "100%"}}
                            onClick={handleClose}
                        >
                            Hủy
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default SubAdminCreateForm;
