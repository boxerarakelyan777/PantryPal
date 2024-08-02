import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Container, Grid, Box, Typography, List, ListItem, ListItemText, IconButton, TextField, Autocomplete, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateItemForm from './UpdateItemForm';

interface PantryListProps {
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

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

const PantryList: React.FC<PantryListProps> = ({ items, setItems }) => {
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterExpirationDate, setFilterExpirationDate] = useState('');
  const [loading, setLoading] = useState(true);

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

    fetchItems();
  }, [setItems]);

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

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? item.category === filterCategory : true;
    const matchesExpirationDate = filterExpirationDate ? item.expirationDate <= filterExpirationDate : true;

    return matchesSearch && matchesCategory && matchesExpirationDate;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="xl" sx={{ padding: '2rem 0' }}>
      <Typography className="gradient-textmedium" align="center" gutterBottom>Your Pantry</Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Search and Filter Fields */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search Items"
            variant="filled"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'gray',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'gray',
                fontWeight: "bold",
              },
              '& .MuiInputBase-root': {
                color: 'black',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            options={categories}
            value={filterCategory}
            onChange={(event, newValue) => setFilterCategory(newValue)}
            renderInput={(params) => <TextField {...params} label="Filter by Category" variant="outlined" fullWidth margin="normal" />}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            freeSolo
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'gray',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'gray',
                fontWeight: "bold",
              },
              '& .MuiInputBase-root': {
                color: 'black',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Filter by Expiration Date"
            type="date"
            fullWidth
            variant="filled"
            margin="normal"
            value={filterExpirationDate}
            onChange={(e) => setFilterExpirationDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'gray',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'gray',
                fontWeight: "bold",
              },
              '& .MuiInputBase-root': {
                color: 'black',
              },
            }}
          />
        </Grid>
      </Grid>

      {/* List of Items */}
      <Box sx={{ mt: 4 }}>
        <List sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '20px' }}>
          {filteredItems.map(item => (
            <ListItem
              key={item.id}
              sx={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <ListItemText
                primary={item.name}
                secondary={`Quantity: ${item.quantity}`}
                sx={{ color: 'white' }}
              />
              <Box>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                  <EditIcon sx={{ color: 'white' }} />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      {editingItem && (
        <Modal open={!!editingItem} onClose={closeEditForm}>
          <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 1, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <UpdateItemForm
              id={editingItem.id}
              currentName={editingItem.name}
              currentQuantity={editingItem.quantity}
              currentCategory={editingItem.category}
              currentExpirationDate={editingItem.expirationDate}
              onClose={closeEditForm}
              setItems={setItems}
            />
          </Box>
        </Modal>
      )}
    </Container>
  );
};

export default PantryList;