import axios from "axios";

const getUserData = async () => {
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

    return response.data; // ✅ Return the response data properly
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null; // ✅ Handle error by returning null
  }
};

export default getUserData;
