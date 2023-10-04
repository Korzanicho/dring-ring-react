import './PlayingView.scss';
import { useEffect, useState } from 'react';
import { useGame } from '../../GameContext';
import Button from 'react-bootstrap/Button';

function PlayingView() {
	const { getView, getRandomChallenge } = useGame();

	const [challenge, setChallenge] = useState({});

	// useEffect only runs once when getView() === 'playing'

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

			{challenge ? (
				<div>
					<h1 className="text-center">{challenge.title}</h1>
					<p className="text-center">{challenge.body}</p>
				</div>
			) : null}
			
			<Button
				size="lg"
				type="submit"
				variant="primary"
				onClick={handleGetRandomChallenge}
				className="categories-view__play-btn"
			>
				Next
			</Button> 
    </div>
  ) : null;
}

export default PlayingView;
