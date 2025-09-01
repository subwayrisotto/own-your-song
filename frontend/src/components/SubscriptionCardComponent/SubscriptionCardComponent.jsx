import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './SubscriptionCardComponent.module.scss';

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

function SubscriptionCard(props) {
    const { plan, price, description, benefits, handlePlanSelect } = props;
    return (
        <div className={styles.subCardContainer}>
            <div className={styles.subCard}>
               <div className={styles.subCardFront}>
                    <div className={styles.subImageCtn}>
                        <img className={styles.subImage} src={`${process.env.PUBLIC_URL}/subscription/${plan.toLowerCase()}.png`} alt={plan} />
                    </div>

                    <div className={styles.subPlanCtn}>
                        <div className={styles.line + " " + styles.lineLeft}></div>
                        <p className={styles.subPlanText}>{plan} Plan</p>
                        <div className={styles.line + " " + styles.lineRight}></div>
                    </div>

                    <div className={styles.subPriceCtn}>
                        <p className={styles.subPriceText}>{price}{currency.USD}</p>
                    </div>
               </div>
               <div className={styles.subCardBack}>
                    <div className={styles.subDescriptionCtn}>
                        <div>
                            <p className={styles.subDescription}>
                                {description}
                            </p>

                            <ul className={styles.subBenefitsList}>
                                {
                                    benefits.map((benefit, index) => {
                                        return(
                                            <li className={styles.subBenefitListItem} key={index}>
                                                <FontAwesomeIcon icon={faCircleCheck} />
                                                <p className={styles.text}>{benefit}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <button type='button' onClick={() => handlePlanSelect(plan)} className={styles.planBtn}>Own Your Song</button>
                    </div>
               </div>
            </div>
        </div>
    )
}

export default SubscriptionCard
