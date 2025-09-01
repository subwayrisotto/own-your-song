import React from "react";
import styles from "./SignUpStep2.module.scss";
import CountrySelect from "../../InputComponents/CountrySelectComponent/CountrySelectComponent";
import DateOfBirthPicker from "../../InputComponents/DOBPickerComponent/DOBPickerComponent";
import GenderSelector from "../../InputComponents/GenderSelectorComponent/GenderSelector";
import EmptyInput from "../../InputComponents/EmptyInputComponent/EmptyInputComponent";
import ErrorInput from "../../InputComponents/ErrorInputComponent/ErrorInputComponent";
import { Link } from 'react-router-dom';

function SignUpStep2({ setSignUpData, signUpData, errors, setErrors }) {
  const handleDobChange = (dob) => {
    const localDate = new Date(dob);
    
    // Manually format the date to avoid the UTC conversion problem
    const formattedDate = localDate.getFullYear() +
      '-' + 
      String(localDate.getMonth() + 1).padStart(2, '0') + 
      '-' + 
      String(localDate.getDate()).padStart(2, '0');
  
    setSignUpData((prevData) => ({
      ...prevData,
      dob: formattedDate,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      dob: "",  // Clear the dob error on valid input change
    }));
  };

  const handleGenderChange = (gender) => {
    setSignUpData(prevData => ({
      ...prevData, gender
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      gender: "",  // Clear the gender error on valid input change
    }));
  };

  const handleFullNameChange = (e) => {
    const fullName = e.target.value;
    setSignUpData(prevData => ({
      ...prevData, fullName
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      fullName: "",  // Clear the fullName error on valid input change
    }));
  };

  const handleCountryChange = (country) => {
    setSignUpData(prevData => ({
      ...prevData, country
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      country: "",  // Clear the country error on valid input change
    }));
  };

  return (
    <div className={styles.stepCtn}>
      
      {/* Full Name */}
      <div className={styles.fullNameCtn}>
        <p className={styles.headerText}>Full name</p>
        <EmptyInput 
          type="text" 
          placeholder="Write name..."
          value={signUpData.fullName} 
          onChange={handleFullNameChange}  // Updated to call the handleFullNameChange function
          errorMessage={errors.fullName} 
        />
      </div>

      {/* Date of Birth */}
      <div className={styles.dobPickerCtn}>
        <p className={styles.headerText}>Date of Birth</p>
        <DateOfBirthPicker onChange={handleDobChange} errorMessage={errors.dob} />
      </div>

      {/* Gender Selection */}
      <div className={styles.genderCtn}>
        <p className={styles.headerText}>Select Gender</p>
        <GenderSelector 
          onChange={handleGenderChange}  // Updated to call the handleGenderChange function
          value={signUpData.gender} 
        />
        {errors.gender && <ErrorInput errorMessage={errors.gender} />}
      </div>

      {/* Country Selection */}
      <div className={styles.countrySelectCtn}>
        <p className={styles.headerText}>Choose your country</p>
        <CountrySelect 
          onChange={handleCountryChange}  // Pass onChange here
          value={signUpData.country}  // Pass selected country here
          errorMessage={errors.country}  // Pass error message here
        />
      </div>

      {/* Terms and Conditions */}
      <div className={styles.termsCtn}>
        <label className={styles.customCheckbox}>
          <input
            type="checkbox"
            checked={signUpData.isTermsAgreed}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setSignUpData(prevData => ({
                ...prevData, isTermsAgreed: isChecked
              }));
              setErrors((prevErrors) => ({
                ...prevErrors,
                isTermsAgreed: "",  // Clear the isTermsAgreed error on valid input change
              }));
            }}
          />
          <span className={styles.checkmark}></span>
          <p>I have read and agree to the <Link to="/privacy" target="_blank">Privacy Policy </Link> and <Link to="/terms-and-conditions" target="_blank">Terms of Use</Link>.</p>
        </label>
        {errors.isTermsAgreed && <ErrorInput errorMessage={errors.isTermsAgreed} />}
        {errors.email && <ErrorInput  errorMessage={errors.email} />}
      </div>

    </div>
  );
}

export default SignUpStep2;