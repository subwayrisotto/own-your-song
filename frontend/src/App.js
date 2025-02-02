import './App.css';
import NavigationComponents from './components/NavigationComponent/NavigationComponents';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import AboutUs from './pages/about-us/AboutUs';
import Contact from './pages/Contact';
import Enterpise from './pages/Enterpise';
import Shop from './pages/Shop';
import FooterComponent from './components/FooterComponent/FooterComponent';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Form from './components/FormComponents/FormComponent';

function App() {
  return (
    <>
      <NavigationComponents />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/enterpise' element={<Enterpise />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/form' element={<Form />} />
      </Routes>

      <FooterComponent />
    </>
  );
}

export default App;
