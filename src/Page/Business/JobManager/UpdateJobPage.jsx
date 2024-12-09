import React, {useEffect} from "react";
import {Button, Col, DatePicker, Form, Input, InputNumber, message, Row, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {get_job_detail, update_job} from "../../../Redux/actions/JobThunk";
import {get_all_industry_no_pag} from "../../../Redux/actions/IndustryThunk";
import {useNavigate} from "react-router-dom";
import dayjs from 'dayjs';
const JobUpdatePage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const industryOptions = useSelector((state) => state.IndustryReducer.industriesNoPag);
    const jobDetail = useSelector((state) => state.JobReducer.selectedJobDetail);
    const navigate = useNavigate();
    const jobId = sessionStorage.getItem('jobId');

    // Fetch the job details when the page is loaded
    useEffect(() => {
        if (jobId) {
            dispatch(get_job_detail(jobId));
        }
        dispatch(get_all_industry_no_pag());  // Fetch industries without pagination
    }, [dispatch, jobId]);

    // Populate the form with job data when available
    useEffect(() => {
        if (jobDetail) {
            form.setFieldsValue({
                title: jobDetail.title,
                expireDate: jobDetail.expireDate,
                level: jobDetail.level,
                salary: jobDetail.salary,
                industriesID: jobDetail.industriesID,
                jobDescription: jobDetail.jobDescription,
                requirement: jobDetail.requirement,
                benefit: jobDetail.benefit,
                workingTime: jobDetail.workingTime,
            });
        }
    }, [form, jobDetail]);

    const handleSubmit = (values) => {
        // Convert DatePicker value to string format
        const formattedValues = {
            ...values,
            expireDate: values.expireDate.format("YYYY-MM-DD"),
        };
        dispatch(update_job(formattedValues));
        message.success("Cập nhật công việc thành công!");
        navigate("/job-manager");
    };

    return (
        <div className="job-update-page" style={{ padding: "20px" }}>
            <h2>Cập nhật công việc</h2>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item label="Tiêu đề" name="title" rules={[{ required: true }]}>
                    <Input placeholder="Nhập tiêu đề công việc" />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Ngày hết hạn"
                            name="expireDate"
                            rules={[{ required: true, message: "Vui lòng chọn ngày hết hạn" }]}>
                            <DatePicker
                                placeholder="Chọn ngày hết hạn"
                                format="YYYY-MM-DD"
                                style={{ width: "100%" }}
                                value={dayjs()}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Cấp bậc" name="level" rules={[{ required: true }]}>
                            <Select placeholder="Chọn cấp bậc">
                                <Select.Option value="Intern">Intern</Select.Option>
                                <Select.Option value="Fresher">Fresher</Select.Option>
                                <Select.Option value="Junior">Junior</Select.Option>
                                <Select.Option value="Senior">Senior</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Mức lương" name="salary" rules={[{ required: true }]}>
                            <InputNumber placeholder="Nhập mức lương" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Ngành nghề"
                            name="industriesID"
                            rules={[{ required: true, message: "Vui lòng chọn ngành nghề" }]}>
                            <Select placeholder="Chọn ngành nghề" style={{ width: "100%" }}>
                                {industryOptions.map((industry) => (
                                    <Select.Option key={industry.id} value={industry.id}>
                                        {industry.industryName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Mô tả công việc" name="jobDescription" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} placeholder="Mô tả công việc" />
                </Form.Item>
                <Form.Item label="Yêu cầu" name="requirement" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} placeholder="Yêu cầu công việc" />
                </Form.Item>
                <Form.Item label="Phúc lợi" name="benefit">
                    <Input.TextArea rows={2} placeholder="Phúc lợi" />
                </Form.Item>

                <Form.Item label="Thời gian làm việc" name="workingTime" rules={[{ required: true }]}>
                    <Input placeholder="9:00-17:00" />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Cập nhật công việc
                </Button>
            </Form>
        </div>
    );
};

export default JobUpdatePage;
