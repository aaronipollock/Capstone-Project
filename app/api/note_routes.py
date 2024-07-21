from flask import Blueprint, Flask, request, jsonify
from flask_login import login_required, current_user
from app.models.note import Note
from app.models import db
from ..forms.note_creator import CreateNote
from ..forms.note_update import UpdateNote
# from app.models.notebook import Notebook
# from datetime import datetime

note_routes = Blueprint('notes', __name__)

@note_routes.route('/')
@login_required
def get_notes():
    """Get current user's notes"""

    user_notes = Note.query.filter_by(user_id=current_user.id).all()
    return {"notes": [note.to_dict() for note in user_notes]}

@note_routes.route('/create', methods=['POST'])
@login_required
def post_note():
    """Create a new note"""

    form = CreateNote()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_note = Note(
            title=form.data['title'],
            content=form.data['content'],
            user_id=current_user.id,
            # notebook_id = notebook.id,
            # created_at = datetime.utcnow(),
            # updated_at = datetime.utcnow()
        )

        db.session.add(new_note)
        db.session.commit()

        return jsonify({"message": "New note created", "note": new_note.to_dict()}), 201

    return jsonify({"errors": form.errors}), 400

@note_routes.route('/<int:note_id>/edit', methods=['GET', 'PUT'])
@login_required
def update_note(note_id):
    """Update a note by ID"""

    note = Note.query.get(note_id)
    if note is None:
        return {'errors': {'message': 'Note not found'}}, 404
    if note.user_id != current_user.id:
        return {'errors': {'message': 'You are not authorized'}}, 403
    if request.method == 'GET':
        return note.to_dict()

    form = UpdateNote()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        note.title = form.data['title']
        note.content = form.data['content']
        db.session.commit()
        return note.to_dict()

    if form.errors:
        return {'errors': form.errors}, 400

    return "Successful edit!"

@note_routes.route('/<int:note_id>/delete', methods=['DELETE'])
@login_required
def delete_note(note_id):
    """Delete a note by ID"""

    note = Note.query.get(note_id)
    if note is None:
        return {'errors': {'message': 'Note not found'}}, 404

    if note.user_id != current_user.id:
        return {'errors': {'message': 'You are not authorized'}}, 403

    db.session.delete(note)
    db.session.commit()
    return {'message': 'Note successfully delted'}

