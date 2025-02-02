import React from 'react';
import inputsData from '../../../../../data/inputsData';
import DefaultInput from '../../../../InputComponents/DefaultInputComponent/DefaultInputComponent';
import styles from './FormStep.module.scss';

function FormStep2({formData, setFormData}) {
  return (
    <div className={styles.stepCtn}>
      <div className={styles.inputsCtn}>
        {
          inputsData.step2.map((input, index) => {

            return(
              <div className={styles.inputData}>
                {
                  input.title !== '' && (
                    <label htmlFor={`${styles.inputArea}${index}`} className={styles.label}  key={index}>{input.title}</label>
                  )
                }
                 <DefaultInput {...input} formData={formData} setFormData={setFormData} key={index}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default FormStep2
