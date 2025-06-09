import { useEffect, useState, Fragment } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  IconButton,
  Collapse,
  Box,
  CircularProgress,
} from "@mui/material";

function LotsTable() {
  const [lots, setLots] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
  const [slotsData, setSlotsData] = useState({});
  const [loadingMap, setLoadingMap] = useState({});

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

  const handleToggle = async (lotId) => {
    const isOpen = openRowId === lotId;
    setOpenRowId(isOpen ? null : lotId);

    if (!isOpen && !slotsData[lotId]) {
      setLoadingMap((prev) => ({ ...prev, [lotId]: true }));
      try {
        const res = await axios.get(`http://127.0.0.1:5001/lot/${lotId}`);
        setSlotsData((prev) => ({
          ...prev,
          [lotId]: res.data.spaces,
        }));
      } catch (error) {
        console.error(`Failed to fetch slots for lot ${lotId}:`, error);
      } finally {
        setLoadingMap((prev) => ({ ...prev, [lotId]: false }));
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Lot ID</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lots.map((lot) => (
              <Fragment key={lot.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleToggle(lot.id)}
                    >
                      {openRowId === lot.id ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{lot.id}</TableCell>
                  <TableCell>{lot.capacity}</TableCell>
                  <TableCell>{lot.description || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={4}
                  >
                    <Collapse
                      in={openRowId === lot.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box>
                        {loadingMap[lot.id] && openRowId === lot.id ? (
                          <CircularProgress size={24} />
                        ) : (
                          <>
                            <strong>Slots:</strong>
                            {slotsData[lot.id]?.length > 0 ? (
                              <Table size="small" sx={{ mt: 1 }}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Slot ID</TableCell>
                                    <TableCell>Occupied</TableCell>
                                    <TableCell>Size</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {slotsData[lot.id].map((slot, index) => (
                                    <TableRow key={slot.id}>
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>{slot.id}</TableCell>
                                      <TableCell>
                                        {slot.occupied ? "Yes" : "No"}
                                      </TableCell>
                                      <TableCell>{slot.size}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            ) : (
                              <p>No slots available.</p>
                            )}
                          </>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default LotsTable;
