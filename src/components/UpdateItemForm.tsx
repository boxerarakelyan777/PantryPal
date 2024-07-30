
"use client";

// src/components/UpdateItemForm.tsx
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText, Typography } from '@mui/material';

interface UpdateItemFormProps {
  id: string;
  currentName: string;
  currentQuantity: number;
  currentCategory: string;
  currentExpirationDate: string;
  onClose: () => void;
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
    setError('');
    try {
      const itemDoc = doc(db, "pantryItems", id);
      await updateDoc(itemDoc, {
        name,
        quantity,
        category,
        expirationDate,
      });
      onClose(); // Close the form after updating
    } catch (error) {
      console.error('Error updating document: ', error);
      setError('Failed to update item.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        error={Boolean(error)}
        helperText={error && "Name is required."}
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
        error={Boolean(error)}
        helperText={error && "Quantity is required."}
      />
      <FormControl fullWidth error={Boolean(error)}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
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
        error={Boolean(error)}
        helperText={error && "Expiration Date is required."}
      />
      <Button type="submit" variant="contained" color="primary">
        Update Item
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </form>
  );
};

export default UpdateItemForm;