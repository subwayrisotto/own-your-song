import React from 'react';
import styles from './AboutUs.module.scss';
import achievements from '../../data/achievements';
import coreValues from '../../data/core-values';
import CardAchievementsComponent from '../../components/CardAchievementsComponent/CardAchievementsComponent';
import CardCoreValueComponent from '../../components/CardCoreValuesComponent/CardCoreValueComponent';
import ourSquad from '../../data/our-squad';
import CardEmployersComponent from '../../components/CardEmployersComponent/CardEmployersComponent';
import creativeProcesses from '../../data/creative-processes';
// import verticalLine from '../../assets/about-us/vertical-line.png'; 
// import horizontalLine from '../../assets/about-us/horizontal-line.png'; 
import step1 from '../../assets/about-us/step1.png';
import step2 from '../../assets/about-us/step2.png';
import step3 from '../../assets/about-us/step3.png';
import opinions from '../../data/opinions';
import SliderComponent from '../../components/SliderComponent/SliderComponent';

const stepsImages = [
  step1, step2, step3
];

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

        <div className={styles.achievements + " " + styles.paddingTop}>
          <p className={styles.headerText}>Our Achievements</p>

          <div className={styles.achievementsCtn + " " + styles.paddingTop}>
            {achievements.map((achievement, index) => (
                <CardAchievementsComponent value={achievement.value} text={achievement.text} key={index}/>
            ))}
          </div>
        </div>

        <div className={styles.coreValues + " " + styles.paddingTop}>
          <p className={styles.headerText}>Our Core Values</p>

          <div className={styles.coreValuesCtn + " " + styles.paddingTop}>
            {coreValues.map((coreValue, index) => (
                <CardCoreValueComponent header={coreValue.header} text={coreValue.text} key={index}/>
            ))}
          </div>
        </div>

        <div className={styles.creativeProcess + " " + styles.paddingTop}>
          <p className={styles.headerText}>Creative Process</p>

          <div className={styles.creativeProcessCtn}>
             

            <ul className={styles.processesList}>
              {
                creativeProcesses.map((process, index) => {
                  return(
                    <li className={styles.processListItem} key={index}>
                      <div className={styles.processTextCtn}>
                        <p className={styles.processHeader}>Step {process.id}: {process.header}</p>
                        <p className={styles.processText}>{process.text}</p>
                      </div>
                      <div className={styles.processImage}>
                        <img src={stepsImages[index]} alt={stepsImages[index]}/>
                      </div>
                    </li>
                  )
                })
              }
            </ul>

            {/* <div className={styles.processPathContainer}>
              <img id={styles.verticalLine} src={verticalLine} alt={verticalLine} />
              <img id={styles.horizontalLine} className={styles.horizontalLine1} src={horizontalLine} alt={horizontalLine} />
              <img id={styles.horizontalLine} className={styles.horizontalLine2} src={horizontalLine} alt={horizontalLine} />
              <img id={styles.horizontalLine} className={styles.horizontalLine3} src={horizontalLine} alt={horizontalLine} />
            </div> */}
          </div>
        </div>

        <div className={styles.ourSquad + " " + styles.paddingTop}>
          <p className={styles.headerText}>Meet Our Squad</p>

          <div className={styles.ourSquadCtn + " " + styles.paddingTop}>
            {ourSquad.map((employee, index) => (
                <CardEmployersComponent {...employee} key={index}/>
            ))}
          </div>
        </div>

        <div className={styles.clientsOpinion + " " + styles.paddingTop}>
          <p className={styles.headerText}>What Our Clients Say</p>

          <div className={styles.clientsOpinionCtn + " " + styles.paddingTop}>
            <SliderComponent items={opinions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs