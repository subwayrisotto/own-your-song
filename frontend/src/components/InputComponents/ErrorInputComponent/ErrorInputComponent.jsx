import React from 'react';
import styles from './ErrorInputComponent.module.scss'

function ErrorInput(props) {
    const {errorMessage} = props
  return (
    <div className={styles.errorMessages}>
        <img src={`${process.env.PUBLIC_URL}/form/error.svg`} alt={'error'}/>
        <p className={styles.errorText}>{errorMessage}</p>
    </div>
  )
}

export default ErrorInput
