import {useFormik} from "formik";
import {Button, Col, Form, Input, Row, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {validateField} from "../../../Utils/Validation/MajorValidation";
import {useEffect} from "react";
import {get_all_sections} from "../../../Redux/actions/SectionThunk";


const MajorForm = ({onSubmit, initialValues}) => {
    const sections = useSelector(state => state.SectionReducer.sections);
    const dispatch = useDispatch();
    useEffect(() => {
        if (sections.length === 0) {
            dispatch(get_all_sections());
        }
    }, [dispatch, sections.length]);
    const formik = useFormik({
        initialValues: {
            sectionId: initialValues?.sectionId || '',
            name: initialValues?.name || '',
            code: initialValues?.code || '',
            numberStudent: initialValues?.numberStudent || '',
            description: initialValues?.description || '',
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                await onSubmit(values);
            } catch (err) {
                console.error("Error submitting form:", err);
            }
        },
    });
    return (
        <>
            <Form layout="vertical" onFinish={formik.handleSubmit} requiredMark={true} name="trigger">
                <Form.Item label="Tên khoa" required={true} rules={validateField("section")}>
                    <Select style={{width: 340}}
                            showSearch
                            autoFocus={true}
                            placeholder="Tìm kiếm khoa"
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={sections.map(section => ({value: section.id, label: section.name}))}
                            onChange={(value) => formik.setFieldValue('sectionId', value)}
                            value={formik.values.sectionId || undefined}
                    />
                </Form.Item>

                <Form.Item
                    label="Tên chuyên ngành"
                    name="name"
                    required={true}
                    rules={validateField("name")}
                >
                    <Input onChange={formik.handleChange} value={formik.values.name} name="name"/>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Mã chuyên ngành"
                            name="code"
                            required={true}
                            rules={validateField("code")}
                        >
                            <Input onChange={formik.handleChange} value={formik.values.code} name="code"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Số lượng sinh viên"
                            name="numberStudent"
                            required={true}
                            rules={validateField("numberStudent")}
                        >
                            <Input type="number" onChange={formik.handleChange} value={formik.values.numberStudent}
                                   name="numberStudent"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Mô tả" name="description">
                    <Input.TextArea onChange={formik.handleChange} value={formik.values.description} name="description"
                                    autoSize={{minRows: 4}}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Thêm</Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default MajorForm;