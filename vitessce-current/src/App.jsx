import React from 'react';
import MainApp from './MainPage';

export default function App() {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', background: '#f7f9fc' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          {['beth', 'hms', 'hsph', 'lab', 'nih'].map((name, idx) => (
            <img
              key={name}
              src={`/${name}.png`}
              alt={`icon${idx + 1}`}
              style={{
                height: 35,
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'scale(2)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          ))}
        </div>
      </div>
      <MainApp />
    </>
  );
}
