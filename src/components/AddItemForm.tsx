import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Box, FormHelperText } from '@mui/material';

interface AddItemFormProps {
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

const AddItemForm: React.FC<AddItemFormProps> = ({ setItems }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !expirationDate) {
      setError('All fields are required.');
      return;
    }
    setError('');

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const docRef = await addDoc(collection(db, 'users', userId, 'pantryItems'), {
          name,
          quantity,
          category,
          expirationDate,
          uid: userId, // Store the user's UID
        });
        setItems(prevItems => [
          ...prevItems,
          { id: docRef.id, name, quantity, category, expirationDate, uid: userId }
        ]);
        setName('');
        setQuantity(1);
        setCategory('');
        setExpirationDate('');
      } else {
        setError('User is not authenticated.');
        console.error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Failed to add item.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        <FormControl required fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>{category}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{error && "Category is required."}</FormHelperText>
        </FormControl>
        <TextField
          label="Expiration Date"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Item
        </Button>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </Box>
    </form>
  );
};

export default AddItemForm;
