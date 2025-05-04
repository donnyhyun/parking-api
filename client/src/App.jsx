import "./App.css";
import TabNav from "./components/TabNav";
import LoginPage from "./components/LoginPage";
import TicketPage from "./components/TicketPage";
import ExitPage from "./components/ExitPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TabNav />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/exit" element={<ExitPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
