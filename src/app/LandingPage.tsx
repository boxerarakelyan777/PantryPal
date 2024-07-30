// src/app/LandingPage.tsx
"use client";

import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Container, Grid, TextField, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';

const LandingPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [wantsUpdates, setWantsUpdates] = useState(false);
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
        wantsUpdates,
      });
      setSuccess(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setWantsUpdates(false);
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Failed to join the waitlist. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ padding: '2rem 0' }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Join Our Waitlist
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Be the first to know when our app launches!
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={wantsUpdates}
                  onChange={(e) => setWantsUpdates(e.target.checked)}
                  color="primary"
                />
              }
              label="I want to receive product updates and information."
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Join Waitlist
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LandingPage;
