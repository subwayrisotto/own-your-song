import React, { useEffect, useState } from 'react';
import styles from './DefaultInput.module.scss';

function DefaultInput(props) {
    const { type, index, placeholder, variableName, formData, setFormData } = props;
    const [currentValue, setCurrentValue] = useState('');

    useEffect(() => {
        if (formData && variableName in formData) {
            setCurrentValue(formData[variableName]); 
        }
    }, [formData, variableName]);

    const handleChange = (e) => {
        setCurrentValue(e.target.value);
        setFormData((prevData) => ({
            ...prevData,
            [variableName]: e.target.value, 
        }));
    };

    return (
        <input
            type={type}
            id={`${styles.inputArea}${index}`} 
            className={styles.inputArea}
            placeholder={placeholder || ''} 
            key={index} 
            value={currentValue}
            onChange={handleChange}
            required
        />
    );
}

export default DefaultInput;