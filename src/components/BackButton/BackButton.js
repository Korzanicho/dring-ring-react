import './BackButton.scss'
import { useGame } from '@/Context/GameContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'

function BackButton(props) {
	const { setView } = useGame();

	return (
		<FontAwesomeIcon
			size="2xl"
			className="back-button "
			icon={faCircleArrowLeft}
			onClick={() => setView(props.view)}
		/>
	);
}

export default BackButton;