import React, { useEffect } from 'react';
import styles from './Shop.module.scss';

function Shop() {
  const setPageHeight = () => {
    const footer = document.querySelector("footer");
    const container = document.querySelector(`.${styles.container}`);

    if (footer && container) {
      const footerHeight = footer.offsetHeight || 0;
      container.style.minHeight = `calc(100vh - ${footerHeight}px)`;
      container.style.height = `100%`;
    }
  };

  useEffect(() => {
    setPageHeight();
    window.addEventListener("resize", setPageHeight);

    return () => window.removeEventListener("resize", setPageHeight);
  }, []);

  
  return (
    <div className={styles.container}>
      <div className={styles.ctn}>
        <p>This is shop page!</p>
      </div>
    </div>
  )
}

export default Shop