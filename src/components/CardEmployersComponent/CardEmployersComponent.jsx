import React from 'react';
import styles from './CardEmployersComponent.module.scss';

function CardEmployersComponent(props) {
    const { name, position, responsibilities } = props;

    return (
        <div className={styles.card}>
            <img 
                className={styles.avatar} 
                src={require(`../../assets/employers/${name}.png`)} 
                alt={`${name}'s avatar`} 
            />
            <p className={styles.name}>{name}</p>
            <p className={styles.position}>{position}</p>
            <p className={styles.responsibilities}>{responsibilities}</p>
        </div>
    ) 
}

export default CardEmployersComponent