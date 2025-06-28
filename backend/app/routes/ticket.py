from flask import Blueprint, request, jsonify
from app.models.models import Ticket, Vehicle, Users
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import desc

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
                "lot_id": t.lot_id if t.lot_id else "-",
                "model_name": v.model,
                "plate_num": v.plate_num,
                "park_time": t.park_time,
                "exit_time": t.exit_time,
            }
            tickets.append(data)
        return jsonify(tickets), 200


@ticket_app.route("/ticket/<plate>", methods=["GET"])
def get_ticket(plate):
    tickets = Ticket.query.filter_by(plate_num=plate).all()
    if not tickets:
        return "Vehicle does not exist.", 404
    res = []
    for t in tickets:
        data = {
            "ticket_id": t.id,
            "slot_id": t.slot_id,
            "lot_id": t.lot_id,
            "model_name": t.name,
            "plate_num": t.plate_num,
            "park_time": t.park_time,
            "exit_time": t.exit_time,
        }
        res.append(data)
    return res, 200


@ticket_app.route("/user/tickets", methods=["GET"])
@jwt_required()
def get_tickets_by_user():
    phone_number = get_jwt_identity()
    user = Users.query.filter_by(phone_number=phone_number).first()
    if not user:
        return jsonify(message="User id is missing or not found."), 404
    tickets = (
        Ticket.query.filter_by(user_id=user.id).order_by(desc(Ticket.park_time)).all()
    )
    if not tickets:
        return jsonify(message="No tickets found for this user."), 404
    res = []
    for t in tickets:
        v = Vehicle.query.filter_by(id=t.vehicle_id).first()
        data = {
            "ticket_id": t.id,
            "slot_id": t.slot_id,
            "lot_id": t.lot_id,
            "model_name": v.model if v else "-",
            "plate_num": v.plate_num if v else "-",
            "park_time": t.park_time,
            "exit_time": t.exit_time,
        }
        res.append(data)
    return jsonify(res), 200
