'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Button, List, ListItem, ListItemText } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { db, auth } from '../../../firebaseConfig';
import { collection, query, getDocs, addDoc } from 'firebase/firestore';

const PersonalChef = () => {
  const [pantryItems, setPantryItems] = useState<Array<{name: string, quantity: number, measurement: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<{
    message?: string;
    name: string;
    difficulty: string;
    time: string;
    servings: string;
    ingredients: string[];
    instructions: string[];
  } | null>(null);
  const [generating, setGenerating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchPantryItems = async () => {
      try {
        if (auth.currentUser) {
          const userUid = auth.currentUser.uid;
          const q = query(collection(db, 'users', userUid, 'pantryItems'));
          const querySnapshot = await getDocs(q);
          const itemsArray = querySnapshot.docs.map(doc => ({
            name: doc.data().name,
            quantity: doc.data().quantity,
            measurement: doc.data().measurement
          }));
          setPantryItems(itemsArray);
        }
      } catch (err) {
        console.error('Error fetching pantry items:', err);
        setError('Failed to fetch pantry items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchPantryItems();
      } else {
        setPantryItems([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const generateRecipe = async (usePantryOnly: boolean) => {
    if (isGenerating) return; // Prevent multiple simultaneous calls
    setIsGenerating(true);
    setGenerating(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

      const response = await fetch('/api/recipeGenerator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ingredients: pantryItems.map(item => `${item.name} (${item.quantity} ${item.measurement})`).join(', '),
          usePantryOnly
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.recipe === 'Not enough ingredients') {
        setRecipe({ message: 'Not enough ingredients to make a recipe. Try adding more items to your pantry or generate any recipe!' } as any);
      } else {
        const parsedRecipe = parseRecipe(data.recipe);
        setRecipe(parsedRecipe);
      }
    } catch (err) {
      console.error('Error generating recipe:', err);
      if ((err as Error).name === 'AbortError') {
        setError('Recipe generation timed out. Please try again.');
      } else {
        setError('Failed to generate recipe. Please try again or generate any recipe.');
      }
    } finally {
      setGenerating(false);
      setTimeout(() => setIsGenerating(false), 1000); // Re-enable button after 1 second
    }
  };

  const parseRecipe = (recipeString: string) => {
    const lines = recipeString.split('\n').filter(line => line.trim() !== '');
    let parsedRecipe: any = {
      ingredients: [],
      instructions: []
    };

    let currentSection = '';

    for (const line of lines) {
      if (line.toLowerCase().includes('recipe:')) {
        parsedRecipe.name = line.split(':')[1].trim();
      } else if (line.toLowerCase().includes('difficulty:')) {
        parsedRecipe.difficulty = line.split(':')[1].trim();
      } else if (line.toLowerCase().includes('time:')) {
        parsedRecipe.time = line.split(':')[1].trim();
      } else if (line.toLowerCase().includes('servings:')) {
        parsedRecipe.servings = line.split(':')[1].trim();
      } else if (line.toLowerCase().includes('ingredients:')) {
        currentSection = 'ingredients';
      } else if (line.toLowerCase().includes('instructions:')) {
        currentSection = 'instructions';
      } else if (currentSection === 'ingredients' && line.trim().startsWith('•')) {
        parsedRecipe.ingredients.push(line.trim().substring(1).trim());
      } else if (currentSection === 'instructions' && /^\d+\./.test(line.trim())) {
        parsedRecipe.instructions.push(line.trim().replace(/^\d+\.\s*/, ''));
      } else if (!parsedRecipe.message) {
        parsedRecipe.message = line.trim();
      }
    }

    return parsedRecipe;
  };

  const addToShoppingCart = () => {
    if (recipe && recipe.ingredients) {
      const currentCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
      const newItems = recipe.ingredients.filter(item => !pantryItems.some(pantryItem => pantryItem.name === item.split(' (')[0]));
      const updatedCart = [...currentCart, ...newItems];
      localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('storage'));
      alert('Items added to shopping cart!');
    }
  };

  const saveRecipe = async () => {
    if (recipe && auth.currentUser) {
      try {
        const userUid = auth.currentUser.uid;
        const recipeToSave = {
          name: recipe.name,
          difficulty: recipe.difficulty,
          time: recipe.time,
          servings: recipe.servings,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          createdAt: new Date().toISOString()
        };
        
        const docRef = await addDoc(collection(db, 'users', userUid, 'savedRecipes'), recipeToSave);
        console.log("Document written with ID: ", docRef.id);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000); // Clear success message after 3 seconds
      } catch (error) {
        console.error('Error saving recipe:', error);
        setError(`Failed to save recipe. Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    } else {
      setError('No recipe to save or user not authenticated.');
    }
  };

  if (loading) {
    return (
      <PageContainer title="Personal AI Chef" description="Your personal chef assistant">
        <DashboardCard title="Personal AI Chef">
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        </DashboardCard>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Personal AI Chef" description="Your personal chef assistant">
        <DashboardCard title="Personal AI Chef">
          <Typography color="error">{error}</Typography>
        </DashboardCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Personal AI Chef" description="Your personal chef assistant">
      <DashboardCard title="Personal AI Chef">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography variant="h5" gutterBottom>Let our AI Chef help you create a delicious meal!</Typography>
          <Box display="flex" justifyContent="center" gap={2} my={2}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => generateRecipe(true)}
              disabled={generating || pantryItems.length === 0}
            >
              {generating ? 'Generating...' : 'Generate Recipe from Pantry'}
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => generateRecipe(false)}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Any Recipe'}
            </Button>
          </Box>
          
          {recipe && (
            <Box width="100%" mt={4}>
              {recipe.message && (
                <Typography variant="body1" gutterBottom color="text.secondary">
                  {recipe.message}
                </Typography>
              )}
              {recipe.name && (
                <>
                  <Typography variant="h4" gutterBottom align="center">
                    {recipe.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
                    {`${recipe.difficulty} | ${recipe.time} | Serves: ${recipe.servings}`}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom mt={2}>
                    Ingredients:
                  </Typography>
                  <List>
                    {recipe.ingredients.map((ingredient, index) => (
                      <ListItem key={index} dense>
                        <ListItemText primary={`• ${ingredient}`} />
                      </ListItem>
                    ))}
                  </List>
                  
                  <Typography variant="h6" gutterBottom mt={2}>
                    Instructions:
                  </Typography>
                  <List>
                    {recipe.instructions.map((instruction, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`${index + 1}. ${instruction}`} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={saveRecipe}
                style={{ marginTop: '20px', marginRight: '10px' }}
              >
                Save Recipe
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={addToShoppingCart}
                style={{ marginTop: '20px' }}
              >
                Add Missing Ingredients to Shopping Cart
              </Button>
              {saveSuccess && (
                <Typography color="success" style={{ marginTop: '10px' }}>
                  Recipe saved successfully!
                </Typography>
              )}
              {error && (
                <Typography color="error" style={{ marginTop: '10px' }}>
                  {error}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default PersonalChef;