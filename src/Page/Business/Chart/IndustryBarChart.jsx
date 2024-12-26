// IndustryBarChart.js
import React from "react";
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IndustryBarChart = ({data}) => {
    const options = {
        responsive: true,
        indexAxis: 'y', // Chuyển sang biểu đồ Bar ngang
        plugins: {
            title: {
                display: true,
                text: 'Thống kê ngành nghề',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `Số lượng công việc: ${tooltipItem.raw}`, // Tùy chỉnh tooltip
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Số lượng công việc',
                },
                ticks: {
                    // Chỉ hiển thị số nguyên
                    beginAtZero: true,  // Đảm bảo bắt đầu từ số 0 nếu cần
                    stepSize: 1,        // Đảm bảo bước là 1
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Ngành nghề',
                },
            },
        },
    };

    return <Bar data={data} options={options}/>;
};

export default IndustryBarChart;
