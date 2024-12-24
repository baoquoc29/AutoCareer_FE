import React, {useState} from "react";
import {Button, Card, Col, DatePicker, Divider, Form, message, Row, Statistic} from "antd";
import axios from "axios";

const { RangePicker } = DatePicker;
export function DashboardJob() {
    const [jobCount, setJobCount] = useState(null); // Số lượng công việc trả về
    const [loading, setLoading] = useState(false); // Trạng thái loading khi gọi API

    const handleSubmit = async (values) => {
        if (!values || !values.dates) {
            message.warning("Vui lòng chọn khoảng thời gian!");
            return;
        }

        const [startDate, endDate] = values.dates.map((date) => date.format("YYYY-MM-DD"));

        setLoading(true);
        try {
            const response = await axios.get("/api/job-count", {
                params: {
                    startDate,
                    endDate,
                },
            });

            setJobCount(response.data.count || 0); // Cập nhật số lượng công việc
            message.success("Dữ liệu đã được tải thành công!");
        } catch (error) {
            message.error("Có lỗi xảy ra khi tải dữ liệu!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
                        <Card bordered={false}>
                            <Divider orientation="left" style={{ fontSize: "18px", color: "#096dd9" }}>
                                Đếm công việc theo ngày
                            </Divider>
                            <Form onFinish={handleSubmit} layout="vertical">
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="dates"
                                            label="Chọn khoảng thời gian"
                                            rules={[{ required: true, message: "Vui lòng chọn khoảng thời gian!" }]}
                                        >
                                            <RangePicker format="YYYY-MM-DD" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Button type="primary" htmlType="submit" loading={loading} block>
                                            Lấy dữ liệu
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        {jobCount !== null && (
                            <Card style={{ marginTop: "20px" }}>
                                <Statistic
                                    title="Tổng số công việc"
                                    value={jobCount}
                                    valueStyle={{ color: "#3f8600" }}
                                />
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
