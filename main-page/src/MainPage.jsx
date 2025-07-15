import React from "react";
import "./App.css";

export default function MainPage() {
  return (
    <>
      <header className="header">
        <h1>
          Aging-related Transcriptomic Changes<br />
          with Spatial and Cell Type-Specific Resolution<br />
          in the Human Brain
        </h1>
      </header>
      <main>
        <section className="hero">
          <h2>Spatial Transcriptomics Visualization App</h2>
          <p>Explore spatial transcriptomics data with cell type-specific resolution in the human brain.</p>
          <a href="https://mavrikaki-brain-aging.netlify.app/" target="_blank" rel="noopener noreferrer">Go to App</a>
        </section>
        <section className="hero">
          <h2>Spatial Transcriptomics Gene Expression App</h2>
          <p>Stay tuned for more tools and resources related to aging-related transcriptomic changes.</p>
          <a href="https://hcbc.connect.hms.harvard.edu/content/7e80c0c1-a5e8-4b46-8b92-6cbc69b2ba3e" target="_blank" rel="noopener noreferrer">Coming Soon</a>
        </section>
      </main>
      <div className="logos">
        <img src="/beth.png" alt="Beth Logo" />
        <img src="/hms.png" alt="HMS Logo" />
        <img src="/hsph.png" alt="HSPH Logo" />
        <img src="/lab.png" alt="Lab Logo" />
        <img src="/nih.png" alt="NIH Logo" />
      </div>
      <footer>
        <p>&copy; 2025 Mavrikaki Lab</p>
      </footer>
    </>
  );
}
