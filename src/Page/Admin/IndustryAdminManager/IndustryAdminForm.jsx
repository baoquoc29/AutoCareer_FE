import React from "react";
import { Button, Card, Form, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { industryService } from "../../../Service/IndustryService/IndustryService";
import { toast } from "react-toastify"; // Importing toast
import 'react-toastify/dist/ReactToastify.css';
import { PlusOutlined } from "@ant-design/icons";

const IndustryAdminForm = ({ load }) => {
    const formik = useFormik({
        initialValues: {
            code: "",
            name: ""
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Vui lòng nhập mã ngành!"),
            name: Yup.string().required("Vui lòng nhập tên ngành!"),
        }),
        onSubmit: async (values) => {
            try {
                // Attempt to create a new industry
                const { name, code } = values;
                await industryService.create_industry(name, code);

                // Show success message
                toast.success(`Ngành "${name}" với mã "${code}" đã được thêm thành công!`);

                // Reload data
                load((prev) => !prev);

                // Reset the form after successful submission
                formik.resetForm();
            } catch (error) {
                // Handle API error response
                const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi thêm ngành.";
                console.error("Lỗi khi thêm ngành:", errorMessage);

                // Show error message as toast notification
                toast.error(errorMessage);
            }
        },
    });

    return (
        <Card title="Tạo ngành mới">
            {/* Using Ant Design Form with onFinish for submission */}
            <Form
                layout="vertical"
                onFinish={formik.handleSubmit} // Using Formik's submit handler
            >
                <Form.Item
                    label="Mã ngành"
                    help={formik.errors.code && formik.touched.code ? formik.errors.code : null}
                    validateStatus={formik.errors.code && formik.touched.code ? "error" : ""}
                    required
                >
                    <Input.TextArea
                        name="code"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        placeholder="Nhập mã ngành"
                        autoSize={{ minRows: 2 }}
                    />
                </Form.Item>

                <Form.Item
                    label="Tên ngành"
                    help={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                    validateStatus={formik.errors.name && formik.touched.name ? "error" : ""}
                    required
                >
                    <Input.TextArea
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        placeholder="Nhập tên ngành"
                        autoSize={{ minRows: 2 }}
                    />
                </Form.Item>

                <Form.Item style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        htmlType="submit" // Trigger Form submission
                        className="mt-3"
                    >
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default IndustryAdminForm;
