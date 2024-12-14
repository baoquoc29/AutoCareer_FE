import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {get_job_detail, update_job} from "../../../Redux/actions/JobThunk";
import {get_all_industry_no_pag} from "../../../Redux/actions/IndustryThunk";
import {useLocation, useNavigate} from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs-plugin-utc';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const JobUpdatePage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const industryOptions = useSelector((state) => state.IndustryReducer.industriesNoPag);
    const jobData = useSelector((state) => state.JobReducer.selectedJobDetail); // assuming job data is stored here
    const navigate = useNavigate();
    const location = useLocation();
    const { jobId } = location.state || {}; // Lấy jobId từ state
    const [date, setDate] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [requirement, setRequirement] = useState("");
    const [benefit, setBenefit] = useState("");

    dayjs.extend(utc);

    // Load job data and industries
    useEffect(() => {
        dispatch(get_all_industry_no_pag());
        dispatch(get_job_detail(jobId)); // Action to fetch job details
    }, [dispatch, jobId]);

    useEffect(() => {
        if (jobData) {
            form.setFieldsValue({
                title: jobData.title,
                expireDate: jobData.expireDate ? dayjs.utc(jobData.expireDate) : null, // Ensure UTC handling
                level: jobData.level,
                salary: jobData.salary,
                industriesID: jobData.industry.id,
                jobDescription: jobData.jobDescription,
                requirement: jobData.requirement,
                benefit: jobData.benefit,
                workingTime: jobData.workingTime,
            });
        }
    }, [jobData, form]);


    // Handle form submission
    const handleSubmit = (values) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn cập nhật công việc này?',
            content: 'Các thay đổi sẽ được lưu lại.',
            okText: 'Có',
            cancelText: 'Không',
            onOk: () => {
                const formattedValues = { ...values };
                dispatch(update_job(jobId, formattedValues)); // Dispatch update action
                navigate("/job-manager"); // Navigate back to job manager
            },
            onCancel: () => {
                // Do nothing if canceled
            },
        });
    };

    const handleDateChange = (value) => {
        // Now you can use utc() method
        const formattedDate
            = value ? dayjs(value).utc().startOf('day').format('YYYY-MM-DD') : null;
        setDate(formattedDate);
    };

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div className="mt-auto">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div className="job-update-page" style={{
                                    padding: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    minHeight: "100vh",
                                    backgroundColor: "#f0f2f5"
                                }}>
                                    <Card
                                        title={<span style={{fontSize: "24px", fontWeight: "bold"}}>Chỉnh sửa công việc</span>}
                                        style={{
                                            width: "100%",
                                            maxWidth: "900px",
                                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                            textAlign: "center"
                                        }}
                                    >
                                        <Form form={form} onFinish={handleSubmit} layout="vertical">
                                            <Form.Item
                                                label="Tiêu đề"
                                                name="title"
                                                rules={[{ required: true, message: "Vui lòng nhập tiêu đề công việc" }]}
                                            >
                                                <Input placeholder="Nhập tiêu đề công việc" />
                                            </Form.Item>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Ngày hết hạn"
                                                        name="expireDate"
                                                        rules={[{
                                                            required: true,
                                                            message: "Vui lòng chọn ngày hết hạn" }]}
                                                    >
                                                        <DatePicker
                                                            placeholder="Chọn ngày hết hạn"
                                                            format="DD-MM-YYYY" // Hiển thị theo định dạng dd-mm-yyyy
                                                            style={{ width: "100%" }}
                                                            disabledDate={(current) => current && current.isBefore(dayjs().startOf('day'), 'day')}
                                                            value={date ? dayjs(date) : null} // Đảm bảo giá trị hiển thị đúng
                                                            onChange={handleDateChange}
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Cấp bậc"
                                                        name="level"
                                                        rules={[{ required: true, message: "Vui lòng chọn cấp bậc" }]}
                                                    >
                                                        <Select placeholder="Chọn cấp bậc">
                                                            <Select.Option value="Không yêu cầu kinh nghiệm">Không yêu cầu kinh nghiệm</Select.Option>
                                                            <Select.Option value="Thực tập sinh">Thực tập sinh</Select.Option>
                                                            <Select.Option value="1 năm kinh nghiệm">1 năm kinh nghiệm</Select.Option>
                                                            <Select.Option value="2 năm kinh nghiệm">2 năm kinh nghiệm</Select.Option>
                                                            <Select.Option value="3 năm kinh nghiệm">3 năm kinh nghiệm</Select.Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Mức lương"
                                                        name="salary"
                                                        rules={[{ required: true, message: "Vui lòng nhập mức lương" }]}
                                                    >
                                                        <InputNumber
                                                            placeholder="Nhập mức lương (VND)"
                                                            style={{ width: "100%" }}
                                                            formatter={(value) =>
                                                                value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND" : ""
                                                            }
                                                            parser={(value) => (value ? value.replace(/[VND,\s.]/g, "") : "")}
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Ngành nghề"
                                                        name="industriesID"
                                                        rules={[{ required: true, message: "Vui lòng chọn ngành nghề" }]}
                                                    >
                                                        <Select placeholder="Chọn ngành nghề" style={{ width: "100%" }}>
                                                            {industryOptions.map((industry) => (
                                                                <Select.Option key={industry.industryId} value={industry.industryId}>
                                                                    {industry.industryName}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Form.Item
                                                label="Mô tả công việc"
                                                name="jobDescription"
                                                rules={[{ required: true, message: "Vui lòng nhập mô tả công việc" }]}
                                            >
                                                <ReactQuill
                                                    theme="snow"
                                                    value={jobDescription}
                                                    onChange={setJobDescription}
                                                    placeholder="Mô tả công việc"
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label="Yêu cầu"
                                                name="requirement"
                                                rules={[{ required: true, message: "Vui lòng nhập yêu cầu công việc" }]}
                                            >
                                                <ReactQuill
                                                    theme="snow"
                                                    value={requirement}
                                                    onChange={setRequirement}
                                                    placeholder="Yêu cầu công việc"
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label="Phúc lợi"
                                                name="benefit"
                                            >
                                                <ReactQuill
                                                    theme="snow"
                                                    value={benefit}
                                                    onChange={setBenefit}
                                                    placeholder="Phúc lợi"
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label="Thời gian làm việc"
                                                name="workingTime"
                                                rules={[{ required: true, message: "Vui lòng nhập thời gian làm việc" }]}
                                            >
                                                <Input placeholder="9:00-17:00" />
                                            </Form.Item>

                                            <Row justify="space-between">
                                                <Col>
                                                    <Button type="default" danger onClick={() => navigate(-1)}>
                                                        Quay lại
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button type="primary" htmlType="submit">
                                                        Cập nhật công việc
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobUpdatePage;
