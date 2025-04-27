from flask import Blueprint, request, jsonify
from models.models import db, Slot, Ticket
import random
from datetime import datetime

park_app = Blueprint("ParkApp", __name__)


@park_app.route("/park", methods=['POST'])
def park_vehicle():
    lot_id = request.args.get("lot_id")
    if not lot_id:
        return "Please specify lot number.", 400
    name = request.json["name"]
    plate = request.json["plate"]
    size = request.json["size"]

    parked = Ticket.query.filter_by(plate_num=plate).first()
    if parked:
        if parked.exit_time:
            db.session.delete(parked)
        else:
            return jsonify({"message": "Vehicle is already parked."}), 400

    open_slots = Slot.query.filter_by(lot_id=lot_id, occupied=False, size=size).all()
    if len(open_slots) == 0:
        return jsonify({"message": "No open space available."}), 404

    idx = random.randint(1, len(open_slots))
    sid = open_slots[idx-1].id
    park_space = Slot.query.get(sid)
    new_ticket = Ticket(sid=sid, lid=lot_id, name=name, plate_num=plate, slot=park_space)
    new_ticket.slot.occupied = True
    db.session.add(new_ticket)
    db.session.commit()

    return jsonify({"message": f"Success: Vehicle {name} with plate {plate} parked successfully."}), 200


@park_app.route("/exit", methods=['POST'])
def exit_vehicle():
    plate = request.json["plate"]
    ticket = Ticket.query.filter_by(plate_num=plate).first()
    if not ticket or ticket.exit_time:
        return "Vehicle does not exist.", 404
    ticket.exit_time = datetime.now()
    ticket.slot.occupied = False
    db.session.commit()
    return "Success: Vehicle exited.", 200
