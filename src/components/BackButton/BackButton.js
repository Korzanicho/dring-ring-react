import './BackButton.scss'
import { useNavigation } from '@/hooks/useNavigation';
import iconArrowLeft from '@/assets/images/icon-arrow-left.svg';

function BackButton(props) {
	const { navigateTo } = useNavigation();

	return (
		<img
			alt="Powrót"
			src={iconArrowLeft}
			className="back-button"
			onClick={() => navigateTo(props.view)}
		/>
	);
}

export default BackButton;