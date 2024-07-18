from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Notebook(db.Model):
    __tablename__ = 'notebooks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship(
        'User',
        back_populates='notebooks')

    notes= db.relationship(
        'Note',
        back_populates='notebook',
        cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def to_dict_with_notes(self):
        return {
            **self.to_dict(),
            'notes': [note.to_dict() for note in self.notes]
        }
