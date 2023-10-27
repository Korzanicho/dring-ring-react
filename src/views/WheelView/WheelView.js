import './WheelView.scss';
import { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette'
import { useGame } from '@/Context/GameContext';
import TheButton from '@/components/TheButton/TheButton';
import BackButton from '@/components/BackButton/BackButton';

function WheelView() {
	const {
		getView, getPlayers, setView, setSelectedPlayer, getSelectedPlayer } = useGame();

	const data = getPlayers().map((player) => {
		return {
			option: player.name
		}
	});

	data.push({ option: 'Wszyscy' })

	const randomPlayerIndex = Math.floor(Math.random() * data.length);

	// let initialPlayerId = 0;
	// if (getSelectedPlayer()?.id) {
	// 	initialPlayerId = getPlayers().findIndex((player) => {
	// 		return player.id === getSelectedPlayer().id;
	// 	}
	// 	);
	// }
	const [initialPlayerId, setInitialPlayerId] = useState(0);

	useEffect(() => {
		if (getSelectedPlayer()?.name) {
			setInitialPlayerId(data.findIndex((player) => {
				return player.option === getSelectedPlayer().name;
			}
			));
		}
	}
	, [setView]);


	const [isSpinning, setIsSpinning] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	const handleStopSpinning = () => {
		if (data[randomPlayerIndex].option === 'Wszyscy') {
			setSelectedPlayer({ name: 'Wszyscy' });
		} else {
			setSelectedPlayer(getPlayers()[randomPlayerIndex]);
		}
		setIsSelected(true);
		setIsSpinning(false);

		setTimeout(() => {
			setIsSelected(false);
			setIsSpinning(false);
			setView('playing')
		}, 3000);
	}

	return getView() === 'wheel' ? (
    <div className="wheel-view">
			<BackButton view='categories' />
			<div
				className={`wheel-view__wheel ${isSelected ? 'wheel-view__wheel--hidden' : ''}`}
			>
				<Wheel
					data={data}
					fontSize="25"
					perpendicularText={false}
					textColors={['#ffffff']}
					radiusLineColor='#d2a141'
					outerBorderColor='#d2a141'
					innerBorderColor='#d2a141'
					mustStartSpinning={isSpinning}
					prizeNumber={randomPlayerIndex}
					onStopSpinning={handleStopSpinning}
					startingOptionIndex={initialPlayerId}
					backgroundColors={['#1a8c7e', '#1a6a5c']}
				/>
			</div>
			<div
				className={`wheel-view__selected ${isSelected ? 'wheel-view__selected--active' : ''}`}
			>
				<span>{getSelectedPlayer()?.name}</span>
			</div>
			<TheButton
				className='wheel-view__btn'
				onClick={() => setIsSpinning(true)}
			>
				Zakręć
			</TheButton>
		</div>
  ) : null;
}

export default WheelView;
