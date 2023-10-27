import './BackButton.scss'
import { useGame } from '@/Context/GameContext';
import iconArrowLeft from '@/assets/images/icon-arrow-left.svg';

function BackButton(props) {
	const { setView } = useGame();

	return (
		<img
			alt="Powrót"
			src={iconArrowLeft}
			className="back-button"
			onClick={() => setView(props.view)}
		/>
	);
}

export default BackButton;