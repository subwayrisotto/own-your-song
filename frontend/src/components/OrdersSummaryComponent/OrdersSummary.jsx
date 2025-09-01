import React, { useState, useEffect } from 'react';
import styles from './OrdersSummary.module.scss';

function OrdersSummary({ title, icon, currentValue, prevValue, isMoney }) {
    const [isIncreased, setIsIncreased] = useState(false);
    const [count, setCount] = useState(0);
    const [percentageChange, setPercentageChange] = useState("0%");

    // Function to calculate percentage change
    const calculatePercentageChange = (prev, current) => {
        if (prev === 0) {
            return current === 0 ? "0%" : "+100%"; // Prevent +∞%
        }
        const change = ((current - prev) / prev) * 100;
        return `${change > 0 ? '+' : ''}${change.toFixed(0)}%`;
    };

    // Update state whenever values change
    useEffect(() => {
        setIsIncreased(currentValue >= prevValue);
        setPercentageChange(calculatePercentageChange(prevValue, currentValue));
    }, [prevValue, currentValue]);

    // Format value (handle money formatting)
    const formatValue = (value) => (isMoney ? `$${value.toLocaleString()}` : value);

    // Animated count effect
    useEffect(() => {
        let start = 0;
        const duration = 2000; 
        const increment = currentValue / (duration / 50); 
    
        const timer = setInterval(() => {
            start += increment; 
            if (start >= currentValue) {
                setCount(currentValue); 
                clearInterval(timer);
            } else {
                setCount(Math.round(start)); 
            }
        }, 50);
    
        return () => clearInterval(timer); 
    }, [currentValue]);

    return (
        <div className={styles.ordersSummary}>
            <div className={styles.osValues}>
                <p className={styles.osTitle}>{title}</p>
                <div className={styles.osValuesCtn}>
                    <p className={styles.osCurrentValue}>{formatValue(count)}</p>
                    {percentageChange !== "0%" && (
                        <p className={`${styles.osPrevValue} ${isIncreased ? styles.osIncrease : styles.osDecrease}`}>
                            {percentageChange}
                        </p>
                    )}
                </div>
            </div>
            <div className={styles.osIcon}>
                <img className={styles.osImgIcon} src={`${process.env.PUBLIC_URL}/orders/${icon}`} alt={icon} />
            </div>
        </div>
    );
}

export default OrdersSummary;