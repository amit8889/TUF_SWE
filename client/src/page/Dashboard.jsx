import React, { useState, useEffect } from "react";
import BannerList from "../Component/DashBoard/BannerList";
import "../Component/DashBoard/BannerList.css"; // Import CSS for styling
import axios from "axios";
import CreateBannerModel  from '../Component/DashBoard/CreateBannerModel'
const Dashboard = () => {
  const [dashBoardData, setdashBoardData] = useState(null);
  const[isOpen,setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editData,setEditData]=useState();
 
  const onToggleActive = async (data) => {
    try {     
      const status = await updateDashBoardData(data);
      if (status) {
        getDashBoardData();
      }
    } catch (error) {}
  };

  const getDashBoardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashboard/get-banner`);
      if (data) {
        setdashBoardData(data.data);
      }
    } catch (error) {      
    } finally {
      setLoading(false);
    }
  };

  const updateDashBoardData = async (value) => {
    try {    
      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/dashboard/update-banner`, value);
      return data.success;
    } catch (error) {}
  };

  useEffect(() => {
    getDashBoardData();
  }, []);

 
// , handleChange
  // css
  const createButton = {
    textAlign: "right",
    padding: "20px",
    fontFamily: '"Arial", sans-serif',
    position: "relative", // Required for the absolute positioning of the loader
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    margin: "20px",
    transition: "background-color 0.3s ease",
  };
  return <div style={{display:"flex",flexDirection:"column",alignItems:"end"}}>
      <div style={createButton} onClick={()=>setIsOpen(true)}> 
        Create banner
      </div>
      {
        isOpen && <CreateBannerModel 
        setIsOpen ={setIsOpen} 
        getDashBoardData={getDashBoardData} 
        editData={editData}
        updateDashBoardData={updateDashBoardData}
        />
      }
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Banner Link</th>
              <th>Title</th>
              <th>Description</th>
              <th>Timer (In Second)</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <>
                {dashBoardData &&
                  Array.isArray(dashBoardData) &&
                  dashBoardData.map((item) => (
                    <BannerList
                      key={item.id}
                      bannerDetails={item}                      
                      onToggleActive={onToggleActive}
                      setIsOpen ={setIsOpen}
                      setEditData={setEditData}
                    />
                  ))}{" "}
              </>
            )}
          </tbody>
        </table>
      </div>
     
    </div>
  
};

export default Dashboard;
