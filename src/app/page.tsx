// src/app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import AddItemForm from '../components/AddItemForm';
import PantryList from '../components/PantryList';
import { Typography, Container } from '@mui/material';
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
      <Typography variant="h6" component="h2" gutterBottom>
        Add a new item:
      </Typography>
      <AddItemForm setItems={setItems} />
      <Typography variant="h6" component="h2" gutterBottom>
        Pantry Items:
      </Typography>
      <PantryList items={items} setItems={setItems} />
    </Container>
  );
};

export default Home;
