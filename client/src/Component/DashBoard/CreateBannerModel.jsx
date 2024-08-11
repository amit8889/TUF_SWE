import React, { useEffect, useState } from 'react';
import './CreateBannerModel.css'; // Import CSS for styling
import axios from "axios";
const CreateBannerModel = ({ setIsOpen ,getDashBoardData,editData,updateDashBoardData}) => {

    const [bannerDetails, setBannerDetails] = useState({
        title: '',
        description: '',
        time_remaning: '',
        priority: '',
        image_url: '',
        active: true,
    });
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        if(editData){
            setBannerDetails(editData);
        }
    },[editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBannerDetails({ ...bannerDetails, [name]: value });
    };

    const handleStatusChange = (e) => {    
        setBannerDetails({ ...bannerDetails, active: e.target.value === 'true' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (bannerDetails.title.length < 3 || bannerDetails.title.length > 255) {
            newErrors.title = 'Title must be between 3 and 255 characters.';
        }
        if (bannerDetails.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters.';
        }
        if (bannerDetails.time_remaning <= 0) {
            newErrors.time_remaning = 'Timer must be a positive number.';
        }
        if (bannerDetails.priority <= 0) {
            newErrors.priority = 'Priority must be a positive number.';
        }
        if (!bannerDetails.image_url) {
            newErrors.image_url = 'Banner url is required!.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

   

    const onSave = async() => {
        if (validateForm()) {
            // Implement save functionality here
           try {               
                if(editData){
                    const data={
                        bannerId:bannerDetails?.id,
                        title:bannerDetails?.title,
                        time_remaning:bannerDetails?.time_remaning,
                        priority:bannerDetails?.priority,
                        description:bannerDetails?.description,
                        active:Boolean(bannerDetails?.active),
                        image_url:bannerDetails?.image_url
                    }
                    await updateDashBoardData(data);
                }else{
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/create-banner`,bannerDetails)
                }
                
                await getDashBoardData()
                setIsOpen(false); // Close the modal after saving
                 setBannerDetails({
                     title: '',
                     description: '',
                     time_remaning: '',
                     priority: '',
                     image_url: '',
                     active: true,
                 });
           } catch (error) {          
            setErrors({onSave:error.response?.data?.message})
           }
        }
        
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={() => setIsOpen(false)}>X</button>
                <h2>Create/Edit Banner</h2>
                <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={bannerDetails.title}
                            onChange={handleChange}
                             
                        />
                        {errors.title && <div className="error-message">{errors.title}</div>}
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={bannerDetails.description}
                            onChange={handleChange}
                             
                        />
                        {errors.description && <div className="error-message">{errors.description}</div>}
                    </label>
                    <label>
                        Timer (in seconds):
                        <input
                            type="number"
                            name="time_remaning"
                            value={bannerDetails.time_remaning}
                            onChange={handleChange}
                             
                            min="0"
                        />
                        {errors.time_remaning && <div className="error-message">{errors.time_remaning}</div>}
                    </label>
                    <label>
                        Priority (Any +ve number):
                        <input
                            type="number"
                            name="priority"
                            value={bannerDetails.priority}
                            onChange={handleChange}
                             
                            min="0"
                        />
                        {errors.priority && <div className="error-message">{errors.priority}</div>}
                    </label>
                    <label>
                        Banner URL:
                        <input
                            type="text"
                            name="image_url"
                            value={bannerDetails.image_url}
                            onChange={handleChange}
                             
                        />
                        {errors.image_url && <div className="error-message">{errors.image_url}</div>}
                    </label>
                    <fieldset style={{ display: 'flex', alignItems: 'left' }}>
                        <legend style={{ marginRight: '10px',display: 'contents', }}>Status:</legend>
                        <label style={{ marginRight: '20px' }}>
                            <input
                                type="radio"
                                name="active"
                                value="true"
                                checked={bannerDetails.active == true}
                                onChange={handleStatusChange}
                            />
                            Active
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="active"
                                value="false"
                                checked={bannerDetails.active == false}
                                onChange={handleStatusChange}
                            />
                            Inactive
                        </label>
                    </fieldset>
                    {errors && errors.onSave && <div className="error-message">{errors.onSave}</div>}
                    <button type="submit">{editData?'Update':'Save'}</button>
                </form>
                

            </div>
        </div>
    );
};

export default CreateBannerModel;
