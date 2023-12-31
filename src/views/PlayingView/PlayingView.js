import './PlayingView.scss';
import { useEffect, useState } from 'react';
import { useGame } from '@/Context/GameContext';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BackButton from '@/components/BackButton/BackButton';
import ChallengeDefault from '@/components/Challenges/ChallengeDefault/ChallengeDefault';

function PlayingView() {
	const { getView, getRandomChallenge, setView } = useGame();

	const [challenge, setChallenge] = useState({});

	useEffect(() => {
		if (getView() === 'playing') {
			handleGetRandomChallenge()
		}
	}, [getView]);

	const handleGetRandomChallenge = () => {
		setChallenge(getRandomChallenge());
	}

	return getView() === 'playing' ? (
    <div className="playing-view mt-3">
			<BackButton view='categories' />

			{challenge.type.name === 'default' ? (
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
