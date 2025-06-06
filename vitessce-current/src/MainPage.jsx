import React from 'react';
import { Vitessce } from 'vitessce';
import { useEffect, useState } from 'react';

export default function MainApp() {
  const [popupContent, setPopupContent] = useState(null);

  const handleNavClick = (section) => {
    if (popupContent === section) {
      setPopupContent(null); // Close if clicked again
    } else {
      setPopupContent(section); // Show the selected content
    }
  };

  const renderPopup = () => {
    if (!popupContent) return null;

    let content = '';
    if (popupContent === 'home') {
      content = 'Welcome to the Single-cell Data Viewer. This tool lets you explore high-dimensional data interactively.';
    } else if (popupContent === 'about') {
      content = 'This app was built using React and Vitessce to visualize complex biological datasets.';
    }

    return (
      <div style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        width: '25%',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '1rem',
        zIndex: 10,
        borderRadius: '8px',
      }}>
        <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{popupContent.toUpperCase()}</div>
        <div>{content}</div>
        <button onClick={() => setPopupContent(null)} style={{ marginTop: '1rem' }}>
          Close
        </button>
      </div>
    );
  };
  const [config, setConfig] = useState(null);
  useEffect(() => {
    fetch('/my-view-config-noimg.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((jsonData) => {
        const dataUrl = import.meta.env.VITE_DATA_URL;
        // console.log('ENV TEST:', dataUrl);
        // console.log(jsonData);
        const replacedConfig = JSON.parse(
          JSON.stringify(jsonData).replace(/__DATA_URL__/g, dataUrl)
        );
        // console.log('Replaced config:', replacedConfig);
        setConfig(replacedConfig);
      })
      
  }, []);
  if (!config) return <div>Loading config...</div>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation */}
      <nav style={{
        backgroundColor: '#333',
        padding: '1rem',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div>🔬 My Visualization App</div>
        <div>
          <button onClick={() => handleNavClick('home')} style={navLinkStyle}>Home</button>
          <button onClick={() => handleNavClick('about')} style={navLinkStyle}>About</button>
        </div>
      </nav>

      {/* Title */}
      <header style={{
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd'
      }}>
        <h1 style={{ margin: 0 }}>Single-cell Data Viewer</h1>
      </header>

      {/* Main App */}
      <main >
      {renderPopup()}
      {/* <pre>{JSON.stringify(config, null, 2)}</pre> */}
      <Vitessce config={config} theme="light" height='1000' />
      {/* <h2>Debug Config Output:</h2> */}
      {/* <pre>{JSON.stringify(config, null, 2)}</pre> */}
      </main>
    </div>
  );
}

// Styling for buttons acting as nav links
const navLinkStyle = {
  color: 'white',
  background: 'none',
  border: 'none',
  marginLeft: '1rem',
  cursor: 'pointer',
  fontSize: '1rem'
};