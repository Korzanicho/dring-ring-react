import { TheButton, PageContainer } from '@/components';
import PlayersList from '@/features/players/PlayersList/PlayersList';
import AddPlayerForm from "@/features/players/AddPlayerForm/AddPlayerForm";

import { usePlayers } from '@/hooks/usePlayers';
import { useGameState } from '@/hooks/useGameState';

function SettingPlayersView() {
	const { view, setView } = useGameState();
	const { hasPlayers } = usePlayers();

  const handleChangeView = () => {
		setView('categories');
  }

  return view === 'settingPlayers' ? (
    <PageContainer className="setting-player-view">
			<AddPlayerForm />
			<PlayersList className="mt-3" />
			<TheButton
				onClick={handleChangeView}
				disabled={!hasPlayers()}
			>
				DALEJ
			</TheButton>
    </PageContainer>
  ) : null;
}

export default SettingPlayersView;
