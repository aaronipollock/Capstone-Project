from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
# from wtforms import DateField
from wtforms.validators import DataRequired, Length
from app.models import Note

def title_exists(form, field):
    title = field.data,
    note = Note.query.filter(note.title == title).first()
    if note:
        raise ValidationError('Note title is already in use.')

class CreateNote(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=50, message='Title must be between 1 and 50 characters'), title_exists])
    content = TextAreaField('content', validators=[DataRequired(), Length(min=1, max=5000, message='Note must be between 1 and 5000 characters')])
