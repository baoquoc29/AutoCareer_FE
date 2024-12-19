import React, {useEffect, useState} from "react";
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function University() {
    const initialData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3], // initial data
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // State to hold the chart data
    const [data, setData] = useState(initialData);

    // Effect to simulate data update
    useEffect(() => {
        // Simulate data change after 3 seconds
        const interval = setInterval(() => {
            setData((prevData) => {
                // Generate new data for the chart
                const newData = prevData.datasets[0].data.map(() => Math.floor(Math.random() * 20));
                return {
                    ...prevData,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: newData,
                        },
                    ],
                };
            });
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    // Chart options
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true, // Ensures the y-axis starts at 0
            },
        },
    };

    return (
        <>
            <section>
                <div className="m-5 mt-5">
                    <div style={{ width: '800px', height: '400px' }}>
                        <h2>University Bar Chart</h2>
                        <Bar data={data} options={options}/>
                    </div>
                </div>
            </section>
        </>
    );
}
