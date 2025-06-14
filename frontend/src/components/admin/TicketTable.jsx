import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getAllTickets } from "../../api/admin";

function TicketTable() {
  const [tickets, setTickets] = useState([]);
  const [lotId] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getAllTickets(lotId);
        setTickets(response.data.tickets || response.data); // handle both cases
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTickets();
  }, [lotId]);

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "all") return true;
    if (filter === "parked") return ticket.exit_time == null;
    if (filter === "exited") return ticket.exit_time != null;
    return true;
  });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          mb: 2,
          ml: 2,
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="parked">Parked</MenuItem>
            <MenuItem value="exited">Exited</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>Ticket ID</TableCell>
              <TableCell>Slot ID</TableCell>
              <TableCell>Lot ID</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Plate</TableCell>
              <TableCell>Park Time</TableCell>
              <TableCell>Exit Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.ticket_id}>
                <TableCell>{ticket.ticket_id}</TableCell>
                <TableCell>{ticket.slot_id}</TableCell>
                <TableCell>{ticket.lot_id || "N/A"}</TableCell>
                <TableCell>{ticket.model_name}</TableCell>
                <TableCell>{ticket.plate_num}</TableCell>
                <TableCell>{ticket.park_time}</TableCell>
                <TableCell>{ticket.exit_time || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TicketTable;
