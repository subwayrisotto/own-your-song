import React from 'react';
import inputsData from '../../../../../data/inputsData';
import DefaultInput from '../../../../InputComponents/DefaultInputComponent/DefaultInputComponent';
import styles from './FormStep.module.scss';

function FormStep1({ formData, setFormData, errors }) {
  return (
    <div className={styles.stepCtn}>
      <p className={styles.headerText}>Three facts to include in the song</p>
      <p className={styles.subHeaderText}>Write three moments you want us to include. It can be a funny story, a specialty of the person, or something important to both of you.</p>

      <div className={styles.inputsCtn}>
        {inputsData.step1.map((input, index) => (
          <div className={styles.inputData} key={index}>
            {input.title !== '' && (
              <label htmlFor={`${styles.inputArea}${index}`} className={styles.label}>{input.title}</label>
            )}
            <DefaultInput 
                  {...input} 
                  formData={formData} 
                  setFormData={setFormData}
                  value={formData[input.variableName]}  // Bind the input value to formData
                  errorMessage={errors?.[input.variableName]?.message || errors?.[input.variableName]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormStep1;