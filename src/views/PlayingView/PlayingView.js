import './PlayingView.scss';
import { useEffect, useState } from 'react';
import { useGame } from '@/Context/GameContext';

import Button from 'react-bootstrap/Button';
import BackButton from '@/components/BackButton/BackButton';
import ChallengeDefault from '@/components/Challenges/ChallengeDefault/ChallengeDefault';

function PlayingView() {
	const { getView, getRandomChallenge, setView, getSelectedPlayer } = useGame();

	const [challenge, setChallenge] = useState({});

	useEffect(() => {
		if (getView() === 'playing') {
			handleGetRandomChallenge()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getView]);

	const handleGetRandomChallenge = () => {
		getSelectedPlayer() === 'Wszyscy' ? setChallenge(getRandomChallenge(['all'])) : setChallenge(getRandomChallenge([]));
	}

	return getView() === 'playing' ? (
    <div className="playing-view mt-3">
			<BackButton view='categories' />

			{challenge.type && (challenge.type.name === 'default' || challenge.type.name === 'all') ? (
				<ChallengeDefault challenge={challenge} />
			) : null}
			
			<Button
				size="lg"
				type="submit"
				variant="secondary"
				onClick={() => setView('wheel')}
				className="playing-view__play-btn"
			>
				Next
			</Button> 
    </div>
  ) : null;
}

export default PlayingView;
