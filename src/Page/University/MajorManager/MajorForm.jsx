import {useFormik} from "formik";
import {Button, Col, Form, Input, Row, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {get_all_sections} from "../../../Redux/actions/SectionThunk";
import {validateField} from "../../../Utils/Validation/MajorValidation";

const MajorForm = ({onSubmit}) => {
    const dispatch = useDispatch();
    const sections = useSelector(state => state.SectionReducer.sections);
    useEffect(() => {
        dispatch(get_all_sections())
    }, [dispatch]);
    const handleSectionChange = (value) => {
        console.log("Selected Section ID:", value); // Log giá trị ID của section được chọn
        formik.setFieldValue('sectionId', value);
    };
    const formik = useFormik({
        initialValues: {
            sectionId: '',
            name: '',
            code: '',
            numberStudent: '',
            description: '',
            status: 'ACTIVE',
        },
        onSubmit,
    });
    return (
        <>
            <Form layout="vertical" onFinish={formik.handleSubmit} requiredMark={true} name="trigger">
                <Form.Item label="Tên khoa" required={true} rules={validateField("section")}>
                    <Select
                        showSearch
                        autoFocus={true}
                        placeholder="Tìm kiếm khoa"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={sections.map(section => ({value: section.id, label: section.name}))}
                        onChange={handleSectionChange}
                        value={formik.values.sectionId}
                    />
                </Form.Item>

                <Form.Item
                    label="Tên chuyên ngành"
                    name="Tên ngành"
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
                            <Input onChange={formik.handleChange} value={formik.values.numberStudent}
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