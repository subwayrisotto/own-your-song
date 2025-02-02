import React, {useEffect} from 'react';
import styles from './TextAreaInputComponent.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";

function TextAreaInput(props) {
    const { text, setText, maxChars, index, placeholder, currentPlan, formData, setFormData, variableName } = props;

    useEffect(() => {
        if (formData && variableName in formData) {
            setText(formData[variableName]); 
        }
    }, [formData, variableName]);

    const handleChange = (e) => {
        setText(e.target.value)
        setFormData((prevData) => ({
            ...prevData,
            [variableName]: e.target.value, 
        }));
    };

    return (
        <div className={styles.textarea} key={index}>
            <textarea
                className={styles.textareaInput}
                value={text}
                onChange={handleChange}
                placeholder={placeholder}
                maxLength={maxChars} // Optional: Limit max characters
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
        </div>
  )
}

export default TextAreaInput