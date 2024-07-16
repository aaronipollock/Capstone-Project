from flask import Blueprint, Flask, request, jsonify
from flask_login import login_required, current_user
from app.models.notebook import Notebook
from app.models import db
from ..forms.notebook_creator import CreateNotebook
from datetime import datetime
# from sqlalchemy import insert, update, delete

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

@notebook_routes.route('/<int:notebook_id>', methods=['DELETE'])
@login_required
def delete_notebook(notebook_id):
    """Delete a notebook"""

    notebook = Notebook.query.get(notebook_id)
    if notebook is None:
        return {'errors': {'message': 'Notebook not found'}}, 404

    if notebook.user_id != current_user.id:
        return {'errors': {'message': 'You are not authorized'}}, 403

    db.session.delete(notebook)
    db.session.commit()
    return {'message': 'Notebook successfully deleted'}
