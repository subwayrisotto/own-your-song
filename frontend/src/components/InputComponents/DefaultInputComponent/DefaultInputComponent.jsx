import React, { useState, useEffect } from 'react';
import styles from './DefaultInput.module.scss';
import ErrorInput from '../ErrorInputComponent/ErrorInputComponent';

function DefaultInput(props) {
    const { type, index, placeholder, variableName, setFormData, errorMessage } = props;
    const [currentValue, setCurrentValue] = useState(() => {
        const savedData = sessionStorage.getItem("formData");
        return savedData ? JSON.parse(savedData)[variableName] || '' : '';
    });

    const [localError, setLocalError] = useState(errorMessage);

    useEffect(() => {
        setLocalError(errorMessage);
    }, [errorMessage]);

    const handleChange = (e) => {
        const value = e.target.value;
        setCurrentValue(value);
        setLocalError(null);

        setFormData((prevData) => {
            const updatedData = { ...prevData, [variableName]: value };
            sessionStorage.setItem("formData", JSON.stringify(updatedData));
            return updatedData;
        });
    };

    return (
        <>
            <input
                type={type}
                id={`${styles.inputArea}${index}`}
                className={`${styles.inputArea} ${localError ? styles.errorInput : ''}`}
                placeholder={placeholder || ''}
                value={currentValue}
                onChange={handleChange}
                name={variableName}
                required
            />
            {localError && <ErrorInput errorMessage={localError} />}
        </>
    );
}

export default DefaultInput;
