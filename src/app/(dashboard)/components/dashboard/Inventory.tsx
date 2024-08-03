import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { Button, Box, Modal, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import AddItemForm from '../AddItemForm';
import DashboardCard from '../shared/DashboardCard';
import { db, auth } from '../../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const PantryItems = () => {
  const [items, setItems] = useState<any[]>([]);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userUid = currentUser.uid;
        const q = collection(db, 'users', userUid, 'pantryItems');
        const querySnapshot = await getDocs(q);
        const itemsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsArray);
      }
    };

    fetchItems();
  }, []);

  const handleOpenAddItem = () => setAddItemOpen(true);
  const handleCloseAddItem = () => setAddItemOpen(false);

  return (
    <DashboardCard title="Pantry">
      <>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Items: {items.length}</Typography>
          <Button variant="contained" onClick={handleOpenAddItem}>Add</Button>
        </Box>
        <Modal open={addItemOpen} onClose={handleCloseAddItem}>
          <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 1, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <AddItemForm setItems={setItems} />
          </Box>
        </Modal>
      </>
    </DashboardCard>
  );
};

export default PantryItems;
