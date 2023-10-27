import './App.scss';
import './views/SettingPlayerView/SettingPlayersView'

import { GameProvider } from './Context/GameContext';

import WheelView from './views/WheelView/WheelView';
import PlayingView from './views/PlayingView/PlayingView';
import TheHeader from '@/components/layout/TheHeader/TheHeader';
import CategoriesView from './views/CategoriesView/CategoriesView';
import SettingPlayersView from './views/SettingPlayerView/SettingPlayersView';

function App() {
  return (
    <div className="drink-ring">
      <GameProvider>
        <TheHeader />
        <SettingPlayersView />
        <CategoriesView />
        <WheelView />
        <PlayingView />
      </GameProvider>
    </div>
  );
}

export default App;
