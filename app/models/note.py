from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .notebook import notebook_notes
from sqlalchemy import Table, Column, Integer, ForeignKey


note_tags = Table(
    'note_tags', db.Model.metadata,
    Column('note_id', Integer, ForeignKey(add_prefix_for_prod('notes.id')), primary_key=True),
    Column('tag_id', Integer, ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)

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
    tags = db.relationship('Tag', secondary=note_tags, back_populates='notes')

    def to_dict(self, include_notebooks=False, include_tags=False):
        note_dict = {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'user_id': self.user_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }

        if include_notebooks:
            note_dict['notebook'] = [notebook.to_dict(include_notes=False) for notebook in self.notebooks]


        if include_tags:
            note_dict['tags'] = [tag.to_dict() for tag in self.tags]

        return note_dict

# notebook_notes = Table('notebook_notes', db.Model.metadata,
#     Column('notebook_id', Integer, ForeignKey(add_prefix_for_prod('notebooks.id')), primary_key=True),
#     Column('note_id', Integer, ForeignKey(add_prefix_for_prod('notes.id')), primary_key=True)
# )
