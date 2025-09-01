import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

import FormStep1 from './FormSteps/Step1/FormStep1Component';
import FormStep2 from './FormSteps/Step2/FormStep2Component';
import FormStep3 from './FormSteps/Step3/FormStep3Component';
import FormStep4 from './FormSteps/Step4/FormStep4Component';
import FormStep5 from './FormSteps/Step5/FormStep5Component';
import OrderSummary from './FormSteps/OrderSummary/OrderSummary';
import Checkout from './FormSteps/Checkout/Checkout';

import { createPayment, getSubs, generateGuestToken } from '../../../api';
import { getFormSchema } from '../../../schemas/formSchema';
import { useUser } from '../../../context/UserContext';

import Steps from '../../StepsComponent/Steps'; 
import styles from './IndividualForm.module.scss';

function Individual() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useUser();

  const maxStep = 7;
  const stepFromUrl = parseInt(searchParams.get("step")) || 1;
  const [step, setStep] = useState(stepFromUrl);
  const [isMobile, setIsMobile] = useState(false);

  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(searchParams.get("plan") || '');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem("formData");
    return saved ? JSON.parse(saved) : {
      funnyStory: '',
      characterTraits: '',
      hobbies: '',
      name: currentUser?.fullName || '',
      recipient: '',
      recipientRole: '',
      songMood: '',
      songStyle: '',
      songTempo: '',
      instruments: '',
      story: '',
      dateDelivery: '',
      rushDeliveryFee: '',
      email: currentUser?.email || '',
      confirmEmail: currentUser?.email || '',
      songLanguage: ''
    };
  });

  const selectedPlanInfo = plans.find(plan => plan.plan.toLowerCase() === currentPlan.toLowerCase());

  // --- EFFECTS ---

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 428);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    async function loadPlans() {
      const subs = await getSubs();
      if (subs) setPlans(subs);
    }
    loadPlans();
  }, []);

  useEffect(() => {
    if (currentPlan) {
      updatePlanInUrl(currentPlan);
    }
  }, [currentPlan]);

  useEffect(() => {
    const initialPlan = searchParams.get("plan");
    if (!initialPlan) setCurrentPlan('silver');
    if (!searchParams.has("type")) updateStepInUrl(1);
  }, []);

  useEffect(() => {
    updateStepInUrl(step);
  }, [step]);

  // --- HELPERS ---

  const updateStepInUrl = (newStep) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (!updatedParams.has("type")) updatedParams.set("type", "individual");
    updatedParams.set("step", newStep);
    setSearchParams(updatedParams);
  };

  const updatePlanInUrl = (plan) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("plan", plan);
    setSearchParams(updatedParams);
    setCurrentPlan(plan);
  };

  const handleSubmit = async () => {
    if (step >= 5) return true;
    const currentSchema = getFormSchema(currentPlan)[step - 1];
    if (!currentSchema) return false;

    try {
      await currentSchema.validate(formData, { abortEarly: false });
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

  const handleCheckout = async () => {
    const cartData = JSON.parse(sessionStorage.getItem("formData")) || {};
    const totalAmount = (selectedPlanInfo?.price + (cartData.rushDeliveryFee || 0)) * 100;

    let guestToken = null;
    if (!currentUser) {
      guestToken = localStorage.getItem("guestToken");
      if (!guestToken) {
        const res = await generateGuestToken(cartData.email);
        guestToken = res.guestToken;
        localStorage.setItem("guestToken", guestToken);
      }
    }

    await createPayment({
      totalAmount,
      currentPlan,
      email: cartData.email,
      name: cartData.name,
      formData: JSON.stringify(cartData),
      ...(guestToken && { guestToken })
    });
  };

  const handleNext = useCallback(async () => {
    const isValid = await handleSubmit();
    if (!isValid) return;

    if (!formData.confirmEmail || formData.email === formData.confirmEmail) {
      sessionStorage.setItem("formData", JSON.stringify(formData));
      setErrors(prev => {
        const { confirmEmail, ...rest } = prev;
        return rest;
      });

      if (step === maxStep) {
        handleCheckout();
      }

      const newStep = Math.min(step + 1, maxStep);
      setStep(newStep);
      updateStepInUrl(newStep);
    } else {
      setErrors(prev => ({
        ...prev,
        confirmEmail: 'Email addresses must match'
      }));
    }
  }, [formData, step]);

  const handleBack = useCallback(() => {
    const newStep = Math.max(step - 1, 1);
    setStep(newStep);
    updateStepInUrl(newStep);
  }, [step]);

  const FormStepDisplay = () => {
    switch (step) {
      case 1: return <FormStep1 formData={formData} setFormData={setFormData} errors={errors} />;
      case 2: return <FormStep2 formData={formData} setFormData={setFormData} errors={errors} />;
      case 3: return <FormStep3 currentPlan={currentPlan} formData={formData} setFormData={setFormData} errors={errors} />;
      case 4: return <FormStep4 currentPlan={currentPlan} formData={formData} setFormData={setFormData} errors={errors} />;
      case 5: return <FormStep5 formData={formData} setFormData={setFormData} errors={errors} />;
      case 6: return <OrderSummary />;
      case 7: return <Checkout currentPlan={currentPlan} planPrice={selectedPlanInfo?.price || 0} />;
      default: return null;
    }
  };

  return (
    <div className={styles.individualForm}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <Steps step={step} maxStep={maxStep} isMobile={isMobile} showedSteps={maxStep - 2}/>
        </div>

        {step !== 5 ? (
          <div className={styles.body}>
            {step < 6 && (
              <div className={styles.planListCtn}>
                <ul className={styles.planList}>
                  {plans.map((plan) => (
                    <li
                      key={plan.plan}
                      className={`${styles.planListItem} ${currentPlan === plan.plan.toLowerCase() ? styles.active : ''}`}
                      onClick={() => setCurrentPlan(plan.plan.toLowerCase())}
                    >
                      <p className={styles.planName}>{plan.plan}</p>
                      <div className={styles.benefits}>
                        {plan.benefits.map((b, i) => (
                          <div className={styles.benefit} key={i}>
                            <FontAwesomeIcon icon={faCircleCheck} />
                            <p className={styles.benefitText}>{b}</p>
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmit}>{FormStepDisplay()}</form>
          </div>
        ) : (
          <div className={styles.dateBody}>
            <FormStep5 formData={formData} setFormData={setFormData} />
          </div>
        )}

        <div className={styles.footer}>
          <button
            type="button"
            onClick={handleBack}
            className={`${styles.formButton} ${step > 1 ? '' : styles.disabled}`}
            disabled={step <= 1}
          >
            <span>Back</span>
          </button>
          <button type="button" onClick={handleNext} className={styles.formButton}>
            <span>{step === maxStep ? "Order & Pay" : "Next"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Individual;