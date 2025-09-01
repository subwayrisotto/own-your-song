import React, { useRef, useState, useEffect } from "react";
import CardOpinionComponent from "../CardOpinionComponent/CardOpinionComponent";
import styles from "./SliderComponent.module.scss";

function SliderComponent({ items }) {
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [visibleSlides, setVisibleSlides] = useState(3); 
    const [slideWidth, setSlideWidth] = useState(0); 

    useEffect(() => {
        const updateVisibleSlides = () => {
            if (window.innerWidth <= 600) {
                setVisibleSlides(1); 
            } else if (window.innerWidth <= 900) {
                setVisibleSlides(2); 
            } else {
                setVisibleSlides(3); 
            }
        };

        const updateSlideWidth = () => {
          if (sliderRef.current) {
              const totalWidth = sliderRef.current.clientWidth;
              const gapTotal = (visibleSlides - 1) * 10; // Total gap space
              setSlideWidth((totalWidth - gapTotal) / visibleSlides);
          }
      };

        updateVisibleSlides();
        updateSlideWidth();

        window.addEventListener("resize", () => {
            updateVisibleSlides();
            updateSlideWidth();
        });

        return () => window.removeEventListener("resize", updateSlideWidth);
    }, [visibleSlides]);

    const goNext = () => {
        setCurrentIndex((prev) => {
            return (prev + 1) % items.length;
        });
    };

    const goPrev = () => {
        setCurrentIndex((prev) => {
            return (prev - 1 + items.length) % items.length;
        });
    };

    const getTranslateX = () => {
      return `translateX(-${currentIndex * (slideWidth + 10)}px)`;
  };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.wrapper}>
              <button className={styles.prev} onClick={goPrev}>❮</button>
              <div className={styles.sliderWrapper} ref={sliderRef}>
                  <div className={styles.slider} style={{ transform: getTranslateX() }}>
                  {[...items, ...items.slice(0, visibleSlides)].map((item, index) => (
                      <div className={styles.slide} key={index}>
                          <CardOpinionComponent {...item} />
                      </div>
                  ))}
                  </div>
              </div>
              <button className={styles.next} onClick={goNext}>❯</button>
            </div>

            <div className={styles.dotsContainer}>
                {items.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
                        onClick={() => goToSlide(index)} 
                    />
                ))}
            </div>
        </div>
    );
}

export default SliderComponent;