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
} from "@mui/material";
import { getAllUsers, deactivateUser } from "../../api/admin";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    if (filter === "active") return user.is_active;
    if (filter === "inactive") return !user.is_active;
  });

  const handleOpenModal = (user) => {
    if (user.id === 1) {
      alert("Cannot deactivate the admin user.");
      return;
    }
    if (!user.is_active) {
      alert("User is already deactivated.");
      return;
    }
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDeactive = async (userId) => {
    try {
      const res = await deactivateUser(userId);
      console.log("User deactivated successfully:", res.data);
      setOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to deactivate user:", error);
      alert("Failed to deactivate user. Please try again.");
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
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Registered At</TableCell>
              <TableCell>Deactivated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
                onClick={() => handleOpenModal(user)}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.registered_at}</TableCell>
                <TableCell>{user.deactivated_at || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Deactivate User</DialogTitle>
        <DialogContent>
          Are you sure you want to deactivate user: {selectedUser?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDeactive(selectedUser.id)} color="error">
            Deactivate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UsersTable;
