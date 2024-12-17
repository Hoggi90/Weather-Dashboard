# Weather Dashboard

The Weather Dashboard is a web application that provides weather forecasts for cities around the world. The app is deployed on AWS EKS using Docker containers and integrates with the OpenWeather API for real-time weather data.

## Live Demo

You can access the live version of the app at:  
[Weather Dashboard](http://www.weather-dashboard.com/)

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

## Prerequisites:

- Docker installed locally
- AWS CLI configured with credentials
- Terraform installed
- Kubernetes CLI (`kubectl`) installed and configured

## 1. Clone the Repository

git clone https://github.com/YourUsername/Weather-Dashboard.git

cd Weather-Dashboard 

## 2. Backend Configuration

1. Obtain an API key from the OpenWeather API.

2.  Create a ```.env``` file in the backend directory with the following content:

- ```OPENWEATHER_API_KEY=your_api_key_here```

## 3. Build and Test Locally

- **Build the Docker image:**

```docker build -t weather-backend .```

- **Run the app locally:**

```docker run -p 5000:5000 weather-backend```

Access the app in your browser at http://localhost:5000.

## 4. 🚀 Deploy to AWS

### Infrastructure Setup with Terraform

1. Navigate to the terraform directory:

- ```cd terraform```

2. Initialize Terraform:

- ```terraform init```

3. Apply the configuration:

- ```terraform apply```

## 5. 🚀 Deploy with Kubernetes

**1. Build and push the Docker image to AWS ECR:**

Authenticate Docker to your Amazon ECR registry:

- ```aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.<your-region>.amazonaws.com```

Build your Docker image:

- ```docker build -t <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/<your-repo-name>:latest .```

Push the Docker image to your ECR repository:

- ```docker push <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/<your-repo-name>:latest```

**2. Apply the Kubernetes configuration:**

- ```kubectl apply -f kubernetes/deployment.yaml```

- ```kubectl apply -f kubernetes/service.yaml```

**3. Monitor the deployment:**

- ```kubectl rollout status deployment/weather-backend```

## 6. CI/CD Pipeline

**This project uses GitHub Actions for CI/CD. Any changes pushed to the main branch will trigger the pipeline to:**

1. Build and push the Docker image to AWS ECR.

2. Deploy the updated image to the Kubernetes cluster.

3. Delete the old image from AWS ECR repo to save space.

## 7. 🚀 Deploy with Custom Domain

**Domain & Certificate:**

1. Buy a domain in Route 53.

2. Request an SSL certificate in ACM (same region as EKS).

3. Security Group & Load Balancer:

    - Allow HTTP (80) and HTTPS (443) in EKS security groups.

    - Add listeners to the Load Balancer for HTTP and HTTPS (use ACM certificate for HTTPS).

**Route 53 Setup:**

- Create an Alias Record pointing your domain to the Load Balancer DNS Name.

**Test Deployment:**

Visit the [live app](http://www.weather-dashboard.com/) to view the deployed application.

## Repository Structure

```
Weather-Dashboard/
├── backend/                # Flask backend application
│   ├── app.py              # Main backend script
│   ├── requirements.txt    # Backend dependencies
│   └── .env                # API key (ignored in version control)
├── frontend/               # Frontend assets (HTML, CSS, JS)
│   ├── assets/
│   │   ├── images/
│   │   ├── style.html
│   │   └── script.css
│   ├── service.yaml
├── kubernetes/             # Kubernetes deployment and service YAML files
│   ├── deployment.yaml
│   ├── service.yaml
├── terraform/              # Terraform configuration files
│   ├── main.tf             # Terraform main configuration
├── Dockerfile              # Docker configuration
├── .gitignore              # Files and directories to ignore in Git
├── README.md               # Project documentation

```

### Contributing

No contributions accepted at the moment.

### License

This project is licensed under the MIT License.
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://shields.io)