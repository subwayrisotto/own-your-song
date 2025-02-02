import React, { useEffect, useState } from 'react';
import styles from './DefaultInput.module.scss';

function DefaultInput(props) {
    const { type, index, placeholder, variableName, formData, setFormData } = props;
    const [currentValue, setCurrentValue] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setCurrentValue(value);
        setFormData((prevData) => ({
            ...prevData,
            [variableName]: value,
        }));
    };

    return (
        <input
            type={type}
            id={`${styles.inputArea}${index}`}
            className={styles.inputArea}
            placeholder={placeholder || ''}
            value={currentValue}
            onChange={handleChange}
            required
        />
    );
}

export default DefaultInput;
