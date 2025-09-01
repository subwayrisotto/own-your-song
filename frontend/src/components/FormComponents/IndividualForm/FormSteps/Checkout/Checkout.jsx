import React, { useState } from 'react';
import styles from './Checkout.module.scss';

const currency = {
  USD: "$",       // United States Dollar
  EUR: "€",       // Euro
  GBP: "£",       // British Pound Sterling
  JPY: "¥",       // Japanese Yen
  AUD: "A$",      // Australian Dollar
  CAD: "C$",      // Canadian Dollar
  CHF: "CHF",     // Swiss Franc
  CNY: "¥",       // Chinese Yuan Renminbi
  SEK: "kr",      // Swedish Krona
  NZD: "NZ$",     // New Zealand Dollar
  MXN: "$",       // Mexican Peso
  SGD: "S$",      // Singapore Dollar
  HKD: "HK$",     // Hong Kong Dollar
  NOK: "kr",      // Norwegian Krone
  KRW: "₩",       // South Korean Won
  TRY: "₺",       // Turkish Lira
  INR: "₹",       // Indian Rupee
  RUB: "₽",       // Russian Ruble
  ZAR: "R",       // South African Rand
  BRL: "R$",      // Brazilian Real
  MYR: "RM",      // Malaysian Ringgit
  IDR: "Rp",      // Indonesian Rupiah
  PHP: "₱",       // Philippine Peso
  THB: "฿",       // Thai Baht
  VND: "₫",       // Vietnamese Dong
  PLN: "zł",      // Polish Zloty
  ARS: "$",       // Argentine Peso
  CLP: "$",       // Chilean Peso
  CZK: "Kč",      // Czech Koruna
  DKK: "kr",      // Danish Krone
  HUF: "Ft",      // Hungarian Forint
  ILS: "₪",       // Israeli Shekel
  SAR: "﷼",       // Saudi Riyal
  AED: "د.إ",      // United Arab Emirates Dirham
  COP: "$",       // Colombian Peso
  PKR: "₨",       // Pakistani Rupee
  EGP: "£",       // Egyptian Pound
  NGN: "₦",       // Nigerian Naira
  KES: "Sh",      // Kenyan Shilling
  BDT: "৳",       // Bangladeshi Taka
  LKR: "₨",       // Sri Lankan Rupee
  TWD: "NT$",     // New Taiwan Dollar
};

function Checkout({ planPrice, currentPlan }) {
  const savedFormData = JSON.parse(sessionStorage.getItem("formData")) || {};
  const { email, name, recipient, recipientRole, dateDelivery, rushDeliveryFee } = savedFormData;

  const formatDate = (dateString) => {
    const currentYear = new Date().getFullYear();
    let date;

    if (currentPlan === "silver") {
      date = new Date();
      date.setDate(date.getDate() + 1); 
    } else {
      date = new Date(`${dateString} ${currentYear}`);
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  // formatted data
  const deliveryDate = formatDate(dateDelivery);
  const totalPrice = planPrice + (rushDeliveryFee || 0); // if rushDeliveryFee is undefined or null, it defaults to 0
  const plan = currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1).toLowerCase();

  const checkout = { email, name, recipient, recipientRole, deliveryDate, plan, rushDeliveryFee };

  const formatVariableNameToTitle = (variable) => {
    return variable
      .replace(/([A-Z])/g, " $1") // Insert space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  };

  return (
    <div className={styles.orderSummaryCtn}>
      <p className={styles.headerText}>Checkout</p>
      <ul className={styles.summaryList}>
        {Object.entries(checkout).map(([key, value]) => {
          // Check if the plan is 'silver' and skip displaying rushDeliveryFee
          if (key === "rushDeliveryFee" && currentPlan === "silver") {
            return null;
          }
          return (
            value && (
              <li key={key} className={styles.summaryItem}>
                <p className={styles.title}>{formatVariableNameToTitle(key)}: </p>
                <div className={styles.textWrapper}>
                  <p className={styles.value}>
                    {key === "rushDeliveryFee" ? value + currency.USD : value}
                  </p>
                </div>
              </li>
            )
          );
        })}
        <li className={styles.summaryItem}>
          <p className={styles.priceTitle}>Total price: </p>
          <div className={styles.textWrapper}>
            <p className={styles.totalPrice}>{totalPrice}{currency.USD}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Checkout;