import React, { useEffect, useState } from 'react';
import styles from './TextAreaInputComponent.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import ErrorInput from '../ErrorInputComponent/ErrorInputComponent';

function TextAreaInput(props) {
    const { text, setText, maxChars, index, placeholder, currentPlan, formData, setFormData, variableName, errorMessage, currentForm } = props;
    const form = currentForm ? currentForm : "individual" 

    const [localError, setLocalError] = useState(errorMessage);

    useEffect(() => {
        setLocalError(errorMessage);
    }, [errorMessage]);

    useEffect(() => {
        if (formData && variableName in formData) {
            setText(formData[variableName]); 
        }
    }, [formData, variableName]);

    function toCapitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }

    const handleChange = (e) => {
        const newText = e.target.value;
        setText(newText);

        // if (currentPlan === "silver" && newText.length > 100) {
        //     setLocalError("Story cannot exceed 100 characters for Silver plan");
        // } else if (currentPlan === "gold" && newText.length > 300) {
        //     setLocalError("Story cannot exceed 300 characters for Gold plan");
        // } else if (currentPlan === "platinum" && newText.length > 1000) {
        //     setLocalError("Story cannot exceed 1000 characters for Platinum plan");
        // } else {
        //     setLocalError("");  
        // }

        if (newText.length > maxChars) {
            setLocalError(`Story cannot exceed ${maxChars} characters for ${toCapitalize(currentPlan)} plan`);
        } else {
            setLocalError("")
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
                style={{height: form === "business" ? "380px" : "160px"}}
            />
            {
                form !== "business" && <span className={styles.textLength}>
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
            }

            <div className={styles.errorCtn}>
                {localError && <ErrorInput errorMessage={localError} />}
            </div>
        </div>
    );
}

export default TextAreaInput;
