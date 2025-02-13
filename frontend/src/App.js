import './App.css';
import NavigationComponents from './components/NavigationComponent/NavigationComponents';
import {Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
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

function App() {
  return (
    <>
      <NavigationComponents />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/enterprise' element={<Enterprise />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/form' element={<Form />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>

      <FooterComponent />
    </>
  );
}

export default App;
