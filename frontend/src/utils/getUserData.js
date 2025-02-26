import axios from "axios";

export const getUserData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null; // Return null explicitly
  }

  const cleanToken = token.replace(/"/g, "");
  console.log("Token:", cleanToken);

  const response = await axios.get("http://localhost:3000/api/user/getUser", {
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
  console.log("Token:", cleanToken);

  const response = await axios.get(
    "http://localhost:3000/api/user/getById",
    { userId },
    {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    }
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
    "http://localhost:3000/api/user/getVehicle",
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
    "http://localhost:3000/api/user/getVehicleById",
    { vehicleId },
    {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    }
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
    "http://localhost:3000/api/route/getById",
    { routeId },
    {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};
