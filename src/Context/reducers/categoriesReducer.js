export const CATEGORIES_ACTIONS = {
  SET_SELECTED_CATEGORIES: 'SET_SELECTED_CATEGORIES',
  ADD_CATEGORY: 'ADD_CATEGORY',
  REMOVE_CATEGORY: 'REMOVE_CATEGORY',
  CLEAR_CATEGORIES: 'CLEAR_CATEGORIES'
};

export const categoriesReducer = (state, action) => {
  switch (action.type) {
    case CATEGORIES_ACTIONS.SET_SELECTED_CATEGORIES:
      return action.payload;
      
    case CATEGORIES_ACTIONS.ADD_CATEGORY:
      return [...state, action.payload];
      
    case CATEGORIES_ACTIONS.REMOVE_CATEGORY:
      return state.filter(category => category.id !== action.payload.id);
      
    case CATEGORIES_ACTIONS.CLEAR_CATEGORIES:
      return [];
      
    default:
      return state;
  }
}; 