import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";

function TabNav({ tabs }) {
  const location = useLocation();

  const currentIndex = tabs.findIndex((tab) => tab.path === location.pathname);
  const isLogout = location.pathname === "/";

  if (currentIndex === -1 && !isLogout) return null;

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left Tabs */}
      <Tabs value={isLogout ? false : currentIndex}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} component={Link} to={tab.path} />
        ))}
      </Tabs>

      {/* Logout Tab on Right */}
      <Tabs value={isLogout ? 0 : false}>
        <Tab label="Logout" component={Link} to="/" />
      </Tabs>
    </Box>
  );
}

export default TabNav;
