// src/app/PatnryTracker.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container } from '@mui/material';
import AddItemForm from '../components/AddItemForm';
import PantryList from '../components/PantryList';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'pantryItems'));
      const itemsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsArray);
    };

    fetchItems();
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add a new item:
          </Typography>
          <AddItemForm setItems={setItems} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="h2" gutterBottom>
            Pantry Items:
          </Typography>
          <PantryList items={items} setItems={setItems} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
