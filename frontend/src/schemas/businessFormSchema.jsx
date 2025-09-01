import * as Yup from 'yup';

const businessFormSchema = [
  Yup.object().shape({
    companyName: Yup.string().required('Company name is required'),
    jobTitle: Yup.string().required('Job title is required'),
    contactPerson: Yup.string().required('Contact person is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
  }),

  Yup.object().shape({
    businessType: Yup.string().required('Type of business is required'),
    cooperationGoals: Yup.string().required('Goals of cooperation are required'),
    interestSolutions: Yup.string().required('Solutions of interest are required'),
  }),

  Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
  }),
];

export default businessFormSchema;