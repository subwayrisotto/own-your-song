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
        isTermsAgreed: false
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
        if (!isValid) return; // If validation fails, don't proceed to the next step
    
        if (step < SignUpMaxStep) {
            setStep((prevStep) => prevStep + 1); // Move to the next step if it's not the final step
        } else {
            setLoading(true); // Set loading to true only when at the final step
    
            try {
                // Step 1: Register the user (sign-up)
                const signUpResponse = await createUser(signUpData); // Use your existing createUser function
                console.log("User registration successful:", signUpResponse);
    
                // Step 2: Check if there's a guestToken and convert guest orders
                await registerUserAndConvertGuestOrders(signUpData); // This function now handles the conversion
    
                // After registration, remove guestToken and store userToken in localStorage
                localStorage.removeItem("guestToken");
                localStorage.setItem("userToken", signUpResponse.token);
                navigate("/dashboard");
            } catch (error) {
                console.error("Error during registration or guest order conversion:", error);
            } finally {
                setLoading(false); // Reset loading after the process completes
            }
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