from flask import Blueprint, jsonify, request
from models.models import Users, db

user_app = Blueprint("UserApp", __name__)


@user_app.route("/register", methods=["POST"])
def register_user():
    name = request.json["name"]
    email = request.json["email"]
    phone_number = request.json["phone_number"]

    is_registered = Users.query.filter_by(email=email).first()
    if is_registered:
        return jsonify({"message": "User is already registered."}), 400

    user = Users(name=name, email=email, phone_number=phone_number)
    db.session.add(user)
    db.session.commit()

    return jsonify({"userId": user.id}), 200
