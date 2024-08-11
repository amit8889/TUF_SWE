import React, { useState, useEffect } from "react";
import Banner from "./page/Banner.jsx";
import Dashboard from "./page/Dashboard.jsx";
import "./App.css"; // Import the CSS file

function App() {
  const [banner, setBanner] = useState(true);
  // Inline styles
  const containerStyle = {
    textAlign: "center",
    padding: "20px",
    fontFamily: '"Arial", sans-serif',
    position: "relative", // Required for the absolute positioning of the loader
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    margin: "20px",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={() => setBanner(!banner)}
      >
        {`Toggle to : ${banner ? "DASHBOARD" : "BANNER"}`}
      </button>
      {banner ? <Banner /> : <Dashboard />}
    </div>
  );
}

export default App;
