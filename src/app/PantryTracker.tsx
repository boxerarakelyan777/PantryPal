// src/app/PantryTracker.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container } from '@mui/material';
import AddItemForm from '../components/AddItemForm';
import PantryList from '../components/PantryList';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const PantryTracker = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const user = auth.currentUser;
      if (user) {
        const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'pantryItems'));
        const itemsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsArray);
      }
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
          <AddItemForm setItems={setItems} /> {/* Ensure AddItemForm accepts setItems */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="h2" gutterBottom>
            Pantry Items:
          </Typography>
          <PantryList items={items} setItems={setItems} /> {/* Ensure PantryList accepts items and setItems */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PantryTracker;
