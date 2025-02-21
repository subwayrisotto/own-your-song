import React from 'react';
import { useUser } from '../../../../../context/UserContext'; // Import useUser hook
import inputsData from '../../../../../data/inputsData';
import DefaultInput from '../../../../InputComponents/DefaultInputComponent/DefaultInputComponent';
import styles from './FormStep.module.scss';

function FormStep2({ formData, setFormData, errors }) {
  const { currentUser } = useUser();  // Get currentUser from context

  const handleCopyPasteCut = (e) => {
    e.preventDefault();
  };

  // Remove email-related errors if currentUser exists
  const filteredErrors = { ...errors };
  if (currentUser) {
    delete filteredErrors.email;
    delete filteredErrors.confirmEmail;
  }

  return (
    <div className={styles.stepCtn}>
      <div className={styles.inputsCtn}>
        {
          inputsData.step2.map((input, index) => {
            const isEmailField = input.variableName === 'email' || input.variableName === 'confirmEmail';

            // Skip rendering email and confirmEmail fields if currentUser exists
            if (currentUser && isEmailField) {
              return null;
            }

            // Render Name Field (Pre-filled & Disabled if currentUser exists)
            if (currentUser && input.variableName === 'name') {
              return (
                <div className={styles.inputData} key={index}>
                  <label htmlFor={`${styles.inputArea}${index}`} className={styles.label}>{input.title}</label>
                  <DefaultInput 
                    {...input} 
                    formData={formData} 
                    setFormData={setFormData}
                    value={currentUser.fullName}  // Display the current user's name as value
                    disabled={!!currentUser}  // Disable only when currentUser exists
                  />
                </div>
              );
            }

            return (
              <div className={styles.inputData} key={index}>
                {input.title !== '' && (
                  <label htmlFor={`${styles.inputArea}${index}`} className={styles.label}>{input.title}</label>
                )}
                <DefaultInput 
                  {...input} 
                  formData={formData} 
                  setFormData={setFormData}
                  value={formData[input.variableName]}  // Bind the input value to formData
                  errorMessage={filteredErrors?.[input.variableName]} // Use filtered errors
                  onCopy={isEmailField ? handleCopyPasteCut : null}
                  onPaste={isEmailField ? handleCopyPasteCut : null}
                  onCut={isEmailField ? handleCopyPasteCut : null}
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default FormStep2;