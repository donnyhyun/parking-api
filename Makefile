format-backend:
	cd backend && source venv/bin/activate && black .

format-frontend:
	cd frontend && npm run format

format: format-backend format-frontend

run:
	docker compose up

run-build:
	docker compose up --build