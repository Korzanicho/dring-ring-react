import './AddPlayerForm.scss'
import {useRef} from "react";
import Form from 'react-bootstrap/Form';
import { useGame } from './GameContext';
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
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="add-player-form__label">Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" ref={inputRef} />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="mb-3">
            Add Player
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddPlayerForm;
