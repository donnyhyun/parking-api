import { Typography, Box } from "@mui/material";
import TicketTable from "../components/admin/TicketTable";

function AdminTicketPage() {
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
      </Box>
      <TicketTable />
    </Box>
  );
}

export default AdminTicketPage;
