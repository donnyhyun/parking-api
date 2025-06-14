import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.models.models import db
from app.routes.main import main_app
from app.routes.parkingLot import park_app
from app.routes.ticket import ticket_app
from app.routes.parkingStack import lot_app
from app.routes.user import user_app
from app.populate import populate_db


basedir = os.path.abspath(os.path.dirname(__file__))


# Create the Flask application
def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
        basedir, "../db/parkinglot.db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "secret-key"
    app.json.sort_keys = False

    # Initialize extensions
    db.init_app(app)
    jwt = JWTManager(app)
    CORS(app)

    # Register blueprints
    app.register_blueprint(park_app)
    app.register_blueprint(ticket_app)
    app.register_blueprint(lot_app)
    app.register_blueprint(user_app)
    app.register_blueprint(main_app)

    # Create the database tables and populate with initial data
    with app.app_context():
        db.drop_all()
        db.create_all()
        populate_db()

    return app
