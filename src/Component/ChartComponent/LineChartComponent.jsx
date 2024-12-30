import React, { useEffect, useRef } from 'react';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, LineController } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, LineController);

const LineChartComponent = ({ labels, datasets }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [labels, datasets]);

    return <canvas ref={chartRef}></canvas>;
};

export default LineChartComponent;
