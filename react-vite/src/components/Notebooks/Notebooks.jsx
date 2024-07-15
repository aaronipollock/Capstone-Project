import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkGetCurrentUsersNotebooks } from '../../redux/notebooks';
import Sidebar from '../Sidebar';
import './Notebooks.css';


function Notebooks() {
    const dispatch = useDispatch()
    const [notebooks, setNotebooks] = useState([])
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/users/current');
            const data = await response.json()
            console.log('DATA: ', data)
            setUser(data);
        }
        fetchUser();
        dispatch(thunkGetCurrentUsersNotebooks());
    }, [dispatch]);


    const fetchNotebooks = async () => {

        try {
            const response = await fetch('/api/notebooks/')
            const data = await response.json()
            if (data.notebooks && Array.isArray(data.notebooks)) {
                setNotebooks(data.notebooks)
            } else {
                console.error('Fetched data in not an array:', data);
            }
        } catch (err) {
            console.error('Request Error:', err);
        }
    };

    useEffect(() => {
        fetchNotebooks()
    }, [dispatch])

    const notebooksArr = notebooks.map(notebook => ({
        user_id: notebook.user_id,
        title: notebook.title,
        id: notebook.id,
        updated_at: notebook.updated_at,
    }));

    if (!notebooksArr.length) return <p>No notebooks available</p>;

    return (
        <>
            <div className="notebooks-page-container">
                <Sidebar />
                <div className="main-content">
                    <p className="text-notebooks">Notebooks</p>
                    <p># notebooks</p>
                    {notebooksArr.map((notebook, index) => (
                        <div key={index} className="notebook-container">
                            <p>Title: {notebook.title}</p>
                            <p>Created by: {user ? user.email : 'Loading...'}</p>
                            <p>Updated: {notebook.updated_at}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Notebooks;
