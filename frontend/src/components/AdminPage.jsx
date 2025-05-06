import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TicketTable from "./TicketTable";

function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        mt: 2,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          position: "relative",
        }}
      >
        <Typography variant="h4">Admin</Typography>
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{ position: "absolute", right: 0, mr: 1 }}
        >
          Logout
        </Button>
      </Box>
      <TicketTable />
    </Box>
  );
}

export default AdminPage;
