import { Navigate } from 'react-router-dom';
import { usePlayers } from '@/hooks/usePlayers';
import { useCategories } from '@/hooks/useCategories';
import { useGameState } from '@/hooks/useGameState';
import { ROUTES } from '@/routes/routes';

const RouteGuard = ({ children, requirePlayers = false, requireCategories = false, requireSelectedPlayer = false }) => {
  const { hasPlayers } = usePlayers();
  const { hasSelectedCategories } = useCategories();
  const { getSelectedPlayer } = useGameState();

  if (requirePlayers && !hasPlayers()) {
    return <Navigate to={ROUTES.SETTING_PLAYERS} replace />;
  }

  if (requireCategories && !hasSelectedCategories()) {
    return <Navigate to={ROUTES.CATEGORIES} replace />;
  }

  if (requireSelectedPlayer && !getSelectedPlayer()) {
    return <Navigate to={ROUTES.WHEEL} replace />;
  }

  return children;
};

export default RouteGuard; 