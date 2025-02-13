import React, { useEffect, useState } from 'react';
import styles from './TextAreaInputComponent.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import ErrorInput from '../ErrorInputComponent/ErrorInputComponent';

function TextAreaInput(props) {
    const { text, setText, maxChars, index, placeholder, currentPlan, formData, setFormData, variableName, errorMessage } = props;

    const [localError, setLocalError] = useState(errorMessage);

    useEffect(() => {
        setLocalError(errorMessage);
    }, [errorMessage]);

    useEffect(() => {
        if (formData && variableName in formData) {
            setText(formData[variableName]); 
        }
    }, [formData, variableName]);

    const handleChange = (e) => {
        const newText = e.target.value;
        setText(newText);

        if (currentPlan === "silver" && newText.length > 50) {
            setLocalError("Story cannot exceed 50 characters for Silver plan");
        } else if (currentPlan === "gold" && newText.length > 100) {
            setLocalError("Story cannot exceed 100 characters for Gold plan");
        } else if (currentPlan === "platinum" && newText.length > 1000) {
            setLocalError("Story cannot exceed 1000 characters for Platinum plan");
        } else {
            setLocalError("");  
        }
        
        setFormData((prevData) => ({
            ...prevData,
            [variableName]: newText,
        }));
    };

    return (
        <div className={styles.textarea} key={index}>
            <textarea
                className={`${styles.textareaInput} ${localError ? styles.errorInput : ''}`}
                value={text}
                onChange={handleChange}
                placeholder={placeholder}
                // maxLength={maxChars} // Optional: Limit max characters
            />
            <span className={styles.textLength}>
                {
                    (currentPlan === "platinum")  ? (
                        <span>
                            <FontAwesomeIcon icon={faInfinity} />
                        </span>
                    ) : (
                        <span>
                            {text.length}/{maxChars}
                        </span>
                    )
                }
            </span>

            <div className={styles.errorCtn}>
                {localError && <ErrorInput errorMessage={localError} />}
            </div>
        </div>
    );
}

export default TextAreaInput;
