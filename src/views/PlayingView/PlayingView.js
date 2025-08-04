import './PlayingView.scss';
import { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useChallenges } from '@/hooks/useChallenges';
import { usePlayers } from '@/hooks/usePlayers';
import { useNavigation } from '@/hooks/useNavigation';

import { TheButton, BackButton, PageContainer } from '@/components';
import ChallengeDefault from '@/features/challenges/ChallengeDefault/ChallengeDefault';

function PlayingView() {
	const { getSelectedPlayer } = useGameState();
	const { getRandomChallenge } = useChallenges();
	const { getRandomPlayers } = usePlayers();
	const { navigateToWheel } = useNavigation();

	const [challenge, setChallenge] = useState({});

	useEffect(() => {
		handleGetRandomChallenge()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleGetRandomChallenge = () => {
		const selectedPlayer = getSelectedPlayer();
		const challengeTypes = selectedPlayer?.name === 'Wszyscy' ? ['all'] : ['default'];
		setChallenge(getRandomChallenge(challengeTypes, selectedPlayer, getRandomPlayers));
	}

	return (
    <PageContainer className="playing-view mt-3">
			<BackButton view='/categories' />

			{challenge.type && (challenge.type.name === 'default' || challenge.type.name === 'all') ? (
				<ChallengeDefault challenge={challenge} />
			) : null}

			<TheButton
				type="submit"
				onClick={navigateToWheel}
				className="playing-view__play-btn"
			>
				DALEJ
			</TheButton>
		</PageContainer>
	);
}

export default PlayingView;
