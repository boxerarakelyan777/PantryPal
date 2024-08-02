// src/components/Navbar.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';


const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe; // Cleanup the listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to landing page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <span className="gradient-textsmall">PantryPalAI</span>
      </div>

      <div className="navbar-links">
        <button className="nav-button" onClick={() => router.push('/')}>
          Home
        </button>
        <button className="nav-button" onClick={() => router.push('/pantry')}>
          Dashboard
        </button>
      </div>

      <div className="navbar-auth">
        {isAuthenticated ? (
          <button className="nav-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button className="nav-button" onClick={() => router.push('/register')}>
              Register
            </button>
            <button className="nav-button" onClick={() => router.push('/login')}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
