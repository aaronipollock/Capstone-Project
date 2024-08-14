import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT', 5000)  # Default to 5000 if not set
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Use SQLite as the default for development if DATABASE_URL is not set
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL', 'sqlite:///dev.db'
    ).replace('postgres://', 'postgresql://')

    SQLALCHEMY_ECHO = False

