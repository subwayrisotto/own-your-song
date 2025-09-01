import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Form.module.scss";
import Business from "./BusinessForm/BusinessForm";
import Individual from "./IndividualForm/IndividualForm";

const Form = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get("plan");
  const [selectedType, setSelectedType] = useState(null);

  const type = [
    { id: 1, name: "Individual" },
    { id: 2, name: "Business" },
  ];

  // Set selected type from URL (for page reload)
  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    if (typeFromUrl) {
      setSelectedType(typeFromUrl.charAt(0).toUpperCase() + typeFromUrl.slice(1));
    }
  }, [searchParams]);

  // Function to handle type selection
  const handleTypeSelect = (typeSelected) => {
    if (!selectedPlan) {
      alert("Please select a plan first.");
      return;
    }
    setSelectedType(typeSelected);
    // Add step=1 to the URL when the type is selected
    navigate(`/form?plan=${encodeURIComponent(selectedPlan)}&type=${encodeURIComponent(typeSelected.toLowerCase())}&step=1`);
  };
  

  // Set page height dynamically based on footer
  const setPageHeight = () => {
    const footer = document.querySelector("footer");
    const container = document.querySelector(`.${styles.container}`);

    if (footer && container) {
      const footerHeight = footer.offsetHeight || 0;
      container.style.minHeight = `calc(100vh - ${footerHeight}px)`;
      container.style.height = `100%`;
    }
  };

  useEffect(() => {
    setPageHeight();
    window.addEventListener("resize", setPageHeight);

    return () => window.removeEventListener("resize", setPageHeight);
  }, []);

  const handleGoBack = () => {
    // Manually navigate to the home page with the plan query parameter
    navigate(`/form?plan=${selectedPlan}`, { replace: true }); // Replace current entry with the new URL
    setSelectedType(null)
  };


  return (
    <div className={styles.container}>
      <div className={styles.ctn}>

        {
          selectedType ? (
            <div style={{width: "100%"}}>
              {selectedType === "Individual" ? <Individual /> : <Business />}
              {/* <button type="button" className={styles.goBackButton} onClick={handleGoBack}>
                Go Back
              </button> */}
            </div>
          ) : (
            <div className={styles.whoAreYouCtn}>
              <p className={styles.headerText}>Who are you?</p>
              <div className={styles.btnCtn}>
                {type.map((item) => (
                  <button
                    type="button"
                    className={styles.button}
                    key={item.id}
                    onClick={() => handleTypeSelect(item.name)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Form;