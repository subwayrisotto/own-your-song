import React, { useState, useEffect } from 'react';
import ErrorInput from '../ErrorInputComponent/ErrorInputComponent';
import styles from './SelectInputComponent.module.scss';

const Option = ({ option, handleSelect }) => {
  return (
    <div className={styles.selectOption} onClick={() => handleSelect(option)} value={option}>
      {option}
    </div>
  );
};

const Placeholder = ({ placeholder, isOpen, isArrowTriggered, handleClick }) => {
  return (
    <div className={`${styles.selectPlaceholder} ${isOpen ? styles.opened : ''}`} onClick={handleClick}>
      <p>{placeholder}</p>
      <img
        src={`${process.env.PUBLIC_URL}/form/arrow.svg`}
        alt="arrow"
        className={`${styles.arrow} ${isArrowTriggered ? styles.rotated : ''}`}
      />
    </div> 
  );
};

const DisabledPlaceholder = ({ placeholder }) => {
  return (
    <div className={styles.selectPlaceholderDisabled}>
      <p>{placeholder}</p>
      <img src={`${process.env.PUBLIC_URL}/form/lock.png`} alt="lock" />
    </div> 
  );
};

function SelectInput({ 
  placeholder, 
  options, 
  isOpen, 
  toggleSelectInput, 
  isAllowedForSilver, 
  currentPlan, 
  variableName, 
  formData, 
  setFormData, 
  errorMessage 
}) {
  const [isArrowTriggered, setIsArrowTriggered] = useState(false);
  const [resetOptions, setResetOptions] = useState(true);
  const [currentValue, setCurrentValue] = useState(placeholder); 
  const [localError, setLocalError] = useState(errorMessage); 
  const [customInputValue, setCustomInputValue] = useState('');
  console.log(placeholder)

  useEffect(() => {
    // Disable validation only for "songStyle" when on Silver plan
    if (variableName === "songStyle" && currentPlan === "silver") {
      setLocalError(null);
    } else {
      setLocalError(errorMessage);
    }
  }, [errorMessage, currentPlan, variableName]);

  useEffect(() => {
    if (formData && variableName in formData) {
      setCurrentValue(formData[variableName] || placeholder); 
    }
  }, [formData, variableName]);

  const handleClick = () => {
    setIsArrowTriggered((prev) => !prev);
    toggleSelectInput();
  };

  const handleSelect = (selectedOption) => {
    setCurrentValue(selectedOption); 
    if (!(variableName === "songStyle" && currentPlan === "silver")) {
      setLocalError(null); // Remove error only if not Silver plan & songStyle
    }
    setFormData((prevData) => ({
      ...prevData,
      [variableName]: selectedOption, 
    }));
    toggleSelectInput(); 
  };

  const handleCustomInputChange = (e) => {
    const value = e.target.value;
    setCustomInputValue(value);
    setFormData((prevData) => ({
      ...prevData,
      [variableName]: value,
    }));
  };
  
  useEffect(() => {
    setResetOptions(!isOpen);
  }, [isOpen]);

  return (
    <div className={styles.selectInput}>
      {!isAllowedForSilver ? (
        <DisabledPlaceholder placeholder="Upgrade to Gold/Platinum plans to unlock it" />
      ) : (
        <Placeholder placeholder={currentValue} isOpen={isOpen} isArrowTriggered={isArrowTriggered} handleClick={handleClick} />
      )}

      <div className={`${styles.optionsCtn} ${isOpen ? styles.open : ''}`} name={variableName}>
        {isOpen &&
          options.map((option, index) => (
            <Option option={option} key={index} handleSelect={handleSelect} />
          ))}
      </div>

      {(localError && !(variableName === "songStyle" && currentPlan === "silver")) && <ErrorInput errorMessage={localError} />}
    </div>
  );
}


export default SelectInput;
