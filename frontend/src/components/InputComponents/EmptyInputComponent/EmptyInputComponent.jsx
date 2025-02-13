import React, { useState, useEffect } from 'react';
import styles from './EmptyInputComponent.module.scss';
import ErrorInput from '../ErrorInputComponent/ErrorInputComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const EmptyInput = (props) => {
    const { type, errorMessage, placeholder } = props;
    const [currentValue, setCurrentValue] = useState('');
    const [localError, setLocalError] = useState(errorMessage);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setLocalError(errorMessage);
    }, [errorMessage]);

    const handleChange = (e) => {
        const value = e.target.value;
        setCurrentValue(value);
        setLocalError(null); 
    };

    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev); 
    };

    return (
        <div className={styles.inputCtn}>
            <div className={styles.inputWrapper}>
                <input
                    type={showPassword ? 'text' : type} 
                    className={`${styles.inputArea} ${localError ? styles.errorInput : ''}`}
                    value={currentValue}
                    placeholder={placeholder}
                    onChange={handleChange}
                    required
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handlePasswordToggle}
                        className={styles.passwordToggleBtn}
                    >
                        {
                            showPassword 
                                ? <FontAwesomeIcon icon={faEye} />
                                : <FontAwesomeIcon icon={faEyeSlash} />
                        }  
                    </button>
                )}
            </div>
            {localError && <ErrorInput errorMessage={localError} />}
        </div>
    );
};

export default EmptyInput;
