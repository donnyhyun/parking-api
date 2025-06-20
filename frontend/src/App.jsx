import "./App.css";
import TabNav from "./components/TabNav";
import LoginPage from "./pages/LoginPage";
import TicketPage from "./pages/TicketPage";
import RegisterPage from "./pages/RegisterPage";
import ExitPage from "./pages/ExitPage";
import AdminTicketPage from "./pages/AdminTicketPage";
import AdminLotsPage from "./pages/AdminLotsPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminVehiclesPage from "./pages/AdminVehiclesPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();

  const userTabs = [
    { label: "Park", path: "/ticket" },
    { label: "Exit", path: "/exit" },
  ];

  const adminTabs = [
    { label: "Tickets", path: "/admin/tickets" },
    { label: "Lots", path: "/admin/lots" },
    { label: "Users", path: "/admin/users" },
    { label: "Vehicles", path: "/admin/vehicles" },
  ];

  const showUserTabNav = userTabs.some((tab) => tab.path === location.pathname);
  const showAdminTabNav = adminTabs.some(
    (tab) => tab.path === location.pathname,
  );

  return (
    <>
      {showUserTabNav && <TabNav tabs={userTabs} />}
      {showAdminTabNav && <TabNav tabs={adminTabs} />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/exit" element={<ExitPage />} />
        <Route path="/admin/tickets" element={<AdminTicketPage />} />
        <Route path="/admin/lots" element={<AdminLotsPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/vehicles" element={<AdminVehiclesPage />} />
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
