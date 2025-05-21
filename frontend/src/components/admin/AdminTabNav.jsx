import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";

function AdminTabNav() {
  const location = useLocation();
  const value =
    location.pathname === "/admin/tickets"
      ? 0
      : location.pathname === "/admin/lots"
        ? 1
        : location.pathname === "/"
          ? 2
          : false;

  if (value === false) return null;

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={value}>
        <Tab label="Tickets" component={Link} to="/admin/tickets" />
        <Tab label="Lots" component={Link} to="/admin/lots" />
      </Tabs>
    </Box>
  );
}

export default AdminTabNav;
