"use client";

import React, { useEffect, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import inputsData from '../../../../../data/inputsData';
import DefaultInput from '../../../../InputComponents/DefaultInputComponent/DefaultInputComponent';
import styles from './FormStep.module.scss';
import { formSchema } from '../../../../../schemas/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';

function FormStep1({ formData, setFormData }) {
  // const formSchemaStep1 = formSchema.pick({
  //   funnyStory: true,
  //   characterTraits: true,
  //   hobbies: true,
  // });

  // const form = useForm({
  //   resolver: zodResolver(formSchemaStep1),
  //   defaultValues:{
  //     funnyStory: formData.funnyStory,
  //     characterTraits: formData.characterTraits,  
  //     hobbies: formData.hobbies,
  //   }
  // })

  const onSubmit = (data) => { 
    console.log(data);
  } 

  return (
    <div className={styles.stepCtn}>
      <p className={styles.headerText}>Three facts to include in the song</p>
      <p className={styles.subHeaderText}>Write three moments you want us to include. It can be a funny story, a specialty of the person, or something important to both of you.</p>

      <div className={styles.inputsCtn}>
          {/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
          {
            inputsData.step1.map((input, index) => (
              <div className={styles.inputData} key={index}>
                {input.title !== '' && (
                  <label htmlFor={`${styles.inputArea}${index}`} className={styles.label}>{input.title}</label>
                )}
                <DefaultInput
                  {...input}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            ))
          }
          {/* </form> */}
      </div>
    </div>
  );
}

export default FormStep1;
