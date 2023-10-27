import './PlayersList.scss';
import iconTrash from '@/assets/images/icon-trash.svg';

import { useEffect } from 'react';
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
				<div key={player.name} className='players-list__item'>
					<span className='players-list__name-wrapper'>{player.name}</span>
					<div className='players-list__btn-wrapper'>
						<Button
							size="sm"
							variant=""
							className="players-list__item__btn"
							title="Usuń gracza"
							onClick={() => removePlayer(player.name)}
						>
							<img src={iconTrash} alt="Usuń gracza" />
						</Button>
					</div>
				</div>
			)) : <p className="text-center mt-3 color-text">No players yet!</p>}
		</div>
	);
}

export default PlayersList;
