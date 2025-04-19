import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const UserProtector = ({ children }) => {
  const token = localStorage.getItem("token");
  // console.log("in user protector:", token);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://caber-77w9.onrender.com/api/user/getUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("data", response.data.user);
        if (response.data.user.isCaptain) {
          // If the user is a captain, redirect them to captain-home
          if (location.pathname == "/riding") {
            navigate("/captain-riding");
          } else if (location.pathname == "/user-about") {
            navigate("/about");
          } else if (location.pathname == "/user-aboutpg") {
            navigate("/captain-about");
          } else if (location.pathname == "/user-paypg") {
            navigate("/paypg");
          } else if (location.pathname == "/Home") {
            navigate("/captain-home");
          } else if (location.pathname == "/booked-rides") {
            navigate("/my-rides");
          }
          setIsLoading(false);
        } else if (!response.data.user.isCaptain) {
          // If the user is a captain, redirect them to captain-home
          if (location.pathname == "/captain-riding") {
            navigate("/riding");
          } else if (location.pathname == "/about") {
            navigate("/user-about");
          } else if (location.pathname == "/captain-about") {
            navigate("/user-aboutpg");
          } else if (location.pathname == "/paypg") {
            navigate("/user-paypg");
          } else if (location.pathname == "/captain-home") {
            navigate("/home");
          } else if (location.pathname == "/my-rides") {
            navigate("/booked-rides");
          } else if (location.pathname == "/create-ride") {
            navigate("/home");
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkUser();
  }, [token, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtector;
