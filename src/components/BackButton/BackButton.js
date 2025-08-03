import './BackButton.scss'
import { useGameState } from '@/hooks/useGameState';
import iconArrowLeft from '@/assets/images/icon-arrow-left.svg';

function BackButton(props) {
	const { setView } = useGameState();

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