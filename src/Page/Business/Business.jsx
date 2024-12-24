import React, {useEffect} from "react";
import {Card, Col, Divider, Row} from "antd";
import {Bar} from "react-chartjs-2";  // Import Bar chart từ react-chartjs-2
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {useDispatch, useSelector} from "react-redux";
import {get_count_used_industry} from "../../Redux/actions/IndustryThunk";
import {ArrowDownOutlined, FireOutlined} from "@ant-design/icons";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Business() {
    const dispatch = useDispatch();
    const industriesCount = useSelector((state) => state.IndustryReducer.industriesCount || []);

    useEffect(() => {
        dispatch(get_count_used_industry()); // Gọi API khi component được render lần đầu
    }, [dispatch]);

    // Tạo một mảng màu cho mỗi ngành nghề
    const colors = [
        'rgba(75, 192, 192, 0.2)', // Màu 1
        'rgba(255, 99, 132, 0.2)', // Màu 2
        'rgba(54, 162, 235, 0.2)', // Màu 3
        'rgba(255, 159, 64, 0.2)', // Màu 4
        'rgba(153, 102, 255, 0.2)', // Màu 5
        'rgba(255, 159, 64, 0.2)', // Màu 6
    ];

    // Chuyển đổi dữ liệu từ API thành định dạng phù hợp cho Chart.js
    // Kiểm tra nếu industriesCount có dữ liệu hợp lệ
    const data = industriesCount && industriesCount.length > 0 ? {
        labels: industriesCount.map((industry) => industry.industryName),  // Nhãn của các cột
        datasets: [
            {
                label: 'Số lượng công việc',  // Nhãn cho bộ dữ liệu
                data: industriesCount.map((industry) => industry.jobCount),  // Dữ liệu số lượng công việc
                backgroundColor: industriesCount.map((_, index) => colors[index % colors.length]),  // Mỗi ngành nghề có một màu riêng
                borderColor: industriesCount.map((_, index) => colors[index % colors.length]),  // Màu viền của các cột
                borderWidth: 1,
            },
        ],
    } : {labels: [], datasets: []};

    // Tính toán ngành nghề có số lượng công việc nhiều nhất
    const maxIndustry = industriesCount.length > 0
        ? industriesCount.reduce((max, industry) => industry.jobCount > max.jobCount ? industry : max)
        : null;

    // Tính toán ngành nghề có số lượng công việc ít nhất
    const minIndustry = industriesCount.length > 0
        ? industriesCount.reduce((min, industry) => industry.jobCount < min.jobCount ? industry : min)
        : null;

    const options = {
        responsive: true,  // Cho phép biểu đồ tự động thay đổi kích thước khi thay đổi kích thước cửa sổ
        indexAxis: 'y',  // Chuyển sang biểu đồ Bar ngang
        plugins: {
            title: {
                display: true,
                // text: 'Thống kê ngành nghề',  // Tiêu đề cho biểu đồ
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `Số lượng công việc: ${tooltipItem.raw}`,  // Tùy chỉnh thông tin tooltip
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Số lượng công việc',  // Tiêu đề trục X (trong trường hợp biểu đồ ngang là trục X)
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Ngành nghề',  // Tiêu đề trục Y (trong trường hợp biểu đồ ngang là trục Y)
                },
            },
        },
    };

    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div className="content__boxed">
                        <div className="content__wrap">
                            <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
                                <div className="col-md-12 mb-3">
                                    <Row gutter={[16, 16]}>
                                        <Col span={24} md={18}>
                                            <Card bordered={false}>
                                                <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>Thống kê ngành nghề</Divider>
                                                <Bar data={data} options={options}/> {/* Hiển thị biểu đồ Bar ngang */}
                                            </Card>
                                        </Col>
                                        <Col span={24} md={6}>
                                            <Row gutter={[16, 16]}>
                                                <Col span={24}>
                                                    {maxIndustry && (
                                                        <Card>
                                                            <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>
                                                                <FireOutlined style={{color: "#ff4d4f", marginRight: "8px"}} />
                                                                Ngành nghề phổ biến
                                                            </Divider>
                                                            <p><strong>Ngành nghề:</strong> {maxIndustry.industryName}</p>
                                                            <p><strong>Số lượng công việc:</strong> {maxIndustry.jobCount}</p>
                                                        </Card>
                                                    )}
                                                </Col>
                                                <Col span={24}>
                                                    <Card>
                                                        <Divider orientation="left" style={{fontSize: "18px", color: "#096dd9"}}>
                                                            <ArrowDownOutlined style={{color: "#52c41a", marginRight: "8px"}} />
                                                            Ngành nghề ít dùng
                                                        </Divider>
                                                        {minIndustry ? (
                                                            <>
                                                                <p><strong>Ngành nghề:</strong> {minIndustry.industryName}</p>
                                                                <p><strong>Số lượng công việc:</strong> {minIndustry.jobCount}</p>
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
