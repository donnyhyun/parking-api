import React from 'react';
import './KeyPad.css';

function Keypad({ onButtonClick }) {
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
          onClick={() => onButtonClick(button)}
          className="keypad-button"
        >
        {button}
        </button>
      ))}
    </div>
    );
}

export default Keypad;