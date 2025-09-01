import React, {useState, useEffect} from 'react';
import ErrorInput from '../ErrorInputComponent/ErrorInputComponent';
import styles from './LanguagesSelector.module.scss';

const Placeholder = ({ placeholder, code, onClick, isOpen }) => {
    return (
      <div
        className={`${styles.selectPlaceholder} ${isOpen ? styles.open : styles.closed}`}
        onClick={onClick}
      >
        <div className={styles.placeholderText}>
          <p>{`${placeholder} ${code !== undefined ?`(${code})`: ''}`}</p>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/form/arrow.svg`}
          alt="arrow"
          className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
        />
      </div>
    );
  };

const Option = ({ name, code, onSelect }) => {
    return (
        <div className={styles.selectOption} onClick={() => onSelect(name, code)}>
            <p className={styles.label}>{name} ({code})</p>
        </div>
    );
};

function LanguagesSelector({onChange, value, errorMessage}) {
    const languages = [
      {
        name: "English",
        code: "ENG"
      },
      {
        name: "Ukrainian",
        code: "UKR"
      },
      {
        name: "Polish",
        code: "PLN"
      }
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(value || 'Select a language');
    const [code, setCode] = useState();

    // useEffect(() => {
    //     const fetchLanguages = async () => {
    //         const response = await fetch("https://restcountries.com/v3.1/all");
    //         const countries = await response.json();
    //         const languageMap = new Map();
        
    //         countries.forEach((country) => {
    //             if (country.languages) {
    //                 Object.entries(country.languages).forEach(([code, name]) => {
    //                     if (!languageMap.has(code)) {
    //                         languageMap.set(code, name);
    //                     }
    //                 });
    //             }
    //         });
        
    //         // Convert to array and sort alphabetically by language name
    //         const sortedLanguages = Array.from(languageMap)
    //             .map(([code, name]) => ({ code, name }))
    //             .sort((a, b) => a.name.localeCompare(b.name));
            
    //         setLanguages(sortedLanguages)
    //         return sortedLanguages;
    //     };
        
    //     fetchLanguages();
    // }, []);

    const toggleOptions = () => {
        setIsOpen(!isOpen); 
      };
    
    const handleSelect = (lang, code) => {
        setSelectedLanguage(lang); 
        setCode(code)
        setIsOpen(false); 
        onChange(lang);  // Notify parent component about the selection
    };


  return (
    <>
        <div className={styles.languagesSelector}>
            <Placeholder
                placeholder={selectedLanguage}
                code={code}
                onClick={toggleOptions}
                isOpen={isOpen}
            />
            <div className={`${styles.optionsCtn} ${isOpen ? styles.open : ''}`}>
                {languages.map((lang, index) => (
                    <Option key={index} name={lang.name} code={lang.code} onSelect={handleSelect} />
                ))}
            </div>
        </div>
        {errorMessage && <ErrorInput errorMessage={errorMessage} />} {/* Display error message */}
  </>
  )
}

export default LanguagesSelector
