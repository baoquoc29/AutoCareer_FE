import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Hàm để định dạng số với dấu phẩy
const formatSalary = (salary) => {
    return new Intl.NumberFormat().format(salary);
};

const LineChart = ({ data }) => {
    // Sắp xếp lại data theo mức lương trung bình, ngành có lương cao nhất sẽ đứng cuối
    const sortedData = {
        labels: [...data.labels].sort((a, b) => {
            const salaryA = data.datasets[0].data[data.labels.indexOf(a)];
            const salaryB = data.datasets[0].data[data.labels.indexOf(b)];
            return salaryA - salaryB; // Sắp xếp theo mức lương tăng dần
        }),
        datasets: data.datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data
                .map((value, index) => ({
                    value,
                    label: data.labels[index],
                }))
                .sort((a, b) => a.value - b.value) // Sắp xếp dữ liệu trong dataset theo mức lương
                .map((item) => item.value),
        })),
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Thống kê mức lương trung bình của ngành nghề ",
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const salary = tooltipItem.raw;
                        return `Giá trị: ${formatSalary(salary)} VNĐ`; // Định dạng số với dấu phẩy
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Ngành nghề",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Giá trị",
                },
                ticks: {
                    // Hiển thị mức lương với "VND" trên trục Y
                    callback: function (value) {
                        return formatSalary(value) + " VND"; // Thêm "VND" vào nhãn trục Y
                    },
                },
            },
        },
    };

    return <Line data={sortedData} options={options} />;
};

export default LineChart;
