from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Tag(db.Model):
    __tablename__= 'tags'

    if environment == "production":
        __table_args__= {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    notes = db.relationship('Note', back_populates='tags', secondary='note_tags')

    def to_dict(self):
        return \
            {
            'id': self.id,
            'tag_name': self.tag_name,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
