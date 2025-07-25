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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { getAllTickets, forceExitVehicle } from "../../api/admin";
import { getLotLabel } from "../../utils/labelMappings";

function TicketTable() {
  const [tickets, setTickets] = useState([]);
  const [lotId] = useState("");
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getAllTickets(lotId);
        setTickets(response.data.tickets || response.data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTickets();
  }, [lotId]);

  const filteredTickets = tickets
    .filter((ticket) => {
      if (filter === "all") return true;
      if (filter === "parked") return ticket.exit_time == null;
      if (filter === "exited") return ticket.exit_time != null;
      return true;
    })
    .filter((ticket) =>
      ticket.plate_num.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTicket(null);
  };

  const handleForceExit = async (licensePlate) => {
    try {
      const res = await forceExitVehicle(licensePlate);
      console.log("Force exit response:", res.data);
      setOpen(false);
      setSelectedTicket(null);
    } catch (error) {
      console.error("Failed to force exit vehicle:", error);
      alert("Failed to force exit vehicle. Please try again.");
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          mb: 2,
          ml: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
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
        <TextField
          label="Search by Plate"
          variant="outlined"
          size="small"
          sx={{ minWidth: 200, mr: 2 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>Ticket ID</TableCell>
              <TableCell>Lot ID</TableCell>
              <TableCell>Slot #</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Plate</TableCell>
              <TableCell>Park Time</TableCell>
              <TableCell>Exit Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow
                key={ticket.ticket_id}
                hover
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
                onClick={() => handleOpenModal(ticket)}
              >
                <TableCell>{ticket.ticket_id}</TableCell>
                <TableCell>{getLotLabel(ticket.lot_id)}</TableCell>
                <TableCell>{ticket.slot_id}</TableCell>
                <TableCell>{ticket.model_name}</TableCell>
                <TableCell>{ticket.plate_num}</TableCell>
                <TableCell>{ticket.park_time}</TableCell>
                <TableCell>{ticket.exit_time || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Force Exit</DialogTitle>
        <DialogContent>
          Are you sure you want to force exit vehicle with plate{" "}
          {selectedTicket?.plate_num}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleForceExit(selectedTicket.plate_num)}
            color="error"
          >
            Force Exit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TicketTable;
