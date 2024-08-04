'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent, CardActions, Button, Modal, List, ListItem, ListItemText, Chip, CircularProgress } from '@mui/material';
import { AccessTime, Person, Restaurant } from '@mui/icons-material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { db, auth } from '../../../firebaseConfig';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface Recipe {
  id: string;
  name: string;
  difficulty: string;
  time: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

const SavedRecipesPage = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchSavedRecipes(user.uid);
      } else {
        setLoading(false);
        setSavedRecipes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchSavedRecipes = async (userId: string) => {
    try {
      const q = query(collection(db, 'users', userId, 'savedRecipes'));
      const querySnapshot = await getDocs(q);
      const recipesArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Recipe[];
      setSavedRecipes(recipesArray);
    } catch (err) {
      console.error('Error fetching saved recipes:', err);
      setError('Failed to fetch saved recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (recipeId: string) => {
    try {
      if (auth.currentUser) {
        const userUid = auth.currentUser.uid;
        await deleteDoc(doc(db, 'users', userUid, 'savedRecipes', recipeId));
        setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== recipeId));
      }
    } catch (err) {
      console.error('Error deleting recipe:', err);
      setError('Failed to delete recipe. Please try again.');
    }
  };

  const handleOpenRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  if (loading) {
    return (
      <PageContainer title="Saved Recipes" description="Your saved recipes">
        <DashboardCard title="Saved Recipes">
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        </DashboardCard>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Saved Recipes" description="Your saved recipes">
        <DashboardCard title="Saved Recipes">
          <Typography color="error">{error}</Typography>
        </DashboardCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Saved Recipes" description="Your saved recipes">
      <DashboardCard title="Saved Recipes">
        {savedRecipes.length === 0 ? (
          <Typography>You haven&apos;t saved any recipes yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {savedRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {recipe.name}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Chip 
                        icon={<AccessTime />} 
                        label={recipe.time} 
                        size="small" 
                        sx={{ 
                          maxWidth: '100%', 
                          height: 'auto',
                          '& .MuiChip-label': { 
                            whiteSpace: 'normal',
                            display: 'block',
                            padding: '8px 12px',
                          } 
                        }} 
                      />
                      <Chip 
                        icon={<Person />} 
                        label={`Serves ${recipe.servings}`} 
                        size="small" 
                        sx={{ 
                          maxWidth: '100%', 
                          height: 'auto',
                          '& .MuiChip-label': { 
                            whiteSpace: 'normal',
                            display: 'block',
                            padding: '8px 12px',
                          } 
                        }} 
                      />
                      <Chip 
                        icon={<Restaurant />} 
                        label={recipe.difficulty} 
                        size="small" 
                        sx={{ 
                          maxWidth: '100%', 
                          height: 'auto',
                          '& .MuiChip-label': { 
                            whiteSpace: 'normal',
                            display: 'block',
                            padding: '8px 12px',
                          } 
                        }} 
                      />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleOpenRecipe(recipe)}>View Recipe</Button>
                    <Button size="small" color="error" onClick={() => deleteRecipe(recipe.id)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </DashboardCard>

      <Modal
        open={selectedRecipe !== null}
        onClose={handleCloseRecipe}
        aria-labelledby="recipe-modal-title"
        aria-describedby="recipe-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '90vh',
          overflow: 'auto',
        }}>
          {selectedRecipe && (
            <>
              <Typography id="recipe-modal-title" variant="h6" component="h2" gutterBottom>
                {selectedRecipe.name}
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Chip icon={<AccessTime />} label={selectedRecipe.time} />
                <Chip icon={<Person />} label={`Serves ${selectedRecipe.servings}`} />
                <Chip icon={<Restaurant />} label={selectedRecipe.difficulty} />
              </Box>
              <Typography variant="h6" gutterBottom>Ingredients:</Typography>
              <List dense>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" gutterBottom>Instructions:</Typography>
              <List>
                {selectedRecipe.instructions.map((instruction, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${index + 1}. ${instruction}`} />
                  </ListItem>
                ))}
              </List>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={handleCloseRecipe}>Close</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default SavedRecipesPage;