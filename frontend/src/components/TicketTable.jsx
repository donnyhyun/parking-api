import { useEffect, useState } from "react";

import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@mui/material";

function TicketTable() {
  const [tickets, setTickets] = useState([]);
  const [lotId] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5001/tickets", {
          params: lotId ? { lot_id: lotId } : {},
        });
        setTickets(response.data.tickets || response.data); // handle both cases
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTickets();
  }, [lotId]);

  return (
    <TableContainer component={Paper}>
      <Table>
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
          {tickets.map((ticket) => (
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
  );
}

export default TicketTable;
