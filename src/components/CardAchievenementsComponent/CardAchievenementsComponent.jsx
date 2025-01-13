import React, { useEffect, useState } from 'react';
import styles from './CardComponent.module.scss';

function CardAchievenementsComponent(props) {
    const { header, text } = props;
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = header; 
        const duration = 2000; 
        const increment = end / (duration / 50); 
    
        const timer = setInterval(() => {
        start += increment; 
        if (start >= end) {
            setCount(end); 
            clearInterval(timer);
        } else {
            setCount(Math.round(start)); 
        }
        }, 50);
    
        return () => clearInterval(timer); 
    }, []);

    return (
        <div className={styles.card}>
            <p className={styles.header}>{count}</p>
            <p className={styles.text}>{text}</p>
        </div>
    )
}

export default CardAchievenementsComponent