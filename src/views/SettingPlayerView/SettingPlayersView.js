import { TheButton } from '@/components';
import PlayersList from '@/features/players/PlayersList/PlayersList';
import AddPlayerForm from "@/features/players/AddPlayerForm/AddPlayerForm";

import { usePlayers } from '@/Context/PlayersContext';
import { useGameState } from '@/Context/GameStateContext';

function SettingPlayersView() {
	const { getView, setView } = useGameState();
	const { getPlayers } = usePlayers();

  const handleChangeView = () => {
		setView('categories');
  }

  return getView() === 'settingPlayers' ? (
    <div className="setting-player-view">
			<AddPlayerForm />
			<PlayersList className="mt-3" />
			<TheButton
				onClick={handleChangeView}
				disabled={!getPlayers().length}
			>
				DALEJ
			</TheButton>
    </div>
  ) : null;
}

export default SettingPlayersView;
