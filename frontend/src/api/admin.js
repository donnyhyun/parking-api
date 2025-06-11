import client from "./client";

export const getAllLots = async () => client.get("/parking-lots");

export const getParkingLotDetails = async (lotId) =>
  client.get(`/lot/${lotId}`);

export const getAllTickets = async (lotId) =>
  client.get("/tickets", {
    params: lotId ? { lot_id: lotId } : {},
  });
