// src/components/Register.tsx
"use client";

import React, { useState } from 'react';
import { auth, db, googleProvider } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        created_at: new Date(),
        emailVerified: false, // Initially set as not verified
      });

      await signOut(auth); // Sign out to prevent automatic authentication
      router.push('/login?verificationSent=true'); // Redirect to login page with a query parameter
    } catch (error: any) {
      setError(error.message);
      console.error('Error registering:', error);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Store new user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        created_at: new Date(),
        emailVerified: true, // Google accounts are automatically verified
      });

      router.push('/pantry'); // Redirect to pantry page after successful registration
    } catch (error: any) {
      setError(error.message);
      console.error('Error registering with Google:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleEmailRegister}>
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
            Register
          </Button>
        </form>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleGoogleRegister}
        >
          Sign up with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
