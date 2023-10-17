import React, { useEffect, useRef, useState } from 'react'
import { TextField } from '@mui/material'

function Brand({ setLogo }) {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [brandName, setBrandName] = useState("");

    useEffect(()=>{
        const brandName =  localStorage.getItem("brandName");
        setBrandName(brandName);
    }, []);

    const handleImageChange = () => {
        const file = fileInputRef.current.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataURL = e.target.result;
                setSelectedImage(dataURL);
                setLogo(dataURL);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSave = () => {
        if (selectedImage) {
            localStorage.setItem("logo", selectedImage);
            const brandLogo = document.getElementById("logo");
            brandLogo.src = selectedImage;
        }
        if(brandName){
            localStorage.setItem("brandName", brandName);
            document.title = brandName}
    }

    return (
        <div className='border rounded-4 p-3 m-3'>
            <TextField label="Brand Name" name="brand" value={brandName} onChange={(e)=>{setBrandName(e.target.value)}} className="w-100 " variant='standard' defaultValue={"ZOQQ"} />

            <label htmlFor="uploadLogo" role='button' className='bg-blue10 d-flex flex-column justify-content-center border-activeBlue mt-3' style={{ borderStyle: "dotted" }}>
                {selectedImage ? <img src={selectedImage} alt="Selected" /> : <>
                    <div className='d-flex mt-4'>
                        <img src="/draganddrop.svg" className='mx-auto' />
                    </div>
                    <p className='fw-normal text-center blue100 fw-500 mb-4'>
                        Upload Logo
                    </p>
                </>}

            </label>
            <input id="uploadLogo" type="file" accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef} hidden />

            <div className='d-flex'>
                <button onClick={onSave} className='btn bg-blue100 text-white fw-500 ms-auto mt-3'>Save Changes</button>
            </div>

        </div>
    )
}

export default Brand