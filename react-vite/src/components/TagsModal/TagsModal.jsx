import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect, useRef, useState } from "react";
import { thunkGetAllTags } from "../../redux/tags"
import { FaSortAmountDownAlt } from "react-icons/fa";
import './TagsModal.css'

function TagsModal() {
    const dispatch = useDispatch();
    const tags = useSelector(state => state.tags.allTags);
    const { closeModal } = useModal();
    const modalRef = useRef();

    const [loading, setLoading] = useState(true);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [sortedTags, setSortedTags] = useState([...tags]);
    const [sortOrder, setSortOrder] = useState('A-Z');

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            await dispatch(thunkGetAllTags());
            setLoading(false);
        };

        fetchTags();
    }, [dispatch]);

    useEffect(() => {
        if (tags && tags.length > 0) {
            setSortedTags(tags);
        }
    }, [tags])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeModal]);

    const toggleDropdown = () => {
        setDropdownVisible(prev => !prev);
    };

    const handleSort = (order) => {
        const sorted = [...tags].sort((a, b) => {
            if (order === 'A-Z') {
                return a.tag_name.localeCompare(b.tag_name);
            } else {
                return b.tag_name.localeCompare(a.tag_name);
            }
        });
        setSortOrder(order);
        setSortedTags(sorted);
        setDropdownVisible(false);
    };

    return (
        <div className="tag-list-modal">
            <div className="tag-list-modal-content" ref={modalRef}>
                <h2>Your Tags</h2>
                <div className="num-of-tags-container">
                    <p className="num-of-tags">{tags.length} Tags</p>
                    <button className="tags-sort-icon-button" onClick={toggleDropdown}>
                        <FaSortAmountDownAlt />
                    </button>
                    {dropdownVisible && (
                        <div className='tags-sort-dropdown-menu'>
                            <div className="dropdown-item" onClick={() => handleSort('A-Z')}>
                                Sort A-Z
                            </div>
                            <div className="dropdown-item" onClick={() => handleSort('Z-A')}>
                                Sort Z-A
                            </div>
                        </div>
                    )}
                </div>
                <ul className="tag-list-ul">
                    {loading ? (
                        <p>Loading tags...</p>
                    ) : sortedTags.length > 0 ? (
                        sortedTags.map(tag => (
                            <li className="tag-list-li" key={tag.id}>{tag.tag_name}</li>
                        ))
                    ) : (
                        <p>No tags available</p>
                    )}
                </ul>
                <button className="tag-list-close-button" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
}


export default TagsModal;
