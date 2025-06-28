import { getUserTickets } from "../api/user";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TicketList from "../components/TicketList";

function UserTicketPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID is not found in local storage.");
      return;
    } else {
      console.log("User ID:", userId);
    }
    getUserTickets(userId)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user tickets:", error);
      });
  }, []);

  return (
    <Box>
      <h1>Parking Tickets</h1>
      {tickets.length === 0 ? (
        <p>No parking tickets found.</p>
      ) : (
        <TicketList tickets={tickets} />
      )}
    </Box>
  );
}

export default UserTicketPage;
