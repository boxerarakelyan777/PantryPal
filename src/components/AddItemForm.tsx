import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Box, FormHelperText, Typography } from '@mui/material';

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
  const [addCount, setAddCount] = useState<number>(0);

  useEffect(() => {
    const storedCount = localStorage.getItem('unauthenticatedAddCount');
    setAddCount(storedCount ? parseInt(storedCount, 10) : 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];

    if (!name || !category || !expirationDate) {
      setError('All fields are required.');
      return;
    }
    if (expirationDate < currentDate) {
      setError('Expiration date cannot be in the past.');
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
          uid: userId,
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
        if (addCount < 2) {
          const docRef = await addDoc(collection(db, 'unauthenticatedItems'), {
            name,
            quantity,
            category,
            expirationDate,
          });
          setItems(prevItems => [
            ...prevItems,
            { id: docRef.id, name, quantity, category, expirationDate }
          ]);
          const newCount = addCount + 1;
          setAddCount(newCount);
          localStorage.setItem('unauthenticatedAddCount', newCount.toString());
          setName('');
          setQuantity(1);
          setCategory('');
          setExpirationDate('');
        } else {
          setError('Please register to add more items.');
        }
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
          sx={{
            backgroundColor: '#f5f5f5', // Bright grey background color
            borderRadius: '10px',        // Rounded corners
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
              color: 'gray', // Prevent the label from turning blue
              fontWeight: "bold",
              borderColor: "white",
              
              
            },
            '& .MuiInputBase-root': {
              color: 'black',
            },
          }}
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          sx={{
            backgroundColor: '#f5f5f5', // Bright grey background color
            borderRadius: '10px',        // Rounded corners
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
              color: 'gray', // Prevent the label from turning blue
              fontWeight: "bold",
              borderColor: "white",
              
              
            },
            '& .MuiInputBase-root': {
              color: 'black',
            },
          }}
        />
        <FormControl
          required
          fullWidth
          sx={{
            backgroundColor: '#f5f5f5', // Bright grey background color
            borderRadius: '10px',        // Rounded corners
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
              color: 'gray', // Prevent the label from turning blue
              fontWeight: "bold",
              borderColor: "white",
            },
            '& .MuiInputBase-root': {
              color: 'black',
            },
          }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>{category}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{!category && error ? "Category is required." : null}</FormHelperText>
        </FormControl>
        <TextField
          label="Expiration Date"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          sx={{
            backgroundColor: '#f5f5f5', // Bright grey background color
            borderRadius: '10px',        // Rounded corners
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
              color: 'gray', // Prevent the label from turning blue
              fontWeight: "bold",
              borderColor: "white",
              
              
            },
            '& .MuiInputBase-root': {
              color: 'black',
            },
          }}
        />
        <Button type="submit" className="gradient-button">
          Add Item
        </Button>
        {error && <FormHelperText error>{error}</FormHelperText>}
        {addCount === 2 && !auth.currentUser && (
          <Typography color="error">
            You have reached the limit for adding items. Please register to add more.
          </Typography>
        )}
      </Box>
    </form>
  );
};

export default AddItemForm;