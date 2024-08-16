from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Table, Column, Integer, ForeignKey

notebook_notes = Table(
    'notebook_notes', db.Model.metadata,
    Column('notebook_id', Integer, ForeignKey(add_prefix_for_prod('notebooks.id')), primary_key=True),
    Column('note_id', Integer, ForeignKey(add_prefix_for_prod('notes.id')), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)

class Notebook(db.Model):
    __tablename__ = 'notebooks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='notebooks')
    notes = db.relationship('Note', back_populates='notebooks', secondary=notebook_notes)

    def to_dict(self, include_notes=False):
        notebook_dict = {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
        if include_notes:
            notebook_dict['notes'] = [note.to_dict(include_notebooks=False) for note in self.notes]
        return notebook_dict
