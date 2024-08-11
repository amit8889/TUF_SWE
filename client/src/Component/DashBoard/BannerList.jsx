import React, { useState } from 'react';
import './BannerList.css'; // Import CSS for styling

const BannerList = ({ bannerDetails, onToggleActive,setIsOpen,setEditData }) => {  
  const [editedDetails, setEditedDetails] = useState(bannerDetails);

  const handleEdit = (data) => {   
    setIsOpen(true);
    setEditData(data)    
  };

  const handleToggleActive = () => {
    onToggleActive({bannerId:bannerDetails.id,active:!bannerDetails.active});
  };

  const rowStyle = {
    backgroundColor: bannerDetails.active ? '' : '#f8d7da',
  };

  const compressString=(value)=>{
      if(value?.length<=30){
        return value;
      }
      return value?.substring(0,30)+"...";
  }

  return (
    <tr style={rowStyle} className="banner-list-row" >
      <td>{bannerDetails.id}</td>
      <td>
        <a href={bannerDetails.image_url} target="_blank" rel="noopener noreferrer" className="banner-link">
          {compressString(bannerDetails.image_url)}
        </a>
      </td>
      <td>
        {
          compressString(editedDetails.title)
        }
      </td>
      <td>
        {
          compressString(editedDetails.description)
        }
      </td>
      <td>
        {
          editedDetails.time_remaning
        }
      </td>
      <td>
        {bannerDetails.active ? 'Active' : 'Inactive'}
      </td>
      <td>
        {
          editedDetails.priority
        }
      </td>
      <td>{editedDetails.created_at}</td>
      <td>        
          <>
            <button onClick={e=>handleEdit(editedDetails)} className="action-button">Edit</button>
            <button onClick={handleToggleActive} className="action-button">
              {bannerDetails.active ? 'Deactivate' : 'Activate'}
            </button>
          </>        
      </td>
    </tr>
  );
};

export default BannerList;
