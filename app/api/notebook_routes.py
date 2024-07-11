from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Notebook

notebook_routes = Blueprint('notebooks', __name__)

@notebook_routes.route('/')
@login_required
def get_notebooks():
    """Get all notebooks"""

    all_notebooks = Notebook.query.filter_by(user_id=current_user.id).all()
    return {"notebooks": [notebook.to_dict() for notebook in all_notebooks]}
