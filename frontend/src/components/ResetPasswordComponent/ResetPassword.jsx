import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate
import EmptyInput from '../InputComponents/EmptyInputComponent/EmptyInputComponent';
import styles from './ResetPassword.module.scss'
import { resetPassword } from '../../api';
import resetPasswordSchema from '../../schemas/resetPasswordSchema';

function ResetPassword() {
    const [resetPasswordData, setResetPasswordData] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(''); 
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); // ✅ Added this

    const token = searchParams.get('token');

    const handleSubmit = async () => {
        if (!resetPasswordSchema) {
            console.error("Schema not found");
            return;
        }

        setErrors({});
        setLoading(true);
        setMessage('');

        try {
            await resetPasswordSchema.validate(resetPasswordData, { abortEarly: false });

            const { password, confirmPassword } = resetPasswordData;
            await resetPassword(password, confirmPassword, token); 

            setMessage("Your password has been successfully reset!"); // ✅ Fixed message
            setTimeout(() => navigate('/sign-in'), 3000); // ✅ Redirect to login after success
        } catch (error) {
            setLoading(false);
            
            if (error.name === "ValidationError") {
                const validationErrors = error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setErrors(validationErrors);
            } else {
                setErrors({ general: error.message || "Something went wrong. Please try again." });
            }
        }
    }

    useEffect(() => {
        const setPageHeight = () => {
            const footer = document.querySelector("footer");
            const container = document.querySelector(`.${styles.container}`);
            if (footer && container) {
                const footerHeight = footer.offsetHeight || 0;
                container.style.minHeight = `calc(100vh - ${footerHeight}px)`;
                container.style.height = `100%`;
            }
        };

        setPageHeight();
        window.addEventListener("resize", setPageHeight);
        return () => window.removeEventListener("resize", setPageHeight);
    }, []);

    const handleInputChange = (field, value) => {
        setResetPasswordData((prevData) => ({ ...prevData, [field]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // ✅ Remove error when typing
    };

    return (
        <div className={styles.container}>
            <div className={styles.ctn}>
                <div className={styles.resetPasswordBody}>
                    <p className={styles.headerText}>Reset Password</p> {/* ✅ Changed title */}
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.passwordInputCtn}>
                            <p className={styles.labelInput}>New Password: </p>
                            <EmptyInput 
                                type="password" 
                                placeholder="Enter new password..."
                                value={resetPasswordData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                errorMessage={errors.password}
                            />
                        </div>

                        <div className={styles.confirmPasswordInputCtn}>
                            <p className={styles.labelInput}>Confirm Password: </p>
                            <EmptyInput 
                                type="password" 
                                placeholder="Confirm new password..."
                                value={resetPasswordData.confirmPassword}
                                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                errorMessage={errors.confirmPassword}
                            />
                        </div>
                    </form>
                </div>

                {message && <p className={styles.successMessage}>{message}</p>} {/* ✅ Show success message */}

                <div className={styles.resetPasswordFooter}>
                    <button
                        type="button"
                        className={styles.resetPasswordButton}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        <span>{loading ? "Resetting password..." : "Reset Password"}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;