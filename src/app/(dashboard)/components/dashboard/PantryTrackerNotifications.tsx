import React from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';
import { useRouter } from 'next/navigation';
import useAuth from '../../../../hooks/userAuth';
import { db } from '../../../../firebaseConfig';
import { collection, query, getDocs } from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';

interface PantryItem {
  id: string;
  name: string;
  expirationDate: string;
  // Add other properties as needed
}

const PantryTrackerNotifications = () => {
  const router = useRouter();
  const user = useAuth();
  const [expiringItems, setExpiringItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpiringItems = useCallback(async () => {
    if (!user) {
      console.log('No user found, skipping fetch');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching expiring items for user:', user.uid);
      const q = query(collection(db, 'users', user.uid, 'pantryItems'));
      const querySnapshot = await getDocs(q);
      
      const now = new Date();
      const expiringItemsArray = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as PantryItem))
        .filter(item => {
          if (!item.expirationDate) return false;
          const expirationDate = new Date(item.expirationDate);
          const daysUntilExpiry = Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
          return daysUntilExpiry <= 5;
        });

      console.log('Filtered expiring items:', expiringItemsArray);
      setExpiringItems(expiringItemsArray);
    } catch (err) {
      console.error('Error fetching expiring items:', err);
      setError('Failed to fetch expiring items. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchExpiringItems();
  }, [fetchExpiringItems]);

  const handleViewPantry = () => {
    router.push('/inventory');
  };

  const handleRetry = () => {
    fetchExpiringItems();
  };

  return (
    <DashboardCard title="Pantry Notifications">
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box>
          <Typography color="error" gutterBottom>{error}</Typography>
          <Button variant="contained" color="primary" onClick={handleRetry}>
            Retry
          </Button>
        </Box>
      ) : expiringItems.length > 0 ? (
        <Box>
          <Typography variant="body1" color="warning.main" gutterBottom>
            {expiringItems.length} item(s) in your pantry are about to expire!
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Items expiring soon:
          </Typography>
          <ul>
            {expiringItems.slice(0, 3).map(item => (
              <li key={item.id}>
                <Typography variant="body2">
                  {item.name} - Expires in {Math.ceil((new Date(item.expirationDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} day(s)
                </Typography>
              </li>
            ))}
            {expiringItems.length > 3 && (
              <Typography variant="body2">...and {expiringItems.length - 3} more</Typography>
            )}
          </ul>
          <Button variant="contained" color="primary" onClick={handleViewPantry} sx={{ mt: 2 }}>
            View Pantry
          </Button>
        </Box>
      ) : (
        <Typography variant="body1">No items are close to expiring.</Typography>
      )}
    </DashboardCard>
  );
};

export default PantryTrackerNotifications;