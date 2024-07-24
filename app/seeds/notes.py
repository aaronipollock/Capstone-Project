from app.models import db, Note, Notebook, environment, SCHEMA, notebook_notes
from datetime import datetime
from sqlalchemy.sql import text

def seed_notes():
    note1 = Note(
        title='note1', content='content1', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note2 = Note(
        title='note2', content='content2', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note3 = Note(
        title='note3', content='content3', user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note4 = Note(
        title='note4', content='content4', user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note5 = Note(
        title='note5', content='content5', user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note6 = Note(
        title='note6', content='content6', user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note7 = Note(
        title='note7', content='content7', user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note8 = Note(
        title='note8', content='content8', user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note9 = Note(
        title='note9', content='content9', user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note10 = Note(
        title='note10', content='content10', user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note11 = Note(
        title='note11', content='content11', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note12 = Note(
        title='note12', content='content12', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note13 = Note(
        title='note13', content='content13', user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note14 = Note(
        title='note14', content='content14', user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note15 = Note(
        title='note15', content='content15', user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note16 = Note(
        title='note16', content='content16', user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note17 = Note(
        title='note17', content='content17', user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note18 = Note(
        title='note18', content='content18', user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note19 = Note(
        title='note19', content='content19', user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    note20 = Note(
        title='note20', content='content20', user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())

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

    notebook1 = Notebook.query.get(1)
    notebook2 = Notebook.query.get(2)
    notebook3 = Notebook.query.get(3)
    notebook4 = Notebook.query.get(4)
    notebook5 = Notebook.query.get(5)
    notebook6 = Notebook.query.get(6)
    notebook7 = Notebook.query.get(7)
    notebook8 = Notebook.query.get(8)
    notebook9 = Notebook.query.get(9)
    notebook10 = Notebook.query.get(10)

    note1.notebooks.append(Notebook.query.get(1))
    note2.notebooks.append(Notebook.query.get(2))
    note3.notebooks.append(Notebook.query.get(3))
    note4.notebooks.append(Notebook.query.get(4))
    note5.notebooks.append(Notebook.query.get(5))
    note6.notebooks.append(Notebook.query.get(6))
    note7.notebooks.append(Notebook.query.get(7))
    note8.notebooks.append(Notebook.query.get(8))
    note9.notebooks.append(Notebook.query.get(9))
    note10.notebooks.append(Notebook.query.get(10))
    note11.notebooks.append(Notebook.query.get(1))
    note12.notebooks.append(Notebook.query.get(2))
    note13.notebooks.append(Notebook.query.get(3))
    note14.notebooks.append(Notebook.query.get(4))
    note15.notebooks.append(Notebook.query.get(5))
    note16.notebooks.append(Notebook.query.get(6))
    note17.notebooks.append(Notebook.query.get(7))
    note18.notebooks.append(Notebook.query.get(8))
    note19.notebooks.append(Notebook.query.get(9))
    note20.notebooks.append(Notebook.query.get(10))

    db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebook_notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))
        db.session.execute(text("DELETE FROM notebook_notes"))
    db.session.commit()
