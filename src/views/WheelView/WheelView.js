import './WheelView.scss';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Wheel } from 'react-custom-roulette'
import { useGame } from '@/Context/GameContext';
import BackButton from '@/components/BackButton/BackButton';

function WheelView() {
	const { getView, getPlayers, setView, setSelectedPlayer, getSelectedPlayer } = useGame();

	const data = getPlayers().map((player) => {
		return {
			option: player.name,
			// style: {
			// 	backgroundColor: player.color,
			// 	textColor: '#ffffff'
			// }
		}
	});

	data.push({ option: 'Wszyscy' })

	const randomPlayerIndex = Math.floor(Math.random() * data.length);

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
			<Wheel
				data={data}
				innerBorderColor='red'
				outerBorderColor='#f4a261'
				mustStartSpinning={isSpinning}
				prizeNumber={randomPlayerIndex}
				onStopSpinning={handleStopSpinning}
			/>
			<div
				className={isSelected ? 'wheel-view__selected wheel-view__selected--active' : 'wheel-view__selected'}
			>
				<span>{getSelectedPlayer()?.name}</span>
			</div>
			<Button
				size="lg"
				variant="secondary"
				className='wheel-view__btn'
				onClick={() => setIsSpinning(true)}
			>
				Zakręć
			</Button>
		</div>
  ) : null;
}

export default WheelView;
