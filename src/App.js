import './App.scss';
import './views/SettingPlayersView'
import { GameProvider } from './GameContext'
import CategoriesView from './views/CategoriesView';
import PlayingView from './views/PlayingView/PlayingView';
import WheelView from './views/WheelView/WheelView';
import SettingPlayersView from './views/SettingPlayersView';

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
