import React, {useEffect} from "react";
import {useFormik} from "formik";
import {Modal, Form, Input, Upload, Button, Row, Col, Select} from "antd";
import {get_all_sub_admin, get_detail_sub_admin, update_sub_admin} from "../../../Redux/actions/SubAdminThunk";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {DOMAIN, GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import './SubAdminUpdate.css';
import SubAdminValidation from "../../../Utils/Validation/University/SubAdminValidation";

const SubAdminUpdate = ({open, onClose, subAdminData}) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: "",
            subAdminCode: "",
            name: "",
            gender: "",
            email: "",
            phone: "",
            address: "",
            subAdminImage: null,
        },
        enableReinitialize: true,
        validationSchema: SubAdminValidation(["phone", "gender", "address", "name", "subAdminImage"]),
        onSubmit: async (values) => {
            await handleSubmit(values)
        },
    });
    const handleSubmit = async (values) => {
        console.log(values);
        const formData = new FormData();
        formData.append("id", subAdminData.id);
        if (values.name) formData.append("name", values.name);
        if (values.gender) formData.append("gender", values.gender);
        if (values.phone) formData.append("phone", values.phone);
        if (values.address) formData.append("address", values.address);
        if (values.subAdminImage && values.subAdminImage instanceof File) {
            formData.append("subAdminImage", values.subAdminImage);
        }
        console.log(formData.values);

        dispatch(update_sub_admin(formData))
            .then(async () => {
                onClose();
                await dispatch(get_detail_sub_admin(subAdminData.id));
                await dispatch(get_all_sub_admin());
            })
            .catch((error) => {
                toast.error(error.messages);
            });
    };

    useEffect(() => {
        if (subAdminData) {
            formik.setValues({
                subAdminCode: subAdminData.subAdminCode || "",
                name: subAdminData.name || "",
                gender: subAdminData.gender || "",
                email: subAdminData.email || "",
                phone: subAdminData.phone || "",
                address: subAdminData.address || "",
                subAdminImage: null,
            });
        }
    }, [subAdminData]);

    return (
        <Modal open={open} onCancel={onClose} footer={null} width={700}>
            <h2 className="modal-sub-admin-title">Chỉnh sửa quản trị viên</h2>

            <Form layout="vertical" onFinish={formik.handleSubmit}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            style={{
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center"
                            }}
                            validateStatus={formik.errors.subAdminImage && formik.touched.subAdminImage ? 'error' : ''}
                            help={formik.errors.subAdminImage && formik.touched.subAdminImage ? formik.errors.subAdminImage : ''}
                        >

                            <div className="image-sub-admin-container">
                                {formik.values.subAdminImage ? (
                                    <img
                                        src={URL.createObjectURL(formik.values.subAdminImage)}
                                        alt="Preview"
                                    />
                                ) : subAdminData?.subAdminImageId ? (
                                    <img
                                        src={`${GET_IMAGE_URI}${subAdminData.subAdminImageId}`}
                                        alt="Preview"
                                    />
                                ) : (
                                    <img
                                        src={"placeholder-avatar.jpg"}
                                        alt="Preview"
                                    />
                                )}
                                <Upload
                                    name="subAdminImage"
                                    beforeUpload={(file) => {
                                        formik.setFieldValue("subAdminImage", file);
                                        return false;
                                    }}
                                    showUploadList={false}
                                >
                                    <i className="fa-solid fa-pen upload-icon"></i>
                                </Upload>
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Mã quản trị viên">
                            <Input name="subAdminCode" value={formik.values.subAdminCode} disabled/>
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input name="email" value={formik.values.email} disabled/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item label="Họ tên"
                                   validateStatus={formik.errors.name && formik.touched.name ? 'error' : ''}
                                   help={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                                   >
                            <Input name="name" value={formik.values.name} onChange={formik.handleChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Giới tính"
                                   validateStatus={formik.errors.gender && formik.touched.gender ? 'error' : ''}
                                   help={formik.errors.gender && formik.touched.gender ? formik.errors.gender : ''}
                                   >
                            <Select
                                name="gender"
                                value={formik.values.gender}
                                onChange={(value) => formik.setFieldValue("gender", value)}
                            >
                                <Select.Option value="male">Nam</Select.Option>
                                <Select.Option value="female">Nữ</Select.Option>
                                <Select.Option value="other">Khác</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item label="Số điện thoại"
                                   validateStatus={formik.errors.phone && formik.touched.phone ? 'error' : ''}
                                   help={formik.errors.phone && formik.touched.phone ? formik.errors.phone : ''}
                        >
                            <Input name="phone" onChange={formik.handleChange} value={formik.values.phone}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Địa chỉ"
                                   validateStatus={formik.errors.address && formik.touched.address ? 'error' : ''}
                                   help={formik.errors.address && formik.touched.address ? formik.errors.address : ''}
                        >
                            <Input name="address" onChange={formik.handleChange} value={formik.values.address}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>

                    <div className="action-buttons">
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                        <Button type="default" onClick={onClose}>
                            Hủy
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SubAdminUpdate;
