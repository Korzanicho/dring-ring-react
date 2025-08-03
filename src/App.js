import './App.scss';

import { AppProvider } from './Context/AppProvider';

import WheelView from './views/WheelView/WheelView';
import PlayingView from './views/PlayingView/PlayingView';
import { TheHeader } from '@/components';
import CategoriesView from './views/CategoriesView/CategoriesView';
import SettingPlayersView from './views/SettingPlayerView/SettingPlayersView';

function App() {
  return (
    <div className="drink-ring">
      <AppProvider>
        <TheHeader />
        <SettingPlayersView />
        <CategoriesView />
        <WheelView />
        <PlayingView />
      </AppProvider>
    </div>
  );
}

export default App;
