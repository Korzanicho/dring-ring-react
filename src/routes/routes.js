import SettingPlayersView from '../views/SettingPlayerView/SettingPlayersView';
import CategoriesView from '../views/CategoriesView/CategoriesView';
import WheelView from '../views/WheelView/WheelView';
import PlayingView from '../views/PlayingView/PlayingView';
import { RouteGuard } from '../components/guards';

export const ROUTES = {
  SETTING_PLAYERS: '/',
  CATEGORIES: '/categories',
  WHEEL: '/wheel',
  PLAYING: '/playing'
};

export const routes = [
  {
    path: ROUTES.SETTING_PLAYERS,
    element: <SettingPlayersView />,
    title: 'Setting Players'
  },
  {
    path: ROUTES.CATEGORIES,
    element: (
      <RouteGuard requirePlayers={true}>
        <CategoriesView />
      </RouteGuard>
    ),
    title: 'Categories'
  },
  {
    path: ROUTES.WHEEL,
    element: (
      <RouteGuard requirePlayers={true} requireCategories={true}>
        <WheelView />
      </RouteGuard>
    ),
    title: 'Wheel'
  },
  {
    path: ROUTES.PLAYING,
    element: (
      <RouteGuard requirePlayers={true} requireCategories={true} requireSelectedPlayer={true}>
        <PlayingView />
      </RouteGuard>
    ),
    title: 'Playing'
  }
]; 