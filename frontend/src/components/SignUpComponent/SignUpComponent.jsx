import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUser, registerUserAndConvertGuestOrders } from '../../api'; 
import { Link } from 'react-router-dom';
import signUpSchema from '../../schemas/signUpSchema';
import styles from './SignUpComponent.module.scss';
import SignUpStep1 from './SignUpStep1/SignUpStep1';
import SignUpStep2 from './SignUpStep2/SignUpStep2';
import VinylSpinner from '../VinylLoaderComponent/VinylLoader';

function SignUp() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const [errors, setErrors] = useState({});
    const { email } = location.state || {};

    const stepFromUrl = parseInt(queryParams.get("step")) || 1;
    const [step, setStep] = useState(stepFromUrl);
    const SignUpMaxStep = 2;
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (step <= SignUpMaxStep) {
            navigate(`?step=${step}`, { replace: true });
        }
    }, [step, navigate]);

    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        dob: '',
        gender: '',
        country: '',
        isTermsAgreed: false,
        role: ''
    });

    const SignUpStepDisplay = () => {
        switch (step) {
            case 1:
                return <SignUpStep1 email={email} signUpData={signUpData} setSignUpData={setSignUpData} errors={errors} />;
            case 2:
                return <SignUpStep2 signUpData={signUpData} setSignUpData={setSignUpData} errors={errors} setErrors={setErrors}/>;
            default:
                return <SignUpStep1 email={email} />;
        }
    };

    const handleSubmit = async () => {
        const currentSchema = signUpSchema[step - 1];
        if (!currentSchema) {
            console.error("Schema not found for this step:", step);
            return false;
        }

        try {
            await currentSchema.validate(signUpData, { abortEarly: false });
            setErrors({});
            return true; 
        } catch (error) {
            console.error("Validation error:", error);
            const validationErrors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setErrors(validationErrors); 
            return false; 
        }
    };

    const handleNext = async () => {
        const isValid = await handleSubmit(); // Validate the sign-up form
        if (!isValid) return; // Stop if validation fails
    
        if (step < SignUpMaxStep) {
            setStep((prevStep) => prevStep + 1); // Move to the next step
            return;
        }
    
        setLoading(true); // Set loading to true only when at the final step
    
        try {
            const signUpResponse = await createUser(signUpData);
    
            if (signUpResponse.error) {
                setErrors({ email: signUpResponse.error }); // Set error message
                setLoading(false);
                return;
            }
    
            // Step 2: Convert guest orders if guestToken exists
            const guestToken = localStorage.getItem("guestToken");
            if (guestToken) {
                await registerUserAndConvertGuestOrders(signUpData);
                localStorage.removeItem("guestToken");
            }
    
            localStorage.setItem("userToken", signUpResponse.token);
    
            // Redirect based on role
            if (signUpResponse.role === 'admin') {
                navigate("/dashboard/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div className={styles.container}>
            <div className={styles.ctn}>
                {loading ? (
                    <VinylSpinner />
                ) : (
                    <>
                        <div className={styles.signUpBody}>
                            <p className={styles.headerText}>Sign Up</p>
                            <form onSubmit={(e) => e.preventDefault()}>
                                {SignUpStepDisplay()}
                            </form>
                            <div className={styles.redirectToSignIn}>
                                <p>
                                    Already have an account? <Link to="/sign-in" className={styles.signInLink}>Sign in</Link>
                                </p>
                            </div>
                        </div>
                        
                        <div className={styles.signUpFooter}>
                            <button
                                type="button"
                                className={styles.signUpButton}
                                onClick={handleNext}
                                disabled={loading} // Disable the button while loading
                            >
                                <span>{step === SignUpMaxStep ? "Submit" : "Next"}</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SignUp;