# Use Python 3.10 slim image
FROM python:3.6-slim

# Set the working directory
WORKDIR /app

# Copy only requirements.txt first for efficient caching
COPY /backend/requirements.txt /app/backend/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy the rest of the application files
COPY . /app

# Expose the Flask port
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "/app/backend/app.py"]
