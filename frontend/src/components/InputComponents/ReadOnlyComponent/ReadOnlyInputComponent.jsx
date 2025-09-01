import React from 'react';
import styles from './ReadOnlyInputComponent.module.scss';

function ReadOnlyInput({text}) {
  return (
    <>
      <input type="text" value={text} readOnly className={styles.inputArea}/>
    </>
  )
}

export default ReadOnlyInput
