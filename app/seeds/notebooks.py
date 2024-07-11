from app.models import db, Notebook, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notebooks():
    notebook1 = Notebook(
        title='title1', user_id=1)
    notebook2 = Notebook(
        title='title2', user_id=1)
    notebook3 = Notebook(
        title='title3', user_id=2)
    notebook4 = Notebook(
        title='title4', user_id=2)
    notebook5 = Notebook(
        title='title5', user_id=3)
    notebook6 = Notebook(
        title='title6', user_id=3)
    notebook7 = Notebook(
        title='title7', user_id=4)
    notebook8 = Notebook(
        title='title8', user_id=4)
    notebook9 = Notebook(
        title='title9', user_id=5)
    notebook10 = Notebook(
        title='title10', user_id=5)

    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.add(notebook4)
    db.session.add(notebook5)
    db.session.add(notebook6)
    db.session.add(notebook7)
    db.session.add(notebook8)
    db.session.add(notebook9)
    db.session.add(notebook10)
    db.session.commit()

def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))

    db.session.commit()
