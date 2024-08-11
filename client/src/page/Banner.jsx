import React, { useState, useEffect } from "react";
import BannerCard from "../Component/Banner/BannerCard";
import axios from "axios";

const Banner = () => {
  const [curInd, setCurIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState(null);

  const handleNext = () => {
    if (curInd < bannerData.length - 1) {
      setCurIndex(curInd + 1);
    }
  };

  const handlePrev = () => {
    if (curInd > 0) {
      setCurIndex(curInd - 1);
    }
  };

  const getBannerData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/banner/get-banner`
      );
      if (data) {
        setBannerData(data.data);
      }
    } catch (error) {
      
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getBannerData();
  }, []);

  // Inline styles
  const containerStyle = {
    textAlign: "center",
    padding: "20px",
  };

  const headerStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    margin: "0 10px",
    transition: "background-color 0.3s ease",
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: "#c0c0c0",
    cursor: "not-allowed",
  };

  const paginationStyle = {
    fontSize: "18px",
    margin: "10px 0",
  };

  return (
    <div style={containerStyle}>
      {/* <h1 style={headerStyle}>Banner</h1> */}
      {loading ? (
        <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
      ) : (
        <>
          {bannerData && Array.isArray(bannerData) && bannerData[curInd] && (
            <>
              <BannerCard bannerDetails={bannerData[curInd]} />
              <div style={{marginTop:"20px"}}>
                <button
                  style={curInd === 0 ? buttonDisabledStyle : buttonStyle}
                  disabled={curInd === 0}
                  onClick={handlePrev}
                >
                  PREV
                </button>
                <span style={paginationStyle}>{`${curInd + 1} of ${
                  bannerData.length
                }`}</span>
                <button
                  style={
                    curInd === bannerData.length - 1
                      ? buttonDisabledStyle
                      : buttonStyle
                  }
                  disabled={curInd === bannerData.length - 1}
                  onClick={handleNext}
                >
                  NEXT
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Banner;
