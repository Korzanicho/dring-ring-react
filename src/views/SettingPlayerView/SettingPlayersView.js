import TheButton from '@/components/TheButton/TheButton';
import PlayersList from '@/components/PlayersList/PlayersList';
import AddPlayerForm from "@/components/AddPlayerForm/AddPlayerForm";

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
