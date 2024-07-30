// src/components/AddItemForm.tsx
"use client";

import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'pantryItems'), {
        name,
        quantity,
        category,
        expirationDate,
      });
      setItems(prevItems => [
        ...prevItems,
        { id: docRef.id, name, quantity, category, expirationDate }
      ]);
      setName('');
      setQuantity(1);
      setCategory('');
      setExpirationDate('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <FormControl fullWidth>
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
    </form>
  );
};

export default AddItemForm;
