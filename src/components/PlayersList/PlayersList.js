import './PlayersList.scss';
import Card from 'react-bootstrap/Card';
import { useGame } from '../../Context/GameContext';

function PlayersList() {
	const { getPlayers } = useGame();

	return (
		<div className="players-list">
			{getPlayers().length ? getPlayers().map((player) => (
				<Card key={player.name} className="players-list__item">
					<Card.Body>
						<Card.Title>{player.name}</Card.Title>
					</Card.Body>
				</Card>
			)) : <p className="text-center mt-3 color-text">No players yet!</p>}
		</div>
	);
}

export default PlayersList;
