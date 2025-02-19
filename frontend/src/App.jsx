import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/userSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import Riding from "./pages/Riding";
import CaptainHome from "./pages/CaptainHome";
import CaptainRiding from "./pages/CaptainRiding";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import PaymentPage from "./pages/PaymentPage";
import PayPg from "./pages/PayPg";
import CaptainAboutPage from "./pages/CaptainAboutPage";
import UserAbout from "./pages/UserAbout";
import UserPayPg from "./pages/UserPayPg";
import UserAboutPage from "./pages/UserAboutPage";
import CaptainProtector from "./utils/captainProtector";
import UserProtector from "./utils/userProtector";

const app = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/riding" element={<Riding />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/paypg" element={<PayPg />} />
      <Route
        path="/captain-home"
        element={
          <CaptainProtector>
            <CaptainHome />
          </CaptainProtector>
        }
      />
      <Route
        path="/captain-riding"
        element={
          <CaptainProtector>
            <CaptainRiding />
          </CaptainProtector>
        }
      />
      <Route
        path="/captain-about"
        element={
          <CaptainProtector>
            <CaptainAboutPage />
          </CaptainProtector>
        }
      />
      <Route
        path="/home"
        element={
          // <UserProtector>
            <Home />
          // </UserProtector>
        }
      />
      <Route
        path="/user-about"
        element={
          <UserProtector>
            <UserAbout />
          </UserProtector>
        }
      />
      <Route
        path="/user-paypg"
        element={
          <UserProtector>
            <UserPayPg />
          </UserProtector>
        }
      />
      <Route path="/user-aboutpg" element={<UserAboutPage />} />
    </Routes>
  );
};

export default app;
