import React from 'react';
import './KeyPad.css';

function Keypad({ value, setValue }) {

  const handleButtonClick = (input) => {
    if (input === 'C') {
      setValue('');
    } else if (input === '←') {
      setValue(prev => prev.slice(0, -1));
    } else {
      setValue(prev => prev + input);
    }
  };

  const buttons = [
      '1', '2', '3',
      '4', '5', '6',
      '7', '8', '9',
      'C', '0', '←'
  ];

  return (
    <div className="keypad">
      {buttons.map(button => (
        <button
          key={button}
          onClick={() => handleButtonClick(button)}
          className="keypad-button"
        >
        {button}
        </button>
      ))}
    </div>
    );
}

export default Keypad;