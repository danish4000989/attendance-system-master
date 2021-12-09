import Webcam from 'react-webcam';
import React from 'react';


const PicCapture = ({ webcamRef }) => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };
  return(

    <div>

    <Webcam
      audio={false}
      height={720}
      ref={webcamRef}
      screenshotFormat='image/jpeg'
      width={1280}
      videoConstraints={videoConstraints}
      />
  </div>
      );

};

export default PicCapture;
