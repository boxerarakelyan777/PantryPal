// src/components/UpdateItemForm.tsx
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { Button, TextField } from '@mui/material';

interface UpdateItemFormProps {
  id: string;
  currentName: string;
  currentQuantity: number;
  onClose: () => void;
}

const UpdateItemForm: React.FC<UpdateItemFormProps> = ({ id, currentName, currentQuantity, onClose }) => {
  const [name, setName] = useState(currentName);
  const [quantity, setQuantity] = useState(currentQuantity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemDoc = doc(db, "pantryItems", id);
    await updateDoc(itemDoc, {
      name,
      quantity
    });
    onClose(); // Function to close the form or modal
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
        Update Item
      </Button>
      <Button variant="outlined" color="secondary" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
};

export default UpdateItemForm;
