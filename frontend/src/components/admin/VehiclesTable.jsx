import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@mui/material";
import { getAllVehicles } from "../../api/admin";

function VehiclesTable() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getAllVehicles();
        setVehicles(response.data || []);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle ID</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Plate Number</TableCell>
              <TableCell>Owner ID</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.plate_num}</TableCell>
                <TableCell>{vehicle.owner_id}</TableCell>
                <TableCell>{vehicle.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default VehiclesTable;
