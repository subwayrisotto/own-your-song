import React, { useState, useEffect } from 'react';
import styles from './GenderSelector.module.scss';

const GenderSelect = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Select Gender');
  const [genders] = useState(['Male', 'Female', 'Other']); // Gender options

  const toggleOptions = () => {
    setIsOpen(!isOpen); 
  };

  const handleSelect = (gender) => {
    setSelectedGender(gender);
    setIsOpen(false); 
    onChange(gender); // If you want to pass the selected gender to parent
  };

  const closeAllDropdowns = () => {
    setIsOpen(false); 
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(`.${styles.genderSelectCtn}`)) {
      closeAllDropdowns();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles.genderSelectCtn}>
      {/* Placeholder with Arrow */}
      <div
        className={`${styles.selectPlaceholder} ${isOpen ? styles.open : ''}`}
        onClick={toggleOptions}
      >
        <div className={styles.placeholderText}>
          <p>{selectedGender}</p>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/form/arrow.svg`}
          alt="arrow"
          className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
        />
      </div>

      {/* Options Container */}
      <div className={`${styles.optionsCtn} ${isOpen ? styles.open : ''}`}>
        {genders.map((gender, index) => (
          <div
            key={index}
            className={styles.selectOption}
            onClick={() => handleSelect(gender)}
          >
            <p>{gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderSelect;