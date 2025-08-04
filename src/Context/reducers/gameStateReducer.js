export const GAME_STATE_ACTIONS = {
  SET_SELECTED_PLAYER: 'SET_SELECTED_PLAYER',
  RESET_GAME_STATE: 'RESET_GAME_STATE'
};

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    case GAME_STATE_ACTIONS.SET_SELECTED_PLAYER:
      return {
        ...state,
        selectedPlayer: action.payload
      };

    case GAME_STATE_ACTIONS.RESET_GAME_STATE:
      return {
        selectedPlayer: null
      };

    default:
      return state;
  }
}; 