from app.models import db, Tag, Note, environment, SCHEMA, note_tags
from datetime import datetime
from sqlalchemy.sql import text

def seed_tags():
    tag1 = Tag(
        tag_name='Act I', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag2 = Tag(
        tag_name='Act II', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag3 = Tag(
        tag_name='Act III', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag4 = Tag(
        tag_name='Act IV', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag5 = Tag(
        tag_name='Act V', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag6 = Tag(
        tag_name='Scene 1', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag7 = Tag(
        tag_name='Scene 2', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag8 = Tag(
        tag_name='Scene 3', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag9 = Tag(
        tag_name='Scene 4', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag10 = Tag(
        tag_name='Scene 5', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag11 = Tag(
        tag_name='Scene 6', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag12 = Tag(
        tag_name='Scene 7', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    tag13 = Tag(
        tag_name='Prologue', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())

    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)
    db.session.add(tag6)
    db.session.add(tag7)
    db.session.add(tag8)
    db.session.add(tag9)
    db.session.add(tag10)
    db.session.add(tag11)
    db.session.add(tag12)
    db.session.add(tag13)
    print("Tags added to session")

    db.session.commit()
    print("Tags committed to the database")

    note6 = Note.query.get(6)
    note7 = Note.query.get(7)
    note8 = Note.query.get(8)
    note9 = Note.query.get(9)
    note10 = Note.query.get(10)
    note51 = Note.query.get(51)
    note52 = Note.query.get(52)
    note53 = Note.query.get(53)
    note54 = Note.query.get(54)
    note55 = Note.query.get(55)
    note101 = Note.query.get(101)
    note102 = Note.query.get(102)
    note103 = Note.query.get(103)
    note104 = Note.query.get(104)
    note105 = Note.query.get(105)
    note151 = Note.query.get(151)
    note152 = Note.query.get(152)
    note153 = Note.query.get(153)
    note154 = Note.query.get(154)
    note155 = Note.query.get(155)


    # Check if the notes exist
    print(f"Note 6: {note6}")
    print(f"Note 7: {note7}")
    print(f"Note 8: {note8}")

    # If they don't exist, abort seeding and print an error message
    if not note6 or not note7 or not note8:
        print("Error: One or more notes do not exist.")
        return

    note6.tags.append(tag4)
    note6.tags.append(tag7)
    note7.tags.append(tag3)
    note7.tags.append(tag6)
    note8.tags.append(tag4)
    note8.tags.append(tag12)
    note9.tags.append(tag4)
    note9.tags.append(tag1)
    note10.tags.append(tag4)
    note10.tags.append(tag3)
    note51.tags.append(tag13)
    note52.tags.append(tag2)
    note52.tags.append(tag7)
    note53.tags.append(tag3)
    note53.tags.append(tag6)
    note54.tags.append(tag5)
    note54.tags.append(tag8)
    note55.tags.append(tag5)
    note55.tags.append(tag8)
    note101.tags.append(tag1)
    note101.tags.append(tag9)
    note102.tags.append(tag1)
    note102.tags.append(tag8)
    note103.tags.append(tag2)
    note103.tags.append(tag7)
    note104.tags.append(tag3)
    note104.tags.append(tag6)
    note105.tags.append(tag5)
    note105.tags.append(tag6)
    note151.tags.append(tag1)
    note151.tags.append(tag10)
    note152.tags.append(tag1)
    note152.tags.append(tag10)
    note153.tags.append(tag2)
    note153.tags.append(tag7)
    note154.tags.append(tag5)
    note154.tags.append(tag7)
    note155.tags.append(tag5)
    note155.tags.append(tag7)

    db.session.commit()

def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.note_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))
        db.session.execute(text("DELETE FROM note_tags"))
    db.session.commit()
