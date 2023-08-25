# FROM python:3.10-bullseye
# RUN python -m pip install --upgrade pip
# WORKDIR /app

# # Copy the top-level files in your service's directory
# # Modify these instructions to do that
# COPY requirements.txt requirements.txt
# COPY main.py main.py

# # Copy all of the subdirectories in your service's directory
# # Modify these instructions to do that
# # COPY queries queries
# # COPY routers routers

# RUN python -m pip install -r requirements.txt

# # !! PORT env var needs to match with exposed port in caprover dashboard
# CMD uvicorn main:app --host 0.0.0.0 --port 80


# If you're using a relational database and want migrations
# to be run automatically, delete the previous CMD line and
# uncomment the following COPY and CMD lines
# COPY migrations migrations
# # !! PORT env var needs to match with exposed port in caprover dashboard
# CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 80

# FROM python:3.10-bullseye

# RUN python -m pip install --upgrade pip
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
# RUN chmod +x /wait

# WORKDIR /app
# COPY requirements.txt requirements.txt
# RUN python -m pip install -r requirements.txt

# WORKDIR /app
# CMD /wait && python -m migrations up && uvicorn main:app --reload --host 0.0.0.0

FROM python:3.10-bullseye

RUN python -m pip install --upgrade pip

# Install wait utility for database readiness
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

# Set working directory
WORKDIR /app

# Copy the top-level files
COPY requirements.txt requirements.txt
COPY main.py main.py

# Copy all subdirectories
COPY queries queries
COPY routers routers
COPY models models

# Install requirements
RUN python -m pip install -r requirements.txt

# Expose the desired port (if needed)
EXPOSE 80

# Start the FastAPI application after waiting for database
CMD /wait && python -m migrations up && uvicorn main:app --reload --host 0.0.0.0
