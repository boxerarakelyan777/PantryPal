import type { NextApiRequest, NextApiResponse } from 'next';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { ingredients, usePantryOnly } = req.body;
      
      let prompt;
      if (usePantryOnly) {
        prompt = `Generate a recipe using ONLY these ingredients: ${ingredients}. If there are not enough ingredients to make a complete recipe, respond with ONLY the text "Not enough ingredients". Otherwise, follow the format specified below.`;
      } else {
        prompt = `Generate any recipe. You can use ingredients not listed here. Follow the format specified below.`;
      }

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI chef assistant that generates recipes. Format your response as follows:\n\n[Any message if necessary]\n\nRecipe: [Recipe Name]\nDifficulty: [Easy/Medium/Hard]\nTime: [Preparation and Cooking Time]\nServings: [Number of Servings]\n\nIngredients:\n• [Ingredient 1]\n• [Ingredient 2]\n...\n\nInstructions:\n1. [Step 1]\n2. [Step 2]\n...',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'llama-3.1-70b-versatile',
        temperature: 0.7,
        max_tokens: 1000,
      });

      const recipe = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a recipe at this time.';
      res.status(200).json({ recipe });
    } catch (error) {
      console.error('Error generating recipe:', error);
      res.status(500).json({ error: 'An error occurred while generating the recipe. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}