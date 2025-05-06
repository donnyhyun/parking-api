import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";

function TabNav() {
  const location = useLocation();
  const value =
    location.pathname === "/ticket"
      ? 0
      : location.pathname === "/exit"
        ? 1
        : location.pathname === "/"
          ? 2
          : false;

  if (value === false) return null;

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={value}>
        <Tab label="Park" component={Link} to="/ticket" />
        <Tab label="Exit" component={Link} to="/exit" />
        <Box sx={{ flexGrow: 1 }} />
        <Tab label="Logout" component={Link} to="/" />
      </Tabs>
    </Box>
  );
}

export default TabNav;
