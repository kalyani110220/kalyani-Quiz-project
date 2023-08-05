// client/src/App.tsx

import React, { useState } from 'react';

interface Category {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [categories] = useState<Category[]>([
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    // Add more categories as needed
  ]);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
