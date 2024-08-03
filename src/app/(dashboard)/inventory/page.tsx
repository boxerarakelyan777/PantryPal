'use client';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../firebaseConfig';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Grid, TextField, Autocomplete, Box, IconButton, Modal, Typography } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import BlankCard from '../components/shared/BlankCard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateItemForm from '../components/UpdateItemForm';
import { useRouter } from 'next/navigation';

const categories = [
  "Fruits - Fresh fruits",
  "Fruits - Dried fruits",
  "Fruits - Canned fruits",
  "Vegetables - Leafy greens",
  "Vegetables - Root vegetables",
  "Vegetables - Cruciferous vegetables",
  "Vegetables - Other fresh vegetables",
  "Vegetables - Frozen vegetables",
  "Vegetables - Canned vegetables",
  "Grains and Cereals - Whole grains",
  "Grains and Cereals - Refined grains",
  "Grains and Cereals - Breakfast cereals",
  "Grains and Cereals - Flours and meal",
  "Protein Foods - Meat",
  "Protein Foods - Poultry",
  "Protein Foods - Seafood",
  "Protein Foods - Eggs",
  "Protein Foods - Plant-based proteins",
  "Protein Foods - Nuts and seeds",
  "Dairy - Milk",
  "Dairy - Cheese",
  "Dairy - Yogurt",
  "Dairy - Butter and cream",
  "Fats and Oils - Cooking oils",
  "Fats and Oils - Spreads",
  "Fats and Oils - Dressings and mayonnaise",
  "Beverages - Water",
  "Beverages - Juices",
  "Beverages - Sodas",
  "Beverages - Coffee and tea",
  "Beverages - Alcoholic beverages",
  "Baked Goods - Bread",
  "Baked Goods - Pastries",
  "Baked Goods - Cakes and cookies",
  "Snacks - Chips and crisps",
  "Snacks - Crackers",
  "Snacks - Popcorn",
  "Snacks - Nuts and trail mixes",
  "Condiments and Sauces - Ketchup, mustard",
  "Condiments and Sauces - Soy sauce, hot sauce",
  "Condiments and Sauces - Salad dressings",
  "Condiments and Sauces - Jam and jelly",
  "Spices and Herbs - Fresh herbs",
  "Spices and Herbs - Dried herbs and spices",
  "Sweets and Confectionery - Chocolate",
  "Sweets and Confectionery - Candy",
  "Sweets and Confectionery - Ice cream and frozen desserts",
  "Prepared and Processed Foods - Canned soups and stews",
  "Prepared and Processed Foods - Ready-to-eat meals",
  "Prepared and Processed Foods - Frozen entrees",
  "Miscellaneous - Baking ingredients",
  "Miscellaneous - Cooking essentials",
  "Miscellaneous - Supplements"
];

const PantryList: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterExpirationDate, setFilterExpirationDate] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      if (auth.currentUser) {
        const userUid = auth.currentUser.uid;
        const q = query(collection(db, 'users', userUid, 'pantryItems'));
        const querySnapshot = await getDocs(q);
        const itemsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsArray);
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchItems();
      } else {
        setItems([]);
        setLoading(false);
         // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'users', auth.currentUser?.uid || '', 'pantryItems', id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
  };

  const closeEditForm = () => {
    setEditingItem(null);
  };

  const filteredItems = items?.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    const matchesExpirationDate = filterExpirationDate ? item.expirationDate <= filterExpirationDate : true;

    return matchesSearch && matchesCategory && matchesExpirationDate;
  }) || [];

  if (loading) return <div>Loading...</div>;
  return (
    <PageContainer title="Inventory" description="this is your inventory">

      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Pantry List">
            <div>
              <TextField
                label="Search Items"
                
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <Autocomplete
                options={categories}
                value={filterCategory}
                onChange={(event, newValue) => setFilterCategory(newValue)}
                renderInput={(params) => <TextField {...params} label="Filter by Category" variant="outlined" fullWidth margin="normal" />}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                freeSolo
              />

            <TextField
            label="Filter by Expiration Date"
            type="date"
            fullWidth
            
            margin="normal"
            value={filterExpirationDate}
            onChange={(e) => setFilterExpirationDate(e.target.value)}
            InputLabelProps={{ shrink: true }}

          />
            </div>
          </DashboardCard>
        </Grid>
        <Grid item sm={12}>
          <DashboardCard title="Pantry List">
            <Grid container spacing={2} sx={{ padding: '20px' }}>
              {filteredItems.map(item => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <BlankCard>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton aria-label="edit" onClick={() => handleEdit(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </BlankCard>
                </Grid>
              ))}
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid >

      {editingItem && (
        <Modal open={!!editingItem} onClose={closeEditForm}>
          <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 1, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <UpdateItemForm
                id={editingItem.id}
                currentName={editingItem.name}
                currentQuantity={editingItem.quantity}
                currentCategory={editingItem.category}
                currentExpirationDate={editingItem.expirationDate}
                currentImageUrl={editingItem.imageUrl}
                onClose={closeEditForm}
                setItems={setItems}
            />
          </Box>
        </Modal>
      )}
    </PageContainer>
  );
};

export default PantryList;