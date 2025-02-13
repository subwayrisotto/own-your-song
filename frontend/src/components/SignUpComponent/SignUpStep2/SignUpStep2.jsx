import React, { useState } from 'react';
import styles from "./SignUpStep2.module.scss";
import CountrySelect from '../../InputComponents/CountrySelectComponent/CountrySelectComponent';

function SignUpStep2() {
  return (
    <div className={styles.stepCtn}>
      <CountrySelect />
    </div>
  )
}

export default SignUpStep2
