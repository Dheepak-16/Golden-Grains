// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import ForgetPassword from './components/ForgetPassword';
import OtpVerification from './components/OtpVerification';
import SetPassword from './components/SetPassword';
import All_Category from './components/All_Category';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
// import ProductDetails from "./pages/ProductDetails";   

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path='header' element={<Header />}></Route> */}
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/forgetpassword' element={<ForgetPassword />}></Route>
          <Route path='/otpverification' element={<OtpVerification />}></Route>
          <Route path='/setpassword' element={<SetPassword />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path="/allcategories" element={<All_Category />} />
          <Route path="/allcategories/:category" element={<All_Category />} />
          <Route path="/productdetails/:name" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          {/* <Route path="/product/:id" element={<ProductDetails/>} /> */}
        </Routes>
        <Contact/>  
      </BrowserRouter>
    </div>
  );
}

export default App;
