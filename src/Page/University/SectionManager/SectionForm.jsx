import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {create_section} from "../../../Redux/actions/SectionThunk";
import {Button, Card, Form, Input} from "antd";

export const SectionForm = ({ universityId }) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            universityId: universityId || "",
            name: "",
            description: "",
            status: "ACTIVE"
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Tên khoa là bắt buộc')
                .min(3, 'Tên khoa phải có ít nhất 3 ký tự'),
            description: Yup.string().required('Mô tả là bắt buộc'),
        }),
        onSubmit: (values) => {
            console.log('Form submitted with values:', values);
            dispatch(create_section(values));
        }
    });
    return (
        <>
            <Card title="Thông tin Khoa">
                <Form layout="vertical" onFinish={formik.handleSubmit} requiredMark={true} name="trigger">
                    <Form.Item
                        hasFeedback
                        label="Tên khoa"
                        name="Tên khoa"
                        validateTrigger="onBlur"
                        required={true}
                        rules={[
                            { required: true, message: "Tên khoa không được bỏ trống" },
                            { min: 10, message: "Tên khoa phải có ít nhất 10 ký tự" },
                            { max: 100, message: "Tên khoa tối đa 100 ký tự" }
                        ]}
                        help={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                        validateStatus={formik.errors.name && formik.touched.name ? 'error' : ''}
                    >
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            name="name"
                        />
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            name="description"
                            autoSize={{ minRows: 8 }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Thêm</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}