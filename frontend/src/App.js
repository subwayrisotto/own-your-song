import './App.css';
import NavigationComponents from './components/NavigationComponent/NavigationComponents';
import { Route, Routes, Navigate } from 'react-router-dom'; // Don't forget to import Navigate
import Home from './pages/home/Home';
import { UserProvider } from './context/UserContext'; 
import AboutUs from './pages/about-us/AboutUs';
import Contact from './pages/contact/Contact';
import Enterprise from './pages/enterprise/Enterprise';
import Shop from './pages/shop/Shop';
import FooterComponent from './components/FooterComponent/FooterComponent';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Form from './components/FormComponents/FormComponent';
import PaymentSuccess from './components/PaymentSuccessComponent/PaymentSuccessComponent';
import SignUp from './components/SignUpComponent/SignUpComponent';
import TermsAndConditions from './pages/terms-and-conditions/TermsAndConditions';
import Dashboard from './pages/dashboard/Dashboard'; // Assuming you have a Dashboard component
import SignIn from './components/SignInComponent/SignIn';
import { useUser } from '../src/context/UserContext'; 

// ProtectedRoute component to check for the user's token
const ProtectedRoute = ({ element }) => {
  const userToken = localStorage.getItem("userToken");
  return userToken ? element : <Navigate to="/sign-up" replace />;
};

function App() {
  return (
    <UserProvider>
      <NavigationComponents />

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/enterprise' element={<Enterprise />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/form' element={<Form />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />

        {/* Protected Route */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>

      <FooterComponent />
    </UserProvider>
  );
}

export default App;