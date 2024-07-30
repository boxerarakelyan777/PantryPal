// src/components/Navbar.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
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
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ marginLeft: '1rem' }} color={'black'}>
            PantryPalAI
          </Typography>
        </Box>



        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2, }}>
          <Button
            sx={{ color: 'black', borderColor: 'white', textTransform: 'none', fontSize: '1rem' }}
            onClick={() => router.push('/')}
          >
            Home
          </Button>
          <Button
            sx={{ color: 'black', borderColor: 'white', textTransform: 'none', fontSize: '1rem' }}
            onClick={() => router.push('/pantry')}
          >
            Demo
          </Button>
        </Box>


        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAuthenticated ? (
            <Button
              sx={{ color: 'black', textTransform: 'none', fontSize: '1rem' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>

              <Button
            sx={{ color: 'black', textTransform: 'none', fontSize: '1rem' }}
            onClick={() => router.push('/register')}
          >
            Register
          </Button>
          <Button
            sx={{ color: 'black', textTransform: 'none', fontSize: '1rem' }}
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
            </>
          )}
        </Box>
        
        <Box sx={{ flexGrow: 1 }} /> {/* Spacer for aligning content in the center */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
