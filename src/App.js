import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Categories from './components/Categories';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import ForgetPassword from './components/ForgetPassword';
import OtpVerification from './components/OtpVerification';
import SetPassword from './components/SetPassword';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            {/* <Route path='header' element={<Header/>}></Route> */}
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>
            <Route path='/otpverification' element={<OtpVerification/>}></Route>
            <Route path='/setpassword' element={<SetPassword/>}></Route>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/categories' element={<Categories/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
