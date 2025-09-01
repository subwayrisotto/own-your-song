import React, { useState, useEffect } from "react";
import inputsData from "../../../../../data/inputsData";
import styles from "./FormStep.module.scss";
import TextAreaInput from "../../../../InputComponents/TextAreaInputComponent/TextAreaInputComponent";
import LanguagesSelector from "../../../../InputComponents/LanguagesSelectorComponent/LanguagesSelector";

function FormStep5({ formData, setFormData, currentPlan, errors, setErrors }) {
  const [text, setText] = useState(formData.story || "");
  const variableName = inputsData.step4[0].variableName;

  // Get max character limit based on plan
  const planData = inputsData.step4[0].numbersOfCharacters.find(
    (item) => item.plan === currentPlan
  );
  const maxChars = planData?.number === "unlimited" ? Infinity : planData?.number;
  const placeholder = inputsData.step4[0].placeholder;

  const languageInput = inputsData.step4[1];

  useEffect(() => {
    if (typeof maxChars === "number" && text.length > maxChars) {
      setText(text.slice(0, maxChars));
    }
  }, [currentPlan]);

  const handleLanguageChange = (songLanguage) => {
    setFormData(prevData => ({
      ...prevData, songLanguage
    }));
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   songLanguage: "",  // Clear the country error on valid input change
    // }));
  };

  return (
    <div className={styles.stepCtn}>
      <div className={styles.textareaWrapper}>
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

      <div className={styles.languageWrapper}>
        <label htmlFor={`${styles.inputArea}`} className={styles.label}>{languageInput.title}</label>
        <LanguagesSelector 
          {...languageInput} 
          formData={formData} 
          setFormData={setFormData}
          onChange={handleLanguageChange}
          errorMessage={errors.songLanguage}
        />
      </div>
    </div>
  );
}

export default FormStep5;
