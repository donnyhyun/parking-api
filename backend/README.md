# Backend Service

## Quickstart

> Following commands should be run at the backend root (`/backend`)

#### Run the app in virtual environment:
```shell
$ python3 -m venv venv
$ source venv/bin/activate
```

#### Install necessary packages

```shell
$ pip install flask flask-sqlalchemy
```

#### Start Flask backend

```shell
$ python3 app.py
```

The server will be up at http://127.0.0.1:5000

## Requirements
- Must have **Python3.1** or higher
- SQLite
- **Flask** and **Flask-SQLAlchemy**
  

## External references

- [Flask-SQLAlchemy Documentation](https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/)
- [Postman](https://www.postman.com/)


## API
user:
- POST `/park` : Park a vehicle and create parking ticket.
- POST `/exit` : Exit a vehicle and opens up space.

admin:
- GET `/tickets` : Get all parking tickets from all parking lots. 
- GET `/parking-lots` : List of parking lots.

todo:
- GET `/all` : List of all parking spaces sorted by lot.
- GET `/lot/<lot_id>` : List of parking slots by the lot number.
- GET `/empty/<lot_id>` : List of empty spaces in the lot.
- GET `/tickets?lot_id=<id>` : Get tickets from the specific lot.
- GET `/ticket/<plate>`: Get the ticket of a specific vehicle
