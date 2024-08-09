import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './QuillEditor.css';
import { useModal } from "../../context/Modal";
import { thunkUpdateNote, thunkGetCurrentUsersNotes } from "../../redux/notes";

// Helper function to debounce events
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const QuillEditor = ({
  initialContent = '',
  initialTitle = '',
  onContentChange,
  onTitleChange,
  noteId,
}) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const dispatch = useDispatch();
  const note = useSelector((state) =>
    state.notes.userNotes.find((n) => n.id === noteId));
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "")
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();

  // Function to strip HTML tags using DOMParser
  const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  // Initialize Quill editor once
  useEffect(() => {
    if (!quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: '#quill-toolbar', // Link the toolbar by ID
        },
        placeholder: '          Start writing...',
      });
      quillRef.current = quill;

      // Set initial content using Delta
      const delta = quill.clipboard.convert(initialContent)
      quill.setContents(delta);

      // Update content on text change
      quill.on('text-change', debounce(() => {
        const newContent = quill.root.innerHTML;
        setContent(newContent);
        if (onContentChange) {
          onContentChange(newContent);
        }
      }, 300));
    }
  }, [initialContent, onContentChange]);

  // Update Quill content when note changes
  useEffect(() => {
    if (quillRef.current && note) {
      const quill = quillRef.current;

      if (quill.root.innerHTML !== note.content) {
        quill.clipboard.dangerouslyPasteHTML(note.content);  // Use clipboard to set HTML content
      }

      // Restore cursor position if necessary
      const currentRange = quill.getSelection();
      if (currentRange && document.activeElement === quill.root) {
        quill.setSelection(currentRange.index, currentRange.length);
      }
    }
  }, [note, note?.content]);

  // Update title and content states when note changes
  useEffect(() => {
    if (note) {
      console.log('Note title or content changed:', note);
      if (title !== note.title) {
        setTitle(note.title);
      }
    } else {
      setTitle(initialTitle);
    }
  }, [note]);

  const validateForm = () => {
    const newErrors = {};
    const plainTextContent = stripHtmlTags(content);
    if (title.length < 2 || title.length > 50) newErrors.title = "Title must be between 2 and 50 characters."
    if (plainTextContent.length < 2 || plainTextContent.length > 800) newErrors.content = "Content must be between 2 and 800 characters."
    return newErrors;
  }

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    console.log('Update button clicked');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!note) {
      setErrors({ note: "Note not found." });
      return;
    }

    if (note.user_id !== currentUser.id) {
      setErrors({ user: "You are not authorized." });
      return
    }

    const plainTextContent = stripHtmlTags(content);
    const updatedNote = { ...note, title, content: plainTextContent };

    console.log('Dispatching thunkUpdateNote with: ', updatedNote)

    try {
      setIsLoading(true);
      const serverResponse = await dispatch(thunkUpdateNote(updatedNote));

      if (serverResponse.errors) {
        setErrors(serverResponse.errors);
      } else {
        console.log('Note updated successfully'); // Debugging log
        dispatch(thunkGetCurrentUsersNotes());
        closeModal();
      }
    } catch (error) {
      console.error('Failed to update note:', error);
      setErrors({ server: "An error occurred while updating the note." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="quill-editor">
      <div id="quill-toolbar" className="quill-toolbar">
        <span className="ql-formats">
          <select className="ql-header" defaultValue="">
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="">Normal</option>
          </select>
          <select className="ql-font">
            <option></option>
            <option value="serif"></option>
            <option value="monospace"></option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
        </span>
        <span className="ql-formats">
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
        </span>
        <span className="ql-formats">
          <select className="ql-align"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-clean"></button>
        </span>
      </div>
      <input
        type="text"
        className="quill-title-input"
        value={title}
        onChange={(e) => {
          const newTitle = e.target.value;
          setTitle(e.target.value);
          if (onTitleChange) {
            onTitleChange(newTitle)
          }
        }}
        placeholder="Title"
      />
      <div ref={editorRef} className="editor-container"></div>
      <button onClick={handleUpdateClick} className="editor-button-update" disabled={isLoading}>
        {isLoading ? 'Updating..' : 'Update Note'}
      </button>
      {errors &&
        Object.keys(errors).map((key) => (
          <p key={key} className="error-message">
            {errors[key]}
          </p>
        ))}
    </div>
  );
};

export default QuillEditor;
