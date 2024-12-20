import React, {useEffect} from "react";
import {Button, Form, Input, Modal, Select} from "antd";
import {useSelector} from "react-redux";

const IndustryEditModal = ({ visible, onClose, industry, onSubmit }) => {

    const [form] = Form.useForm();
    const industryData = useSelector((state) => state.IndustryReducer.industryDetail); // assuming job data is stored here
    // Khi mở modal, set giá trị ban đầu cho form
    useEffect(() => {
        if (industryData) {
            const status = industryData.status === 1 ? 0 : 1;
            form.setFieldsValue({
                name: industryData.name,
                code: industryData.code,
                status, // Ensure the status is an integer
            });
        }
    }, [industryData, form]);


    const handleFinish = (values) => {
        console.log(values)
        onSubmit(industry.id, values); // Gọi hàm submit
        onClose(); // Đóng modal
    };

    return (
        <Modal
            title="Chỉnh sửa ngành nghề"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <Form.Item
                    name="code"
                    label="Mã ngành nghề"
                    rules={[{ required: true, message: "Mã ngành nghề là bắt buộc" }]}
                >
                    <Input placeholder="Nhập mã ngành nghề" />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Tên ngành nghề"
                    rules={[{ required: true, message: "Tên ngành nghề là bắt buộc" }]}
                >
                    <Input placeholder="Nhập tên ngành nghề" />
                </Form.Item>
                <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[{ required: true, message: "Vui lòng chọn ngành nghề" }]}>
                    <Select placeholder="Chọn trạng thái" style={{ width: "100%" }}>
                        <Select.Option value={1}>Hoạt động</Select.Option>
                        <Select.Option value={0}>Tạm ngưng</Select.Option>
                    </Select>
                </Form.Item>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default IndustryEditModal;
