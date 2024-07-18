import { useDispatch, useSelector } from "react-redux"
import Sidebar from "../Sidebar";
import './NotesByNotebook.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { thunkGetNotesByNotebook } from "../../redux/notes";

function NotesByNotebook() {
    const { notebookId } = useParams();
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notebookNotes)
    const [notebook, setNotebook] = useState(null);

    useEffect(() => {
        const fetchNotebook = async () => {
            const response = await fetch(`/api/notebooks/${notebookId}`)
            const data = await response.json()
            console.log("Fetched notebook:", data); // Log notebook details
            setNotebook(data);
        }
        fetchNotebook();
        dispatch(thunkGetNotesByNotebook(notebookId));
    }, [dispatch, notebookId]);

    useEffect(() => {
        console.log("Fetched notes:", notes); // Log fetched notes
    }, [notes]);

    if (!notebook) return <p>Notebook not found</p>


    console.log("Rendering notebook:", notebook);
    console.log("Rendering notes:", notes);

    return (
        <>
            <div className="nbn-page-container">
                <Sidebar />
                <div className="nbn-main-content">
                    <section className="nbn-section1">
                        <p className="text-nbn">{`${notebook.title} > Notes`}</p>
                    </section>
                    <section className="nbn-section2">
                        {notes && notes.length > 0 ? (
                            <ul>
                                {notes.map(note => (
                                    <li key={note.id}>{note.title}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No notes found</p>
                        )}
                    </section>
                </div>
            </div>
        </>
    )
}

export default NotesByNotebook
