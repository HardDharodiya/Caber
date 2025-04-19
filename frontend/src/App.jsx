import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
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
import UserProtector from "./utils/UserProtector";
import CaptainRideCreate from "./pages/CaptainRideCreate";
import Rides from "./pages/Rides";
import BookedRides from "./pages/BookedRides";

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
      <Route path="/payment" element={<PaymentPage />} />
      <Route
        path="/about"
        element={
          <UserProtector>
            <About />
          </UserProtector>
        }
      />
      <Route
        path="/paypg"
        element={
          <UserProtector>
            <PayPg />
          </UserProtector>
        }
      />
      <Route
        path="/captain-home"
        element={
          <UserProtector>
            <CaptainHome />
          </UserProtector>
        }
      />
      <Route
        path="/create-ride"
        element={
          <UserProtector>
            <CaptainRideCreate />
          </UserProtector>
        }
      />
      <Route
        path="/my-rides"
        element={
          <UserProtector>
            <Rides />
          </UserProtector>
        }
      />
      <Route
        path="/booked-rides"
        element={
          <UserProtector>
            <BookedRides />
          </UserProtector>
        }
      />
      <Route
        path="/captain-riding"
        element={
          <UserProtector>
            <CaptainRiding />
          </UserProtector>
        }
      />
      <Route
        path="/captain-about"
        element={
          <UserProtector>
            <CaptainAboutPage />
          </UserProtector>
        }
      />
      <Route
        path="/home"
        element={
          <UserProtector>
            <Home />
          </UserProtector>
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
      <Route
        path="/user-aboutpg"
        element={
          <UserProtector>
            <UserAboutPage />
          </UserProtector>
        }
      />
    </Routes>
  );
};

export default app;
