import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {create_section} from "../../../Redux/actions/SectionThunk";
import {Button, Card, Form, Input} from "antd";
import SectionValidation from "../../../Utils/Validation/University/SectionValidation";
import {PlusOutlined} from "@ant-design/icons";

export const SectionForm = ({universityId}) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            universityId: universityId || "",
            name: "",
            description: "",
            status: "ACTIVE"
        },
        enableReinitialize: true,
        validationSchema: SectionValidation,
        onSubmit: (values) => {
            const trimmedValues = {
                ...values,
                name: values.name.trim(),
                description: values.description.trim(),
            };
            dispatch(create_section(trimmedValues));
        }
    });
    return (
        <>
            <Card style={{textAlign:'center'}} title="Thêm mới khoa">
                <Form layout="vertical" onFinish={formik.handleSubmit} requiredMark={true} name="trigger">
                    <Form.Item
                        hasFeedback
                        label="Tên khoa"
                        name="Tên khoa"
                        validateTrigger="onBlur"
                        required={true}
                        help={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                        validateStatus={formik.errors.name && formik.touched.name ? 'error' : ''}
                    >
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            name="name"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        help={formik.errors.description && formik.touched.description ? formik.errors.description : null}
                        validateStatus={formik.errors.description && formik.touched.description ? 'error' : ''}
                    >
                        <Input.TextArea
                            rows={8}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            name="description"
                        />
                    </Form.Item>
                    <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button type="primary" htmlType="submit" icon={<PlusOutlined/>}>
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}