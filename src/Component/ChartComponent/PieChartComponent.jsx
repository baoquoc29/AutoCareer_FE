// src/components/OverviewChart.js
import React, { useEffect, useRef } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController,PieController } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController,PieController);

const PieChartComponent = ({ data, labels, title }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    label: title,
                    data,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1,
                }]
            },

            options: {
                responsive: true
            }
        });

        // Cleanup function to destroy the chart instance when the component unmounts
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data, labels, title]);
    return <canvas ref={chartRef}></canvas>;
};

export default PieChartComponent;
