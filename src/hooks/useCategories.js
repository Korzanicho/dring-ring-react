import { useContext } from 'react';
import { CategoriesContext } from '@/Context/CategoriesContext';

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }

  const { selectedCategories, setSelectedCategories, addCategory, removeCategory, clearCategories, getSelectedCategories } = context;

  const hasSelectedCategories = () => selectedCategories.length > 0;

  const getSelectedCategoriesCount = () => selectedCategories.length;

  const isCategorySelected = (categoryId) => {
    return selectedCategories.some(category => category.id === categoryId);
  };

  const getSelectedCategoryIds = () => {
    return selectedCategories.map(category => category.id);
  };

  const getSelectedCategoryNames = () => {
    return selectedCategories.map(category => category.name);
  };

  const toggleCategory = (category) => {
    if (isCategorySelected(category.id)) {
      removeCategory(category);
    } else {
      addCategory(category);
    }
  };

  return {
    // State
    selectedCategories,

    // Actions
    setSelectedCategories,
    addCategory,
    removeCategory,
    clearCategories,
    toggleCategory,

    // Getters
    getSelectedCategories,
    hasSelectedCategories,
    getSelectedCategoriesCount,
    isCategorySelected,
    getSelectedCategoryIds,
    getSelectedCategoryNames,
  };
}; 