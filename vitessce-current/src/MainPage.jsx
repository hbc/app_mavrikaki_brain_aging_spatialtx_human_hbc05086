import React, { useEffect, useState } from 'react';
import { Vitessce } from 'vitessce';

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
      content = (
        <div style={popupHomeContentStyle}>
          Aging-related Transcriptomic Changes
          with Spatial and Cell Type-Specific Resolution
          in the Human Brain <br/>
          <p>
          This platform enables visualization of whole-genome spatial transcriptomics data (Visium High-Definition, 2μm resolution) from human dorsolateral prefrontal cortex (DLPFC) tissue of a young and an old individual, allowing characterization of age-related molecular changes within and across cortical layers (and white matter), 
and cell types. <br/>
          </p>
        </div>
      );
    } else if (popupContent === 'about') {
      content = (
        <div style={popupHomeContentStyle}>
          <p>
        From Rai et al., to be submitted.{' '}
        <a
          href="https://research.bidmc.org/maria-mavrikaki"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1976d2', textDecoration: 'underline' }}
        >
          Mavrikaki Lab
        </a>
        .
          </p>
        </div>
      );
    }

    return (
      <div style={popupOverlayStyle}>
        <div style={popupBoxStyle}>
          {/* Close icon */}
          <button
            onClick={() => setPopupContent(null)}
            style={popupCloseButtonStyle}
            aria-label="Close"
          >
            &times;
          </button>
          <div style={popupTitleStyle}>
            {popupContent.toUpperCase()}
          </div>
          <div style={popupContentContainerStyle}>{content}</div>
        </div>
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
        const replacedConfig = JSON.parse(
          JSON.stringify(jsonData).replace(/__DATA_URL__/g, dataUrl)
        );
        setConfig(replacedConfig);
      })
  }, []);
  if (!config) return <div>Loading config...</div>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <nav style={navStyle}>
        <div>🔬 Aging-related Spatial Transcriptome</div>
        <div>
          <button onClick={() => handleNavClick('home')} style={navLinkStyle}>Home</button>
          <button onClick={() => handleNavClick('about')} style={navLinkStyle}>About</button>
        </div>
      </nav>

      {/* Title */}
      <header style={headerStyle}>
        <h1 style={{ margin: 0 }}>Single-cell Spatial Data Viewer</h1>
      </header>

      {/* Main App */}
      <main>
        {renderPopup()}
        <Vitessce config={config} theme="light" height='1000' />
      </main>
    </div>
  );
}

// --- Styles outside MainApp ---

const navStyle = {
  backgroundColor: '#607d8b', // blue grey
  padding: '1rem',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between'
};

const navLinkStyle = {
  color: 'white',
  background: 'none',
  border: 'none',
  marginLeft: '1rem',
  cursor: 'pointer',
  fontSize: '1rem'
};

const headerStyle = {
  padding: '1rem',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #ddd'
};

const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.25)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const popupBoxStyle = {
  backgroundColor: 'white',
  border: '1px solid #ccc',
  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  padding: '2rem',
  borderRadius: '14px',
  minWidth: '340px',
  maxWidth: '90vw',
  maxHeight: '80vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const popupCloseButtonStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#888'
};

const popupTitleStyle = {
  marginBottom: '1rem',
  fontWeight: 'bold',
  fontSize: '1.1rem'
};

const popupContentContainerStyle = {
  overflowY: 'auto',
  width: '100%'
};

const popupHomeContentStyle = {
  padding: '1.5rem',
  backgroundColor: '#f0f4f8',
  borderRadius: '12px',
  textAlign: 'center',
  fontSize: '1.25rem',
  fontWeight: 500,
};