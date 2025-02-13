import React, { useEffect, useState } from 'react';
import EmptyInput from '../../InputComponents/EmptyInputComponent/EmptyInputComponent';
import ReadOnlyInput from '../../InputComponents/ReadOnlyComponent/ReadOnlyInputComponent';
import styles from './SignUpStep1.module.scss'

function SignUpStep1({ email }) {
    const [inputEmail, setInputEmail] = useState(email || ""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 

    useEffect(() => {
        if (inputEmail) {
            localStorage.setItem("email", inputEmail);
        }
    }, [inputEmail]);

    return (
        <div className={styles.stepCtn}>
            <div className={styles.emailInputCtn}>
                <p className={styles.labelInput}>Email: </p>
                {inputEmail ? (
                    <ReadOnlyInput text={inputEmail} />
                ) : (
                    <EmptyInput 
                        type="email" 
                        placeholder="Write email..."
                        value={inputEmail} 
                        onChange={(e) => setInputEmail(e.target.value)} 
                    />
                )}
            </div>   
            <div className={styles.passwordInputCtn}>
                <p className={styles.labelInput}>Password: </p>
                <EmptyInput 
                    type="password" 
                    placeholder="Write password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <div className={styles.confirmPasswordInputCtn}>
                <p className={styles.labelInput}>Confirm password: </p>
                <EmptyInput 
                    type="password" 
                    placeholder="Confirm password..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
            </div>
        </div>
    );
}

export default SignUpStep1;
