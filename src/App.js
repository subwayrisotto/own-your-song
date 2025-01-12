import './App.css';
import NavigationComponents from './components/NavigationComponenet/NavigationComponents';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Enterpise from './pages/Enterpise';
import Shop from './pages/Shop';

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
      </Routes>
    </>
  );
}

export default App;
