from flask import Blueprint, request, jsonify
from app.models.models import db, Slot, Ticket, Vehicle, Users
from flask_jwt_extended import jwt_required, get_jwt_identity
import random
from datetime import datetime

park_app = Blueprint("ParkApp", __name__)


@park_app.route("/park", methods=["POST"])
@jwt_required()
def park_vehicle():
    phone = get_jwt_identity()
    user = Users.query.filter_by(phone_number=phone).first()
    if not user:
        return jsonify({"message": "User not found."}), 404

    lot_id = request.args.get("lot_id")
    if not lot_id:
        return jsonify({"message": "Please specify lot number."}), 400
    model = request.json["model"]
    plate = request.json["plate"]
    size = request.json["size"]

    vehicle = Vehicle.query.filter_by(plate_num=plate).first()
    if not vehicle:
        vehicle = Vehicle(user_id=user.id, plate_num=plate, model=model, size=size)
        db.session.add(vehicle)

    parked = Ticket.query.filter_by(vehicle_id=vehicle.id).first()
    if parked:
        if parked.exit_time:
            db.session.delete(parked)
        else:
            return jsonify({"message": "Vehicle is already parked."}), 400

    open_slots = Slot.query.filter_by(lot_id=lot_id, occupied=False, size=size).all()
    if len(open_slots) == 0:
        return jsonify({"message": "No open space available."}), 404
    idx = random.randint(1, len(open_slots))
    sid = open_slots[idx - 1].id
    park_space = Slot.query.get(sid)

    new_ticket = Ticket(
        slot_id=sid, lot_id=lot_id, vehicle_id=vehicle.id, slot=park_space
    )
    new_ticket.slot.occupied = True
    db.session.add(new_ticket)
    db.session.commit()

    return (
        jsonify(
            {"message": f"Success: Vehicle with plate {plate} parked successfully."}
        ),
        200,
    )


@park_app.route("/exit", methods=["POST"])
@jwt_required()
def exit_vehicle():
    phone = get_jwt_identity()
    user = Users.query.filter_by(phone_number=phone).first()
    if not user:
        return jsonify({"message": "User not found."}), 404

    plate = request.json["plate"]
    vehicle = Vehicle.query.filter_by(plate_num=plate).first()
    if not vehicle:
        return jsonify({"message": "Vehicle not found."}), 404
    if vehicle.user_id != user.id:
        return jsonify({"message": "Unauthorized or vehicle not found"}), 403

    ticket = Ticket.query.filter_by(vehicle_id=vehicle.id).first()
    if not ticket or ticket.exit_time:
        return (
            jsonify(
                {
                    "message": f"Vehicle with plate number {vehicle.plate_num} does not exist."
                }
            ),
            404,
        )

    ticket.exit_time = datetime.now()
    ticket.slot.occupied = False
    db.session.commit()
    return jsonify({"message": "Success: Vehicle exited."}), 200
