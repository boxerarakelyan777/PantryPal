// src/components/PantryList.tsx
"use client";

import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { List, ListItem, ListItemText, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateItemForm from './UpdateItemForm';

interface PantryListProps {
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const PantryList: React.FC<PantryListProps> = ({ items, setItems }) => {
  const [editingItem, setEditingItem] = useState<{ id: string, name: string, quantity: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'pantryItems', id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleEdit = (item: { id: string, name: string, quantity: number }) => {
    setEditingItem(item);
  };

  const closeEditForm = () => {
    setEditingItem(null);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {editingItem ? (
        <UpdateItemForm
          id={editingItem.id}
          currentName={editingItem.name}
          currentQuantity={editingItem.quantity}
          onClose={closeEditForm}
        />
      ) : (
        <div>
          <TextField
            label="Search Items"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <List>
            {filteredItems.map(item => (
              <ListItem key={item.id}>
                <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </>
  );
};

export default PantryList;
