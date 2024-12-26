import React from "react";
import {Form, Button, Select, Card} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {industryService} from "../../../Service/IndustryService/IndustryService";
import {toast} from "react-toastify";  // Importing toast
import 'react-toastify/dist/ReactToastify.css';
import {PlusOutlined, ReloadOutlined} from "@ant-design/icons";

const IndustryForm = ({selectData, load}) => {
    const formik = useFormik({
        initialValues: {
            industries: [], // Chứa danh sách các ngành đã chọn
        },
        validationSchema: Yup.object({
            industries: Yup.array()
                .min(1, "Vui lòng chọn ít nhất một ngành nghề!")
                .max(5, "Bạn chỉ có thể chọn tối đa 5 ngành nghề!"), // Giới hạn tối đa 5 ngành
        }),
        onSubmit: async (values) => {
            try {
                // Lấy danh sách ngành đã chọn
                const selectedIndustries = selectData.filter(industry =>
                    values.industries.includes(industry.name)
                );

                if (selectedIndustries.length > 0) {
                    for (let industry of selectedIndustries) {
                        try {
                            // Kiểm tra xem ngành đã có trong hệ thống chưa
                            const res = await industryService.check_exist_industry(industry.id);
                            if (res.data.exists) {
                                toast.info(`Ngành "${industry.name}" đã có trong doanh nghiệp.`);
                            } else {
                                // Nếu ngành chưa có, thêm ngành vào doanh nghiệp
                                await industryService.create_industry_to_business(industry.id);
                                toast.success(`Ngành "${industry.name}" đã được thêm thành công!`);
                            }
                        } catch (error) {
                            console.error("Lỗi khi kiểm tra ngành:", error);
                            toast.error(`Có lỗi xảy ra khi thêm ngành "${industry.name}".`);
                        }
                    }
                    load(prev => !prev); // Reload dữ liệu
                } else {
                    alert("Ngành không hợp lệ!");
                }
            } catch (error) {
                console.error("Lỗi khi thêm ngành:", error);
                if (error?.response?.data?.message === "Doanh nghiệp đã có ngành nghề này") {
                    toast.error("Doanh nghiệp đã có ngành nghề này.");
                } else {
                    toast.error("Có lỗi xảy ra khi thêm ngành nghề.");
                }
            }
        },
    });
    const handleClear = () => {
        formik.resetForm(); // Reset the form values
    };
    return (
        <Card title="Thêm ngành mới">
            <form onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: "8px" }}>
                    <label htmlFor="industries" style={{ fontWeight: "bold" }}>
                        Tên ngành <span style={{ color: "red" }}>*</span>
                    </label>
                </div>
                <Form.Item
                    name="industries" // Xác định tên của trường
                    help={formik.errors.industries && formik.touched.industries ? formik.errors.industries : null}
                    validateStatus={formik.errors.industries && formik.touched.industries ? "error" : ""}
                    rules={[
                        { required: true, message: "Vui lòng chọn ít nhất một ngành nghề!" }
                    ]}
                >
                    <Select
                        mode="multiple" // Cho phép chọn nhiều ngành nghề
                        onChange={(value) => formik.setFieldValue("industries", value)}
                        value={formik.values.industries}
                        placeholder="Chọn ngành"
                    >
                        {selectData.map((industry) => (
                            <Select.Option key={industry.id} value={industry.name}>
                                {industry.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        htmlType="submit"
                        className="mt-3"
                    >
                        Thêm
                    </Button>
                    <Button
                        type="default"
                        onClick={handleClear}
                        className="mt-3 ml-3"
                        icon={<ReloadOutlined />}
                        style={{ marginLeft: "10px" }}
                    >
                        Làm mới
                    </Button>
                </Form.Item>
            </form>
        </Card>
    );
};

export default IndustryForm;
