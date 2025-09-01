import React, { useState, useEffect } from 'react';
import styles from './DefaultInput.module.scss';
import ErrorInput from '../ErrorInputComponent/ErrorInputComponent';

function DefaultInput(props) {
    const { 
        type, 
        index, 
        placeholder, 
        variableName, 
        formData, 
        setFormData, 
        errorMessage, 
        onCopy, 
        onPaste, 
        onCut, 
        value,  // Handle pre-filled fields
        disabled // Prop to handle disabling inputs
    } = props;

    const [localError, setLocalError] = useState(errorMessage);

    useEffect(() => {
        setLocalError(errorMessage);
    }, [errorMessage]);

    const handleChange = (e) => {
        const value = e.target.value;
        setLocalError(null);

        // Update formData when user types in the input
        if (formData) {
            setFormData((prevData) => {
                const updatedData = { ...prevData, [variableName]: value };
                sessionStorage.setItem("formData", JSON.stringify(updatedData)); // Save to sessionStorage
                return updatedData;
            });
        }
    };

    // Use formData's value if it exists, otherwise fallback to an empty string
    const currentValue = value || (formData && formData[variableName]) || '';

    // Check if the field should be disabled (only name field is disabled when currentUser exists)
    const isDisabled = (variableName === 'name' && disabled);

    return (
        <>
            <input
                type={type}
                id={`${styles.inputArea}${index}`}
                className={`${styles.inputArea} ${localError ? styles.errorInput : ''}`}
                placeholder={placeholder || ''}
                value={currentValue}
                onChange={handleChange}
                onCopy={onCopy}
                onPaste={onPaste}
                onCut={onCut}
                name={variableName}
                required
                disabled={isDisabled}  // Disable only for the name field if currentUser exists
            />
            {localError && <ErrorInput errorMessage={localError} />}
        </>
    );
}

export default DefaultInput;