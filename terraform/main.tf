provider "aws" {
  region = "eu-west-2"
}

# VPC
resource "aws_vpc" "weather_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "weather-vpc"
  }
}

resource "aws_subnet" "public_subnet_a" {
  vpc_id                  = aws_vpc.weather_vpc.id
  cidr_block              = "10.0.11.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "eu-west-2a"
  tags = {
    Name = "weather-public-subnet-a"
  }
}

resource "aws_subnet" "public_subnet_b" {
  vpc_id                  = aws_vpc.weather_vpc.id
  cidr_block              = "10.0.12.0/24" 
  map_public_ip_on_launch = true
  availability_zone       = "eu-west-2b"
  tags = {
    Name = "weather-public-subnet-b"
  }
}


# Internet Gateway
resource "aws_internet_gateway" "weather_igw" {
  vpc_id = aws_vpc.weather_vpc.id
  tags = {
    Name = "weather-igw"
  }
}

# Route Table
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.weather_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.weather_igw.id
  }
  tags = {
    Name = "weather-public-route-table"
  }
}

# Associate Route Table with Subnet A
resource "aws_route_table_association" "public_association_a" {
  subnet_id      = aws_subnet.public_subnet_a.id
  route_table_id = aws_route_table.public_route_table.id
}

# Associate Route Table with Subnet B
resource "aws_route_table_association" "public_association_b" {
  subnet_id      = aws_subnet.public_subnet_b.id
  route_table_id = aws_route_table.public_route_table.id
}

# Security Group
resource "aws_security_group" "weather_sg" {
  vpc_id = aws_vpc.weather_vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow HTTPS
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow HTTP
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "WeatherDashboardSG"
  }
}

# ECR Repository
resource "aws_ecr_repository" "weather_repo" {
  name = "weather-backend-repo"

  tags = {
    Name = "WeatherBackendECR"
  }
}


resource "tls_private_key" "key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}


resource "aws_key_pair" "weather_key" {
  key_name   = "weather-key"
  public_key = tls_private_key.key.public_key_openssh
}


resource "local_file" "key_file" {
  filename = "${path.module}/weather-key.pem"
  content  = tls_private_key.key.private_key_pem
  file_permission = "0600" 
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "18.28.0"

  cluster_name    = "weather-cluster"
  cluster_version = "1.27"
  vpc_id          = aws_vpc.weather_vpc.id
  subnet_ids      = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]

  self_managed_node_group_defaults = {
    instance_type = "t2.micro"
  }

  self_managed_node_groups = {
    weather-workers = {
      min_size     = 1
      max_size     = 2
      desired_size = 1
      instance_type = "t2.micro" 
      key_name     = "weather-key" 
    }
  }
}



# Outputs
output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "eks_cluster_id" {
  value = module.eks.cluster_id
}

output "eks_cluster_security_group_id" {
  value = module.eks.cluster_security_group_id
}
