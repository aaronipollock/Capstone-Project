from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
    note1 = Note(
        title='title1', content='content1', user_id=1, notebook_id=1)
    note2 = Note(
        title='title2', content='content2', user_id=1, notebook_id=2)
    note3 = Note(
        title='title3', content='content3', user_id=2, notebook_id=3)
    note4 = Note(
        title='title4', content='content4', user_id=2, notebook_id=4)
    note5 = Note(
        title='title5', content='content5', user_id=3, notebook_id=5)
    note6 = Note(
        title='title6', content='content6', user_id=3, notebook_id=6)
    note7 = Note(
        title='title7', content='content7', user_id=4, notebook_id=7)
    note8 = Note(
        title='title8', content='content8', user_id=4, notebook_id=8)
    note9 = Note(
        title='title9', content='content9', user_id=5, notebook_id=9)
    note10 = Note(
        title='title10', content='content10', user_id=5, notebook_id=10)
    note11 = Note(
        title='title11', content='content11', user_id=1, notebook_id=1)
    note12 = Note(
        title='title12', content='content12', user_id=1, notebook_id=2)
    note13 = Note(
        title='title13', content='content13', user_id=2, notebook_id=3)
    note14 = Note(
        title='title14', content='content14', user_id=2, notebook_id=4)
    note15 = Note(
        title='title15', content='content15', user_id=3, notebook_id=5)
    note16 = Note(
        title='title16', content='content16', user_id=3, notebook_id=6)
    note17 = Note(
        title='title17', content='content17', user_id=4, notebook_id=7)
    note18 = Note(
        title='title18', content='content18', user_id=4, notebook_id=8)
    note19 = Note(
        title='title19', content='content19', user_id=5, notebook_id=9)
    note20 = Note(
        title='title20', content='content20', user_id=5, notebook_id=10)

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
