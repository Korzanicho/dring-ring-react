import './App.scss';

import { AppProvider } from './Context/AppProvider';
import { AppLayout } from '@/components';

import WheelView from './views/WheelView/WheelView';
import PlayingView from './views/PlayingView/PlayingView';
import CategoriesView from './views/CategoriesView/CategoriesView';
import SettingPlayersView from './views/SettingPlayerView/SettingPlayersView';

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <SettingPlayersView />
        <CategoriesView />
        <WheelView />
        <PlayingView />
      </AppLayout>
    </AppProvider>
  );
}

export default App;
