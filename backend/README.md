## Instructions on deploying locally

- After cloning the entire branch, run the app in virtual environment by `python3 -m venv venv` at root directory. Activate it by running command `source venv/bin/activate`. 
- Install necessary packages as mentioned below.
- run `python3 app.py` at root directory to run the API. 
- The app should start running on localhost with default port 5000 (in my case it was http://127.0.0.1:5000). 

## Assets needed during deployment

- Must have **Python3.1** or higher. It should also have sqlite built-in.
- Need to install **Flask** and **Flask-SQLAlchemy** using pip in order to run the app.
  ```
  pip install flask flask-sqlalchemy
  ```

## External references used

I referred to the Flask-SQLAlchemy Documentation (https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/) for various functions and their usages.
I also used Postman (https://www.postman.com/) to make mock API calls to test my endpoints.


## API
- GET `/parking-lots` : List of parking lots.
- GET `/all` : List of all parking spaces sorted by lot.
- GET `/lot/<lot_id>` : List of parking slots by the lot number.
- GET `/empty/<lot_id>` : List of empty spaces in the lot.
- POST `/park` : Park a vehicle and create parking ticket.
- POST `/exit` : Exit a vehicle and opens up space.
- GET `/ticket` : Get all parking tickets from all parking lots.
- GET `/ticket?lot_id=<id>` : Get tickets from the specific lot.
- GET `/ticket/<plate>`: Get the ticket of a specific vehicle

## Some points of improvement

- Add more functionalities to parking lot such as managing profits
- Using Docker for large deployment
- Using a different database such as PostgreSQL or MongoDB for flexibility and scalability
- Creating and using view templates for a more user-friendly interface
