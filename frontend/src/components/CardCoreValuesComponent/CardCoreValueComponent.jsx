import React from 'react';
import styles from './CardCoreValueComponent.module.scss';

function CardCoreValueComponent(props) {
    const { header, text } = props;

    return (
        <div className={styles.card}>
            <p className={styles.header}>{header}</p>
            <p className={styles.text}>{text}</p>
        </div>
    )
}

export default CardCoreValueComponent