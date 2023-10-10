import './App.scss';
import './views/SettingPlayerView/SettingPlayersView'
import { GameProvider } from './Context/GameContext'
import CategoriesView from './views/CategoriesView/CategoriesView';
import PlayingView from './views/PlayingView/PlayingView';
import WheelView from './views/WheelView/WheelView';
import SettingPlayersView from './views/SettingPlayerView/SettingPlayersView';

function App() {
  return (
    <div className="drink-ring">
      <h1 className='drink-ring__title'>Drink Ring</h1>
      <GameProvider>
        <SettingPlayersView />
        <CategoriesView />
        <WheelView />
        <PlayingView />
      </GameProvider>
    </div>
  );
}

export default App;
