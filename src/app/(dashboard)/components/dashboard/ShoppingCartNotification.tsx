'use client';
import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';
import DashboardCard from '../shared/DashboardCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ShoppingCartNotification = () => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateItemCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
      setItemCount(cartItems.length);
    };

    updateItemCount();

    // Add event listener for storage changes
    window.addEventListener('storage', updateItemCount);

    return () => {
      window.removeEventListener('storage', updateItemCount);
    };
  }, []);

  return (
    <DashboardCard title="Shopping Cart">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <ShoppingCartIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h3" fontWeight="bold">
            {itemCount}
          </Typography>
        </Box>
        <Typography variant="subtitle1" fontWeight="bold">
          {itemCount === 1 ? 'Item' : 'Items'}
        </Typography>
      </Box>
      <Box mt={2}>
        <Link href="/shoppingcart" passHref>
          <Button variant="contained" color="primary" fullWidth>
            View Shopping Cart
          </Button>
        </Link>
      </Box>
    </DashboardCard>
  );
};

export default ShoppingCartNotification;