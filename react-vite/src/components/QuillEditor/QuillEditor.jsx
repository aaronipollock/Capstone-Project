import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './QuillEditor.css'

const QuillEditor = ({ initialContent, onChange }) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (quillRef.current) return; // Do nothing if Quill is already initialized

        const quill = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ['clean']
                ]
            }
        })
        quillRef.current = quill;

        // Load content form local storage
        const content = localStorage.getItem('content');
        if (content) {
            quill.root.innerHTML = content;
        }

        // Save content on text change
        quill.on('text-change', () => {
            localStorage.setItem('content', quill.root.innerHTML);
        })
    }, [initialContent, onChange]);

    return (
        <div className="quill-editor">
            {/* <div id="toolbar"> */}
                {/* <select className="ql-header">
                    <option value="1"></option>
                    <option value="2"></option>
                    <option selected></option>
                </select>
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
                <select className="ql-color"></select>
                <select className="ql-background"></select>
                <button className="ql-clean"></button> */}
            {/* </div> */}
            <div ref={editorRef} className="editor-container"></div>
        </div>
    );
}

export default QuillEditor;
