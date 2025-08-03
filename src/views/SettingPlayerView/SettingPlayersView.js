import { TheButton } from '@/components';
import PlayersList from '@/features/players/PlayersList/PlayersList';
import AddPlayerForm from "@/features/players/AddPlayerForm/AddPlayerForm";

import { useGame } from '@/Context/GameContext';

function SettingPlayersView() {
	const { getView, setView, getPlayers } = useGame();

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
