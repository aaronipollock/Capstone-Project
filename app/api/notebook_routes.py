from flask import Blueprint, Flask, request, jsonify
from flask_login import login_required, current_user
from app.models.notebook import Notebook
from app.models import db
from ..forms.notebook_creator import CreateNotebook
from datetime import datetime

notebook_routes = Blueprint('notebooks', __name__)

@notebook_routes.route('/')
@login_required
def get_notebooks():
    """Get current user's notebooks"""

    user_notebooks = Notebook.query.filter_by(user_id=current_user.id).all()
    return {"notebooks": [notebook.to_dict() for notebook in user_notebooks]}

@notebook_routes.route('/create', methods=['POST'])
@login_required
def post_notebook():
    """Create a new notebook"""

    form = CreateNotebook()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_notebook = Notebook(
            title=form.data['title'],
            user_id=current_user.id,
            created_at = datetime.utcnow(),
            updated_at = datetime.utcnow()
        )

        db.session.add(new_notebook)
        db.session.commit()

        return jsonify({"message": "New notebook created", "notebook": new_notebook.to_dict()}), 201

    return jsonify({"errors": form.errors}), 400

# not '/<int:notebook_id>/update'?
@notebook_routes.route('/<int:notebook_id>', methods=['GET', 'PUT'])
@login_required
def update_notebook(notebook_id):
    """Update a notebook by ID"""

    notebook = Notebook.query.get(notebook_id)
    if notebook is None:
        return {'errors': {'message': 'Notebook not found'}}, 404
    if notebook.user_id != current_user.id:
        return {'errors': {'message': 'You are not authorized'}}, 403
    if request.method == 'GET':
        return notebook.to_dict()

    form = CreateNotebook()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        notebook.title = form.data['title']
        notebook.updated_at = datetime.utcnow()
        db.session.commit()
        return notebook.to_dict()

    if form.errors:
        return {'errors': form.errors}, 400

    return "Successful edit!"

# not '/<int:notebook_id>/delete'?
@notebook_routes.route('/<int:notebook_id>', methods=['DELETE'])
@login_required
def delete_notebook(notebook_id):
    """Delete a notebook by ID"""

    notebook = Notebook.query.get(notebook_id)
    if notebook is None:
        return {'errors': {'message': 'Notebook not found'}}, 404

    if notebook.user_id != current_user.id:
        return {'errors': {'message': 'You are not authorized'}}, 403

    db.session.delete(notebook)
    db.session.commit()
    return {'message': 'Notebook successfully deleted'}

@notebook_routes.route('/<int:notebook_id>/notes', methods=['GET'])
@login_required
def get_notebook_details(notebook_id):
    """Get notes by notebok ID"""
    notebook = Notebook.query.get(notebook_id)
    if notebook is None:
        return {'errors': {'message': 'Notebook not found'}}, 404
    if notebook.user_id != current_user.id:
        return {'errors': {'message': 'You are not authorized'}}, 403

    return {"notes": [note.to_dict() for note in notebook.notes]}
