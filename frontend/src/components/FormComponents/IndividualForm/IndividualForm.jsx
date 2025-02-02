import React, { useState, useEffect } from 'react';
import FormStep1 from './FormSteps/Step1/FormStep1Component';
import FormStep2 from './FormSteps/Step2/FormStep2Component';
import FormStep3 from './FormSteps/Step3/FormStep3Component';
import FormStep4 from './FormSteps/Step4/FormStep4Component';
import FormStep5 from './FormSteps/Step5/FormStep5Component';
import styles from './IndividualForm.module.scss';
import { getSubs } from '../../../api';
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const Button = ({ title, functionOnClick, isDisabled=false }) => {
  return (
    <button type='button' onClick={() => functionOnClick()} className={styles.formButton} disabled={isDisabled}>{title}</button>
  );
}

function Individual() { 
  const [searchParams, setSearchParams] = useSearchParams();
  const stepFromUrl = parseInt(searchParams.get("step")) || 1;
  const [step, setStep] = useState(stepFromUrl);
  const maxStep = 5;
  const stepsArray = Array.from({ length: maxStep }, (_, index) => index + 1);

  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(searchParams.get("plan") || '');  

  const [formData, setFormData] = useState({
    funnyStory: '',
    characterTraits: '',
    hobbies: '',
    email: '',
    name: '',
    recipient: '',
    recipientRole: '',
    songMood: '',
    songStyle: '',
    songTempo: '',
    instruments: '', 
    story: ''
  });
  

  const updateStepInUrl = (newStep) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (!updatedParams.has("type")) {
      updatedParams.set("type", "individual");
    }
    updatedParams.set("step", newStep); 
    setSearchParams(updatedParams);
  };

  const updatePlanInUrl = (plan) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("plan", plan);  
    setSearchParams(updatedParams);
    setCurrentPlan(plan);  
  };

  useEffect(() => {
    updateStepInUrl(step);
  }, [step]);

  useEffect(() => {
    async function loadSubsFromDb() {
      let plans = await getSubs();
      if (plans) setPlans(plans);
    }
    loadSubsFromDb();
  }, []);

  useEffect(() => {
    if (currentPlan) {
      updatePlanInUrl(currentPlan);
    }
  }, [currentPlan]);

  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, maxStep));
  const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const FormStepDisplay = () => {
    switch (step) {
      case 1:
        return <FormStep1 formData={formData} setFormData={setFormData}/>;
      case 2: 
        return <FormStep2 formData={formData} setFormData={setFormData}/>;
      case 3: 
        return <FormStep3 currentPlan={currentPlan} formData={formData} setFormData={setFormData}/>;
      case 4: 
        return <FormStep4 currentPlan={currentPlan} formData={formData} setFormData={setFormData}/>;
      default: 
        return <FormStep1 formData={formData} setFormData={setFormData}/>;
    }
  };

  return (
    <div className={styles.individualForm}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <div className={styles.stepperContainer}>
            {
              stepsArray.map((stepIndex) => {
                return (
                  <>
                    <div className={styles.step} data-active={step >= stepIndex} key={stepIndex}>
                      <div className={styles.circle} onClick={() => setStep(stepIndex)}>{stepIndex}</div>
                    </div>
                    {
                      stepIndex < maxStep && (
                        <div className={styles.linesWrapper}>
                          <div className={styles.line} key={stepIndex}/>
                          <div className={`${styles.lineActive} ${stepIndex + 1 <= step ? styles.active : ""}`} key={`key-${stepIndex}`}/>
                        </div>
                      )
                    }
                  </>
                );
              })
            } 
          </div>
        </div>
        {
          step !== 5
            ? (
              // <div className={styles.imagesCtn}>
              //   <img src={`${process.env.PUBLIC_URL}/form/image1.png`} alt="image1" className={styles.img1}/> 
              //   <img src={`${process.env.PUBLIC_URL}/form/image2.png`} alt="image2" className={styles.img2} /> 
              // </div>,
              <div className={styles.body}>
                  <div className={styles.planListCtn}>
                    <ul className={styles.planList}>
                      {
                        plans.length > 0 && plans.map((plan, index) => {
                          return(
                            <li 
                              key={index} 
                              className={`${styles.planListItem} ${currentPlan === plan.plan.toLowerCase() && styles.active}`}
                              onClick={() => setCurrentPlan(plan.plan.toLowerCase())} 
                            >
                              <p className={styles.planName}>{plan.plan}</p>
                              <div className={styles.benefits}>
                                {
                                  plan.benefits.map((benefit, index) => {
                                    return(
                                      <div className={styles.benefit} key={index}>
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                        <p className={styles.benefitText}>{benefit}</p>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                {FormStepDisplay()}
            </div>
            ) : (
              <div className={styles.dateBody}>
                <FormStep5 formData={formData}/>
              </div>
            )
        }
        <div className={styles.footer}>
          <Button title={'Back'} functionOnClick={handleBack} isDisabled={step > 1 ? false : true} />
          <Button title={step === maxStep ? "Go to checkout" : 'Next'} functionOnClick={handleNext}/>
        </div>
      </div>
    </div>
  );
}

export default Individual;