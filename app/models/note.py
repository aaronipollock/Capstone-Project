from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .notebook import notebook_notes
from sqlalchemy import Table, Column, Integer, ForeignKey


class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    # make notebook_id nullable=False at later date after creating default notebook
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='notes')
    notebooks = db.relationship('Notebook', back_populates='notes', secondary=notebook_notes)

    def to_dict(self, include_notebooks=False):
        note_dict = {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'notebooks': [notebook.to_dict() for notebook in self.notebooks]
        }
        if include_notebooks:
            note_dict['notebook'] = [notebook.to_dict(include_notes=False) for notebook in self.notebooks]
        return note_dict

# notebook_notes = Table('notebook_notes', db.Model.metadata,
#     Column('notebook_id', Integer, ForeignKey(add_prefix_for_prod('notebooks.id')), primary_key=True),
#     Column('note_id', Integer, ForeignKey(add_prefix_for_prod('notes.id')), primary_key=True)
# )
