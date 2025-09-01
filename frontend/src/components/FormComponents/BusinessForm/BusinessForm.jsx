import React, { useCallback, useEffect, useState } from 'react';
import styles from './BusinessForm.module.scss';
import Steps from '../../StepsComponent/Steps';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import FormStep1 from './FormSteps/Step1/FormStep1Component';
import businessFormSchema from '../../../schemas/businessFormSchema';
import FormStep2 from './FormSteps/Step2/FormStep2Component';
import FormStep3 from './FormSteps/Step3/FormStep3Component';
import { sendBusinessOrder } from '../../../api';
import FormStep4 from './FormSteps/Step4/FormStep4Component';

function Business() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useUser();
  const [errors, setErrors] = useState({});
  const maxStep = 4;
  const stepFromUrl = parseInt(searchParams.get("step")) || 1;
  const [step, setStep] = useState(stepFromUrl);
  const [currentPlan, setCurrentPlan] = useState(searchParams.get("plan") || '');
  const [currentForm, setCurrentForm] = useState(searchParams.get("type") || '');
  const [isMobile, setIsMobile] = useState(false);
  const [businessData, setBusinessData] = useState(() => {
    const saved = sessionStorage.getItem("businessData");
    return saved ? JSON.parse(saved) : {
      companyName: '',
      jobTitle: '',
      contactPerson: '',
      email: currentUser?.email || '',
      phone: '',
      businessType: '',
      cooperationGoals: '',
      interestSolutions: '',
      comment: ''
    };
  });

  const updateStepInUrl = (newStep) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (!updatedParams.has("type")) updatedParams.set("type", "business");
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
    const initialPlan = searchParams.get("plan");
    if (!initialPlan) setCurrentPlan('silver');
    if (!searchParams.has("type")) updateStepInUrl(1);
  }, []);

  useEffect(() => {
    updateStepInUrl(step);
  }, [step]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 428);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendApplication = async () => {
    const cartData = JSON.parse(sessionStorage.getItem("businessData")) || {};
  
    try {
      await sendBusinessOrder(cartData);
      const newStep = Math.min(step + 1, maxStep + 1);
      setStep(newStep);
      updateStepInUrl(newStep);
    } catch (err) {
      console.error("Submission error:", err.message);
    }
  };

  const handleSubmit = async () => {
    if (step >= 3) return true;
    const currentSchema = businessFormSchema[step - 1];
    if (!currentSchema) return false;

    try {
      await currentSchema.validate(businessData, { abortEarly: false });
      return true;
    } catch (err) {
      const validationErrors = err.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      setErrors(validationErrors);
      return false;
    }
  };

  const handleNext = useCallback(async () => {
    const isValid = await handleSubmit();
    if (!isValid) return;

    if (!businessData.confirmEmail || businessData.email === businessData.confirmEmail) {
      sessionStorage.setItem("businessData", JSON.stringify(businessData));
      setErrors(prev => {
        const { confirmEmail, ...rest } = prev;
        return rest;
      });

      const newStep = Math.min(step + 1, maxStep);
      setStep(newStep);
      updateStepInUrl(newStep);
    } else {
      setErrors(prev => ({
        ...prev,
        confirmEmail: 'Email addresses must match'
      }));
    }
  }, [businessData, step]);

  const handleBack = useCallback(() => {
    const newStep = Math.max(step - 1, 1);
    setStep(newStep);
    updateStepInUrl(newStep);
  }, [step]);

  

  const FormStepDisplay = () => {
    switch (step) {
      case 1: return <FormStep1 businessData={businessData} setBusinessData={setBusinessData} errors={errors} />;
      case 2: return <FormStep2 businessData={businessData} setBusinessData={setBusinessData} errors={errors} />;
      case 3: return <FormStep3 currentPlan={currentPlan} businessData={businessData} setBusinessData={setBusinessData} errors={errors} currentForm={currentForm} handleClick={sendApplication}/>;
      case 4: return <FormStep4 />
      default: return null;
    }
  };

  return (
    <div className={styles.ctn}>
      <Steps step={stepFromUrl} maxStep={maxStep} showedSteps={maxStep - 1} isMobile={isMobile}/>

      <div className={styles.body}>
        <form onSubmit={handleSubmit}>{FormStepDisplay()}</form>
      </div>

      {
        step !== maxStep && (
          <div className={styles.footer}>
            <button
              type="button"
              onClick={handleBack}
              className={`${styles.formButton} ${step > 1 ? '' : styles.disabled}`}
              disabled={step <= 1}
            >
              <span>Back</span>
            </button>
            {
              step !== maxStep - 1 && <button type="button" onClick={handleNext} className={styles.formButton}>
                <span>Next</span>
              </button>
            }
          </div>
        ) 
      }
    </div>
  );
}

export default Business;