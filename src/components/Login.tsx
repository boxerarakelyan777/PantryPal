"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Container, TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import imageToAdd from "./../../public/images/66964c2e30a0dbf13ac88fec_Shape-1-p-500.webp";
import Image from "next/image"; // Import the Image component from Next.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get('verificationSent') === 'true') {
      setShowVerificationMessage(true);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to pantry page after successful login
    } catch (error: any) {
      setError(error.message);
      console.error('Error logging in:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard'); // Redirect to pantry page after successful login
    } catch (error: any) {
      setError(error.message);
      console.error('Error logging in with Google:', error);
    }
  };

  return (
    <Container maxWidth="xs" style={{ padding: '2rem 0', marginTop: "60px", marginLeft: "-170px"}}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Left Side - Form */}
        <Box sx={{ flex: 1, ml: -4, pr: 4 }}>
          <Typography className="gradient-text" variant="h4" component="h1" gutterBottom>
          Welcome Back
        </Typography>
        <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
           
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                width: "600px",
                height: "65px",
                backgroundColor: '#f5f5f5',
                borderRadius: '25px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'gray',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'gray',
                  fontWeight: "bold",
                },
                '& .MuiInputBase-root': {
                  color: 'black',
                },
              }}
              InputProps={{
                style: { width: '500px' } // Make the input field wider
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
            
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                width: "600px",
                height: "65px",
                backgroundColor: '#f5f5f5',
                borderRadius: '25px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'gray',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'gray',
                  fontWeight: "bold",
                },
                '& .MuiInputBase-root': {
                  color: 'black',
                },
              }}
              InputProps={{
                style: { width: '500px' } // Make the input field wider
              }}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button type="submit" className="gradient-button" sx={{ mt: 2, borderRadius: '25px', width: '600px', height: "60px"}}>
            Login
          </Button>
        </form>
        <Button
          className="gradient-button"
          sx={{ mt: 2, borderRadius: '25px', width: '600px', height: "60px"}}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
      </Box>
        {/* Right Side - Image */}
        <Box sx={{ flex: 1, display: 'flex', marginLeft:"200px", marginTop:"150px"}}>
          <Image
            src={imageToAdd}
            alt="Illustration"
            style={{
 
              opacity: 0.3, // Adjust opacity here
            }}
          />
        </Box>
      </Box>
      <Snackbar
        open={showVerificationMessage}
        autoHideDuration={5000}
        onClose={() => setShowVerificationMessage(false)}
      >
        <Alert severity="info" sx={{ width: '100%' }}>
          A verification email has been sent to your email address. Please verify your account.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;