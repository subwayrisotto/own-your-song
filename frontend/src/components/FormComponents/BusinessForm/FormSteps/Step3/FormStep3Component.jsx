import React, { useState, useEffect } from "react";
import businessFormData from '../../../../../data/businessFormData';
import styles from "./FormStep.module.scss";
import TextAreaInput from "../../../../InputComponents/TextAreaInputComponent/TextAreaInputComponent";

function FormStep3({ businessData, setBusinessData, currentPlan, errors, setErrors, currentForm, handleClick }) {
  const [text, setText] = useState(businessData.comment || "");
  const variableName = businessFormData.step3[0].variableName;

  // Get max character limit based on plan
  const planData = businessFormData.step3[0].numbersOfCharacters.find(
    (item) => item.plan === currentPlan
  );
  const maxChars = planData?.number === "unlimited" ? Infinity : planData?.number;
  const placeholder = businessFormData.step3[0].placeholder;

  useEffect(() => {
    if (typeof maxChars === "number" && text.length > maxChars) {
      setText(text.slice(0, maxChars));
    }
  }, [currentPlan]);

  const handleSubmitClick = () => {
    const updatedData = {
      ...businessData,
      [variableName]: text, // ensure latest comment
    };
  
    setBusinessData(updatedData);
    sessionStorage.setItem("businessData", JSON.stringify(updatedData));
    handleClick(); // this is the sendApplication() function passed from parent
  };

  return (
    <div className={styles.stepCtn}>
      <div className={styles.textareaWrapper}>
        <p className={styles.headerText}>Your wishes and comments</p>

        <div className={styles.inputsCtn}>
          <TextAreaInput 
            text={text} 
            setText={setText} 
            maxChars={maxChars} 
            placeholder={placeholder} 
            currentPlan={currentPlan} 
            formData={businessData} 
            setFormData={setBusinessData} 
            variableName={variableName} 
            errorMessage={errors?.[variableName]} 
            currentForm={currentForm}
          />
        </div>

        <div className={styles.submitApplicationBtn} onClick={handleSubmitClick}>
          <p>Send an application and receive a personalized offer</p>
          <img
            src={`${process.env.PUBLIC_URL}/form/arrow2.svg`}
            alt="arrow"
          />
        </div>
      </div>
    </div>
  );
}

export default FormStep3;
