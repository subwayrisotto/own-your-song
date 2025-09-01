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
import Dashboard from './pages/dashboard/Dashboard';
import SignIn from './components/SignInComponent/SignIn';
import ForgotPassword from './components/ForgotPasswordComponent/ForgotPassword';
import ResetPassword from './components/ResetPasswordComponent/ResetPassword';
import NotFound from './pages/404';
import AdminDashboard from './pages/admin-dashboard/AdminDashboard';
import Privacy from './pages/privacy/Privacy';
import UserOrder from './components/UserOrderComponent/UserOrder';
import CalendarComponent from './components/CalendarComponent/CalendarComponent';

// ProtectedRoute component to check for the user's token
const ProtectedRoute = ({ element, allowedRoles }) => {
  const userToken = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole"); 

  if (!userToken) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard/orders" replace />; 
  }

  return element;
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
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path="/dashboard/*" element={<ProtectedRoute element={<Dashboard />} allowedRoles={["client", "admin"]} />}>
          <Route index element={<Navigate to="orders" replace />} />
          <Route path="orders" element={<UserOrder />} />
          <Route path="calendar" element={<CalendarComponent />} />
        </Route>
        <Route path="/dashboard/admin" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} />

         {/* Catch-all 404 Route */}
         <Route path="*" element={<NotFound />} />
      </Routes>

      <FooterComponent />
    </UserProvider>
  );
}

export default App;