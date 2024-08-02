import React, { useState } from 'react';
import { Container, Grid, Box, Typography, Button, Modal } from '@mui/material';
import AddItemForm from '../components/AddItemForm';
import { useRouter } from 'next/navigation';
const PantryTracker = () => {
  const [items, setItems] = useState<any[]>([]);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const router = useRouter();
  const handleOpenAddItem = () => setAddItemOpen(true);
  const handleCloseAddItem = () => setAddItemOpen(false);

  return (
    <Container maxWidth="xl" sx={{ padding: '2rem 0' }}>
      <Typography className="gradient-textmedium" align="center" gutterBottom>Welcome to Your Pantry Dashboard</Typography>
      
      <Grid container spacing={4} justifyContent="center">
        {/* Large Notifications Box */}
        <Grid item xs={12}>
          <Box
            sx={{
              height: '250px',
              width: '100%', // Use full width
              maxWidth: '1200px', // Set a maximum width
              margin: '0 auto', // Center the box
              color: 'var(--black)',
              lineHeight: '20px',
              boxSizing: 'border-box',
              backgroundImage: 'linear-gradient(0deg, #2c3036, rgba(255, 255, 255, 0))',
              border: '1px solid rgba(255, 255, 255, .07)',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '40px 33px 25px 40px',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: '10px', // Rounded corners
            }}
          >
            <Typography variant="h5" color="white" gutterBottom>Pantry Notifications</Typography>
            {/* Display stats and notifications here */}
          </Box>
        </Grid>

        {/* Action Boxes */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              height: '200px',
              width: '100%',
              maxWidth: '300px',
              color: 'var(--black)',
              lineHeight: '20px',
              boxSizing: 'border-box',
              backgroundImage: 'linear-gradient(0deg, #2c3036, rgba(255, 255, 255, 0))',
              border: '1px solid rgba(255, 255, 255, .07)',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: '10px', // Rounded corners
              margin: '0 auto', // Center the box within its grid item
            }}
          >
            <Typography variant="h6" color="white">Add Product</Typography>
            <Button               sx={{
                WebkitTextSizeAdjust: '100%',
                '--white': '#0a0e14',
                '--black': 'white',
                '--dark-grey': '#999',
                '--second-hover': '#484a4c',
                '--blue': '#0019fd',
                '--first-hover': '#212224',
                '--black-second': 'rgba(199, 199, 199, .2)',
                '--alice-blue': '#f0f5ff',
                '--honeydew-section': '#ecfcf4',
                '--green-light': '#e7f9e9',
                fontFamily: 'Inter Tight, sans-serif',
                lineHeight: '20px',
                boxSizing: 'border-box',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                maxWidth: '100%',
                backgroundImage: 'linear-gradient(50deg, var(--first-hover), var(--second-hover))',
                color: 'var(--black)',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '15px 20px',
                fontSize: '15px',
                fontWeight: 400,
                textDecoration: 'none',
                display: 'flex',
                position: 'relative',
                overflow: 'hidden',
              }} variant="contained" onClick={handleOpenAddItem}>Add</Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              height: '200px',
              width: '100%',
              maxWidth: '300px',
              color: 'var(--black)',
              lineHeight: '20px',
              boxSizing: 'border-box',
              backgroundImage: 'linear-gradient(0deg, #2c3036, rgba(255, 255, 255, 0))',
              border: '1px solid rgba(255, 255, 255, .07)',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: '10px', // Rounded corners
              margin: '0 auto', // Center the box within its grid item
            }}
          >
            <Typography variant="h6" color="white">View Pantry</Typography>
            <Button               sx={{
                WebkitTextSizeAdjust: '100%',
                '--white': '#0a0e14',
                '--black': 'white',
                '--dark-grey': '#999',
                '--second-hover': '#484a4c',
                '--blue': '#0019fd',
                '--first-hover': '#212224',
                '--black-second': 'rgba(199, 199, 199, .2)',
                '--alice-blue': '#f0f5ff',
                '--honeydew-section': '#ecfcf4',
                '--green-light': '#e7f9e9',
                fontFamily: 'Inter Tight, sans-serif',
                lineHeight: '20px',
                boxSizing: 'border-box',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                maxWidth: '100%',
                backgroundImage: 'linear-gradient(50deg, var(--first-hover), var(--second-hover))',
                color: 'var(--black)',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '15px 20px',
                fontSize: '15px',
                fontWeight: 400,
                textDecoration: 'none',
                display: 'flex',
                position: 'relative',
                overflow: 'hidden',
              }} variant="contained" onClick={() => router.push('/pantrylist')}>View</Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              height: '200px',
              width: '100%',
              maxWidth: '300px',
              color: 'var(--black)',
              lineHeight: '20px',
              boxSizing: 'border-box',
              backgroundImage: 'linear-gradient(0deg, #2c3036, rgba(255, 255, 255, 0))',
              border: '1px solid rgba(255, 255, 255, .07)',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: '10px', // Rounded corners
              margin: '0 auto', // Center the box within its grid item
            }}
          >
            <Typography variant="h6" color="white">AI Chef</Typography>
            <Button
              sx={{
                WebkitTextSizeAdjust: '100%',
                '--white': '#0a0e14',
                '--black': 'white',
                '--dark-grey': '#999',
                '--second-hover': '#484a4c',
                '--blue': '#0019fd',
                '--first-hover': '#212224',
                '--black-second': 'rgba(199, 199, 199, .2)',
                '--alice-blue': '#f0f5ff',
                '--honeydew-section': '#ecfcf4',
                '--green-light': '#e7f9e9',
                fontFamily: 'Inter Tight, sans-serif',
                lineHeight: '20px',
                boxSizing: 'border-box',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                maxWidth: '100%',
                backgroundImage: 'linear-gradient(50deg, var(--first-hover), var(--second-hover))',
                color: 'var(--black)',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '15px 20px',
                fontSize: '15px',
                fontWeight: 400,
                textDecoration: 'none',
                display: 'flex',
                position: 'relative',
                overflow: 'hidden',
              }} variant="contained" onClick={() => { /* Navigate to AI Chef */ }}>Coming Soon</Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              height: '200px',
              width: '100%',
              maxWidth: '300px',
              color: 'var(--black)',
              lineHeight: '20px',
              boxSizing: 'border-box',
              backgroundImage: 'linear-gradient(0deg, #2c3036, rgba(255, 255, 255, 0))',
              border: '1px solid rgba(255, 255, 255, .07)',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: '10px', // Rounded corners
              margin: '0 auto', // Center the box within its grid item
            }}
          >
            <Typography variant="h6" color="white">Shopping List</Typography>
            <Button               sx={{
                WebkitTextSizeAdjust: '100%',
                '--white': '#0a0e14',
                '--black': 'white',
                '--dark-grey': '#999',
                '--second-hover': '#484a4c',
                '--blue': '#0019fd',
                '--first-hover': '#212224',
                '--black-second': 'rgba(199, 199, 199, .2)',
                '--alice-blue': '#f0f5ff',
                '--honeydew-section': '#ecfcf4',
                '--green-light': '#e7f9e9',
                fontFamily: 'Inter Tight, sans-serif',
                lineHeight: '20px',
                boxSizing: 'border-box',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                maxWidth: '100%',
                backgroundImage: 'linear-gradient(50deg, var(--first-hover), var(--second-hover))',
                color: 'var(--black)',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '15px 20px',
                fontSize: '15px',
                fontWeight: 400,
                textDecoration: 'none',
                display: 'flex',
                position: 'relative',
                overflow: 'hidden',
              }} variant="contained" onClick={() => { /* Navigate to shopping list */ }}>Coming Soon</Button>
          </Box>
        </Grid>
      </Grid>

      {/* Modal for Adding Products */}
      <Modal open={addItemOpen} onClose={handleCloseAddItem}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 1, maxWidth: 600, mx: 'auto', mt: 4 }}>
          <AddItemForm setItems={setItems} />
        </Box>
      </Modal>
    </Container>
  );
};

export default PantryTracker;
