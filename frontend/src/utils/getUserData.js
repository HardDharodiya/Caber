import axios from "axios";

export const getUserData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null; // Return null explicitly
  }

  const cleanToken = token.replace(/"/g, "");
  console.log("Token:", cleanToken);

  const response = await axios.get("https://caber-77w9.onrender.com/api/user/getUser", {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
    },
  });
  console.log(response.data);
  return response.data;
};

export const getUserById = async (userId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null; // Return null explicitly
  }

  const cleanToken = token.replace(/"/g, "");
  console.log("Token in getbyid:", cleanToken);

  const response = await axios.get(
    "https://caber-77w9.onrender.com/api/user/getById",
    {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    },
    { userId }
  );
  console.log(response.data);
  return response.data;
};

export const getVehicleData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null; // Return null explicitly
  }

  const cleanToken = token.replace(/"/g, "");
  console.log("Token:", cleanToken);

  const response = await axios.get(
    "https://caber-77w9.onrender.com/api/user/getVehicle",
    {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

export const getVehicleById = async (vehicleId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null; // Return null explicitly
  }

  const cleanToken = token.replace(/"/g, "");
  console.log("Token:", cleanToken);

  const response = await axios.get(
    "https://caber-77w9.onrender.com/api/user/getVehicleById",
    {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    },
    { vehicleId }
  );
  console.log(response.data);
  return response.data;
};

export const getRouteById = async (routeId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null; // Return null explicitly
  }

  const cleanToken = token.replace(/"/g, "");
  console.log("Token:", cleanToken);

  const response = await axios.get(
    "https://caber-77w9.onrender.com/api/route/getById",
    {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    },
    { routeId }
  );
  console.log(response.data);
  return response.data;
};

export const getbookedRides = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null; 
  }

  const cleanToken = token.replace(/"/g, "");
  console.log("Token:", cleanToken);

  const response = await axios.get("https://caber-77w9.onrender.com/api/route/bookedRides", {
    headers: {
      Authorization: `Bearer ${cleanToken}`,
    },
  });
  console.log(response.data);
  return response.data;
};
