import React from 'react'
import styles from './Home.module.scss';
import samples from '../../data/samples';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.ctn}>
        <div className={styles.homeCtn}>
          <div className={styles.welcomeCtn}>
            <p className={styles.headerText}>Bring Your <br/> Song to Life</p>

            <p className={styles.text}>Our studio helps you create personalized songs, tailored to your style. Whether you're an artist, a business, or simply someone with a passion for music – it's time to own your sound</p>

            <div className={styles.buttonsContainer}>
              <button type='button' className={styles.filledButton} id={styles.button}>
                <p className={styles.buttonText}>Join <br/> Today</p>
              </button>
              <button type='button' className={styles.outlinedButton} id={styles.button}>
                <p className={styles.buttonText}>Sign In</p>
              </button>
            </div>
          </div>

          <div className={styles.samplesCtn}>
            <div className={styles.samplesList}>
              {
                samples.map((sample, index) => {
                  return (
                    <div className={styles.sampleCtn} key={index}>
                      <div className={styles.sampleCover}>
                        <img src={`../../assets/home/${sample.cover}`} alt={sample.name} />
                      </div>

                      <div className={styles.sampleDetails}>
                        <p className={styles.sampleName}>{sample.name}</p>
                        <p className={styles.sampleTitle}>{sample.title}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <div className={styles.samplePlayer}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home