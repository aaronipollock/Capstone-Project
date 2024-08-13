// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';
// import './QuillEditor.css';
// import { useModal } from "../../context/Modal";
// import { thunkUpdateNote, thunkGetCurrentUsersNotes } from "../../redux/notes";

// // Helper function to debounce events
// function debounce(func, wait) {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// }

// const QuillEditor = ({
//   initialContent = '',
//   initialTitle = '',
//   onContentChange,
//   onTitleChange,
//   noteId,
// }) => {
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);
//   const dispatch = useDispatch();
//   const note = useSelector((state) =>
//     state.notes.userNotes.find((n) => n.id === noteId));
//   const [title, setTitle] = useState(initialTitle);
//   const [content, setContent] = useState(initialContent)
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const currentUser = useSelector((state) => state.session.user);
//   const { closeModal } = useModal();

//   // Function to strip HTML tags using DOMParser
//   const stripHtmlTags = (html) => {
//     const div = document.createElement('div');
//     div.innerHTML = html;
//     return div.textContent || div.innerText || '';
//   };

//   // Initialize Quill editor once
//   useEffect(() => {
//     console.log('Initial Content in Quill:', initialContent);
//     if (!quillRef.current) {
//       const quill = new Quill(editorRef.current, {
//         theme: 'snow',
//         modules: {
//           toolbar: '#quill-toolbar', // Link the toolbar by ID
//         },
//         placeholder: '            Start writing...',
//       });
//       quillRef.current = quill;

//       // Set initial content using Delta
//       // const delta = quill.clipboard.convert(initialContent)
//       // quill.setContents(delta);

//       // Update content on text change
//       quill.on('text-change', debounce(() => {
//         const newContent = quill.root.innerHTML;
//         setContent(newContent);
//         if (onContentChange) {
//           onContentChange(newContent);
//         }
//       }, 300));
//     } else {
//       // Ensure content updates when note changes
//       const quill = quillRef.current;
//       if (quill.root.innerHTML !== initialContent) {
//         console.log('Updating Quill content:', initialContent);
//         quill.clipboard.dangerouslyPasteHTML(initialContent);
//       }
//     }
//   }, [initialContent, noteId, onContentChange]);

//   useEffect(() => {
//     if (note) {
//       const quill = quillRef.current;

//       if (quill && quill.root.innerHTML !== note.content) {
//         console.log('Updating Quill Content:', note.content);
//         quill.clipboard.dangerouslyPasteHTML(note.content); // Use clipboard to set HTML content
//       }

//       // Update title state immediately when note changes
//       if (title !== note.title) {
//         console.log('Updating Title:', note.title);
//         setTitle(note.title);
//       }

//       // Restore cursor position if necessary
//       const currentRange = quill.getSelection();
//       if (currentRange && document.activeElement === quill.root) {
//         quill.setSelection(currentRange.index, currentRange.length);
//       }
//     }
//   }, [note, title]);

//   const validateForm = () => {
//     const newErrors = {};
//     const plainTextContent = stripHtmlTags(content);
//     if (title.length < 2 || title.length > 50) newErrors.title = "Title must be between 2 and 50 characters."
//     if (plainTextContent.length < 2 || plainTextContent.length > 800) newErrors.content = "Content must be between 2 and 800 characters."
//     return newErrors;
//   }

//   const handleUpdateClick = async (e) => {
//     e.preventDefault();
//     console.log('Update button clicked');

//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     if (!note) {
//       setErrors({ note: "Note not found." });
//       return;
//     }

//     if (note.user_id !== currentUser.id) {
//       setErrors({ user: "You are not authorized." });
//       return
//     }

//     const plainTextContent = stripHtmlTags(content);
//     const updatedNote = { ...note, title, content: plainTextContent };

//     console.log('Dispatching thunkUpdateNote with: ', updatedNote)

//     try {
//       setIsLoading(true);
//       const serverResponse = await dispatch(thunkUpdateNote(updatedNote));

//       if (serverResponse.errors) {
//         setErrors(serverResponse.errors);
//       } else {
//         console.log('Note updated successfully'); // Debugging log
//         dispatch(thunkGetCurrentUsersNotes());
//         closeModal();
//       }
//     } catch (error) {
//       console.error('Failed to update note:', error);
//       setErrors({ server: "An error occurred while updating the note." });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="quill-editor">
//       <div id="quill-toolbar" className="quill-toolbar">
//         <span className="ql-formats">
//           <select className="ql-header" defaultValue="">
//             <option value="1">Heading 1</option>
//             <option value="2">Heading 2</option>
//             <option value="">Normal</option>
//           </select>
//           <select className="ql-font">
//             <option></option>
//             <option value="serif"></option>
//             <option value="monospace"></option>
//           </select>
//         </span>
//         <span className="ql-formats">
//           <button className="ql-bold"></button>
//           <button className="ql-italic"></button>
//           <button className="ql-underline"></button>
//         </span>
//         <span className="ql-formats">
//           <select className="ql-color"></select>
//           <select className="ql-background"></select>
//         </span>
//         <span className="ql-formats">
//           <button className="ql-list" value="ordered"></button>
//           <button className="ql-list" value="bullet"></button>
//         </span>
//         <span className="ql-formats">
//           <select className="ql-align"></select>
//         </span>
//         <span className="ql-formats">
//           <button className="ql-clean"></button>
//         </span>
//       </div>
//       <input
//         type="text"
//         className="quill-title-input"
//         value={title}
//         onChange={(e) => {
//           const newTitle = e.target.value;
//           setTitle(e.target.value);
//           if (onTitleChange) {
//             onTitleChange(newTitle)
//           }
//         }}
//         placeholder="Title"
//       />
//       <div ref={editorRef} className="editor-container"></div>
//       <button onClick={handleUpdateClick} className="editor-button-update" disabled={isLoading}>
//         {isLoading ? 'Updating..' : 'Update Note'}
//       </button>
//       {errors &&
//         Object.keys(errors).map((key) => (
//           <p key={key} className="error-message">
//             {errors[key]}
//           </p>
//         ))}
//     </div>
//   );
// };

// export default QuillEditor;

// import { useEffect, useRef, useState } from 'react';
// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';
// import './QuillEditor.css';

// // Helper function to debounce events
// function debounce(func, wait) {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// }

// const QuillEditor = ({
//   initialContent = '',
//   initialTitle = '',
//   onContentChange,
//   onTitleChange,
//   noteId,
// }) => {
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);
//   const [title, setTitle] = useState(initialTitle);
//   const [content, setContent] = useState(initialContent);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});


//   useEffect(() => {
//     console.log('QuillEditor props - noteId:', noteId, 'initialContent:', initialContent, 'initialTitle:', initialTitle);
//   }, [noteId, initialContent, initialTitle]);

//   // Initialize Quill editor once
//   useEffect(() => {
//     const quill = new Quill(editorRef.current, {
//       theme: 'snow',
//       modules: {
//         toolbar: '#quill-toolbar', // Link the toolbar by ID
//       },
//       placeholder: 'Start writing...',
//     });
//     quillRef.current = quill;

//     // Set initial content
//     quill.clipboard.dangerouslyPasteHTML(initialContent);

//     // Update content on text change
//     quill.on(
//       'text-change',
//       debounce(() => {
//         const newContent = quill.root.innerHTML;
//         setContent(newContent);
//         if (onContentChange) {
//           onContentChange(newContent);
//         }
//       }, 300)
//     );
//   }, []); // Only initialize once on mount

//   // Update content when the initialContent changes
//   useEffect(() => {
//     if (quillRef.current) {
//       const quill = quillRef.current;
//       if (quill.root.innerHTML !== initialContent) {
//         quill.clipboard.dangerouslyPasteHTML(initialContent);
//       }
//     }
//   }, [initialContent]);

//   // Update title if the note title changes
//   useEffect(() => {
//     if (title !== initialTitle) {
//       console.log('Updating Title:', initialTitle);
//       setTitle(initialTitle);
//     }
//   }, [initialTitle]);

//   const handleUpdateClick = async (e) => {
//     e.preventDefault();
//     console.log('Update button clicked');

//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     if (!note) {
//       setErrors({ note: "Note not found." });
//       return;
//     }

//     if (note.user_id !== currentUser.id) {
//       setErrors({ user: "You are not authorized." });
//       return
//     }

//     const plainTextContent = stripHtmlTags(content);
//     const updatedNote = { ...note, title, content: plainTextContent };

//     console.log('Dispatching thunkUpdateNote with: ', updatedNote)

//     try {
//       setIsLoading(true);
//       const serverResponse = await dispatch(thunkUpdateNote(updatedNote));

//       if (serverResponse.errors) {
//         setErrors(serverResponse.errors);
//       } else {
//         console.log('Note updated successfully'); // Debugging log
//         dispatch(thunkGetCurrentUsersNotes());
//         closeModal();
//       }
//     } catch (error) {
//       console.error('Failed to update note:', error);
//       setErrors({ server: "An error occurred while updating the note." });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="quill-editor">
//       <div id="quill-toolbar" className="quill-toolbar">
//         <span className="ql-formats">
//           <select className="ql-header" defaultValue="">
//             <option value="1">Heading 1</option>
//             <option value="2">Heading 2</option>
//             <option value="">Normal</option>
//           </select>
//           <select className="ql-font">
//             <option></option>
//             <option value="serif"></option>
//             <option value="monospace"></option>
//           </select>
//         </span>
//         <span className="ql-formats">
//           <button className="ql-bold"></button>
//           <button className="ql-italic"></button>
//           <button className="ql-underline"></button>
//         </span>
//         <span className="ql-formats">
//           <select className="ql-color"></select>
//           <select className="ql-background"></select>
//         </span>
//         <span className="ql-formats">
//           <button className="ql-list" value="ordered"></button>
//           <button className="ql-list" value="bullet"></button>
//         </span>
//         <span className="ql-formats">
//           <select className="ql-align"></select>
//         </span>
//         <span className="ql-formats">
//           <button className="ql-clean"></button>
//         </span>
//       </div>
//       <input
//         type="text"
//         className="quill-title-input"
//         value={title}
//         onChange={(e) => {
//           const newTitle = e.target.value;
//           setTitle(newTitle);
//           if (onTitleChange) {
//             onTitleChange(newTitle);
//           }
//         }}
//         placeholder="Title"
//       />
//       <div ref={editorRef} className="editor-container"></div>
//       <button onClick={handleUpdateClick} className="editor-button-update" disabled={isLoading}>
//         {isLoading ? 'Updating..' : 'Update Note'}
//       </button>
//       {errors &&
//         Object.keys(errors).map((key) => (
//           <p key={key} className="error-message">
//             {errors[key]}
//           </p>
//         ))}
//     </div>
//   );
// };

// export default QuillEditor;

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
    state.notes.userNotes.find((n) => n.id === noteId)
  );
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
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
        placeholder: 'Start writing...',
      });
      quillRef.current = quill;

      // Set initial content
      quill.clipboard.dangerouslyPasteHTML(initialContent);

      // Update content on text change
      quill.on(
        'text-change',
        debounce(() => {
          const newContent = quill.root.innerHTML;
          setContent(newContent);
          if (onContentChange) {
            onContentChange(newContent);
          }
        }, 300)
      );
    }
  }, []); // Only initialize once on mount

  // Update content when the initialContent changes
  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== initialContent) {
      quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
    }
  }, [initialContent]);

  // Update title if the note title changes
  useEffect(() => {
    if (title !== initialTitle) {
      setTitle(initialTitle);
    }
  }, [initialTitle]);

  const validateForm = () => {
    const newErrors = {};
    const plainTextContent = stripHtmlTags(content);
    if (title.length < 2 || title.length > 50) {
      newErrors.title = "Title must be between 2 and 50 characters.";
    }
    if (plainTextContent.length < 2 || plainTextContent.length > 800) {
      newErrors.content = "Content must be between 2 and 800 characters.";
    }
    return newErrors;
  };

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
      return;
    }

    const plainTextContent = stripHtmlTags(content);
    const updatedNote = { ...note, title, content: plainTextContent };

    console.log('Dispatching thunkUpdateNote with: ', updatedNote);

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
          setTitle(newTitle);
          if (onTitleChange) {
            onTitleChange(newTitle);
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
