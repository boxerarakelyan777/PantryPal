// src/app/page.tsx
import React from 'react';
import AddItemForm from '../components/AddItemForm';
import PantryList from '../components/PantryList';
import { Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md">

      <Typography variant="h6" component="h2" gutterBottom>
        Add a new item:
      </Typography>
      <AddItemForm />
      <Typography variant="h6" component="h2" gutterBottom>
        Pantry Items:
      </Typography>
      <PantryList />
    </Container>
  );
};

export default Home;
