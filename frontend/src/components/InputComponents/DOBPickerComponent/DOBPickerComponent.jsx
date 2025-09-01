import React, { useState, useEffect } from "react";
import styles from "./DateOfBirthPicker.module.scss";
import ErrorInput from '../ErrorInputComponent/ErrorInputComponent';

const DateOfBirthPicker = ({ onChange, errorMessage }) => {
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();
  const currentDay = new Date().getDate();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 101 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("en-US", { month: "long" })
  );

  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [isOpenDay, setIsOpenDay] = useState(false);
  const [isOpenMonth, setIsOpenMonth] = useState(false);
  const [isOpenYear, setIsOpenYear] = useState(false);

  useEffect(() => {
    const formattedDob = new Date(selectedYear, months.indexOf(selectedMonth), selectedDay);
    if (!isNaN(formattedDob)) {
      onChange(formattedDob); // Pass date to parent component
    }
  }, [selectedDay, selectedMonth, selectedYear]);

  const closeAllDropdowns = () => {
    setIsOpenDay(false);
    setIsOpenMonth(false);
    setIsOpenYear(false);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(`.${styles.dob}`)) {
      closeAllDropdowns();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className={styles.dob}>
        <div className={styles.daysCtn}>
          <div
            className={`${styles.placeholder} ${isOpenDay ? styles.open : ""}`}
            onClick={() => { closeAllDropdowns(); setIsOpenDay(!isOpenDay); }}
          >
            <p>{selectedDay}</p>
            <img
              src={`${process.env.PUBLIC_URL}/form/arrow.svg`}
              alt="arrow"
              className={`${styles.arrow} ${isOpenDay ? styles.rotated : ""}`}
            />
          </div>
          <div className={`${styles.dropdown} ${isOpenDay ? styles.open : ""}`}>
            {days.map((day) => (
              <div
                key={day}
                className={styles.dropdownItem}
                onClick={() => { setSelectedDay(day); setIsOpenDay(false); }}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.monthsCtn}>
          <div
            className={`${styles.placeholder} ${isOpenMonth ? styles.open : ""}`}
            onClick={() => { closeAllDropdowns(); setIsOpenMonth(!isOpenMonth); }}
          >
            <p>{selectedMonth}</p>
            <img
              src={`${process.env.PUBLIC_URL}/form/arrow.svg`}
              alt="arrow"
              className={`${styles.arrow} ${isOpenMonth ? styles.rotated : ""}`}
            />
          </div>
          <div className={`${styles.dropdown} ${isOpenMonth ? styles.open : ""}`}>
            {months.map((month) => (
              <div
                key={month}
                className={styles.dropdownItem}
                onClick={() => { setSelectedMonth(month); setIsOpenMonth(false); }}
              >
                {month}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.yearsCtn}>
          <div
            className={`${styles.placeholder} ${isOpenYear ? styles.open : ""}`}
            onClick={() => { closeAllDropdowns(); setIsOpenYear(!isOpenYear); }}
          >
            <p>{selectedYear}</p>
            <img
              src={`${process.env.PUBLIC_URL}/form/arrow.svg`}
              alt="arrow"
              className={`${styles.arrow} ${isOpenYear ? styles.rotated : ""}`}
            />
          </div>
          <div className={`${styles.dropdown} ${isOpenYear ? styles.open : ""}`}>
            {years.map((year) => (
              <div
                key={year}
                className={styles.dropdownItem}
                onClick={() => { setSelectedYear(year); setIsOpenYear(false); }}
              >
                {year}
              </div>
            ))}
          </div>
        </div>
      </div>
      {errorMessage && <ErrorInput errorMessage={errorMessage} />}
    </>
  );
};

export default DateOfBirthPicker;