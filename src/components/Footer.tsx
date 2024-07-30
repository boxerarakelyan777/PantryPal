// src/components/Footer.tsx
"use client";

import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[800],
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1">
          &copy; 2024 PantryPalAI. All rights reserved.
        </Typography>
        <Typography variant="body2">
          <Link href="#" color="inherit" underline="hover">
            Terms of Service
          </Link>{' '}
          |{' '}
          <Link href="#" color="inherit" underline="hover">
            Privacy Policy
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
