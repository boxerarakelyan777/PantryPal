// src/app/pantry/page.tsx
"use client";
import React, { Suspense } from 'react';
import Login from '../../components/Login';


const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
