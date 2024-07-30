// src/components/Navbar.tsx
"use client";

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ marginLeft: '1rem' }} color={'black'}>
            PantryPal
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
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
        <Box sx={{ flexGrow: 1 }} /> {/* Spacer for aligning content in the center */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
