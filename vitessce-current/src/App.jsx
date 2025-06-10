import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import MainApp from './MainPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordSet, setPasswordSet] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const { hash } = window.location;
    if (hash && hash.includes("access_token")) {
      const params = new URLSearchParams(hash.slice(1)); // remove the #
      const url = new URL(window.location.href);
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      const type = params.get('type');
      const password = url.searchParams.get('password');

      const fromMagicLink = ['invite', 'recovery'].includes(type);
      console.log('params:', params);
      console.log('type:', type);
      console.log('password:', password);
      
      if (access_token && refresh_token) {
        console.log('Setting session from URL tokens');
        supabase.auth.setSession({ access_token, refresh_token }).then(({ data: { session } }) => {
          setUser(session?.user || null);
          setLoading(false);
          if (fromMagicLink) {
            setShowSetPassword(true);
          }
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        });
        return;
    }
    }
    // Check for existing session
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

  const handleSetPassword = async () => {
    if (!newPassword) return;
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      alert(error.message);
    } else {
      setPasswordSet(true);
      setShowSetPassword(false);
      alert('Password set! You can now log in with your email and password next time.');
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowSetPassword(false);
    setPasswordSet(false);
  };

  if (loading) return <p>Loading...</p>;

  if (user && showSetPassword && !passwordSet) {
    return (
      <div style={loginWrapperStyle}>
        <div style={loginBoxStyle}>
          <h2>Set Your Password</h2>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleSetPassword} style={loginButtonStyle}>Set Password</button>
        </div>
      </div>
    );
  }

  return user ? (
    <>
      <div style={{ textAlign: 'right', padding: '1rem' }}>
        <span>{user.email}</span>
        <button onClick={handleLogout} style={logoutButtonStyle}>Log Out</button>
      </div>
      <MainApp />
    </>
  ) : (
    <div style={loginWrapperStyle}>
      <div style={loginBoxStyle}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleLogin} style={loginButtonStyle}>Log In</button>
      </div>
    </div>
  );
}

// Styles
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
