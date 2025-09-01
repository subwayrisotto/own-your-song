import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyInput from '../InputComponents/EmptyInputComponent/EmptyInputComponent';
import forgotPasswordSchema from '../../schemas/forgotPasswordSchema';
import { forgotPassword } from '../../api'; // Ensure this API function is defined
import styles from './ForgotPassword.module.scss';

function ForgotPassword() {
    const navigate = useNavigate();
    const [forgotPasswordData, setForgotPasswordData] = useState({ email: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleBack = () => {
        navigate(-1); 
    };

    const handleSubmit = async () => {
        if (!forgotPasswordSchema) {
            console.error("Schema not found");
            return;
        }

        setErrors({});
        setLoading(true);
        setMessage('');

        try {
            await forgotPasswordSchema.validate(forgotPasswordData, { abortEarly: false });

            const { email } = forgotPasswordData;
            const response = await forgotPassword(email); 

            setMessage("A password reset link has been sent to your email.");
            // setTimeout(() => navigate('/reset-password'), 3000);
        } catch (error) {
            setLoading(false);
            
            if (error.name === "ValidationError") {
                const validationErrors = error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setErrors(validationErrors);
            } else {
                // Handle error when the user doesn't exist
                if (error.message === "User not found") {
                    setErrors({ general: "This email address is not registered." });
                } else {
                    setErrors({ general: "Something went wrong. Please try again." });
                }
            }
        }
    };

    const handleInputChange = (field, value) => {
        setForgotPasswordData((prevData) => ({ ...prevData, [field]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    };

    const setPageHeight = () => {
        const footer = document.querySelector("footer");
        const container = document.querySelector(`.${styles.container}`);

        if (footer && container) {
            const footerHeight = footer.offsetHeight || 0;
            container.style.minHeight = `calc(100vh - ${footerHeight}px)`;
            container.style.height = `100%`;
        }
    };

    useEffect(() => {
        setPageHeight();
        window.addEventListener("resize", setPageHeight);
        return () => window.removeEventListener("resize", setPageHeight);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.ctn}>
                <div className={styles.forgotPasswordBody}>
                    <p className={styles.headerText}>Forgot Password</p>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.emailInputCtn}>
                            <p className={styles.labelInput}>Email:</p>
                            <EmptyInput
                                type="email"
                                placeholder="Write email..."
                                value={forgotPasswordData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                errorMessage={errors.email}
                            />
                        </div>
                        {message && <p className={styles.successMessage}>{message}</p>}
                        {errors.general && <p className={styles.errorMessage}>{errors.general}</p>}
                    </form>
                </div>
                <div className={styles.forgotPasswordFooter}>
                    <button
                        type="button"
                        onClick={() => handleBack()} 
                        disabled={loading}
                        className={styles.forgotPasswordButton}
                    >
                        <span>Back</span>
                    </button>
                    <button
                        type="button"
                        className={styles.forgotPasswordButton}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        <span>{loading ? "Sending email..." : "Reset password"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;