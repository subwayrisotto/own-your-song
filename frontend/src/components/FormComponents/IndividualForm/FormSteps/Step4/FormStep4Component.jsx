import React, { useState, useEffect } from "react";
import inputsData from "../../../../../data/inputsData";
import styles from "./FormStep.module.scss";
import TextAreaInput from "../../../../InputComponents/TextAreaInputComponent/TextAreaInputComponent";

function FormStep5({ formData, setFormData, currentPlan, errors }) {
  const [text, setText] = useState(formData.story || "");
  const variableName = inputsData.step4[0].variableName;

  // Get max character limit based on plan
  const planData = inputsData.step4[0].numbersOfCharacters.find(
    (item) => item.plan === currentPlan
  );
  const maxChars = planData?.number === "unlimited" ? Infinity : planData?.number;
  const placeholder = inputsData.step4[0].placeholder;

  useEffect(() => {
    if (typeof maxChars === "number" && text.length > maxChars) {
      setText(text.slice(0, maxChars));
    }
  }, [currentPlan]);

  return (
    <div className={styles.stepCtn}>
      <p className={styles.headerText}>Tell your story</p>
      <p className={styles.subHeaderText}>
        Tell your story, or write your lyrics to a song we should sing (Limitations in writing according to the rate + example of what can be written)
      </p>

      <div className={styles.inputsCtn}>
        <TextAreaInput 
          text={text} 
          setText={setText} 
          maxChars={maxChars} 
          placeholder={placeholder} 
          currentPlan={currentPlan} 
          formData={formData} 
          setFormData={setFormData} 
          variableName={variableName} 
          errorMessage={errors?.[variableName]}  
        />
      </div>
    </div>
  );
}

export default FormStep5;
