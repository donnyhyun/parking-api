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

function LotsTable() {
  const [lots, setLots] = useState([]);

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5001/parking-lots");
        setLots(response.data);
        console.log("Parking lots:", response.data);
      } catch (error) {
        console.error("Failed to fetch parking lots:", error);
      }
    };

    fetchLots();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lot ID</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lots.map((lot) => (
              <TableRow key={lot.id}>
                <TableCell>{lot.id}</TableCell>
                <TableCell>{lot.capacity}</TableCell>
                <TableCell>{lot.description || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default LotsTable;
