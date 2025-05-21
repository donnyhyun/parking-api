import "./App.css";
import UserTabNav from "./components/UserTabNav";
import AdminTabNav from "./components/admin/AdminTabNav";
import LoginPage from "./components/LoginPage";
import TicketPage from "./components/TicketPage";
import ExitPage from "./components/ExitPage";
import AdminTicketPage from "./components/admin/AdminTicketPage";
import AdminLotsPage from "./components/admin/AdminLotsPage";
import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();
  const userTabPaths = ["/ticket", "/exit"];
  const showUserTabNav = userTabPaths.includes(location.pathname);
  const adminTabPaths = ["/admin/tickets", "/admin/lots"];
  const showAdminTabNav = adminTabPaths.includes(location.pathname);

  return (
    <>
      {showUserTabNav && <UserTabNav />}
      {showAdminTabNav && <AdminTabNav />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/exit" element={<ExitPage />} />
        <Route path="/admin/tickets" element={<AdminTicketPage />} />
        <Route path="/admin/lots" element={<AdminLotsPage />} />
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
