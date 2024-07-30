import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Typography } from "@mui/material";
import Navbar from "../components/NavBar"; // Import the Navbar component
import Footer from "../components/Footer";
import Script from 'next/script';

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

        {/* Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
        </Script>

        {/* Hotjar Analytics */}
        <Script
          id="HotjarAnalytics"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:2327305,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </head>
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
