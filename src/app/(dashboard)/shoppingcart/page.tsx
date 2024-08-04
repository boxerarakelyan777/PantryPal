'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    setCartItems(storedCart);
  }, []);

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
  };

  return (
    <PageContainer title="Shopping Cart" description="Your shopping list">
      <DashboardCard title="Shopping Cart">
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your shopping cart is empty.</Typography>
        ) : (
          <List>
            {cartItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => removeItem(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default ShoppingCart;