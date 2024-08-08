import React, { useCallback, useState } from 'react'
import Webcam from 'react-webcam'
import { useRef } from 'react';

const CustomWebcam = () => {
    const webcamRef = useRef(null);
    const [isWebcamOpen,setIsWebcamOpen] = useState(false);
    const [imgSrc,setImgSrc] = useState(null);
    
    const capture = useCallback(()=>{
        const imageSrc = webcamRef.current.getScreenshoot();
        setImgSrc(imageSrc);
    },[webcamRef]);
    
    const handleImageClick=()=>{
        setIsWebcamOpen(true);
    };

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>
      {}
    </div>
  );
}

export default CustomWebcam;