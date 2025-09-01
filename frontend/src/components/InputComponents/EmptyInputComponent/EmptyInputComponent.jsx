import React, { useState } from 'react';
import styles from './EmptyInputComponent.module.scss';
import ErrorInput from '../ErrorInputComponent/ErrorInputComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope, faUserLarge } from '@fortawesome/free-solid-svg-icons';

const EmptyInput = ({ type, errorMessage, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev);
    };

    const setInputIcon = () => {
        switch (type) {
            case 'password':
                return showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />;
            case 'text':
                return <FontAwesomeIcon icon={faUserLarge} />;
            case 'email':
                return <FontAwesomeIcon icon={faEnvelope} />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.inputCtn}>
            <div className={styles.inputWrapper}>
                <input
                    type={showPassword && type === "password" ? "text" : type}
                    className={`${styles.inputArea} ${errorMessage ? styles.errorInput : ''}`}
                    value={value} 
                    placeholder={placeholder}
                    onChange={onChange} 
                    required
                />
                <button
                    type="button"
                    onClick={type === "password" ? handlePasswordToggle : undefined} 
                    className={styles.iconBtn}
                >
                    {setInputIcon()}
                </button>
            </div>
            {errorMessage && <ErrorInput errorMessage={errorMessage} />} {/* Display Error */}
        </div>
    );
};

export default EmptyInput;