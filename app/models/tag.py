from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .note import note_tags
from sqlalchemy import Table, Column, Integer, ForeignKey

class Tag(db.Model):
    __tablename__= 'tags'

    if environment == "production":
        __table_args__= {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    notes = db.relationship('Note', secondary='note_tags', back_populates='tags')
    user = db.relationship('User', back_populates='tags')

    def to_dict(self):
        return {
            'id': self.id,
            'tag_name': self.tag_name,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
