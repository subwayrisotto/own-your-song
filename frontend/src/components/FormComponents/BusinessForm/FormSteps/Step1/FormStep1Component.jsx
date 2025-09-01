import React from 'react';
import businessFormData from '../../../../../data/businessFormData';
import DefaultInput from '../../../../InputComponents/DefaultInputComponent/DefaultInputComponent';
import styles from './FormStep.module.scss';

function FormStep1({ businessData, setBusinessData, errors }) {
  return (
    <div className={styles.stepCtn}>
      <div className={styles.inputsCtn}>
        {businessFormData.step1.map((input, index) => (
          <div className={styles.inputData} key={index}>
            {input.title !== '' && (
              <label htmlFor={`${styles.inputArea}${index}`} className={styles.label}>{input.title}</label>
            )}
            <DefaultInput 
                  {...input} 
                  formData={businessData} 
                  setFormData={setBusinessData}
                  value={businessData[input.variableName]}  // Bind the input value to formData
                  errorMessage={errors?.[input.variableName]?.message || errors?.[input.variableName]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormStep1;