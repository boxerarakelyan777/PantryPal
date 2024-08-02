// src/app/LandingPage.tsx
"use client";

import React, { useState } from 'react';

import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';

const LandingPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setSuccess(false);
    try {
      await addDoc(collection(db, 'waitlist'), {
        firstName,
        lastName,
        email,
      });
      setSuccess(true);
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Failed to join the waitlist. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ padding: '2rem 0', marginTop: "150px"}}>
      <Typography className="gradient-text" align="center" >
        Join Our Waitlist
      </Typography>
      <Typography className="gradient-textsmall" variant="h6" align="center" gutterBottom>
        Be the first to know when our app launches!
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              value={firstName}
              variant="filled"
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
              sx={{
                backgroundColor: '#f5f5f5', // Bright grey background color
                borderRadius: '25px',        // Rounded corners
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
                  color: 'gray', // Prevent the label from turning blue
                  fontWeight: "bold",
                  borderColor: "white",
                  
                  
                },
                '& .MuiInputBase-root': {
                  color: 'black',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              value={lastName}
              variant="filled"
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
              sx={{
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
                  color: 'gray', // Prevent the label from turning blue
                  fontWeight: "bold",
                  borderColor: "white",
                  
                  
                },
                '& .MuiInputBase-root': {
                  color: 'black',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              value={email}
              variant="filled"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{
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
                  color: 'gray', // Prevent the label from turning blue
                  fontWeight: "bold",
                  borderColor: "white",
                  
                  
                },
                '& .MuiInputBase-root': {
                  color: 'black',
                },
              }}
            />
          </Grid>


          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          {success && (
            <Grid item xs={12}>
              <Typography color="primary">Successfully joined the waitlist!</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button className="gradient-button" type="submit" variant="contained" color="primary" fullWidth >
              Join Waitlist
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LandingPage;