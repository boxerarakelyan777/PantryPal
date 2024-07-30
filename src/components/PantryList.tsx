// src/components/PantryList.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateItemForm from './UpdateItemForm';

const PantryList = () => {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<{ id: string, name: string, quantity: number } | null>(null);

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
        <List>
          {items.map(item => (
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
      )}
    </>
  );
};

export default PantryList;
