    import React, { useEffect, useRef } from 'react';
    import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController } from 'chart.js';

    Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController);

    const truncateLabel = (label, maxLength) => {
        if (label.length > maxLength) {
            return `${label.substring(0, maxLength)}...`;
        }
        return label;
    };

    const BarChartComponent = ({ data, labels, title }) => {
        const chartRef = useRef(null);
        const chartInstanceRef = useRef(null);
        const maxLabelLength = 25;

        const truncatedLabels = labels.map(label => truncateLabel(label, maxLabelLength));
        useEffect(() => {
            const ctx = chartRef.current.getContext('2d');

            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels:truncatedLabels,
                    datasets: [{
                        label: title ,
                        data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }]
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
        }, [data, truncatedLabels , title]);

        return <canvas ref={chartRef}></canvas>;
    };

    export default BarChartComponent;
