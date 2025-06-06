import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import MainApp from './MainApp'; // <- we'll move your main page code into this

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
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <MainApp />
    </>
  ) : (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Login Required</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}
