'use client';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../firebaseConfig';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Grid, TextField, Autocomplete, Box, IconButton, Modal, Typography, Button } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import BlankCard from '../components/shared/BlankCard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateItemForm from '../components/UpdateItemForm';
import AddItemForm from '../components/AddItemForm';
import { useRouter } from 'next/navigation';

const categories = [
  "Staples (Grains, Baking Supplies, Oils and Vinegars)",
  "Canned and Jarred Goods (Vegetables, Fruits, Sauces, Soups and Broths)",
  "Spices and Seasonings (Herbs, Spices, Seasoning Blends, Condiments)",
  "Dry Goods (Beans and Lentils, Nuts and Seeds, Snacks)",
  "Dairy and Alternatives (Milk and Cream, Cheese, Yogurt, Plant-based Alternatives)",
  "Meat and Protein (Fresh Meat, Frozen Meat, Seafood, Plant-based Proteins)",
  "Fruits and Vegetables (Fresh Fruits, Fresh Vegetables, Frozen Fruits, Frozen Vegetables)",
  "Beverages (Water, Juices, Soft Drinks, Alcoholic Beverages)",
  "Bakery and Bread (Bread, Pastries, Tortillas and Wraps)",
  "Snacks and Sweets (Cookies, Candy, Chips)",
  "Prepared and Frozen Meals (Frozen Dinners, Pizza, Pre-cooked Meals)",
  "Miscellaneous (Special Dietary Items, Supplements, Baby Food)"
];

const PantryList: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterExpirationDate, setFilterExpirationDate] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const isCloseToExpiring = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const daysUntilExpiration = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiration <= 7 && daysUntilExpiration >= 0;
  };

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

  const handleAddItem = () => {
    setShowAddItemForm(true);
  };

  const handleCloseAddItemForm = () => {
    setShowAddItemForm(false);
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
            <>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddItem}
                  sx={{ mb: 2 }}
                >
                  Add New Item
                </Button>
              </Box>
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
            </>
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
                        Quantity: {item.quantity} {item.measurement}
                      </Typography>
                      {isCloseToExpiring(item.expirationDate) && (
                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                          This item is about to expire!
                        </Typography>
                      )}
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
                currentMeasurement={editingItem.measurement}
                onClose={closeEditForm}
                setItems={setItems}
            />
          </Box>
        </Modal>
      )}

      <Modal open={showAddItemForm} onClose={handleCloseAddItemForm}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 1, maxWidth: 600, mx: 'auto', mt: 4 }}>
          <AddItemForm setItems={setItems} />
          <Button onClick={handleCloseAddItemForm} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default PantryList;