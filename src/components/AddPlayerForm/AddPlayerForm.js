import './AddPlayerForm.scss'
import iconAddPlayer from '@/assets/images/icon-add-player.svg'

import {useRef} from "react";
import { useGame } from '@/Context/GameContext';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddPlayerForm() {
  const { addPlayer } = useGame();
  const inputRef = useRef(null);     

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer(inputRef.current.value);
    inputRef.current.value = "";
  };    

  return (
    <div className="add-player-form">
      <Form onSubmit={handleSubmit} className='mb-4'>
        <div className='add-player-form__wrapper'>
          <Form.Control
            type="text"
            ref={inputRef}
            placeholder="Dodaj gracza..."
            className="add-player-form__input"
          />
          <Button variant="" type="submit" className="add-player-form__btn" title="Dodaj gracza" >
            <img src={iconAddPlayer} alt="Dodaj" />
          </Button>
        </div>
      </Form>
      <div className='add-player-form__divider mb-4'></div>
    </div>
  );
}

export default AddPlayerForm;
