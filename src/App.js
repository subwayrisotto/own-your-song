import './App.css';
import NavigationComponents from './components/NavigationComponent/NavigationComponents';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/about-us/AboutUs';
import Contact from './pages/Contact';
import Enterpise from './pages/Enterpise';
import Shop from './pages/Shop';
import FooterComponent from './components/FooterComponent/FooterComponent';

function App() {
  return (
    <>
      <NavigationComponents />

      <Routes>
        <Route path='/own-your-song' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/enterpise' element={<Enterpise />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>

      <FooterComponent />
    </>
  );
}

export default App;
