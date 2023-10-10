import PlayersList from '../../components/PlayersList/PlayersList';
import Button from 'react-bootstrap/Button';
import AddPlayerForm from "../../components/AddPlayerForm/AddPlayerForm";

import { useGame } from '../../Context/GameContext';

function SettingPlayersView() {
	const { getView, setView } = useGame();

  const handleChangeView = () => {
		setView('categories');
  }

  return getView() === 'settingPlayers' ? (
    <div className="setting-player-view">
			<AddPlayerForm />
			<PlayersList className="mt-3" />
			<div className='d-flex justify-content-center'>
				<Button variant="primary" type="submit" onClick={handleChangeView} className="mt-3 color-bg">
					Next
				</Button> 
			</div>
    </div>
  ) : null;
}

export default SettingPlayersView;
