from flask import Blueprint, Flask, request, jsonify
from flask_login import login_required, current_user
from app.models.note import Note
from app.models import db
from ..forms.note_creator import CreateNote
from datetime import datetime

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
            title = form.data['title'],
            content = form.data['content'],
            user_id = current_user.id,
            # notebook_id = notebook.id,
            # created_at = datetime.utcnow(),
            # updated_at = datetime.utcnow()
        )

        db.session.add(new_note)
        db.session.commit()

        return jsonify({"message": "New note created", "note": new_note.to_dict()}), 201

    return jsonify({"errors": form.errors}), 400
