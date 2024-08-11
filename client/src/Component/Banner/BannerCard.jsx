import React, { useEffect, useState } from 'react';

const BannerCard = ({ bannerDetails }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setTimer(() => (bannerDetails.time_remaning ? parseInt(bannerDetails.time_remaning) : 0));
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [bannerDetails]);

  // Inline styles
  const bannerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '60vw',
    minHeight:'60vh',
    margin: 'auto',
    justifyContent:'center',

  };

  const imageStyle = {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '10px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '20px',
    marginTop: '20px',

  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    fontSize: '20px',
    color: '#333',
    marginBottom: '10px',
    textAlign:'justify'
  };

  const timerStyle = {
    fontSize: '18px',
    color: '#ff5722',
  };

  return (
    <div style={bannerStyle}>
      
      <h2 style={titleStyle}>{bannerDetails.title?.toUpperCase()}</h2>
      <p style={descriptionStyle}>{bannerDetails.description}</p>
      <a href={bannerDetails.image_url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        Banner Link
      </a>
      <p style={timerStyle}>
        {timer ? `Time Remaining Seconds: ${timer}` : 'Time Ended'}
      </p>
    </div>
  );
};

export default BannerCard;
