// src/app/pantrylist/page.tsx
"use client";
import React, { useState } from 'react';
import PantryList from '../../components/PantryList';

const PantryPage = () => {
    const [items, setItems] = useState<any[]>([]); // Replace 'any' with the appropriate type if known
  
    return (
      <div>
        {/* Other components or elements */}
        <PantryList items={items} setItems={setItems} />
      </div>
    );
  };
  
  export default PantryPage;