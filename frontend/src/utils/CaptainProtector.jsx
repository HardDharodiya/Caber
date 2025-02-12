import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtector = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCaptain = async () => {
      try {
        if (!token) {
          navigate("/captain-login");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/user/getCaptain",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.isCaptain) {
          // If the user is not a captain, redirect them to home
          if (location.pathname == "/captain-riding") {
            navigate("/riding");
          } else if (location.pathname == "/captain-about") {
            navigate("/user-about");
          } else {
            navigate("/home");
          }
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    };

    checkCaptain();
  }, [token, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtector;
