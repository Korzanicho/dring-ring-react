export const PLAYERS_ACTIONS = {
  ADD_PLAYER: 'ADD_PLAYER',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  SET_PLAYERS: 'SET_PLAYERS',
  LOAD_PLAYERS: 'LOAD_PLAYERS'
};

export const playersReducer = (state, action) => {
  switch (action.type) {
    case PLAYERS_ACTIONS.ADD_PLAYER:
      const newPlayers = [...state, { name: action.payload }];
      localStorage.setItem('players', JSON.stringify(newPlayers));
      return newPlayers;
      
    case PLAYERS_ACTIONS.REMOVE_PLAYER:
      const filteredPlayers = state.filter(player => player.name !== action.payload);
      localStorage.setItem('players', JSON.stringify(filteredPlayers));
      return filteredPlayers;
      
    case PLAYERS_ACTIONS.SET_PLAYERS:
      return action.payload;
      
    case PLAYERS_ACTIONS.LOAD_PLAYERS:
      return action.payload || [];
      
    default:
      return state;
  }
}; 