import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  console.log("userdata is ---->", userData);
  useEffect(() => {
    // Get data from localStorage
    const storedUser = localStorage.getItem("userData");

    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
      <Header />
      <h4 className="text-center mt-5">User Profile</h4>
      {userData ? (
        <div className="text-center mb-5" style={{padding:"30px"}}>
          <p>
            <strong>Name:</strong> {userData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Mobile:</strong> {userData.mobile_no}
          </p>
          <p>
            <strong>Country Code:</strong> {userData.country_code}
          </p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      <Footer />
    </>
  );
}
