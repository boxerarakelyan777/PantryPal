"use client";

import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText, Typography, Box } from '@mui/material';

interface UpdateItemFormProps {
  id: string;
  currentName: string;
  currentQuantity: number;
  currentCategory: string;
  currentExpirationDate: string;
  onClose: () => void;
  setItems: React.Dispatch<React.SetStateAction<any[]>>; // Ensure this line is present if `setItems` is needed
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

const UpdateItemForm: React.FC<UpdateItemFormProps> = ({ id, currentName, currentQuantity, currentCategory, currentExpirationDate, onClose }) => {
  const [name, setName] = useState(currentName);
  const [quantity, setQuantity] = useState(currentQuantity);
  const [category, setCategory] = useState(currentCategory);
  const [expirationDate, setExpirationDate] = useState(currentExpirationDate);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || !expirationDate) {
      setError('All fields are required.');
      return;
    }

    if (name === currentName && quantity === currentQuantity && category === currentCategory && expirationDate === currentExpirationDate) {
      setError('No changes made.');
      return;
    }

    setError('');

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const itemDoc = doc(db, "users", currentUser.uid, "pantryItems", id);
        await updateDoc(itemDoc, {
          name,
          quantity,
          category,
          expirationDate,
        });
        onClose();
      } else {
        setError('User is not authenticated.');
        console.error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error updating document: ', error);
      setError('Failed to update item.');
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
          error={Boolean(error && name === '')}
          helperText={error && name === '' ? "Name is required." : ""}
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
          error={Boolean(error && quantity === 0)}
          helperText={error && quantity === 0 ? "Quantity is required." : ""}
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
        <FormControl required fullWidth 
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
                        }}        >
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>{category}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{error && !category ? "Category is required." : ""}</FormHelperText>
        </FormControl>
        <TextField
          label="Expiration Date"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          error={Boolean(error && !expirationDate)}
          helperText={error && !expirationDate ? "Expiration Date is required." : ""}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button type="submit" className="gradient-button">
            Update Item
          </Button>
          <Button className="gradient-button" onClick={onClose}>
            Cancel
          </Button>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </form>
  );
};

export default UpdateItemForm;