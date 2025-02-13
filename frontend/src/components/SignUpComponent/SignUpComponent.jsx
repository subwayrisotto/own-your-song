import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SignUpComponent.module.scss';
import SignUpStep1 from './SignUpStep1/SignUpStep1';
import SignUpStep2 from './SignUpStep2/SignUpStep2';

function SignUp() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const { email } = location.state || {};

    const stepFromUrl = parseInt(queryParams.get("step")) || 1;
    const [step, setStep] = useState(stepFromUrl);
    const SignUpMaxStep = 2;

    useEffect(() => {
        navigate(`?step=${step}`, { replace: true });
    }, [step, navigate]);

    const SignUpStepDisplay = () => {
        switch (step) {
            case 1: 
                return <SignUpStep1 email={email}/>
            case 2: 
                return <SignUpStep2 />
            default:
                return <SignUpStep1 email={email} />;
        }
    }

    const handleSubmit = () => {
        console.log("Test")
    }

    const handleNext = async () => {
        setStep((prevStep) => Math.min(prevStep + 1, SignUpMaxStep));
    };

    const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

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
                <div className={styles.signUpBody}>
                    <p className={styles.headerText}>Sign Up</p>
                    <form onSubmit={handleSubmit}>
                        { SignUpStepDisplay() }
                    </form>
                </div>

                <div className={styles.signUpFooter}>
                    <button type="button" className={styles.signUpButton} onClick={handleNext}>
                        <span>Sign Up</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUp
