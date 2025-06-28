import { Grid, Box } from "@mui/material";
import TicketCard from "./TicketCard";

function TicketList({ tickets }) {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {tickets.map((ticket) => (
          <Grid item xs={12} sm={6} md={4} key={ticket.ticket_id}>
            <TicketCard ticket={ticket} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TicketList;
