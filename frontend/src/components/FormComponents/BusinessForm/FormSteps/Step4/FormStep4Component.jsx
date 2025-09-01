import React, { useState, useEffect } from "react";
import styles from "./FormStep.module.scss";
import { useNavigate } from 'react-router-dom';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from "../../../../../context/UserContext";
import ReadOnlyInput from "../../../../InputComponents/ReadOnlyComponent/ReadOnlyInputComponent";

function FormStep4() {
  const savedData = JSON.parse(sessionStorage.getItem("businessData")) || '';
  const { email } = savedData;
  const { currentUser } = useUser();
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
    sessionStorage.removeItem("businessData");
  }

  useEffect(() => {
    setPageHeight();
    window.addEventListener("resize", setPageHeight);

    return () => window.removeEventListener("resize", setPageHeight);
  }, []);

  return(
    <div className={styles.container}>
      <div className={styles.ctn}>
        <div className={styles.successWrapper}>
          <div className={styles.successCtn}>
            <div className={styles.successIcon}>
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <p className={styles.text}>Application submitted successfully!</p>
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

export default FormStep4;
