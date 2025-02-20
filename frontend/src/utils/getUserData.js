import axios from "axios";

export const getUserData = async () => {
  try {
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

    return response.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};

export const getVehicleData = async () => {
  try {
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
    console.log(response.data.vehicles);
    return response.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};

export const getRouteData = async () => {
  try {
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

    return response.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};
