import React, { useEffect, useRef, useState } from 'react';
import styles from './OrdersChart.module.scss';
import { Chart, LinearScale, CategoryScale, Title, Tooltip, Legend, LineController, PointElement, LineElement } from 'chart.js';

Chart.register(LinearScale, CategoryScale, Title, Tooltip, Legend, LineController, PointElement, LineElement);

function OrdersChart({ orders }) {
    const chartRef = useRef(null);
    const [timeframe, setTimeframe] = useState('day'); // Default view

    const groupOrders = (orders, timeframe) => {
        return orders.reduce((acc, order) => {
            const createdAt = new Date(order.createdAt);
            let key;
            if (timeframe === 'day') {
                key = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()}`;
            } else if (timeframe === 'month') {
                key = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;
            } else {
                key = `${createdAt.getFullYear()}`;
            }

            if (!acc[key]) acc[key] = [];
            acc[key].push(order);
            return acc;
        }, {});
    };

    const formatLabel = (key, timeframe) => {
        const parts = key.split('-');
        if (timeframe === 'day') {
            return `${parts[2]} ${new Date(parts[0], parts[1] - 1).toLocaleString('default', { month: 'short' })}`;
        } else if (timeframe === 'month') {
            return `${new Date(parts[0], parts[1] - 1).toLocaleString('default', { month: 'short' })} ${parts[0]}`;
        } else {
            return parts[0];
        }
    };

    const sortOrders = (orders, timeframe) => {
        const groupedOrders = groupOrders(orders, timeframe);
        const sortedKeys = Object.keys(groupedOrders).sort((a, b) => new Date(a) - new Date(b));
    
        const MAX_ITEMS = 7;  
    
        if (sortedKeys.length > MAX_ITEMS) {
            return {
                groupedOrders,
                sortedKeys: sortedKeys.slice(-MAX_ITEMS), 
            };
        }
    
        return { groupedOrders, sortedKeys };
    };

    const { groupedOrders, sortedKeys } = sortOrders(orders, timeframe);
    const chartData = sortedKeys.map(key => groupedOrders[key].length);
    const chartLabels = sortedKeys.map(key => formatLabel(key, timeframe));

    const getChartOptions = () => ({
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                type: 'linear',
                ticks: {
                    stepSize: 1,
                    font: { size: 16, weight: 'bold' },
                    color: '#fff',
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.3)',
                    lineWidth: 1,
                    drawBorder: false,
                    borderDash: [5, 5],
                },
            },
            x: {
                ticks: {
                    font: { size: 16, weight: 'bold' },
                    color: '#fff',
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.3)',
                    lineWidth: 1,
                    drawBorder: false,
                    borderDash: [5, 5],
                },
            },
        },
        plugins: {
            legend: { display: false },
        },
        elements: {
            line: { tension: 0.4 },
        },
    });

    useEffect(() => {
        let chartInstance = null;
        if (chartRef.current) {
            chartInstance = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: chartLabels,
                    datasets: [
                        {
                            label: 'Orders',
                            data: chartData,
                            backgroundColor: 'rgba(209, 79, 168, .6)',
                            borderColor: 'rgba(209, 79, 168, 1)',
                            borderWidth: 4,
                            fill: true,
                            pointRadius: 7,
                            pointBackgroundColor: 'rgba(209, 79, 168, 1)',
                        },
                    ],
                },
                options: getChartOptions(),
            });
        }

        return () => {
            if (chartInstance) chartInstance.destroy();
        };
    }, [orders, timeframe]);

    return (
        <div className={styles.chartContainer}>
            <div className={styles.timeframeButtons}>
                <a
                    className={timeframe === 'day' ? styles.active : ''}
                    onClick={() => setTimeframe('day')}
                >
                    Day
                </a>
                <a
                    className={timeframe === 'month' ? styles.active : ''}
                    onClick={() => setTimeframe('month')}
                >
                    Month
                </a>
                <a
                    className={timeframe === 'year' ? styles.active : ''}
                    onClick={() => setTimeframe('year')}
                >
                    Year
                </a>
            </div>

            <canvas ref={chartRef} />
        </div>
    );
}

export default OrdersChart;