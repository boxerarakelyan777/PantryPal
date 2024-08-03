"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import { GoogleTagManager } from '@next/third-parties/google'

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <html lang="en">
      <head>
        <title>PantryPalAI</title>
        <meta name="description" content="Track and manage your pantry items" />
        <link rel="icon" href="/FaviconIcon2.png" />

      </head>
     
      <GoogleTagManager gtmId="GTM-TL5RVLM3" />
      <body>
        <ThemeProvider theme={baselightTheme}>
        <CssBaseline />
        <MainWrapper className="mainwrapper">
          {/* ------------------------------------------- */}
          {/* Sidebar */}
          {/* ------------------------------------------- */}
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          {/* ------------------------------------------- */}
          {/* Main Wrapper */}
          {/* ------------------------------------------- */}
          <PageWrapper className="page-wrapper">
            {/* ------------------------------------------- */}
            {/* Header */}
            {/* ------------------------------------------- */}
            <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
            {/* ------------------------------------------- */}
            {/* PageContent */}
            {/* ------------------------------------------- */}
            <Container
              sx={{
                paddingTop: "20px",
                maxWidth: "1200px",
              }}
            >
              {/* ------------------------------------------- */}
              {/* Page Route */}
              {/* ------------------------------------------- */}
              <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
              {/* ------------------------------------------- */}
              {/* End Page */}
              {/* ------------------------------------------- */}
            </Container>
          </PageWrapper>
        </MainWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
      
    
  
