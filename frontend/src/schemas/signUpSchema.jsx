import * as Yup from 'yup';

const signUpSchema = [
    Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),

        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
            .required('Password is required'),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    }),

    Yup.object({
        fullName: Yup.string()
            .min(2, 'Full name must be at least 2 characters')
            .max(50, 'Full name must be less than 50 characters')
            .required('Full name is required'),

        dob: Yup.date()
            .nullable()
            .required('Date of birth is required')
            .test('valid-age', 'You must be at least 18 years old', (value) => {
                if (!value) return false;
                const today = new Date();
                const birthDate = new Date(value);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age >= 18;
            }),

        gender: Yup.string()
            .oneOf(['Male', 'Female', 'Other'], 'Invalid gender selection')
            .required('Gender is required'),

        country: Yup.string()
            .required('Country selection is required'),

        isTermsAgreed: Yup.boolean()
            .oneOf([true], 'You must accept the Terms & Conditions')
            .required('You must accept the Terms & Conditions'),
    }),
];

export default signUpSchema;