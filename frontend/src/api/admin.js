import client from "./client";

export const getAllLots = async () => client.get("/parking-lots");

export const getParkingLotDetails = async (lotId) =>
  client.get(`/lot/${lotId}`);

export const getAllTickets = async (lotId) =>
  client.get("/tickets", {
    params: lotId ? { lot_id: lotId } : {},
  });

export const getAllUsers = async () => client.get("/users");

export const forceExitVehicle = async (licensePlate) =>
  client.post(`/exit/force`, { plate: licensePlate });

export const deactivateUser = async (userId) =>
  client.post(`/users/deactivate/${userId}`);

export const getAllVehicles = async () => client.get("/vehicles");
