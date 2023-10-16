import './PlayingView.scss';
import { useEffect, useState } from 'react';
import { useGame } from '@/Context/GameContext';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BackButton from '@/components/BackButton/BackButton';

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

			{challenge ? (
				<Card className='playing-view__card'>
					<Card.Body>
						<Card.Title className='playing-view__title' as="h2">{challenge.title}</Card.Title>
						<Card.Text className='playing-view__body'>
							{challenge.body}
						</Card.Text>
					</Card.Body>
				</Card>
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
