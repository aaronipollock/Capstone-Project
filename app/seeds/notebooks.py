from datetime import datetime
from app.models import db, Notebook, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notebooks():
    # List of notebooks to seed
    notebooks_to_add = [
        {'title': 'Taming of the Shrew', 'user_id': 2},
        {'title': 'Henry VI Part II', 'user_id': 1},
        {'title': 'Henry VI Part III', 'user_id': 3},
        {'title': 'The Two Gentlement of Verona', 'user_id': 4},
        {'title': 'Titus Andronicus', 'user_id': 5},
        {'title': 'Henry VI Part I', 'user_id': 6},
        {'title': 'Richard III', 'user_id': 7},
        {'title': 'The Comedy of Errors', 'user_id': 8},
        {'title': "Love's Labour's Lost", 'user_id': 9},
        {'title': "A Midsummer Night's Dream", 'user_id': 10},
        {'title': 'Romeo and Juliet', 'user_id': 1},
        {'title': 'Richard II', 'user_id': 2},
        {'title': 'King John', 'user_id': 3},
        {'title': 'The Merchant of Venice', 'user_id': 4},
        {'title': 'Henry IV Part I', 'user_id': 5},
        {'title': 'Henry IV Part II', 'user_id': 6},
        {'title': 'Much Ado About Nothing', 'user_id': 7},
        {'title': 'Henry V', 'user_id': 8},
        {'title': 'As You Like It', 'user_id': 9},
        {'title': 'Julius Caesar', 'user_id': 10},
        {'title': 'Hamlet', 'user_id': 1},
        {'title': 'The Merry Wives of Windsor', 'user_id': 2},
        {'title': 'Twelfth Night', 'user_id': 3},
        {'title': 'Troilus and Cressida', 'user_id': 4},
        {'title': 'Othello', 'user_id': 5},
        {'title': 'Measure for Measure', 'user_id': 6},
        {'title': "All's Well That Ends Well", 'user_id': 7},
        {'title': 'Timon of Athens', 'user_id': 8},
        {'title': 'King Lear', 'user_id': 9},
        {'title': 'Macbeth', 'user_id': 10},
        {'title': 'Antony and Cleopatra', 'user_id': 1},
        {'title': 'Coriolanus', 'user_id': 2},
        {'title': 'Pericles', 'user_id': 3},
        {'title': 'Cymbeline', 'user_id': 4},
        {'title': "The Winter's Tale", 'user_id': 5},
        {'title': 'The Tempest', 'user_id': 6},
        {'title': 'Henry VIII', 'user_id': 7},
        {'title': 'The Two Noble Kinsmen', 'user_id': 8},

        # Add more notebooks with unique titles as needed
    ]

    for nb_data in notebooks_to_add:
        existing_notebook = Notebook.query.filter_by(title=nb_data['title']).first()

        if existing_notebook:
            print(f"Notebook with title '{nb_data['title']}' already exists. Skipping creation.")
        else:
            new_notebook = Notebook(
                title=nb_data['title'],
                user_id=nb_data['user_id'],
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            db.session.add(new_notebook)

    db.session.commit()


# def seed_notebooks():
#     notebook1 = Notebook(
#         title='Taming of the Shrew', user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook2 = Notebook(
#         title='Henry VI Part II', user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook3 = Notebook(
#         title='Henry VI Part III', user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook4 = Notebook(
#         title='The Two Gentlement of Verona', user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook5 = Notebook(
#         title='Titus Andronicus', user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook6 = Notebook(
#         title='Henry VI Part I', user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook7 = Notebook(
#         title='Richard III', user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook8 = Notebook(
#         title='The Comedy of Errors', user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook9 = Notebook(
#         title="Love's Labour's Lost", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook10 = Notebook(
#         title="A Midsummer Night's Dream", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook11 = Notebook(
#         title="Romeo and Juliet", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook12 = Notebook(
#         title="Richard II", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook13 = Notebook(
#         title="King John", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook14 = Notebook(
#         title="The Merchant of Venice", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook15 = Notebook(
#         title="Henry IV Part I", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook16 = Notebook(
#         title="Henry IV Part II", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook17 = Notebook(
#         title="Much Ado About Nothing", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook18 = Notebook(
#         title="Henry V", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook19 = Notebook(
#         title="As You Like It", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook20 = Notebook(
#         title="Julius Caesar", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook21 = Notebook(
#         title="Hamlet", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook22 = Notebook(
#         title="The Merry Wives of Windsor", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook23 = Notebook(
#         title="Twelfth Night", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook24 = Notebook(
#         title="Troilus and Cressida", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook25 = Notebook(
#         title="Othello", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook26 = Notebook(
#         title="Measure for Measure", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook27 = Notebook(
#         title="All's Well That Ends Well", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook28 = Notebook(
#         title="Timon of Athens", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook29 = Notebook(
#         title="King Lear", user_id=9, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook30 = Notebook(
#         title="Macbeth", user_id=10, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook31 = Notebook(
#         title="Antony and Cleopatra", user_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook32 = Notebook(
#         title="Coriolanus", user_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook33 = Notebook(
#         title="Pericles", user_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook34 = Notebook(
#         title="Cymbeline", user_id=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook35 = Notebook(
#         title="The Winter's Tale", user_id=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook36 = Notebook(
#         title="The Tempest", user_id=6, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook37 = Notebook(
#         title="Henry VIII", user_id=7, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     notebook38 = Notebook(
#         title="The Two Noble Kinsmen", user_id=8, created_at=datetime.utcnow(), updated_at=datetime.utcnow())

#     db.session.add(notebook1)
#     db.session.add(notebook2)
#     db.session.add(notebook3)
#     db.session.add(notebook4)
#     db.session.add(notebook5)
#     db.session.add(notebook6)
#     db.session.add(notebook7)
#     db.session.add(notebook8)
#     db.session.add(notebook9)
#     db.session.add(notebook10)
#     db.session.add(notebook11)
#     db.session.add(notebook12)
#     db.session.add(notebook13)
#     db.session.add(notebook14)
#     db.session.add(notebook15)
#     db.session.add(notebook16)
#     db.session.add(notebook17)
#     db.session.add(notebook18)
#     db.session.add(notebook19)
#     db.session.add(notebook20)
#     db.session.add(notebook21)
#     db.session.add(notebook22)
#     db.session.add(notebook23)
#     db.session.add(notebook24)
#     db.session.add(notebook25)
#     db.session.add(notebook26)
#     db.session.add(notebook27)
#     db.session.add(notebook28)
#     db.session.add(notebook29)
#     db.session.add(notebook30)
#     db.session.add(notebook31)
#     db.session.add(notebook32)
#     db.session.add(notebook33)
#     db.session.add(notebook34)
#     db.session.add(notebook35)
#     db.session.add(notebook36)
#     db.session.add(notebook37)
#     db.session.add(notebook38)
#     db.session.commit()

def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))
    db.session.commit()
