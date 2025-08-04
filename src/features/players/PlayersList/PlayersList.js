import React, { useCallback } from 'react';
import './PlayersList.scss';
import iconTrash from '@/assets/images/icon-trash.svg';

import Button from 'react-bootstrap/Button';
import { usePlayers } from '@/hooks/usePlayers';

const PlayersList = React.memo(function PlayersList() {
	const { getPlayers, removePlayer, hasPlayers } = usePlayers();

	const handleRemovePlayer = useCallback((playerName) => {
		removePlayer(playerName);
	}, [removePlayer]);

	return (
		<div className="players-list">
			{hasPlayers() ? getPlayers().map((player) => (
				<div key={player.name} className='players-list__item'>
					<span className='players-list__name-wrapper'>{player.name}</span>
					<div className='players-list__btn-wrapper'>
						<Button
							size="sm"
							variant=""
							className="players-list__item__btn"
							title="Usuń gracza"
							onClick={() => handleRemovePlayer(player.name)}
						>
							<img src={iconTrash} alt="Usuń gracza" />
						</Button>
					</div>
				</div>
			)) : <p className="text-center mt-3 color-text">No players yet!</p>}
		</div>
	);
});

export default PlayersList;
