import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import Navbar from "../../components/NavBar"; // Import the Navbar component
import Footer from "../../components/Footer";
import { Container } from '@mui/material';

import { GoogleTagManager } from '@next/third-parties/google'


import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PantryPalAI",
  description: "Track and manage your pantry items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>PantryPalAI</title>
        <meta name="description" content="Track and manage your pantry items" />
        <link rel="icon" href="/FaviconIcon2.png" />

      </head>
     
      <GoogleTagManager gtmId="GTM-TL5RVLM3" />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Container maxWidth="md" component="main" sx={{ flex: '1 0 auto', mt: 4 }}>
            {children}
          </Container>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}