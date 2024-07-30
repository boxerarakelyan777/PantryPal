import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Typography } from "@mui/material";
import Navbar from "../components/NavBar"; // Import the Navbar component
import Footer from "../components/Footer";



import { GoogleTagManager } from '@next/third-parties/google'


import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PantryPal",
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

      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container maxWidth="md" component="main" sx={{ flex: '1 0 auto', mt: 4 }}>
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
