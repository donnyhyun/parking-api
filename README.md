# Parking Lot Management System

A full-stack web application for managing vehicles across multiple parking locations.

### Documentation & Instructions
- 📦 [Backend Instructions](backend/README.md)
- 💻 [Frontend Instructions](frontend/README.md)

### Project Structure
```
parking-api
├── backend
│   ├── app
│   │   ├── __init__.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   └── models.py
│   │   ├── populate.py
│   │   └── routes
│   │       ├── __init__.py
│   │       ├── main.py
│   │       ├── parkingLot.py
│   │       ├── parkingStack.py
│   │       ├── ticket.py
│   │       └── user.py
│   ├── db
│   │   └── parkinglot.db
│   ├── README.md
│   ├── requirements.txt
│   └── run.py
├── frontend
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── src
│       ├── api
│       │   ├── admin.js
│       │   ├── client.js
│       │   └── user.js
│       ├── App.css
│       ├── App.jsx
│       ├── components
│       │   ├── admin
│       │   │   ├── LotsTable.jsx
│       │   │   └── TicketTable.jsx
│       │   ├── KeyPad.css
│       │   ├── KeyPad.jsx
│       │   └── TabNav.jsx
│       ├── index.css
│       ├── index.js
│       └── pages
│           ├── AdminLotsPage.jsx
│           ├── AdminTicketPage.jsx
│           ├── ExitPage.jsx
│           ├── LoginPage.jsx
│           ├── RegisterPage.jsx
│           └── TicketPage.jsx
└── README.md
```
