import React from 'react';
import styles from './OrderSummary.module.scss';

function OrderSummary() {
  const savedFormData = JSON.parse(sessionStorage.getItem("formData")) || {};
  console.log(savedFormData)

  // Create a new data object
  const { funnyStory, songMood, songStyle, songTempo, instruments, story, songLanguage } = savedFormData;
  const orderSummary = { funnyStory, songMood, songStyle, songTempo,songLanguage,  instruments, story };

  const formatVariableNameToTitle = (variable) => {
    return variable
      .replace(/([A-Z])/g, " $1") // Insert space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  };

  return (
    <div className={styles.orderSummaryCtn}>
      <p className={styles.headerText}>Order Summary</p>
      <ul className={styles.summaryList}>
        {Object.entries(orderSummary).map(([key, value]) => (
          value && (
            <li key={key} className={styles.summaryItem}>
              <p className={styles.title}>{formatVariableNameToTitle(key)}: </p>
              <div className={styles.textWrapper}><p className={styles.value}>{value}</p></div>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default OrderSummary;
