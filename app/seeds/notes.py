from app.models import db, Note, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_notes():
    note1 = Note(
        title='note1', content='content1', user_id=1, notebook_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note2 = Note(
        title='note2', content='content2', user_id=1, notebook_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note3 = Note(
        title='note3', content='content3', user_id=2, notebook_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note4 = Note(
        title='note4', content='content4', user_id=2, notebook_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note5 = Note(
        title='note5', content='content5', user_id=3, notebook_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note6 = Note(
        title='note6', content='content6', user_id=3, notebook_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note7 = Note(
        title='note7', content='content7', user_id=4, notebook_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note8 = Note(
        title='note8', content='content8', user_id=4, notebook_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note9 = Note(
        title='note9', content='content9', user_id=5, notebook_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note10 = Note(
        title='note10', content='content10', user_id=5, notebook_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note11 = Note(
        title='note11', content='content11', user_id=1, notebook_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note12 = Note(
        title='note12', content='content12', user_id=1, notebook_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note13 = Note(
        title='note13', content='content13', user_id=2, notebook_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note14 = Note(
        title='note14', content='content14', user_id=2, notebook_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note15 = Note(
        title='note15', content='content15', user_id=3, notebook_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note16 = Note(
        title='note16', content='content16', user_id=3, notebook_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note17 = Note(
        title='note17', content='content17', user_id=4, notebook_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note18 = Note(
        title='note18', content='content18', user_id=4, notebook_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note19 = Note(
        title='note19', content='content19', user_id=5, notebook_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note20 = Note(
        title='note20', content='content20', user_id=5, notebook_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)
    db.session.add(note6)
    db.session.add(note7)
    db.session.add(note8)
    db.session.add(note9)
    db.session.add(note10)
    db.session.add(note11)
    db.session.add(note12)
    db.session.add(note13)
    db.session.add(note14)
    db.session.add(note15)
    db.session.add(note16)
    db.session.add(note17)
    db.session.add(note18)
    db.session.add(note19)
    db.session.add(note20)
    db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))
    db.session.commit()
