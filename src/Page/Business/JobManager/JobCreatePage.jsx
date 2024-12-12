import React, {useEffect, useState} from "react";
import {Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {create_job} from "../../../Redux/actions/JobThunk";
import {get_all_industry_no_pag} from "../../../Redux/actions/IndustryThunk";
import {useNavigate} from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs-plugin-utc';

const JobCreatePage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const industryOptions = useSelector((state) => state.IndustryReducer.industriesNoPag);
    const navigate = useNavigate();
    const [date, setDate] = useState(null);
    dayjs.extend(utc);

    useEffect(() => {
        dispatch(get_all_industry_no_pag());
    }, [dispatch]);

    const handleDateChange = (value) => {
        const formattedDate
            = value ? dayjs(value).startOf('day').format('YYYY-MM-DD') : null;
        setDate(formattedDate);
    };

    const handleSubmit = (values) => {
        const formattedValues = {
            ...values,
            expireDate: date, // Đảm bảo ngày hết hạn lấy từ state
        };
        dispatch(create_job(formattedValues));
        navigate("/job-manager");
        form.resetFields();
    };

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div className="mt-auto">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div className="job-create-page" style={{
                                    padding: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    minHeight: "100vh",
                                    backgroundColor: "#f0f2f5"
                                }}>
                                    <Card
                                        title={<span
                                            style={{fontSize: "24px", fontWeight: "bold"}}>Tạo công việc mới</span>}
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
                                                rules={[{required: true, message: "Vui lòng nhập tiêu đề công việc"}]}
                                            >
                                                <Input placeholder="Nhập tiêu đề công việc"/>
                                            </Form.Item>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Ngày hết hạn"
                                                        name="expireDate"
                                                        rules={[{
                                                            required: true,
                                                            message: "Vui lòng chọn ngày hết hạn"
                                                        }]}
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
                                                        rules={[{required: true, message: "Vui lòng chọn cấp bậc"}]}
                                                    >
                                                        <Select placeholder="Chọn cấp bậc">
                                                            <Select.Option value="Không yêu cầu kinh nghiệm">Không yêu
                                                                cầu kinh nghiệm</Select.Option>
                                                            <Select.Option value="Thực tập sinh">Thực tập sinh</Select.Option>
                                                            <Select.Option value="1 năm kinh
                                                                nghiệm">1 năm kinh
                                                                nghiệm</Select.Option>
                                                            <Select.Option value="2 năm kinh
                                                                nghiệm">2 năm kinh
                                                                nghiệm</Select.Option>
                                                            <Select.Option value="3 năm kinh
                                                                nghiệm">3 năm kinh
                                                                nghiệm</Select.Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Mức lương"
                                                        name="salary"
                                                        rules={[{required: true, message: "Vui lòng nhập mức lương"}]}
                                                    >
                                                        <InputNumber
                                                            placeholder="Nhập mức lương (VND)"
                                                            style={{ width: "100%" }}
                                                            formatter={(value) =>
                                                                value
                                                                    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
                                                                    : ""
                                                            }
                                                            parser={(value) =>
                                                                value ? value.replace(/[VND,\s.]/g, "") : ""
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Ngành nghề"
                                                        name="industriesID"
                                                        rules={[{required: true, message: "Vui lòng chọn ngành nghề"}]}
                                                    >
                                                        <Select placeholder="Chọn ngành nghề" style={{width: "100%"}}>
                                                            {industryOptions.map((industry) => (
                                                                <Select.Option key={industry.industryId}
                                                                               value={industry.industryId}>
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
                                                rules={[{required: true, message: "Vui lòng nhập mô tả công việc"}]}
                                            >
                                                <Input.TextArea rows={4} placeholder="Mô tả công việc"/>
                                            </Form.Item>

                                            <Form.Item
                                                label="Yêu cầu"
                                                name="requirement"
                                                rules={[{required: true, message: "Vui lòng nhập yêu cầu công việc"}]}
                                            >
                                                <Input.TextArea rows={4} placeholder="Yêu cầu công việc"/>
                                            </Form.Item>

                                            <Form.Item
                                                label="Phúc lợi"
                                                name="benefit"
                                            >
                                                <Input.TextArea rows={4} placeholder="Phúc lợi"/>
                                            </Form.Item>

                                            <Form.Item
                                                label="Thời gian làm việc"
                                                name="workingTime"
                                                rules={[{required: true, message: "Vui lòng nhập thời gian làm việc"}]}
                                            >
                                                <Input placeholder="9:00-17:00"/>
                                            </Form.Item>

                                            <Row justify="space-between">
                                                <Col>
                                                    <Button type="default" danger
                                                            onClick={() => navigate("/job-manager")}>
                                                        Quay lại
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button type="primary" htmlType="submit">
                                                        Thêm công việc
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

export default JobCreatePage;
