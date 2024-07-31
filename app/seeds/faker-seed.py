import sys
import os
from faker import Faker
from datetime import datetime
from werkzeug.security import generate_password_hash

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from app import create_app  # Assuming you have an app factory
from app.models import db, User, Notebook, Note


fake = Faker()

def create_fake_user():
    first_name = fake.first_name()
    last_name = fake.last_name()
    username = fake.unique.user_name()
    email = fake.unique.email()
    hashed_password = generate_password_hash('password')

    user = User(
        first_name=first_name,
        last_name=last_name,
        username=username,
        email=email,
        hashed_password=hashed_password
    )

    return user

def create_fake_notebook(user_id):
    title = fake.unique.sentence(nb_words=3).rstrip('.')

    notebook = Notebook(
        title=title,
        user_id=user_id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    return notebook

def create_fake_note(user_id):
    title = fake.unique.sentence(nb_words=3).rstrip('.')
    content = fake.paragraph(nb_sentences=5)

    note = Note(
        title=title,
        content=content,
        user_id=user_id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    return note

def seed_database(num_users=10, num_notebooks_per_user=3, num_notes_per_notebook=5):
    with db.session.begin():
        for _ in range(num_users):
            user = create_fake_user()
            db.session.add(user)
            db.session.flush() #get ID

            for _ in range(num_notebooks_per_user):
                notebook = create_fake_notebook(user.id)
                db.session.add(notebook)
                db.session.flush()

                for _ in range(num_notes_per_notebook):
                    note = create_fake_note(user.id)
                    note.user_id = user.id
                    db.session.add(note)
                    db.session.flush()

                    # assoicate note with notebook in notebook_notes table
                    notebook.notes.append(note)

        db.session.commit()

app = create_app()
with app.app_context():
    seed_database()
