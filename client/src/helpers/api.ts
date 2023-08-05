// src/helpers/api.ts

interface Category {
    id: number;
    name: string;
  }
  
  const mockCategories: Category[] = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    // Add more categories as needed
  ];
  
  export async function fetchCategories(): Promise<Category[]> {
    // Simulate some delay to mimic an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    // Use type assertion to tell TypeScript that the error will be of type Error
    try {
      const categoriesData = await mockFetchCategories();
      return categoriesData;
    } catch (error) {
      console.error('Error fetching categories:', (error as Error).message);
      throw error; // Re-throw the error after logging
    }
  }
  
  // Mock function to fetch categories data
  function mockFetchCategories(): Promise<Category[]> {
    return Promise.resolve(mockCategories);
  }
  