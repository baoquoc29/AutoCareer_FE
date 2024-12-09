import React from "react";
import {Form, Button, Select, Card} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {industryService} from "../../../Service/IndustryService/IndustryService";
import {toast} from "react-toastify";  // Importing toast
import 'react-toastify/dist/ReactToastify.css';

const IndustryForm = ({selectData, load}) => {
    const formik = useFormik({
        initialValues: {
            name: "",
        }, validationSchema: Yup.object({
            name: Yup.string().required("Tên ngành là bắt buộc"),
        }), onSubmit: async (values) => {
            try {
                // Tìm ngành đã chọn dựa trên tên ngành
                const selectedIndustry = selectData.find(industry => industry.name === values.name);
                if (selectedIndustry) {
                    await industryService.create_industry(selectedIndustry.id); // Sử dụng id ở đây
                    toast.success("Ngành nghề đã được thêm thành công!")
                    load(prev => !prev)
                } else {
                    alert("Ngành không hợp lệ!");
                }
            } catch (error) {
                console.error("Lỗi khi thêm ngành:", error);
                // Check if the error contains the specific message
                if (error?.response?.data?.message === "Doanh nghiệp đã có ngành nghề này") {
                    toast.error("Doanh nghiệp đã có ngành nghề này.");
                } else {
                    toast.error("Có lỗi xảy ra khi thêm ngành nghề.");
                }
            }
        },
    });

    return (<Card title="Thêm ngành mới">
            <form onSubmit={formik.handleSubmit}>
                <Form.Item
                    label="Tên ngành"
                    help={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                    validateStatus={formik.errors.name && formik.touched.name ? "error" : ""}
                >
                    <Select
                        onChange={(value) => {
                            // Tìm industry tương ứng với name đã chọn và lấy id
                            selectData.find(industry => industry.name === value);
                            formik.setFieldValue("name", value);
                        }}
                        value={formik.values.name}
                        placeholder="Chọn ngành"
                    >
                        {selectData.map((industry) => (<Select.Option key={industry.id} value={industry.name}>
                                {industry.name}
                            </Select.Option>))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </form>
        </Card>);
};

export default IndustryForm;

