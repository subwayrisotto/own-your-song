import styles from './Steps.module.scss';

const Steps = ({ step, maxStep, isMobile, showedSteps }) => {
  if (step > showedSteps) return null;

  const stepsArray = Array.from({ length: maxStep }, (_, i) => i + 1);

  return (
    <div className={styles.stepperContainer}>
      {isMobile ? (
        <div className={styles.mobileSteps}>
          <p className={styles.stepText}>{step}/{showedSteps}</p>
        </div>
      ) : (
        stepsArray.slice(0, showedSteps).map((s) => (
          <div key={s} className={styles.step} data-active={step >= s}>
            <div className={styles.circle}>{s}</div>
            {s < showedSteps && (
              <div className={styles.linesWrapper}>
                <div className={styles.line} />
                <div className={`${styles.lineActive} ${s + 1 <= step ? styles.active : ""}`} />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Steps;