import React, { useEffect, useState } from 'react';
import EmptyInput from '../../InputComponents/EmptyInputComponent/EmptyInputComponent';
import ReadOnlyInput from '../../InputComponents/ReadOnlyComponent/ReadOnlyInputComponent';
import styles from './SignUpStep1.module.scss';

function SignUpStep1({ signUpData, setSignUpData, errors }) {
    const storedEmail = JSON.parse(sessionStorage.getItem("formData"))?.email || signUpData.email;
    const [inputEmail, setInputEmail] = useState(storedEmail);

    useEffect(() => {
        if (storedEmail) {
            setSignUpData(prevData => ({ ...prevData, email: storedEmail }));
        }
    }, [storedEmail, setSignUpData]);

    return (
        <div className={styles.stepCtn}>
            {/* Email Input */}
            <div className={styles.emailInputCtn}>
                <p className={styles.labelInput}>Email: </p>
                {inputEmail ? (
                    <ReadOnlyInput text={inputEmail} />
                ) : (
                    <EmptyInput 
                        type="email" 
                        placeholder="Write email..."
                        value={signUpData.email} 
                        onChange={(e) => {
                            const newEmail = e.target.value;
                            setSignUpData(prevData => ({ ...prevData, email: newEmail }));
                        }}
                        errorMessage={errors.email}
                    />
                )}
            </div>   

            {/* Password Input */}
            <div className={styles.passwordInputCtn}>
                <p className={styles.labelInput}>Password: </p>
                <EmptyInput 
                    type="password" 
                    placeholder="Write password..."
                    value={signUpData.password}
                    onChange={(e) => setSignUpData(prevData => ({ ...prevData, password: e.target.value }))}
                    errorMessage={errors.password}
                />
            </div>

            {/* Confirm Password Input */}
            <div className={styles.confirmPasswordInputCtn}>
                <p className={styles.labelInput}>Confirm password: </p>
                <EmptyInput 
                    type="password" 
                    placeholder="Confirm password..."
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData(prevData => ({ ...prevData, confirmPassword: e.target.value }))}
                    errorMessage={errors.confirmPassword}
                />
            </div>
        </div>
    );
}

export default SignUpStep1;