// src/components/AddItemForm.tsx
"use client";

import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Button, TextField } from '@mui/material';

interface AddItemFormProps {
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ setItems }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'pantryItems'), {
        name,
        quantity,
      });
      setItems(prevItems => [
        ...prevItems,
        { id: docRef.id, name, quantity }
      ]);
      setName('');
      setQuantity(1);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Item
      </Button>
    </form>
  );
};

export default AddItemForm;
