import {useFormik} from "formik";
import {Button, Col, Form, Input, Row, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {get_all_sections} from "../../../Redux/actions/SectionThunk";
import './Style/Major.css'
import {PlusOutlined} from "@ant-design/icons";
import MajorValidation from "../../../Utils/Validation/University/MajorValidation";


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
        validationSchema: MajorValidation(true),
        onSubmit: async (values,{resetForm}) => {
            const trimmedValues = {
                ...values,
                name: values.name.trim(),
                code: values.code.trim(),
                description: values.description.trim(),
            };
            await onSubmit(trimmedValues);

        },
    });

    return (
        <>
            <Form layout="vertical" onFinish={formik.handleSubmit} requiredMark={true} name="trigger">
                <Form.Item label="Tên khoa" required={true}
                           validateStatus={formik.errors.sectionId && formik.touched.sectionId ? 'error' : ''}
                           help={formik.errors.sectionId && formik.touched.sectionId ? formik.errors.sectionId : ''}>
                    <Select
                            showSearch
                            autoFocus={true}
                            placeholder="Tìm kiếm khoa"
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().trimStart().localeCompare((optionB?.label ?? '').toLowerCase().trimStart())
                            }
                            options={sections.map(section => ({value: section.id, label: section.name.trim()}))}
                            onChange={(value) => formik.setFieldValue('sectionId', value)}
                            value={formik.values.sectionId || undefined}
                    />
                </Form.Item>
                <Form.Item
                    label="Tên chuyên ngành"
                    name="name"
                    required={true}
                    validateStatus={formik.errors.name && formik.touched.name ? 'error' : ''}
                    help={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                >
                    <Input onChange={formik.handleChange} value={formik.values.name} name="name"/>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Mã ngành"
                            name="code"
                            required={true}
                            validateStatus={formik.errors.code && formik.touched.code ? 'error' : ''}
                            help={formik.errors.code && formik.touched.code ? formik.errors.code : ''}
                        >
                            <Input onChange={formik.handleChange} value={formik.values.code} name="code"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Số sinh viên"
                            name="numberStudent"
                            required={true}
                            validateStatus={formik.errors.numberStudent && formik.touched.numberStudent ? 'error' : ''}
                            help={formik.errors.numberStudent && formik.touched.numberStudent ? formik.errors.numberStudent : ''}
                        >
                            <Input type={'number'} onChange={formik.handleChange} value={formik.values.numberStudent}
                                   name="numberStudent"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Mô tả" name="description"
                           validateStatus={formik.errors.description && formik.touched.description ? 'error' : ''}
                           help={formik.errors.description && formik.touched.description ? formik.errors.description : ''}>
                    <Input.TextArea  onChange={formik.handleChange} value={formik.values.description} name="description"
                                     rows={6}/>
                </Form.Item>
                <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type="primary" htmlType="submit" icon={<PlusOutlined/>}>
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default MajorForm;