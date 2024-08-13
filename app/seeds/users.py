# from app.models import db, User, environment, SCHEMA
# from sqlalchemy.sql import text


# # Adds a demo user, you can add other users here if you want
# def seed_users():
#     demo = User(
#         first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', password='password')
#     marnie = User(
#         first_name='Marnie', last_name='Brown', username='marnie', email='marnie@aa.io', password='password')
#     bobbie = User(
#         first_name='Bobbie', last_name='Smith', username='bobbie', email='bobbie@aa.io', password='password')
#     michael = User(
#         first_name='Michael', last_name='Pollock', username='michael', email='michael@aa.io', password='password')
#     nora = User(
#         first_name='Nora', last_name='Gilbert', username='nora', email='nora@aa.io', password='password')
#     sara = User(
#         first_name='Sara', last_name='Mehrabani', username='sara', email='sara@aa.io', password='password')
#     kasra = User(
#         first_name='Kasra', last_name='Pollock', username='kasra', email='kasra@aa.io', password='password')
#     julie = User(
#         first_name='Julie', last_name='Ven Berkum', username='julie', email='julie@aa.io', password='password')
#     jesse = User(
#         first_name='Jesse', last_name='Pollock', username='jesse', email='jesse@aa.io', password='password')
#     suzi = User(
#         first_name='Suzi', last_name='Levas', username='suzi', email='suzi@aa.io', password='password')


#     db.session.add(demo)
#     db.session.add(marnie)
#     db.session.add(bobbie)
#     db.session.add(michael)
#     db.session.add(nora)
#     db.session.add(sara)
#     db.session.add(kasra)
#     db.session.add(julie)
#     db.session.add(jesse)
#     db.session.add(suzi)
#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_users():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM users"))
#     db.session.commit()
from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds users, checking for existing entries to prevent duplicates
def seed_users():
    # List of users to seed
    users_to_add = [
        User(first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', password='password'),
        User(first_name='Marnie', last_name='Brown', username='marnie', email='marnie@aa.io', password='password'),
        User(first_name='Bobbie', last_name='Smith', username='bobbie', email='bobbie@aa.io', password='password'),
        User(first_name='Michael', last_name='Pollock', username='michael', email='michael@aa.io', password='password'),
        User(first_name='Nora', last_name='Gilbert', username='nora', email='nora@aa.io', password='password'),
        User(first_name='Sara', last_name='Mehrabani', username='sara', email='sara@aa.io', password='password'),
        User(first_name='Kasra', last_name='Pollock', username='kasra', email='kasra@aa.io', password='password'),
        User(first_name='Julie', last_name='Ven Berkum', username='julie', email='julie@aa.io', password='password'),
        User(first_name='Jesse', last_name='Pollock', username='jesse', email='jesse@aa.io', password='password'),
        User(first_name='Suzi', last_name='Levas', username='suzi', email='suzi@aa.io', password='password')
    ]

    for user in users_to_add:
        existing_user = User.query.filter_by(username=user.username).first()
        if existing_user:
            print(f"User with username '{user.username}' already exists. Skipping creation.")
        else:
            db.session.add(user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
    db.session.commit()
