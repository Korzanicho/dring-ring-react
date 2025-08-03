export const CHALLENGES_ACTIONS = {
  SET_CHALLENGES: 'SET_CHALLENGES',
  CLEAR_CHALLENGES: 'CLEAR_CHALLENGES'
};

export const challengesReducer = (state, action) => {
  switch (action.type) {
    case CHALLENGES_ACTIONS.SET_CHALLENGES:
      return action.payload;
      
    case CHALLENGES_ACTIONS.CLEAR_CHALLENGES:
      return [];
      
    default:
      return state;
  }
}; 