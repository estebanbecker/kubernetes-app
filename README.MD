# Todo List Microservices Project

This project contains two simple microservices—a backend and a frontend—designed to be deployed on Kubernetes. The application is a basic Todo List, demonstrating containerization, orchestration, and microservice architecture.

## Project Structure

- **todo-list-backend/**: Python Flask API for managing todo items. Connects to a MySQL database.
  - `app.py`: Main backend application.
  - `Dockerfile`: Containerizes the backend service.
  - `requirements.txt`: Python dependencies.
  - `wait-for-mysql.sh`: Script to wait for MySQL before starting the backend.

- **todo-list-frontend/**: React-based frontend for interacting with the backend API.
  - `src/`: React source code.
  - `public/`: Static assets.
  - `Dockerfile`: Containerizes the frontend service with Nginx.
  - `nginx.conf`: Nginx configuration for serving the React app.

- **docker-compose.yml**: For local development and testing with Docker Compose.

## Features

- Add, view, and delete todo items
- RESTful API backend (Flask)
- Modern React frontend
- Containerized with Docker
- Ready for Kubernetes deployment

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Kubernetes cluster (e.g., Minikube, kind, or cloud provider)

### Local Development
1. Clone the repository.
2. Run `docker-compose up` to start both services locally.
3. Access the frontend at `http://localhost:3000` (or as configured).

### Kubernetes Deployment
1. Build and push Docker images for both services.
2. Create Kubernetes manifests for deployment, service, and ingress (not included here).
3. Apply manifests to your cluster.

## License

MIT License