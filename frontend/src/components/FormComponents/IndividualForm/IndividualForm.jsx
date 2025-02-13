import React, { useState, useEffect } from 'react';
import FormStep1 from './FormSteps/Step1/FormStep1Component';
import FormStep2 from './FormSteps/Step2/FormStep2Component';
import FormStep3 from './FormSteps/Step3/FormStep3Component';
import FormStep4 from './FormSteps/Step4/FormStep4Component';
import FormStep5 from './FormSteps/Step5/FormStep5Component';
import styles from './IndividualForm.module.scss';
import { createPayment, getSubs } from '../../../api';
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { getFormSchema } from '../../../schemas/formSchema';
import OrderSummary from './FormSteps/OrderSummary/OrderSummary';
import Checkout from './FormSteps/Checkout/Checkout';

function Individual() { 
  const [searchParams, setSearchParams] = useSearchParams();
  const stepFromUrl = parseInt(searchParams.get("step")) || 1;
  const [step, setStep] = useState(stepFromUrl);
  const maxStep = 7;
  const stepsArray = Array.from({ length: maxStep }, (_, index) => index + 1);

  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(searchParams.get("plan") || '');  
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState(() => {
    const savedFormData = sessionStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : {
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
      story: '',
      dateDelivery: '',
      rushDeliveryFee: ''
    };
  });

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]); 

  useEffect(() => {
    if (plans.length > 0 && currentPlan) {
      setCurrentPlan(currentPlan); // Ensure it's set after plans are loaded
    }
  }, [plans]); 
  
  const updateStepInUrl = (newStep) => {
    const updatedParams = new URLSearchParams(searchParams);
    
    if (!updatedParams.has("type")) {
      updatedParams.set("type", "individual"); // Add "individual" if it's missing
    }
    updatedParams.set("step", newStep); 
    setSearchParams(updatedParams);  // Update URL with step, type, plan
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
  

  const handleSubmit = async () => {
    if (step >= 5) return true; // Skip validation for Step 5
  
    const currentSchema = getFormSchema(currentPlan)[step - 1];
  
    if (!currentSchema) {
      console.error("Schema not found for this step:", step);
      return false;
    }
  
    try {
      await currentSchema.validate(formData, { abortEarly: false });
      return true; // Form is valid
    } catch (error) {
      console.error("Validation error:", error);
  
      const validationErrors = error.inner
        ? error.inner.reduce((acc, curr) => {
            acc[curr.path] = curr.message;
            return acc;
          }, {})
        : {}; 
  
      setErrors(validationErrors);
      return false; // Form is invalid
    }
  };  

  async function handleCheckout() {
    const cartData = JSON.parse(sessionStorage.getItem("formData")) || {};
    const planPrice = selectedPlanInfo?.price || 0;
    const totalAmount = (planPrice + (cartData.rushDeliveryFee || 0)) * 100;

    await createPayment({
      totalAmount,
      email: cartData.email,
      name: cartData.name,
      formData: JSON.stringify(cartData)
    });

  //   await savePaymentAndOrderToDb({
  //     cartData: {
  //         formData: JSON.stringify(cartData) // Ensure this is a string if needed
  //     }
  // });  
  }
  
  const handleNext = async () => {
    const isValid = await handleSubmit(); 
    if (isValid) {
      setErrors({});
      if (step === maxStep - 1) {
        sessionStorage.setItem("formData", JSON.stringify(formData));
      }
      if(step === maxStep){
        handleCheckout();
      }
      setStep((prevStep) => Math.min(prevStep + 1, maxStep));
      updateStepInUrl(step);  // Update step in URL
    }
  };
  
  useEffect(() => {
    const initialPlan = searchParams.get("plan");
    
    if (!initialPlan) {
      // Set a default plan if none exists
      setCurrentPlan('silver'); 
    }
    if (!searchParams.has("type")) {
      updateStepInUrl(1);  
    }
  }, []);  
  
  const selectedPlanInfo = plans.find(plan => plan.plan.toLowerCase() === currentPlan.toLowerCase());

  const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const FormStepDisplay = () => {
    switch (step) {
      case 1:
        return <FormStep1 formData={formData} setFormData={setFormData} errors={errors} />;
      case 2:
        return <FormStep2 formData={formData} setFormData={setFormData} errors={errors} />;
      case 3:
        return <FormStep3 currentPlan={currentPlan} formData={formData} setFormData={setFormData} errors={errors} />;
      case 4:
        return <FormStep4 currentPlan={currentPlan} formData={formData} setFormData={setFormData} errors={errors}/>;
      case 5:
        return <FormStep5 formData={formData} setFormData={setFormData} />
      case 6: 
        return <OrderSummary />
      case 7: 
        return <Checkout currentPlan={currentPlan} planPrice={selectedPlanInfo?.price || 0} />
      default:
        return <FormStep1 formData={formData} setFormData={setFormData} errors={errors} />;
    }
  };

  return (
    <div className={styles.individualForm}>
      <div className={styles.formContainer}>
        <div className={styles.header}> 
          <div className={`${step > 5 ? styles.hiddenStep : ""} ${styles.stepperContainer}`}>
            {
              stepsArray.map((stepIndex) => {
                if (stepIndex > 5) return null;
                return (
                  <>
                    <div className={styles.step} data-active={step >= stepIndex} key={stepIndex}>
                      {/* Remove setStep after finish */}
                      <div className={styles.circle} onClick={() => setStep(stepIndex)}>{stepIndex}</div>
                    </div>
                    {
                      stepIndex < 5 && (
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
                  <div className={`${step > 5 ? styles.hiddenStep : ""} ${styles.planListCtn}`} >
                    <ul className={styles.planList}>
                    {
                      plans.length > 0 && plans.map((plan) => {
                        return(
                          <li 
                            key={plan.plan}  // Use the unique identifier here
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
                <form onSubmit={handleSubmit}>
                  {FormStepDisplay()}
                </form>
            </div>
            ) : (
              <div className={styles.dateBody}>
                <FormStep5 formData={formData} setFormData={setFormData}/>
              </div>
            )
        }
        <div className={styles.footer}>
          <button type={'button'} onClick={() => handleBack()} className={`${styles.formButton} ${step > 1 ? '' : styles.disabled}`} disabled={step > 1 ? false : true}><span>Back</span></button>
          <button type="button" onClick={handleNext} className={styles.formButton}>
            <span>{step === maxStep ? "Order & Pay" : "Next"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Individual;