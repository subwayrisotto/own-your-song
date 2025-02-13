import React, { useState } from 'react';
import styles from './CountrySelectComponent.module.scss';
import countries from 'world-countries';

const flagCDN = 'https://flagcdn.com/w320';

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: `${flagCDN}/${country.cca2.toLocaleLowerCase()}.png`,
}));

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

function CountrySelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Choose a country');
  const [selectedFlag, setSelectedFlag] = useState(null);

  const toggleOptions = () => {
    setIsOpen(!isOpen); 
  };

  const handleSelect = (countryName, countryFlag) => {
    setSelectedCountry(countryName); 
    setSelectedFlag(countryFlag); 
    setIsOpen(false); 
  };

  return (
    <div>
      <Placeholder
        placeholder={selectedCountry}
        flag={selectedFlag}
        onClick={toggleOptions}
        isOpen={isOpen}
      />
      <div className={`${styles.optionsCtn} ${isOpen ? styles.open : ''}`}>
        {formattedCountries.map((country, index) => (
          <Option key={index} {...country} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}

export default CountrySelect;
