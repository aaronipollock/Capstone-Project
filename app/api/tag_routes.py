from flask import Blueprint, Flask, request, jsonify
from flask_login import login_required, current_user
from app.models.note import Note
from app.models.tag import Tag
from app.models.notebook import Notebook
from app.models import db

tag_routes = Blueprint('tags', __name__)

@tag_routes.route('/')
@login_required
def get_all_tags():
    """Get all tags"""
    tags = Tag.query.all()
    tag_list = [{'id': tag.id, 'name': tag.tag_name} for tag in tags]

    return jsonify(tag_list), 200

@tag_routes.route('/create', methods=['POST'])
@login_required
def create_tag():
    """Create a new tag"""
    data = request.get_json()
    tag_name = data.get('name')

    new_tag = Tag(name=tag_name)
    db.session.add(new_tag)
    db.session.commit()

    return jsonify(new_tag.to_dict()), 201

@tag_routes.route('/notes/<int:note_id>', methods=['POST'])
@login_required
def add_tags_to_note(note_id):
    """Attach a tag to a note"""

    data = request.get_json()
    tags = data.get('tags')
    note = Note.query.get(note_id)
    for tag_name in tags:
        tag = Tag.query.filter_by(name=tag_name).first()
        if not tag:
            tag = Tag(name=tag_name)
            db.session.add(tag)
        note.tags.append(tag)
    db.session.commit()
    return jsonify({'message': 'Tags added successfully'})

@tag_routes.route('/notes/<int:note_id>', methods=['GET'])
@login_required
def get_tags_of_note(note_id):
    """Get all tags associated with a particular note"""

    note = Note.query.get(note_id)
    if not note:
        return jsonify({'error': 'Note not found'}), 404

    tags = [{'id': tag.id, 'tag_name': tag.tag_name} for tag in note.tags]

    return jsonify(tags), 200

@tag_routes.route('/<int:tag_id>/edit', methods=['GET', 'PUT'])
@login_required
def update_tag(tag_id):
    """Update a tag's name"""
    data = request.get_json()
    tag_name = data.get('name')

    tag = Tag.query.get(tag_id)
    tag.tag_name = tag_name
    db.session.commit()

    return jsonify(tag.to_dict()), 200

@tag_routes.route('/<int:tag_id>/delete', methods=['DELETE'])
@login_required
def delete_tag(tag_id):
    """Delete a tag"""
    tag = Tag.query.get(tag_id)

    for note in tag.notes:
        note.tags.remove(tag)

    db.session.delete(tag)
    db.session.commit()

    return jsonify({'message': 'Tag deleted'}), 200

@tag_routes.route('/<int:tag_id>/notes/<int:note_id>/remove', methods=['DELETE'])
@login_required
def remove_tag_from_note(tag_id, note_id):
    """Remove a tag from a note"""

    note = Note.query.get(note_id)
    tag = Tag.query.get(tag_id)

    if tag in note.tags:
        note.tags.remove(tag)
        db.session.commit()

    return jsonify({'message': 'Tag removed from note'}), 200
