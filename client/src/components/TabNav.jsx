import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";

function TabNav() {
  const location = useLocation();
  const value =
    location.pathname === "/exit"
      ? 1
      : location.pathname === "/ticket"
        ? 0
        : false;

  // Only show tabs on /ticket and /exit
  if (value === false) return null;

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={value}>
        <Tab label="Park" component={Link} to="/ticket" />
        <Tab label="Exit" component={Link} to="/exit" />
      </Tabs>
    </Box>
  );
}

export default TabNav;
