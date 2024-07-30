import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Typography } from "@mui/material";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pantry Tracker",
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
        <title>Pantry Tracker</title>
        <meta name="description" content="Track and manage your pantry items" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Container maxWidth="md">
          <header>
            <Typography variant="h2" component="h1">
              Pantry Tracker
            </Typography>
          </header>
          <main>{children}</main>
          <footer>
            <Typography variant="body2" color="textSecondary" align="center">
              &copy; 2024 Pantry Tracker
            </Typography>
          </footer>
        </Container>
      </body>
    </html>
  );
}
