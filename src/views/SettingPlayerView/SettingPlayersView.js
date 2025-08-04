import { TheButton, PageContainer } from '@/components';
import PlayersList from '@/features/players/PlayersList/PlayersList';
import AddPlayerForm from "@/features/players/AddPlayerForm/AddPlayerForm";

import { usePlayers } from '@/hooks/usePlayers';
import { useNavigation } from '@/hooks/useNavigation';

function SettingPlayersView() {
	const { navigateToCategories } = useNavigation();
	const { hasPlayers } = usePlayers();

  const handleChangeView = () => {
		navigateToCategories();
  }

  return (
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
  );
}

export default SettingPlayersView;
