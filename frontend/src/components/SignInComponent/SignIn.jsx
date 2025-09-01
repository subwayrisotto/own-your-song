import React, { useState, useEffect } from 'react';
import EmptyInput from '../InputComponents/EmptyInputComponent/EmptyInputComponent';
import styles from './SignIn.Component.module.scss';
import signInSchema from '../../schemas/signInSchema';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { loginUser } from '../../api';

function SignIn() {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!signInSchema) {
      console.error("Schema not found");
      return;
    }
  
    setLoading(true);
    setErrors({}); // Clear previous errors
  
    try {
      // Validate input fields using Yup schema
      await signInSchema.validate(signInData, { abortEarly: false });
  
      const { email, password } = signInData;
      const response = await loginUser(email, password); 
  
      // Store authentication data
      localStorage.setItem("userToken", response.token);
      localStorage.setItem("userRole", response.role); 
  
      // Redirect user based on role
      if (response.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
  
      if (error.name === "ValidationError") {
        // Handle frontend validation errors from Yup
        const validationErrors = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        // Handle backend API errors
        const errorMessage = error.message || "An unexpected error occurred. Please try again.";
  
        if (errorMessage.includes("User does not exist")) {
          setErrors({ general: "User not found. Please check your email or sign up." });
        } else if (errorMessage.includes("Invalid credentials")) {
          setErrors({ general: "Incorrect email or password. Please try again." });
        } else {
          setErrors({ general: errorMessage });
        }
      }
    }
  };

  const handleInputChange = (field, value) => {
    setSignInData((prevData) => ({ ...prevData, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear input errors when typing
  };

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
        <div className={styles.signInBody}>
          <p className={styles.headerText}>Sign In</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.emailInputCtn}>
              <p className={styles.labelInput}>Email: </p>
              <EmptyInput
                type="email"
                placeholder="Write email..."
                value={signInData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                errorMessage={errors.email}
              />
            </div>

            <div className={styles.passwordInputCtn}>
              <p className={styles.labelInput}>Password: </p>
              <EmptyInput
                type="password"
                placeholder="Write password..."
                value={signInData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                errorMessage={errors.password}
              />
            </div>

            {/* Display general error message if user is not found */}
            {
                errors.general && <div className={styles.generalErrorCtn}>
                  <img src={`${process.env.PUBLIC_URL}/form/error.svg`} alt={'error'}/>
                  <p className={styles.error}>{errors.general}</p>
                </div>
            }
            <div className={styles.forgotPassword}>
              <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                Forgot Password?
              </Link>
            </div>
            <div className={styles.redirectToSignUp}>
              <p>
                Don't have an account? <Link to="/sign-up" className={styles.signUpLink}>Sign up</Link>
              </p>
            </div>
          </form>
        </div>

        <div className={styles.signInFooter}>
          <button
            type="button"
            className={styles.signInButton}
            onClick={handleSubmit}
            disabled={loading}
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;