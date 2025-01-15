import React from 'react';
import styles from './CardOpinionComponent.module.scss';
import star from '../../assets/star.svg';

function CardOpinionComponent(props) {
    const { name, rating, comment } = props;

    const nameFormatted = name.replace(" ", "_").toLowerCase();

    return (
        <div className={styles.card}>
            <img 
                className={styles.avatar} 
                src={require(`../../assets/clients-opinions/${nameFormatted}.png`)} 
                alt={`${name}'s avatar`} 
            />
            <p className={styles.comment}>"{comment}"</p>
            <p className={styles.name}>{name.split(" ")[0]}</p>
            <div className={styles.ratingCtn}>
                {
                    Array.from({ length: rating }).map((_, index) => (
                        <img key={index} src={star} alt={`${name}'s rating`} />
                    ))
                }
            </div>
        </div>
    ) 
}

export default CardOpinionComponent