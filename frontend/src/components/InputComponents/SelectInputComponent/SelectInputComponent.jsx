import React, { useState, useEffect } from 'react';
import styles from './SelectInputComponent.module.scss';

const Option = ({ option, handleSelect }) => {
  return (
    <div className={styles.selectOption} onClick={() => handleSelect(option)}>
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

function SelectInput({ placeholder, options, isOpen, toggleSelectInput, isAllowedForSilver, currentPlan, variableName, formData, setFormData }) {
  const [isArrowTriggered, setIsArrowTriggered] = useState(false);
  const [resetOptions, setResetOptions] = useState(true);
  const [currentValue, setCurrentValue] = useState(placeholder); // Track selected value

  useEffect(() => {
    // Ensure formData contains the field and set the initial selected value
    if (formData && variableName in formData) {
      setCurrentValue(formData[variableName] || placeholder); 
    }
  }, [formData, variableName]);

  const handleClick = () => {
    setIsArrowTriggered((prev) => !prev);
    toggleSelectInput();
  };

  const handleSelect = (selectedOption) => {
    setCurrentValue(selectedOption); // Update UI
    setFormData((prevData) => ({
      ...prevData,
      [variableName]: selectedOption, // Update formData dynamically
    }));
    toggleSelectInput(); // Close dropdown after selection
  };

  useEffect(() => {
    if (isOpen) {
      setResetOptions(false);
    } else {
      setResetOptions(true);
    }
  }, [isOpen]);

  return (
    <div className={styles.selectInput}>
      {currentPlan === "silver" && !isAllowedForSilver ? (
        <DisabledPlaceholder placeholder="Upgrade to Gold/Platinum plans to unlock it" />
      ) : (
        <Placeholder placeholder={currentValue} isOpen={isOpen} isArrowTriggered={isArrowTriggered} handleClick={handleClick} />
      )}

      <div className={`${styles.optionsCtn} ${isOpen ? styles.open : ''}`}>
        {isOpen &&
          options.map((option, index) => (
            <Option option={option} key={index} handleSelect={handleSelect} />
          ))}
      </div>
    </div>
  );
}

export default SelectInput;