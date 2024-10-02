# Welcome to Note2be!

Note2be is a web-based note-taking application that mimics the core features of Evernote. Users can create, edit, organize, and delete notes, and categorize them into notebooks. The application features user authentication, rich text editing, and a responsive design, providing a seamless experience across various devices.

Check out a live version here:
https://capstone-project-xsl6.onrender.com

## Screenshots

Here are some screenshots of the Note2be in action:

### Home Page
<img width="1621" alt="Screenshot 2024-08-25 at 9 14 44 PM" src="https://github.com/user-attachments/assets/9c5bae9e-2817-40ac-8827-92fbe31e86ab">

### Note Editor
<img width="1510" alt="Screenshot 2024-08-18 at 12 30 33 PM" src="https://github.com/user-attachments/assets/6292f3b4-c522-4e70-a0dc-131a116978f2">

### Notebook Management
<img width="1394" alt="Screenshot 2024-08-18 at 12 28 50 PM" src="https://github.com/user-attachments/assets/c8b878f6-655e-4c52-a7c8-86f26dc0422a">

## Features & Implementation

### Feature List
**User Authentication**
- Sign Up: Users can create a new account with a unique email and password.
- Log In: Registered users can log in using their email and password.
- Password Hashing: Passwords are securely hashed using Bcrypt before storage.
- Session Management: Sessions are managed using JSON Web Tokens (JWT) to maintain user authentication state across the application.
- Log Out: Users can log out, which invalidates their session.

**Notebook Management**
- Create Notebooks: Users can create notebooks to organize their notes.
- Assign Notes to Notebooks: Notes can be assigned to specific notebooks for better organization.
- Rename Notebooks: Users can rename their notebooks to reflect their content more accurately.
- Delete Notebooks: Users can delete notebooks, and notes within the deleted notebook can be reassigned to another notebook or deleted.

**Notes Management**
- Create Notes: Users can create new notes, providing a title and content.
- Edit Notes: Users can edit the title and content of existing notes.
- Delete Notes: Users can delete notes they no longer need.

**Rich Text Editor Integration**
- Quill.js Integration: A rich text editor is integrated into the note-taking interface, allowing users to apply various formatting options to their text, such as bold, italic, underline, bullet points, and more.

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

### Technologies Used

**Frontend:**
- React
- Redux
- React Router
- Quill.js
- HTML5, CSS3

**Backend:**
- Flask
- SQLAlchemy
- PostgreSQL (Production)
- SQLite3 (Development)
- Bcrypt for password hashing
- JWT for authentication

**Database Schema:**
- The application uses a relational database structure with a many-to-many relationship between notes and notebooks. The SQLAlchemy ORM is used to manage database operations.



