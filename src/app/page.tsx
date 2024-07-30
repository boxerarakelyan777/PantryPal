// src/app/page.tsx
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Pantry Tracker
      </Typography>
      <Typography variant="body1">
        Manage and track your pantry items effortlessly.
      </Typography>
    </>
  );
}
