import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path) => {
    navigate(path);
  };

  const navigateToSettingPlayers = () => {
    navigate(ROUTES.SETTING_PLAYERS);
  };

  const navigateToCategories = () => {
    navigate(ROUTES.CATEGORIES);
  };

  const navigateToWheel = () => {
    navigate(ROUTES.WHEEL);
  };

  const navigateToPlaying = () => {
    navigate(ROUTES.PLAYING);
  };

  const goBack = () => {
    navigate(-1);
  };

  const getCurrentPath = () => {
    return location.pathname;
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  return {
    // Navigation methods
    navigateTo,
    navigateToSettingPlayers,
    navigateToCategories,
    navigateToWheel,
    navigateToPlaying,
    goBack,
    
    // Current state
    getCurrentPath,
    isCurrentPath,
    currentPath: location.pathname
  };
}; 