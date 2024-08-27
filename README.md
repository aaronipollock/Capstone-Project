# Welcome to Note2be!

Note2be is a web-based note-taking application that mimics the core features of Evernote. Users can create, edit, organize, and delete notes, and categorize them into notebooks. The application features user authentication, rich text editing, and a responsive design, providing a seamless experience across various devices.

Check out a live version here:  
https://capstone-project-xsl6.onrender.com

## Screenshots

Here are some screenshots of the Evernote Clone in action:

### Home Page
![Home Page Screenshot](./docs/screenshots/home_page.png)

### Note Editor
![Note Editor Screenshot](./docs/screenshots/note_editor.png)

### Notebook Management
![Notebook Management Screenshot](./docs/screenshots/notebook_management.png)

## Features & Implementation

### Feature List
- [Feature List Document](./docs/feature_list.md)

### React Components
- [React Components List](./docs/react_components.md)

### Database Schema
- [Database Schema](./docs/database_schema.md)

### Frontend Routes
- [Frontend Routes Document](./docs/frontend_routes.md)

### API Routes
- [API Routes Document](./docs/api_routes.md)

### Single-Page App

**React Router and Components:**  
Evernote Clone is a single-page application built using React. All components are dynamically rendered at the root URL, `/`, and navigation is handled by React Router. This setup ensures a fast, seamless user experience with no full-page reloads.

**Frontend and Backend Interaction:**  
The front end communicates with the backend primarily through RESTful APIs. Upon logging in, user data and notes are fetched and stored in Redux. The application minimizes data transfer by retrieving only the necessary information on demand.

### User Authentication

**Secure Authentication:**  
Users are required to sign up or log in to use the application. User credentials are securely hashed using bcrypt, and JWTs are used for session management to ensure secure and stateless authentication.

### Notes and Notebooks

**Rich Text Editor:**  
Notes are created and edited using Quill.js, a powerful rich text editor that allows users to format their text with various options like bold, italic, lists, and links.

**Notebook System:**  
Users can categorize notes into different notebooks, allowing for better organization and retrieval of notes.

### Best Practices

**Git Feature Branching and Agile Methodologies:**  
The project follows best practices for development, including using Git feature branching for version control and Scrum for task management. This approach ensures that the project remains well-organized, scalable, and easy to maintain.

## Installation Instructions

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/evernote-clone.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd evernote-clone
    ```

3. **Set up the backend:**

   Navigate to the backend directory and install the dependencies:
   ```bash
   pip install -r requirements.txt
Set up the frontend:

Navigate to the frontend directory and install the dependencies:

bash
Copy code
npm install
Configure environment variables:

In both the frontend and backend directories, create a .env file and populate it with the necessary values, such as database URLs and secret keys.

Run the application:

Backend:

bash
Copy code
flask run
Frontend:

bash
Copy code
npm run dev
Access the application:
Visit http://localhost:3000 to start using the app.

Technologies Used
Frontend:

React
Redux
React Router
Quill.js
Axios
HTML5, CSS3
Backend:

Flask
SQLAlchemy
PostgreSQL (Production)
SQLite3 (Development)
Bcrypt for password hashing
JWT for authentication
To-Dos/Future Features
Implement a WYSIWYG editor for more advanced text formatting options.
Add collaborative note editing with real-time synchronization.
Develop a mobile version of the app with native features.
Integrate advanced search features, such as filtering by notebooks and full-text search within notes.
Technical Implementation Details
Database Schema:
The application uses a relational database structure with a many-to-one relationship between notes and notebooks. The SQLAlchemy ORM is used to manage database operations, providing a layer of abstraction over raw SQL queries.

Frontend Architecture:
React components are structured to maximize reusability and separation of concerns. Redux is employed to manage the global state, ensuring a consistent state throughout the application.

Challenges & Solutions
Challenge: Securely Handling User Authentication
Solution:
Implemented JWT-based authentication to maintain stateless sessions, ensuring that user data is not vulnerable to attacks. Passwords are hashed using Bcrypt before storage, enhancing security.

Challenge: Efficiently Managing Notes and Notebooks Relationships
Solution:
Used SQLAlchemy to create a many-to-one relationship between notes and notebooks, allowing users to organize their notes effectively. This relationship is managed through foreign keys, ensuring that the database remains normalized and efficient.

Code Snippets
Example of Note and Notebook Relationship:

python
Copy code
class Note(db.Model):
    __tablename__ = 'notes'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text)
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    notebook = db.relationship('Notebook', back_populates='notes')

class Notebook(db.Model):
    __tablename__ = 'notebooks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    notes = db.relationship('Note', back_populates='notebook')
Best Practices
Separation of Concerns:
The application maintains a clear separation between frontend and backend logic, ensuring that each layer can be developed, tested, and maintained independently.

Modular Code Structure:
The codebase is organized into distinct modules, each responsible for a specific functionality, such as authentication, note management, and notebook organization. This modular approach facilitates easier debugging and feature extensions.
