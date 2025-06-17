from flask import Blueprint, request
from app.models.models import Ticket, Vehicle

ticket_app = Blueprint("TicketApp", __name__)


@ticket_app.route("/tickets", methods=["GET"])
def get_tickets():
    tickets = []
    lot_id = request.args.get("lot_id")
    if lot_id:
        res = Ticket.query.filter_by(lot_id=lot_id).all()
        if not res:
            return "Lot is empty.", 404
        for t in res:
            v = Vehicle.query.filter_by(id=t.vehicle_id).first()
            data = {
                "ticket_id": t.id,
                "slot_id": t.slot_id,
                "model_name": v.model if v is not None else "-",
                "plate_num": v.plate_num if v is not None else "-",
                "park_time": t.park_time,
                "exit_time": t.exit_time,
            }
            tickets.append(data)
        return {"lot_num": lot_id, "tickets": tickets}, 200
    else:
        res = Ticket.query.all()
        for t in res:
            v = Vehicle.query.filter_by(id=t.vehicle_id).first()
            data = {
                "ticket_id": t.id,
                "slot_id": t.slot_id,
                "lot_id": t.lot_id,
                "model_name": v.model,
                "plate_num": v.plate_num,
                "park_time": t.park_time,
                "exit_time": t.exit_time,
            }
            tickets.append(data)
        return tickets, 200


@ticket_app.route("/ticket/<plate>", methods=["GET"])
def get_ticket(plate):
    t = Ticket.query.filter_by(plate_num=plate).first()
    if not t:
        return "Vehicle does not exist.", 404
    data = {
        "ticket_id": t.id,
        "slot_id": t.sid,
        "lot_id": t.lid,
        "model_name": t.name,
        "plate_num": t.plate_num,
        "park_time": t.park_time,
        "exit_time": t.exit_time,
    }
    return data, 200
