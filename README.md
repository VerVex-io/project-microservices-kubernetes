# Project — Microservices with Docker and Kubernetes

A containerized microservices application deployed using **Docker, Docker Compose, and Kubernetes**. The project demonstrates containerization, service communication, persistent storage, orchestration, and application scaling.

## 1. Project Overview

This project is composed of three main services:

- **Frontend:** React application served using Nginx.
- **Backend:** Node.js application providing the backend service.
- **Redis:** In-memory data store used for application data and visitor counting.

The services communicate through Docker networking and Kubernetes Services.

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| React + Vite | Frontend |
| Node.js | Backend |
| Redis | Data storage |
| Docker | Containerization |
| Docker Compose | Local multi-container orchestration |
| Kubernetes | Container orchestration |
| Minikube | Local Kubernetes cluster |
| kubectl | Kubernetes management |

## 3. Project Structure

```text
project2-microservices/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── k8s/
│   ├── redis.yaml
│   ├── backend-deployment.yaml
│   └── frontend-deployment.yaml
│
├── docker-compose.yml
└── README.md
```

## 4. Running with Docker Compose

### Prerequisites

- Docker Desktop
- Docker Compose

### Start the application

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/project2-microservices-kubernetes.git
```

Enter the project directory:

```bash
cd project2-microservices-kubernetes
```

Build and start all services:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker compose ps
```

Open the frontend:

```text
http://localhost:8081
```

Stop the application:

```bash
docker compose down
```

The Redis data volume is retained when containers are stopped and recreated.

## 5. Kubernetes Deployment

### Prerequisites

- Docker Desktop
- Minikube
- kubectl

### Step 1 — Start Minikube

```bash
minikube start --driver=docker
```

Check cluster status:

```bash
minikube status
```

### Step 2 — Build and load application images

The project uses the following image names:

```text
project2-backend:v1
project2-frontend:v1
```

Load the images into Minikube:

```bash
minikube image load project2-backend:v1
minikube image load project2-frontend:v1
```

### Step 3 — Deploy Redis

```bash
kubectl apply -f k8s/redis.yaml
```

### Step 4 — Deploy the backend

```bash
kubectl apply -f k8s/backend-deployment.yaml
```

### Step 5 — Deploy the frontend

```bash
kubectl apply -f k8s/frontend-deployment.yaml
```

### Step 6 — Verify deployments

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

### Step 7 — Access the frontend

```bash
minikube service frontend
```

This opens or provides access to the frontend service.

## 6. Kubernetes Architecture

The Kubernetes deployment contains:

| Component | Type | Port |
|---|---|---:|
| Frontend | NodePort Service | 80 |
| Backend | ClusterIP Service | 3000 |
| Redis | ClusterIP Service | 6379 |

The frontend is exposed outside the cluster through a NodePort Service. The backend and Redis are accessible internally through Kubernetes Services.

### Persistent Storage

Redis uses a PersistentVolumeClaim (PVC) to store its data.

The Redis deployment mounts the persistent volume at:

```text
/data
```

This allows Redis data to survive Pod deletion and recreation.

## 7. Scaling the Backend

The backend Deployment can be scaled using:

```bash
kubectl scale deployment backend --replicas=3
```

Check the number of replicas:

```bash
kubectl get deployment backend
kubectl get pods -l app=backend
```

To return to one replica:

```bash
kubectl scale deployment backend --replicas=1
```

## 8. Monitoring

Enable the Kubernetes Metrics Server:

```bash
minikube addons enable metrics-server
```

Check node resource usage:

```bash
kubectl top nodes
```

Check Pod resource usage:

```bash
kubectl top pods
```

## 9. Tests and Validation

The following tests were successfully completed during the project:

- [x] Docker images built successfully.
- [x] Docker Compose started the frontend, backend, and Redis services.
- [x] Redis data persisted after Docker Compose containers were recreated.
- [x] Minikube cluster started successfully.
- [x] Kubernetes application images loaded into Minikube.
- [x] Redis Pod deployed successfully.
- [x] Redis PersistentVolumeClaim reached the Bound state.
- [x] Backend and frontend Deployments became ready.
- [x] Kubernetes Services and Endpoints were created.
- [x] Frontend application accessed through Kubernetes.
- [x] Redis returned `PONG` when tested.
- [x] Backend scaled successfully to three replicas.
- [x] Redis data remained available after deleting and recreating its Pod.
- [x] Kubernetes node and Pod metrics were available.

## 10. Useful Commands

```bash
# List Pods
kubectl get pods

# List Deployments
kubectl get deployments

# List Services
kubectl get services

# List PersistentVolumeClaims
kubectl get pvc

# View application logs
kubectl logs deployment/backend

# Delete Kubernetes resources
kubectl delete -f k8s/frontend-deployment.yaml
kubectl delete -f k8s/backend-deployment.yaml
kubectl delete -f k8s/redis.yaml

# Stop Minikube
minikube stop
```

## 11. Author

**Project:** Project — Microservices and Kubernetes

**Topics:** Docker, Docker Compose, Kubernetes, Redis, React, Node.js.

---

*This project was developed as a practical exercise in microservices architecture, containerization, and Kubernetes orchestration.*