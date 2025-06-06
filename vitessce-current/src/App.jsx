import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import MainApp from './MainPage'; // <- we'll move your main page code into this

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;

  return user ? (
    <>
      <div style={{ textAlign: 'right', padding: '1rem' }}>
        <span style={{ marginRight: '1rem' }}>{user.email}</span>
        <button onClick={handleLogout} style={logoutButtonStyle}>Log Out</button>
      </div>
      <MainApp />
    </>
  ) : (
    <div style={loginWrapperStyle}>
    <div style={loginBoxStyle}>
      <h2 style={{ marginBottom: '1rem', color: '#333' }}>🔒 Login to Access</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleLogin} style={loginButtonStyle}>Log In</button>
    </div>
  </div>
  );
}

const loginWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f7f9fc',
  fontFamily: 'Arial, sans-serif'
};

const loginBoxStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  width: '300px'
};

const inputStyle = {
  marginBottom: '1rem',
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const loginButtonStyle = {
  backgroundColor: '#0070f3',
  color: 'white',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1rem',
  cursor: 'pointer'
};

const logoutButtonStyle = {
  backgroundColor: '#ccc',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

