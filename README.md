# Weather Dashboard

The Weather Dashboard is a web application that provides weather forecasts for cities around the world. The app is deployed on AWS EKS using Docker containers and integrates with the OpenWeather API for real-time weather data.

## Live Demo

You can access the live version of the app at:  
[Weather Dashboard](http://a0dda5467be4d4ff8857afbbf2376b50-1116004828.eu-west-2.elb.amazonaws.com/)

## Features

- **City-based Weather Search**: Search for weather forecasts by city name.
- **Real-time Updates**: Retrieves live weather data from the OpenWeather API.
- **Modern Deployment**: Deployed on AWS EKS with Docker and Kubernetes.
- **Scalable Infrastructure**: Supports high availability with multiple replicas and AWS Load Balancer.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Flask)
- **Containerization**: Docker
- **Orchestration**: Kubernetes (AWS EKS)
- **CI/CD**: GitHub Actions
- **Infrastructure as Code**: Terraform
- **API Integration**: OpenWeather API

## Setup Instructions

### Prerequisites

- Docker installed locally
- AWS CLI configured with credentials
- Terraform installed
- Kubernetes CLI (`kubectl`) installed and configured

### 1. Clone the Repository

git clone https://github.com/YourUsername/Weather-Dashboard.git
cd Weather-Dashboard 

### 2. Backend Configuration

1. Obtain an API key from the OpenWeather API.

2. Create a .env file in the backend directory with the following content:

OPENWEATHER_API_KEY=your_api_key_here

### 3. Build and Test Locally

1. Build the Docker image:

docker build -t weather-backend .

2. Run the app locally:

docker run -p 5000:5000 weather-backend

Access the app in your browser at http://localhost:5000.

### 4. Deploy to AWS

# Infrastructure Setup with Terraform

1. Navigate to the terraform directory:

cd terraform

2. Initialize Terraform:

terraform init

3. Apply the configuration:

terraform apply

# Deploy with Kubernetes

1. Build and push the Docker image to AWS ECR:

aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 861276124001.dkr.ecr.eu-west-2.amazonaws.com
docker build -t 861276124001.dkr.ecr.eu-west-2.amazonaws.com/weather-backend-repo:latest .
docker push 861276124001.dkr.ecr.eu-west-2.amazonaws.com/weather-backend-repo:latest

2. Apply the Kubernetes configuration:

kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml

3. Monitor the deployment:

kubectl rollout status deployment/weather-backend

### 5. CI/CD Pipeline

This project uses GitHub Actions for CI/CD. Any changes pushed to the main branch will trigger the pipeline to:

1. Build and push the Docker image to AWS ECR.

2. Deploy the updated image to the Kubernetes cluster.

### 6. Access the App

Visit the live app to view the deployed application.

## Repository Structure

Weather-Dashboard/
├── backend/                # Flask backend application
│   ├── app.py              # Main backend script
│   ├── requirements.txt    # Backend dependencies
│   └── .env                # API key (ignored in version control)
├── frontend/               # Frontend assets (HTML, CSS, JS)
├── kubernetes/             # Kubernetes deployment and service YAML files
│   ├── deployment.yaml
│   ├── service.yaml
├── terraform/              # Terraform configuration files
│   ├── main.tf             # Terraform main configuration
│   ├── variables.tf        # Terraform variables
│   └── outputs.tf          # Terraform outputs
├── Dockerfile              # Docker configuration
├── .gitignore              # Files and directories to ignore in Git
├── README.md               # Project documentation

### Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements.

### License

This project is licensed under the MIT License.