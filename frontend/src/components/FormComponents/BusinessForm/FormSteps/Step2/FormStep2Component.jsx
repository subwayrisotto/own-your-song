import React, { useState } from 'react';
import businessFormData from '../../../../../data/businessFormData';
import SelectInput from '../../../../InputComponents/SelectInputComponent/SelectInputComponent';
import styles from './FormStep.module.scss';

function FormStep2(props) {
  const {currentPlan, businessData, setBusinessData, errors} = props
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSelectInput = (index) => {
    setOpenIndex(openIndex === index ? null : index); 
  };

  return (
    <div className={styles.stepCtn}>
      <div className={styles.inputsCtn}>
        {businessFormData.step2.map((input, index) => (
          <div className={styles.inputData} key={index}>
            {input.title && (
              <label htmlFor={`${styles.inputArea}${index}`} className={styles.label}>
                {input.title}
              </label>
            )}
            <SelectInput 
              {...input} 
              currentPlan={currentPlan}
              isOpen={openIndex === index} 
              toggleSelectInput={() => toggleSelectInput(index)} 
              formData={businessData}
              setFormData={setBusinessData}
              errorMessage={errors?.[input.variableName]?.message || errors?.[input.variableName]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormStep2;