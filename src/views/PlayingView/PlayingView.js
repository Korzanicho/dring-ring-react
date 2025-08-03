import './PlayingView.scss';
import { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useChallenges } from '@/hooks/useChallenges';
import { usePlayers } from '@/hooks/usePlayers';

import { TheButton, BackButton } from '@/components';
import ChallengeDefault from '@/features/challenges/ChallengeDefault/ChallengeDefault';

function PlayingView() {
	const { view, setView, getSelectedPlayer } = useGameState();
	const { getRandomChallenge } = useChallenges();
	const { getRandomPlayers } = usePlayers();

	const [challenge, setChallenge] = useState({});

	useEffect(() => {
		if (view === 'playing') {
			handleGetRandomChallenge()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [view]);

	const handleGetRandomChallenge = () => {
		const selectedPlayer = getSelectedPlayer();
		const challengeTypes = selectedPlayer?.name === 'Wszyscy' ? ['all'] : ['default'];
		setChallenge(getRandomChallenge(challengeTypes, selectedPlayer, getRandomPlayers));
	}

	  return view === 'playing' ? (
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
