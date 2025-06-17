from flask import Blueprint, jsonify, request
from app.models.models import Users, Vehicle, Ticket, db
from flask_jwt_extended import create_access_token
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError

user_app = Blueprint("UserApp", __name__)


@user_app.route("/register", methods=["POST"])
def register_user():
    name = request.json["name"]
    email = request.json["email"]
    phone_number = request.json["phone_number"]

    is_registered = Users.query.filter(
        Users.phone_number == phone_number,
        Users.email == email,
        Users.deactivated_at == None,
    ).first()
    if is_registered:
        return jsonify({"message": "User is already registered."}), 409

    user = Users(name=name, email=email, phone_number=phone_number)
    db.session.add(user)
    db.session.commit()

    return jsonify({"userId": user.id}), 200


@user_app.route("/login", methods=["POST"])
def login_user():
    phone_number = request.json["phone_number"]

    user = Users.query.filter(
        Users.phone_number == phone_number, Users.deactivated_at == None
    ).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    token = create_access_token(identity=phone_number)
    return jsonify({"access_token": token}), 200


@user_app.route("/users", methods=["GET"])
def get_users():
    users = Users.query.all()
    res = []
    for user in users:
        data = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone_number": user.phone_number,
            "is_active": user.deactivated_at is None,
            "registered_at": user.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "deactivated_at": (
                user.deactivated_at.strftime("%Y-%m-%d %H:%M:%S")
                if user.deactivated_at
                else None
            ),
        }
        res.append(data)
    return jsonify(res), 200


@user_app.route("/users/deactivate/<int:user_id>", methods=["POST"])
def deactivate_user(user_id):
    user = Users.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    try:
        if user.deactivated_at is not None:
            return jsonify({"message": "User is already deactivated"}), 400
        user.deactivated_at = datetime.now()

        vehicles = Vehicle.query.filter_by(user_id=user.id).all()
        for vehicle in vehicles:
            ticket = Ticket.query.filter_by(vehicle_id=vehicle.id).first()
            db.session.delete(ticket) if ticket else None
            db.session.delete(vehicle)

        db.session.commit()
        return jsonify({"message": "User deactivated successfully"}), 200

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"message": "Error deactivating user", "error": str(e)}), 500
