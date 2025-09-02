# Use official Python image
FROM python:3.11-slim

# Prevent Python from buffering stdout/stderr
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code into the container
COPY . .

# Expose port 8080 (as defined in fly.toml)
EXPOSE 8080

# Start the app with Uvicorn
# 👉 Make sure your entry file is app.py and has "app = FastAPI()" or Flask's "app"
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

