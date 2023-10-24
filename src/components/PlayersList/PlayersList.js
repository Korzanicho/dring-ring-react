import './PlayersList.scss';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useGame } from '@/Context/GameContext';

function PlayersList() {
	const { getPlayers, setPlayers, removePlayer } = useGame();

	useEffect(() => {
		const players = JSON.parse(localStorage.getItem('players'));
		if (players && players.length) {
			setPlayers(players);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="players-list">
			{getPlayers().length ? getPlayers().map((player) => (
				<Card key={player.name} className="players-list__item">
					<Card.Body>
						<Card.Title className="align-items-center">
							<div className='d-flex justify-content-between'>
								<span>{player.name}</span>
								<Button
									size="sm"
									variant="danger"
									className="players-list__item__btn"
									title="Usuń gracza"
									onClick={() => removePlayer(player.name)}
								>
									X
								</Button>
							</div>
						</Card.Title>
					</Card.Body>
				</Card>
			)) : <p className="text-center mt-3 color-text">No players yet!</p>}
		</div>
	);
}

export default PlayersList;
