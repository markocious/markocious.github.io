import React, { useRef, useEffect, useState } from 'react';
import { initializeGemini, identifyFishWithGemini } from '../services/gemini';

export default function Home({ onIdentify }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    // Initialize Gemini with the ENV key
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      initializeGemini(apiKey);
    } else {
      console.error("No API key found in environment");
    }

    // Attempt to access camera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Camera access error:", err);
        setPermissionError(true);
      });

    return () => {
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const processImage = async (imageDataUrl) => {
    setIsScanning(true);
    try {
      const fishData = await identifyFishWithGemini(imageDataUrl);
      
      if (fishData.error) {
        alert(fishData.message);
        setIsScanning(false);
        return;
      }

      // Add the user's image to the data object so Result page can show it
      fishData.image = imageDataUrl; // Fallback if no stock image logic (but Result prefers userImage anyway)
      
      onIdentify(fishData, imageDataUrl);
    } catch (error) {
      console.error("Identification failed", error);
      alert(`Debug Error: ${error.message || error}`); 
    } finally {
      setIsScanning(false);
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      // Capture frame from video
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageDataUrl = canvas.toDataURL('image/png'); // default quality
      processImage(imageDataUrl);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        processImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ height: 'calc(100vh - 80px)', position: 'relative', background: 'black',  overflow: 'hidden'  }}>
      {!permissionError ? (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
      ) : (
        <div className="flex-center" style={{ height: '100%', color: 'white', flexDirection: 'column', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <p>Camera access needed to identify fish.</p>
          <button className="btn btn-secondary" onClick={() => fileInputRef.current.click()}>Upload Photo</button>
        </div>
      )}

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handleFileUpload}
      />

      {/* Overlay UI */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '0 24px'
      }}>
        <h2 style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)', textAlign: 'center' }}>
          {isScanning ? "Identifying..." : "Snap or Upload"}
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Gallery Button */}
           <button 
            onClick={() => fileInputRef.current.click()}
            disabled={isScanning}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </button>

          {/* Shutter Button */}
          <button 
            onClick={handleCapture}
            disabled={isScanning || permissionError}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: '4px solid rgba(255,255,255,0.3)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              opacity: permissionError ? 0.5 : 1
            }}
          >
            {isScanning && (
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '4px solid var(--color-primary)',
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
                position: 'absolute'
              }}></div>
            )}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: isScanning ? '#eee' : 'white',
              border: '2px solid var(--color-text-main)'
            }}></div>
          </button>
          
           {/* Spacer to balance layout */}
           <div style={{ width: '50px' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

