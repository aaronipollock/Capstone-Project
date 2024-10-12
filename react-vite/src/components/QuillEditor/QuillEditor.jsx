import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './QuillEditor.css';
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkGetCurrentUsersNotes, thunkUpdateNote } from "../../redux/notes";
import { thunkAddTagToNote, thunkGetTagsForNote } from "../../redux/tags";
import Tags from '../Tags';

// Helper function to debounce events
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      try {
        func(...args);
      } catch (error) {
        console.error('Error in debounced function', error);
      }
    }, wait);
  };
}

const QuillEditor = ({
  noteData,
  initialContent,
  initialTitle,
  onContentChange,
  onTitleChange,
  onNoteUpdate,
  tags = [],
  onTagsUpdate,
}) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [localTags, setLocalTags] = useState(tags);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = noteData?.user_id;

  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { closeModal } = useModal();

  // Update title if the note title changes

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsInput(false);
      }
    };


    if (isInput) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInput]);

  useEffect(() => {
    if (initialTitle && initialTitle !== title) {
      setTitle(initialTitle);
    }
  }, [initialTitle]);

  // Update content when the initialContent changes
  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== initialContent) {
      quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
    }
  }, [initialContent]);

  useEffect(() => {
    setLocalTags(tags);
  }, [tags])

  // Initialize Quill editor once
  useEffect(() => {
    if (!quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: '#quill-toolbar',
        },
        placeholder: '',
      });
      quillRef.current = quill;

      // Set initial content
      if (initialContent) {
        quill.clipboard.dangerouslyPasteHTML(initialContent);
      }

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
  }, [initialContent, onContentChange]); // Only initialize once on mount

  // Function to strip HTML tags using DOMParser
  const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

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

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!noteData) {
      setErrors({ note: "Note not found." });
      return;
    }

    // if (noteData.user_id !== currentUser) {
    //   setErrors({ user: "You are not authorized." });
    //   return;
    // }

    const plainTextContent = stripHtmlTags(content);
    const updatedNote = { ...noteData, title, content: plainTextContent };

    try {
      setIsLoading(true);
      const serverResponse = await dispatch(thunkUpdateNote(updatedNote));

      if (serverResponse.errors) {
        setErrors(serverResponse.errors);
      } else {
        // re-fetch updated notes and tags after successful update
        await dispatch(thunkGetCurrentUsersNotes());
        await dispatch(thunkGetTagsForNote(noteData.id));

        if (onNoteUpdate) {
          onNoteUpdate();
        }
        closeModal();
      }
    } catch (error) {
      setErrors({ server: "An error occurred while updating the note." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagClick = () => {
    setIsInput(true);
  }

  const handleInputKeyPress = async (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const newTag = { tag_name: inputValue, user_id: currentUser };
      try {
        const addedTag = await dispatch(thunkAddTagToNote(noteData.id, newTag));

        if (addedTag?.id && addedTag?.tag_name) {
          setLocalTags((prevTags) => [...prevTags, addedTag]);
        } else {
          const constructedTag = { id: Date.now(), tag_name: inputValue };
          setLocalTags((prevTags) => [...prevTags, constructedTag]);
        }

        await dispatch(thunkGetCurrentUsersNotes());
        await dispatch(thunkGetTagsForNote(noteData.id));

        setInputValue("");
        setIsInput(false);
      } catch (error) {
        console.error('Failed to add tag', error);
        setErrors({ server: "An error occurred while adding the tag." })
      }
    }
  }

  const handleRemoveTag = (tagId) => {
    onTagsUpdate(noteData.id, tagId, tags.filter(tag => tag.id !== tagId), false);
  };

  const handleDeleteTag = (tagId) => {
    onTagsUpdate(noteData.id, tagId, tags.filter(tag => tag.id !== tagId), true);
  };

  useEffect(() => {
    if (onTagsUpdate) {
      onTagsUpdate(localTags);
    }
  }, [localTags, onTagsUpdate]);


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
        placeholder=""
      />
      <div ref={editorRef} className="editor-container"></div>
      <Tags
        tags={tags}
        variant="quill"
        onRemoveTag={handleRemoveTag}  // This removes the tag from the current note
        onDeleteTag={handleDeleteTag}  // This removes the tag from all notes
      />
      {noteData && (
        <>

          <div>
            {isInput ? (
              <input
                ref={inputRef}
                className='quill-tag-input'
                type="text"
                placeholder="Type to add..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleInputKeyPress}
                autoFocus
              />
            ) : (
              <button onClick={handleTagClick} className="add-tag-button">Add Mark</button>
            )}
          </div>
          <button onClick={handleUpdateClick} className="editor-button-update" disabled={isLoading}>
            {isLoading ? 'Amending...' : 'Amend Note'}
          </button>
        </>
      )}
      {errors &&
        Object.keys(errors).map((key) => (
          <p key={key} className="error-message">
            {errors[key]}
          </p>
        ))
      }
    </div >
  );
};

export default QuillEditor;
