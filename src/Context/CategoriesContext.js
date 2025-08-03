import { createContext, useReducer } from "react";
import { categoriesReducer, CATEGORIES_ACTIONS } from './reducers/categoriesReducer';

const CategoriesContext = createContext(undefined);

export { CategoriesContext };

export const CategoriesProvider = ({ children }) => {
  const [selectedCategories, dispatch] = useReducer(categoriesReducer, []);

  const setSelectedCategories = (categories) => {
    dispatch({ type: CATEGORIES_ACTIONS.SET_SELECTED_CATEGORIES, payload: categories });
  };

  const addCategory = (category) => {
    dispatch({ type: CATEGORIES_ACTIONS.ADD_CATEGORY, payload: category });
  };

  const removeCategory = (category) => {
    dispatch({ type: CATEGORIES_ACTIONS.REMOVE_CATEGORY, payload: category });
  };

  const clearCategories = () => {
    dispatch({ type: CATEGORIES_ACTIONS.CLEAR_CATEGORIES });
  };

  return (
    <CategoriesContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        addCategory,
        removeCategory,
        clearCategories,
        getSelectedCategories: () => selectedCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

 