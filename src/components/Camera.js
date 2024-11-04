import React, { useState, useRef } from 'react';

const Camera = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsCameraOn(true);
    } catch (err) {
      console.error('Camera error:', err);
      alert('Could not access camera. Please check permissions.');
    }
  };

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    
    const photoUrl = canvas.toDataURL('image/jpeg');
    setPhoto(photoUrl);
    stopCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraOn(false);
    }
  };

  const retake = () => {
    setPhoto(null);
    startCamera();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        {!isCameraOn && !photo && (
          <button
            onClick={startCamera}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Take Picture
         </button>
        )}

        {isCameraOn && (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded"
            />
            <button
              onClick={takePhoto}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Take Photo
            </button>
          </div>
        )}

        {photo && (
          <div className="space-y-4">
            <img 
              src={photo}
              alt="Captured photo"
              className="w-full rounded"
            />
            <button
              onClick={retake}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Take Another Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
