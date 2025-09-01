import React, { useState, useEffect } from 'react';
import styles from './FormStep5.module.scss';
import { useSearchParams } from "react-router-dom";

const SilverDateCtn = (props) => {
  const { formData } = props;
  return (
    <div className={styles.silverDateCtn}>
      <p className={styles.headerText}>You'll receive your order in 24 hours! </p>
    </div>
  )
}

function FormStep5({ formData, setFormData }) {
  const [searchParams] = useSearchParams();
  const [deliveryDates, setDeliveryDates] = useState([]);
  const [rushValue, setRushValue] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const planFromUrl = searchParams.get("plan");

  const rushDayFee = {
    silver: {
      1: 0,
      2: 'disabled',
      3: 'disabled',
      4: 'disabled',
      5: 'disabled',
    },
    gold: {
      1: 100,
      2: 50,
      3: 0,
      4: 'disabled',
      5: 'disabled',
    },
    platinum: {
      1: 200,
      2: 150,
      3: 100,
      4: 50,
      5: 0,
    },
  };

  const handleRushFeeValue = (index) => {
    const fee = rushDayFee[planFromUrl]?.[index + 1];
    if (fee !== 'disabled') {
      setRushValue(fee);
      setActiveIndex(index);

      // Save data to sessionStorage
      setFormData((prevData) => {
        const updatedData = {
          ...prevData,
          dateDelivery: `${deliveryDates[index].month} ${deliveryDates[index].day}`,
          rushDeliveryFee: fee
        };
        sessionStorage.setItem("formData", JSON.stringify(updatedData));
        return updatedData;
      });
    }
  };

  const getNextDays = (count) => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < count; i++) {
      const nextDay = new Date();
      nextDay.setDate(today.getDate() + i);

      const formattedDay = {
        day: nextDay.getDate(),
        month: nextDay.toLocaleDateString("en-US", { month: "short" }),
        weekday: nextDay.toLocaleDateString("en-US", { weekday: "short" }),
        rushFee: rushDayFee[planFromUrl]?.[i + 1],
      };

      days.push(formattedDay);
    }

    return days;
  };

  useEffect(() => {
    if (planFromUrl === "silver") {
      // Set dateDelivery to the next day if the plan is "silver"
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1); // Set to next day
      const formattedDay = {
        day: nextDay.getDate(),
        month: nextDay.toLocaleDateString("en-US", { month: "short" }),
        weekday: nextDay.toLocaleDateString("en-US", { weekday: "short" }),
      };

      setRushValue(0);  // For silver plan, no rush fee
      setDeliveryDates([formattedDay]);

      setFormData((prevData) => {
        const updatedData = {
          ...prevData,
          dateDelivery: `${formattedDay.month} ${formattedDay.day}`,
          rushDeliveryFee: 0,
        };
        sessionStorage.setItem("formData", JSON.stringify(updatedData));
        return updatedData;
      });
    } else {
      const days = getNextDays(5);
      setDeliveryDates(days);

      const firstZeroFeeIndex = days.findIndex(date => date.rushFee === 0);
      if (firstZeroFeeIndex !== -1) {
        setActiveIndex(firstZeroFeeIndex);
        setRushValue(0);
      }

      // Check sessionStorage for saved data on initial load
      const storedData = JSON.parse(sessionStorage.getItem("formData"));
      if (storedData && storedData.dateDelivery) {
        const storedIndex = days.findIndex(date => `${date.month} ${date.day}` === storedData.dateDelivery);
        if (storedIndex !== -1) {
          setActiveIndex(storedIndex);
          setRushValue(storedData.rushDeliveryFee || 0);
        }
      }

      const interval = setInterval(() => {
        setDeliveryDates(getNextDays(5));
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

      return () => clearInterval(interval);
    }
  }, [planFromUrl, setFormData]);

  return (
    planFromUrl === "silver" ? (
      <SilverDateCtn formData={formData} />
    ) : (
      deliveryDates.length > 0 ? (
        <div className={styles.datePickerCtn}>
          <p className={styles.headerText}>Short on time?</p>
          <p className={styles.descriptionText}>
            We understand that sometimes you need things done faster. With our express service options, you can reduce waiting times and get your order completed sooner.
          </p>

          <ul className={styles.dateList}>
            {deliveryDates.map((date, index) => {
              const isDisabled = date.rushFee === 'disabled';
              const isActive = activeIndex === index;

              return (
                <li
                  key={index}
                  className={`${styles.dateListItem} ${isDisabled ? styles.isDisabled : ''} ${isActive ? styles.active : ''}`}
                  onClick={() => {
                    if (!isDisabled) {
                      handleRushFeeValue(index);
                    }
                  }}
                >
                  <p className={styles.weekday}>{date.weekday}</p>
                  <p className={styles.month_day}>
                    {date.month} {date.day}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className={styles.rushServiceCtn}>
            <p className={styles.rushText}>Rush service fee for song delivery:</p>
            <p className={styles.rushValue}>{rushValue === 'disabled' ? 'Not available' : `${rushValue}$`}</p>
          </div>

          <p className={styles.descriptionText}>
            Delivery of your song will be completed by the end of the day (UTC) on the specified date.
          </p>
        </div>
      ) : (
        <div>Loading...</div>
      )
    )
  );
}

export default FormStep5;