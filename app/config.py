import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')  # Default to 5000 if not set
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Use SQLite as the default for development if DATABASE_URL is not set
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = False
