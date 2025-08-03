import { createContext, useContext, useState } from "react";

const CategoriesContext = createContext(undefined);

export const CategoriesProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <CategoriesContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        getSelectedCategories: () => selectedCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
}; 