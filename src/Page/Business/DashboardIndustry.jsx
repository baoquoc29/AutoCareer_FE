import React, {useEffect} from "react";
import {Card, Col, Divider, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {get_avg_salary_industry, get_count_used_industry} from "../../Redux/actions/IndustryThunk";
import {ArrowDownOutlined, FireOutlined} from "@ant-design/icons";
import IndustryBarChart from "./Chart/IndustryBarChart"; // Import component mới
import LineChart from "./Chart/LineChart";

export function DashboardIndustry() {
    const dispatch = useDispatch();
    const industriesCount = useSelector((state) => state.IndustryReducer.industriesCount || []);
    const industriesAvgSalary = useSelector((state) => state.IndustryReducer.industriesAvgSalary || []);

    useEffect(() => {
        dispatch(get_count_used_industry());
        dispatch(get_avg_salary_industry()); // Gọi API khi component được render lần đầu
    }, [dispatch]);

    const colors = [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ];

    // Dữ liệu cho Bar Chart
    const data = industriesCount && industriesCount.length > 0 ? {
        labels: industriesCount.map((industry) => industry.industryName),
        datasets: [
            {
                label: 'Số lượng công việc',
                data: industriesCount.map((industry) => industry.jobCount),
                backgroundColor: industriesCount.map((_, index) => colors[index % colors.length]),
                borderColor: industriesCount.map((_, index) => colors[index % colors.length]),
                borderWidth: 1,
            },
        ],
    } : {labels: [], datasets: []};

    // Dữ liệu cho Line Chart
    const lineChartData = {
        labels: industriesAvgSalary.map((industry) => industry.industryName), // Nhãn cho trục X
        datasets: [
            {
                label: "Mức lương trung bình",
                data: industriesAvgSalary.map((industry) => {
                    // Loại bỏ dấu phẩy và chuyển chuỗi thành số
                    const salary = industry.avgSalary.replace(/,/g, '');
                    return parseFloat(salary);
                }),
                borderColor: "rgba(75, 192, 192, 1)", // Màu đường kẻ
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu vùng tô dưới đường
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointBorderColor: "#fff",
            },
        ],
    };

    // Tính toán ngành nghề có mức lương trung bình cao nhất và thấp nhất
    const maxSalaryIndustry = industriesAvgSalary.length > 0
        ? industriesAvgSalary.reduce((max, industry) => {
            const salary = parseFloat(industry.avgSalary.replace(/,/g, ''));
            return salary > max.salary ? {industry, salary} : max;
        }, {salary: -Infinity, industry: null}).industry
        : null;

    const minSalaryIndustry = industriesAvgSalary.length > 0
        ? industriesAvgSalary.reduce((min, industry) => {
            const salary = parseFloat(industry.avgSalary.replace(/,/g, ''));
            return salary < min.salary ? {industry, salary} : min;
        }, {salary: Infinity}).industry
        : null;

    const maxIndustry = industriesCount.length > 0
        ? industriesCount.reduce((max, industry) => industry.jobCount > max.jobCount ? industry : max)
        : null;

    const minIndustry = industriesCount.length > 0
        ? industriesCount.reduce((min, industry) => industry.jobCount < min.jobCount ? industry : min)
        : null;

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div className="content__boxed">
                        <div className="content__wrap">
                            <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
                                <div className="col-md-12 mb-3">
                                    <Row gutter={[16, 16]}>
                                        <Col span={24} md={17}>
                                            <Card bordered={false}>
                                                <Divider orientation="left"
                                                         style={{fontSize: "18px", color: "#096dd9"}}>
                                                    Thống kê ngành nghề
                                                </Divider>
                                                <IndustryBarChart
                                                    data={data}/> {/* Gọi component biểu đồ */}
                                            </Card>
                                            <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}/>
                                            <Card>
                                                <Divider orientation="left"
                                                         style={{fontSize: "18px", color: "#096dd9"}}>
                                                    Mức lương trung bình
                                                </Divider>
                                                <LineChart
                                                    data={lineChartData}/>
                                            </Card>
                                        </Col>
                                        <Col span={24} md={7}>
                                            <Row gutter={[16, 16]}>
                                                <Col span={24}>
                                                    {maxIndustry && (
                                                        <Card>
                                                            <Divider orientation="left"
                                                                     style={{
                                                                         fontSize: "18px",
                                                                         color: "#096dd9",
                                                                         display: "flex",
                                                                         alignItems: "center",
                                                                         overflow: "hidden",
                                                                         textOverflow: "ellipsis",
                                                                         whiteSpace: "nowrap",
                                                                         flexShrink: 1,
                                                                         }}>
                                                                <FireOutlined
                                                                    style={{color: "#ff4d4f", marginRight: "8px"}}/>
                                                                Ngành nghề phổ biến
                                                            </Divider>
                                                            <p><strong>Ngành nghề:</strong> {maxIndustry.industryName}
                                                            </p>
                                                            <p><strong>Số lượng công
                                                                việc:</strong> {maxIndustry.jobCount}</p>
                                                        </Card>
                                                    )}
                                                </Col>
                                                <Col span={24}>
                                                    <Card>
                                                        <Divider orientation="left"
                                                                 style={{
                                                                     fontSize: "18px",
                                                                     color: "#096dd9",
                                                                     display: "flex",
                                                                     alignItems: "center",
                                                                     overflow: "hidden",
                                                                     textOverflow: "ellipsis",
                                                                     whiteSpace: "nowrap",
                                                                     flexShrink: 1,
                                                                 }}>
                                                            <ArrowDownOutlined
                                                                style={{color: "#52c41a", marginRight: "8px"}}/>
                                                            Ngành nghề ít dùng
                                                        </Divider>
                                                        {minIndustry ? (
                                                            <>
                                                                <p><strong>Ngành
                                                                    nghề:</strong> {minIndustry.industryName}</p>
                                                                <p><strong>Số lượng công
                                                                    việc:</strong> {minIndustry.jobCount}</p>
                                                            </>
                                                        ) : (
                                                            <p>Không có dữ liệu ngành nghề.</p>
                                                        )}
                                                    </Card>
                                                </Col>
                                                {/* Thêm phần hiển thị ngành nghề có mức lương cao nhất và thấp nhất */}
                                                <Col span={24}>
                                                    <Card>
                                                        <Divider orientation="left"
                                                                 style={{
                                                                     fontSize: "18px",
                                                                     color: "#096dd9",
                                                                     display: "flex",
                                                                     alignItems: "center",
                                                                     overflow: "hidden",
                                                                     textOverflow: "ellipsis",
                                                                     whiteSpace: "nowrap",
                                                                     flexShrink: 1,
                                                                 }}>
                                                            Ngành nghề lương cao nhất
                                                        </Divider>
                                                        {maxSalaryIndustry ? (
                                                            <>
                                                                <p><strong>Ngành
                                                                    nghề:</strong> {maxSalaryIndustry.industryName}</p>
                                                                <p><strong>Mức lương trung
                                                                    bình:</strong> {maxSalaryIndustry.avgSalary} VNĐ</p>
                                                            </>
                                                        ) : (
                                                            <p>Không có dữ liệu ngành nghề.</p>
                                                        )}
                                                    </Card>
                                                </Col>
                                                <Col span={24}>
                                                    <Card>
                                                        <Divider orientation="left"
                                                                 style={{
                                                                     fontSize: "18px",
                                                                     color: "#096dd9",
                                                                     display: "flex",
                                                                     alignItems: "center",
                                                                     overflow: "hidden",
                                                                     textOverflow: "ellipsis",
                                                                     whiteSpace: "nowrap",
                                                                     flexShrink: 1,
                                                                 }}>
                                                            Ngành nghề lương thấp nhất
                                                        </Divider>
                                                        {minSalaryIndustry ? (
                                                            <>
                                                                <p><strong>Ngành
                                                                    nghề:</strong> {minSalaryIndustry.industryName}</p>
                                                                <p><strong>Mức lương trung
                                                                    bình:</strong> {minSalaryIndustry.avgSalary} VNĐ</p>
                                                            </>
                                                        ) : (
                                                            <p>Không có dữ liệu ngành nghề.</p>
                                                        )}
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
