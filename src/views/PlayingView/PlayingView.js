import './PlayingView.scss';
import { useEffect, useState } from 'react';
import { useGameState } from '@/Context/GameStateContext';
import { useChallenges } from '@/Context/ChallengesContext';
import { usePlayers } from '@/Context/PlayersContext';

import { TheButton, BackButton } from '@/components';
import ChallengeDefault from '@/features/challenges/ChallengeDefault/ChallengeDefault';

function PlayingView() {
	const { getView, setView, getSelectedPlayer } = useGameState();
	const { getRandomChallenge } = useChallenges();
	const { getRandomPlayers } = usePlayers();

	const [challenge, setChallenge] = useState({});

	useEffect(() => {
		if (getView() === 'playing') {
			handleGetRandomChallenge()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getView]);

	const handleGetRandomChallenge = () => {
		const selectedPlayer = getSelectedPlayer();
		const challengeTypes = selectedPlayer?.name === 'Wszyscy' ? ['all'] : ['default'];
		setChallenge(getRandomChallenge(challengeTypes, selectedPlayer, getRandomPlayers));
	}

	return getView() === 'playing' ? (
    <div className="playing-view mt-3">
			<BackButton view='categories' />

			{challenge.type && (challenge.type.name === 'default' || challenge.type.name === 'all') ? (
				<ChallengeDefault challenge={challenge} />
			) : null}
			
			<TheButton
				type="submit"
				onClick={() => setView('wheel')}
				className="playing-view__play-btn"
			>
				DALEJ
			</TheButton> 
    </div>
  ) : null;
}

export default PlayingView;
