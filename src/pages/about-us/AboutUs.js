import React from 'react';
import styles from './AboutUs.module.scss';

function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.ctn}>
        <div className={styles.aboutUsCtn}>
          <p className={styles.headerText}>About us</p>

          <p className={styles.textContent}>
          At OWNYOURSONG, we are passionate about creating unique, high-quality music that helps individuals and businesses tell their stories. With a team of expert producers, composers, and sound engineers, we provide tailor-made musical solutions to bring your vision to life.
          Our personalized approach, combined with years of industry experience, allows us to deliver music that resonates and leaves a lasting impact. Whether you’re an independent artist or a leading brand, we’re here to help you own your sound
          </p>
        </div>

        <div className={styles.achievenements}>
          <p className={styles.headerText}>Our Achievements</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs