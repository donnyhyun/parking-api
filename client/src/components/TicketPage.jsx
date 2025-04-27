import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import styled from 'styled-components';
import KeyPad from './KeyPad'

const TicketTextField = styled(TextField)`
  margin-top: 6px;
`;

function TicketPage() {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleName, setVehicleName] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setLicensePlate('');
    } else if (value === '←') {
      setLicensePlate(prevInput => prevInput.slice(0, -1));
    } else {
      setLicensePlate(prevInput => prevInput + value);
    }
  };

  const handleEnterClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/park?lot_id=1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: vehicleName,
          plate: licensePlate,
          size: 'medium',
        }),
      });

      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error sending license plate:', error);
    }
  };

  return (
    <div>
      <h1>Parking Service </h1>
      <div>
        <label>Enter your vehicle model: </label>
      </div>
      <TicketTextField
        id="vehicle-name"
        label="Vehicle Name"
        value={vehicleName}
        onChange={(e) => setVehicleName(e.target.value)}
        variant="outlined"
      />
      <div>
        <label>Enter your license plate: </label>
      </div>
      <TicketTextField
        id="outlined-basic"
        label="License #"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
        variant="outlined"
      />
      <KeyPad onButtonClick={handleButtonClick} />
      <Button variant="contained" onClick={handleEnterClick}>Enter</Button>
    </div>
  )
}

export default TicketPage;
