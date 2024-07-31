from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .notebook import notebook_notes

class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, unique=True)
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    # make notebook_id nullable=False at later date after creating default notebook
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='notes')
    notebooks = db.relationship('Notebook', secondary=notebook_notes, back_populates='notes')

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
