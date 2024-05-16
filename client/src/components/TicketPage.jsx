import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import styled from 'styled-components';
import KeyPad from './KeyPad'

function TicketPage() {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '←') {
      setInput(prevInput => prevInput.slice(0, -1));
    } else {
      setInput(prevInput => prevInput + value);
    }
  };

  return (
    <div>
      <h1>Parking Service </h1>
      <div>
        <label>Enter your license plate: </label>
      </div>
      <TextField
        id="outlined-basic"
        label="License #"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
      />
      <KeyPad onButtonClick={handleButtonClick} />
      <Button variant="contained" >Enter</Button>
    </div>
  )
}

export default TicketPage;
