import "./App.css";
import TabNav from "./components/TabNav";
import LoginPage from "./components/LoginPage";
import TicketPage from "./components/TicketPage";
import ExitPage from "./components/ExitPage";
import AdminPage from "./components/AdminPage";
import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();
  const tabPaths = ["/ticket", "/exit"];
  const showTabNav = tabPaths.includes(location.pathname);

  return (
    <>
      {showTabNav && <TabNav />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/exit" element={<ExitPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
