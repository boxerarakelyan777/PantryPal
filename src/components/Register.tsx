// src/components/Register.tsx
"use client";
import imageToAdd from "./../../public/images/66964c2e30a0dbf13ac88fec_Shape-1-p-500.webp";
import Image from "next/image"; // Import the Image component from Next.js

import React, { useState } from 'react';
import { auth, db, googleProvider } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';

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

      await sendEmailVerification(user);
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        created_at: new Date(),
        emailVerified: false,
      });

      await signOut(auth);
      router.push('/login?verificationSent=true');
    } catch (error: any) {
      setError(error.message);
      console.error('Error registering:', error);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        created_at: new Date(),
        emailVerified: true,
      });

      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
      console.error('Error registering with Google:', error);
    }
  };

  return (
    <Container maxWidth="xs" style={{ padding: '2rem 0', marginTop: "60px", marginLeft: "-170px"}}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Left Side - Form */}
        <Box sx={{ flex: 1, ml: -4, pr: 4 }}>
          <Typography className="gradient-text" variant="h4" component="h1" gutterBottom>
            Get started with us
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
              Register
            </Button>
          </form>
          <Button
            className="gradient-button"
            sx={{ mt: 2, borderRadius: '25px', width: '600px', height: "60px"}}
            onClick={handleGoogleRegister}
          >
            Sign up with Google
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
    </Container>
    
  );
};

export default Register;
