import React from 'react';
import styles from './VinylLoader.module.scss';

function VinylLoader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.vinylLoader}>
        <div className={styles.vinylLabel}>OYS</div>
        <div className={styles.vinylGrooves}></div>
        <div className={styles.vinylInner}></div>
        <div className={styles.vinylShine}></div>
      </div>
    </div>
  )
}

export default VinylLoader
