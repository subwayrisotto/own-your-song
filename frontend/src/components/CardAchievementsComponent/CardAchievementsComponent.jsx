import React, { useEffect, useState } from 'react';
import styles from './CardAchievementsComponent.module.scss';

function CardAchievementsComponent(props) {
    const { value, text } = props;
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000; 
        const increment = value / (duration / 50); 
    
        const timer = setInterval(() => {
        start += increment; 
        if (start >= value) {
            setCount(value); 
            clearInterval(timer);
        } else {
            setCount(Math.round(start)); 
        }
        }, 50);
    
        return () => clearInterval(timer); 
    }, [value]);

    return (
        <div className={styles.card}>
            <p className={styles.header}>{count}</p>
            <p className={styles.text}>{text}</p>
        </div>
    )
}

export default CardAchievementsComponent