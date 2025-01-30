import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/userSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Start from './pages/Start';
import Riding from './pages/Riding';
import CaptainHome from './pages/CaptainHome';
import CaptainRiding from './pages/CaptainRiding';
import ForgotPassword from './pages/ForgotPassword';


const app = () => {
  return (
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/riding' element={<Riding />} />
      <Route path='/signup' element={<UserSignup />} />
      <Route path='/captain-login' element={<CaptainLogin />} />
      <Route path='/captain-signup' element={<CaptainSignup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/captain-home' element={<CaptainHome />} />
      <Route path='/captain-riding' element={<CaptainRiding/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
    </Routes>
  )
}


export default app