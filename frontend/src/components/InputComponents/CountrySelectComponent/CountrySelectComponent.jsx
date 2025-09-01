import React, { useState, useEffect } from 'react';
import styles from './CountrySelectComponent.module.scss';
import ErrorInput from '../ErrorInputComponent/ErrorInputComponent';

const flagCDN = 'https://flagcdn.com/w320';

const Option = ({ value, label, flag, onSelect }) => {
  return (
    <div className={styles.selectOption} value={value} onClick={() => onSelect(label, flag)}>
      <img className={styles.flagImage} src={flag} alt={label} />
      <p className={styles.label}>{label}</p>
    </div>
  );
};

const Placeholder = ({ placeholder, flag, onClick, isOpen }) => {
  return (
    <div
      className={`${styles.selectPlaceholder} ${isOpen ? styles.open : styles.closed}`}
      onClick={onClick}
    >
      <div className={styles.placeholderText}>
        {flag && <img className={styles.flagImage} src={flag} alt="selected flag" />}
        <p>{placeholder}</p>
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/form/arrow.svg`}
        alt="arrow"
        className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
      />
    </div>
  );
};

function CountrySelect({ onChange, value, errorMessage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(value || 'Choose a country');
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then(response => response.json())
      .then(data => {
        if (!data || !data.data) throw new Error("Invalid API response");
  
        const formattedData = data.data
          .filter(country => country.name !== 'Russia') // Remove Russia
          .map(country => ({
            label: country.name,
            flag: country.name === 'Afghanistan' 
              ? `${flagCDN}/af.png`
              : country.flag,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
  
        setCountries(formattedData);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const toggleOptions = () => {
    setIsOpen(!isOpen); 
  };

  const handleSelect = (countryName, countryFlag) => {
    setSelectedCountry(countryName); 
    setSelectedFlag(countryFlag); 
    setIsOpen(false); 
    onChange(countryName);  // Notify parent component about the selection
  };

  return (
    <>
      <div className={styles.countriesSelector}>
      <Placeholder
        placeholder={selectedCountry}
        flag={selectedFlag}
        onClick={toggleOptions}
        isOpen={isOpen}
      />
      <div className={`${styles.optionsCtn} ${isOpen ? styles.open : ''}`}>
        {countries.map((country, index) => (
          <Option key={index} {...country} onSelect={handleSelect} />
        ))}
      </div>
    </div>
    {errorMessage && <ErrorInput errorMessage={errorMessage} />} {/* Display error message */}
    </>
  );
}

export default CountrySelect;