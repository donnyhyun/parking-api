import './App.css';
import TicketPage from './components/TicketPage';
import LoginPage from './components/LoginPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/ticket" element={<TicketPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
