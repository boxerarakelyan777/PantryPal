// src/components/Login.tsx
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Container, TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('verificationSent') === 'true') {
      setShowVerificationMessage(true);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/pantry'); // Redirect to pantry page after successful login
    } catch (error: any) {
      setError(error.message);
      console.error('Error logging in:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/pantry'); // Redirect to pantry page after successful login
    } catch (error: any) {
      setError(error.message);
      console.error('Error logging in with Google:', error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container maxWidth="xs">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
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
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
        </Box>

        {/* Snackbar for email verification notification */}
        <Snackbar
          open={showVerificationMessage}
          autoHideDuration={5000} // 5 seconds
          onClose={() => setShowVerificationMessage(false)}
        >
          <Alert severity="info" sx={{ width: '100%' }}>
            A verification email has been sent to your email address. Please verify your account.
          </Alert>
        </Snackbar>
      </Container>
    </Suspense>
  );
};

export default Login;
