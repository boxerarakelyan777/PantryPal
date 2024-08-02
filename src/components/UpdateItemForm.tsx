"use client";

import React, { useState, useRef } from 'react';
import { db, auth, storage } from '../firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText, Typography, Box } from '@mui/material';

interface UpdateItemFormProps {
  id: string;
  currentName: string;
  currentQuantity: number;
  currentCategory: string;
  currentExpirationDate: string;
  currentImageUrl: string; // Add this property
  onClose: () => void;
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

const UpdateItemForm: React.FC<UpdateItemFormProps> = ({
  id,
  currentName,
  currentQuantity,
  currentCategory,
  currentExpirationDate,
  currentImageUrl,
  onClose,
  setItems
}) => {
  const [name, setName] = useState(currentName);
  const [quantity, setQuantity] = useState(currentQuantity);
  const [category, setCategory] = useState(currentCategory);
  const [expirationDate, setExpirationDate] = useState(currentExpirationDate);
  const [image, setImage] = useState<File | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<Blob | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || !expirationDate) {
      setError('All fields are required.');
      return;
    }

    setError('');

    try {
      let uploadedImageUrl = currentImageUrl; // Default to current image URL

      if (image) {
        const imageRef = ref(storage, `images/${auth.currentUser?.uid || 'guest'}/${image.name}`);
        await uploadBytes(imageRef, image);
        uploadedImageUrl = await getDownloadURL(imageRef);
      } else if (capturedPhoto) {
        const imageRef = ref(storage, `images/${auth.currentUser?.uid || 'guest'}/captured.jpg`);
        await uploadBytes(imageRef, capturedPhoto);
        uploadedImageUrl = await getDownloadURL(imageRef);
      }

      const currentUser = auth.currentUser;
      if (currentUser) {
        const itemDoc = doc(db, "users", currentUser.uid, "pantryItems", id);
        await updateDoc(itemDoc, {
          name,
          quantity,
          category,
          expirationDate,
          imageUrl: uploadedImageUrl, // Update image URL
        });
        setItems(prevItems => prevItems.map(item => 
          item.id === id ? { ...item, name, quantity, category, expirationDate, imageUrl: uploadedImageUrl } : item
        ));
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setCapturedPhoto(null); // Reset captured photo if an image is uploaded
    }
  };

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          setCameraOn(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch(err => {
          console.error("Error accessing the camera: ", err);
        });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    }
    setCameraOn(false);
  };

  const takePicture = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      canvas.toBlob(blob => {
        if (blob) {
          setCapturedPhoto(blob);
          setImage(null); // Reset uploaded image if a photo is captured
        }
      });
  
      stopCamera();
    }
  };

  const cancelCamera = () => {
    stopCamera();
    setCapturedPhoto(null);
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
              borderColor: "white",
            },
            '& .MuiInputBase-root': {
              color: 'black',
            },
          }}
        />
        <div>
          <Button component="label" className="gradient-button">
            Upload Image
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
          <Button onClick={startCamera} className="gradient-button">
            Take Picture
          </Button>
        </div>
        {cameraOn && (
          <div>
            <video ref={videoRef} width="100%" height="auto" autoPlay />
            <Button onClick={takePicture} className="gradient-button">
              Capture
            </Button>
            <Button onClick={cancelCamera} className="gradient-button">
              Cancel
            </Button>
          </div>
        )}
        {currentImageUrl && !image && !capturedPhoto && (
          <img src={currentImageUrl} alt="Current Item" style={{ maxHeight: '200px', margin: '10px 0' }} />
        )}
        {image && <Typography>Selected Image: {image.name}</Typography>}
        {capturedPhoto && <Typography>Captured Photo</Typography>}
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