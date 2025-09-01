import React, { useState, useEffect, useRef } from 'react'
import styles from './Home.module.scss';
import PlayerComponent from '../../components/PlayerComponent/PlayerComponent';
import contactDetails from '../../data/contact-details';
import SubscriptionCard from '../../components/SubscriptionCardComponent/SubscriptionCardComponent';
import { getSubs, getSamples } from '../../api';
import { useNavigate } from 'react-router-dom';
import VinylLoader from '../../components/VinylLoaderComponent/VinylLoader';
import { useUser } from '../../context/UserContext';

function Home() {
  const navigate = useNavigate();

  const [currentSampleIndex, setCurrentSampleIndex] = useState(5);
  const [subscriptions, setSubscriptions] = useState([]);
  const [samples, setSamples] = useState([]);
  const [currentSample, setCurrentSample] = useState(samples[5]);
  const [loading, setLoading] = useState(false);
  
  const handlePlanSelect = (plan) => {
    navigate(`/form?plan=${encodeURIComponent(plan.toLowerCase())}`);
    sessionStorage.removeItem("formData")
  };

  const sampleRefs = useRef([]);

  useEffect(() => {
      if (sampleRefs.current[currentSampleIndex]) {
          sampleRefs.current[currentSampleIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
  }, [currentSampleIndex]); 
  
  const {currentUser} = useUser();
  
  useEffect(() => {
    async function loadDataFromDb() {
      setLoading(true); // Set loading to true before fetching data
  
      try {
        let subscriptions = await getSubs();
        if (subscriptions) setSubscriptions(subscriptions);
  
        let samples = await getSamples();
        if (samples) {
          setSamples(samples);
          setCurrentSample(samples[5]); // Ensure samples[5] exists
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }
  
    loadDataFromDb();
  }, []);

  const handleClick = id => {
    setCurrentSample(samples[id]);
  }

  const handlePrevSample = () => {
    setCurrentSampleIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? samples.length - 1 : prevIndex - 1;
      setCurrentSample(samples[newIndex]); 
      return newIndex; 
    });
  };
  
  const handleNextSample = () => {
    setCurrentSampleIndex((prevIndex) => {
      const newIndex = prevIndex === samples.length - 1 ? 0 : prevIndex + 1;
      setCurrentSample(samples[newIndex]); 
      return newIndex; 
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.ctn}>
        <div className={styles.welcomeCtn}>
          <p className={styles.headerText}>Bring Your <br/> Song to Life</p>

          <p className={styles.text}>Our studio helps you create personalized songs, tailored to your style. Whether you're an artist, a business, or simply someone with a passion for music – it's time to own your sound</p>

          {
            !currentUser && (
              <div className={styles.buttonsContainer}>
                <button type='button' className={styles.filledButton} id={styles.button} onClick={() => navigate('/sign-up')}>
                  <p className={styles.buttonText}>Join <br/> Today</p>
                </button>
                <button type='button' className={styles.outlinedButton} id={styles.button} onClick={() => navigate('/sign-in')}>
                  <p className={styles.buttonText}>Sign In</p>
                </button>
              </div>
            )
          }
        </div>

        <div className={styles.subscriptionCtn} id="subscriptionCtn">
          <p className={styles.headerText}>CHOOSE A PLAN</p>
          
          <div className={styles.subList}>
            {loading ? (
              <VinylLoader />
            ) : (
              subscriptions.map((sub, index) => (
                <SubscriptionCard {...sub} key={index} handlePlanSelect={handlePlanSelect} />
              ))
            )}
          </div>
        </div>

        <div className={styles.samplesCtn}>
          <p className={styles.headerText}>OUR SAMPLES</p>
          
          <div className={styles.samplesContent}>
            {
              loading ? (
                 <VinylLoader />
              ) : (
                <>
                 <ul className={styles.samplesList}>
                    {samples.map((sample, index) => {
                        const isActive = index === currentSampleIndex; // Compare index, not object
                        return (
                            <li
                                ref={(el) => (sampleRefs.current[index] = el)} // Store ref for each item
                                className={isActive ? `${styles.samplesListItem} ${styles.active}` : styles.samplesListItem}
                                key={index}
                                onClick={() => {
                                    handleClick(index);
                                    setCurrentSampleIndex(index);
                                }}
                            >
                                <div className={styles.sampleDetails}>
                                    <p className={styles.sampleName}>{sample.name} - {sample.title}</p>
                                </div>
                            </li>
                        );
                    })}
                  </ul>

                  <div className={styles.samplePlayer}>
                    {currentSample && (
                      <PlayerComponent
                        sample={currentSample}
                        handleNextSample={handleNextSample}
                        handlePrevSample={handlePrevSample}
                        currentSampleIndex={currentSampleIndex}
                      />
                    )}
                  </div>
                </>   
              )
            }
            
          </div>
        </div>

        <div className={styles.getInTouchCtn}>
          <div className={styles.leftCtn}>
            <p className={styles.headerText}>Get In Touch</p>

            <div className={styles.infoCtn}>
              <p className={styles.text}>
                Phone: <a href={`tel:${contactDetails.phone}`}>{contactDetails.phone}</a>
              </p>
            </div>

            <div className={styles.infoCtn}>
              <p className={styles.text}>
                Email: <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
              </p>
            </div>

            <div className={styles.infoCtn}>
              <p className={styles.text}>Address: {contactDetails.address}</p>
            </div>
          </div>
          <div className={styles.rightCtn}>
            <div className={styles.mapContainer}>
              <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.7394327068234!2d-4.962825084738908!3d36.503292180004996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0bada8d03411f5%3A0x2b7d3999e5893896!2sUrbanizaci%C3%B3n%20Nueva%20Andaluc%C3%ADa%2C%20C.%20Las%20Violetas%2C%20Nueva%20Andaluc%C3%ADa%2C%2029660%20Marbella%2C%20M%C3%A1laga%2C%20Spain!5e0!3m2!1sen!2sus!4v1697049821496!5m2!1sen!2sus" 
              allowFullScreen={true} loading="lazy" title='Google Maps'></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home