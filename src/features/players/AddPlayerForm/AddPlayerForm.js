import './AddPlayerForm.scss'
import iconAddPlayer from '@/assets/images/icon-add-player.svg'

import {useState} from "react";
import { useGame } from '@/Context/GameContext';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddPlayerForm() {
  const { addPlayer, getPlayers } = useGame();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer(inputValue);
    setInputValue("");
  };    

  return (
    <div className="add-player-form">
      <Form onSubmit={handleSubmit} className='mb-4'>
        <div className='add-player-form__wrapper'>
          <Form.Control
            type="text"
            value={inputValue}
            placeholder="Dodaj gracza..."
            className="add-player-form__input"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            disabled={getPlayers().some(player => player.name === inputValue) || !inputValue}
            type="submit"
            className="add-player-form__btn" title="Dodaj gracza"
          >
            <img src={iconAddPlayer} alt="Dodaj" />
          </Button>
        </div>
      </Form>
      <div className='add-player-form__divider mb-4'></div>
    </div>
  );
}

export default AddPlayerForm;
