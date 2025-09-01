import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReadOnlyInput from '../InputComponents/ReadOnlyComponent/ReadOnlyInputComponent';
import styles from './PaymentSuccess.module.scss';
import { useUser } from '../../context/UserContext';

function PaymentSuccess() {
  const savedData = JSON.parse(sessionStorage.getItem("formData"));
  const { email } = savedData;
  const {currentUser} = useUser();
  const navigation = useNavigate();

  const setPageHeight = () => {
    const footer = document.querySelector("footer");
    const container = document.querySelector(`.${styles.container}`);


    if (footer && container) {
      const footerHeight = footer.offsetHeight || 0;
      container.style.minHeight = `calc(100vh - ${footerHeight}px)`;
      container.style.height = `100%`;
    }
  };

  const handleClick = () => {
    navigation(currentUser ? '/dashboard' : '/sign-up');
  }

  useEffect(() => {
    setPageHeight();
    window.addEventListener("resize", setPageHeight);

    return () => window.removeEventListener("resize", setPageHeight);
  }, []);

  // if email doesn't exist - show sign up ctn, if exist - show button to redirect to profile

  return (
    <div className={styles.container}>
      <div className={styles.ctn}>
        <div className={styles.paymentWrapper}>
          <div className={styles.successCtn}>
            <div className={styles.successIcon}>
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <p className={styles.text}>Payment was successful!</p>
          </div>

          {
            currentUser ? (
                <div className={styles.goToDashboard}>
                  <button type="button" onClick={handleClick} className={styles.formButton}>
                    Go to Dashboard
                  </button>
                </div>
            ) : (
              <div className={styles.signUpCtn}>
                <p className={styles.signUpText}>Finish your registration: </p>
                <ReadOnlyInput text={email} />
                <button type="button" onClick={handleClick} className={styles.formButton}>
                  Sign Up
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess