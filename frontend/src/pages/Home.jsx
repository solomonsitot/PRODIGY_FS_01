import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";


  
function Home() {
  useRedirectLogoutUsers("/login");
  const navigate = useNavigate();
  const [object, setObject] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/get-current-user`,
          { withCredentials: true }
        );
        setObject(response.data); // assuming user data is in response.data
      } catch (error) {
        console.error("Error fetching user data:", error);
        setObject({ message: { full_name: "Guest" } }); // Fallback in case of error
      }
    }
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:3000/user/logout`, {}, { withCredentials: true });
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-16">
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-green-950 text-white z-10 shadow-md">
        <h1 className="text-xl font-semibold">
          Welcome, {object?.message?.full_name || "Guest"}!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>
      <main className="mt-10 p-6 bg-white shadow-lg rounded-lg w-3/4 max-w-lg text-center">
        <p className="text-gray-700 text-lg">
          Explore the application and have a great experience!
        </p>
      </main>
    </div>
  );
}

export default Home;
