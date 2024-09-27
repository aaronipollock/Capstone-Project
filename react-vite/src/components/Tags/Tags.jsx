import './Tags.css';
import { FaTag } from 'react-icons/fa';
import { PiCaretDown } from 'react-icons/pi';
import { useState, useEffect } from 'react';

function Tags({ tags, variant = 'default', onRemoveTag, onDeleteTag }) {
    const [dropdownIndex, setDropdownIndex] = useState(null);

    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };

    const closeDropdown = () => {
        setDropdownIndex(null);
    }

    //Detect clicks outside dropdown and close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.tag-dropdown-menu') && !event.target.closest('.tag-dropdown-toggle-button')) {
                setDropdownIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={variant === 'quill' ? "quill-tag-list" : "tags-container"}>
            {tags && tags.length > 0 ? (
                tags.map((tag, index) => (
                    variant === 'quill' ? (
                        <span key={tag.id} className="quill-tag">
                            <span className='quill-tag-icon'><FaTag /></span>
                            {tag.tag_name}
                            <span className='upside-downcaret'>
                                <button
                                    className='tag-dropdown-toggle-button'
                                    onClick={() => toggleDropdown(index)}
                                >
                                    <PiCaretDown />
                                </button>
                            </span>
                            {dropdownIndex === index && (
                                <div className='tag-dropdown-menu'>
                                    <button
                                        className='remove-tag-button'
                                        onClick={() => {
                                            onRemoveTag(tag.id);
                                            closeDropdown();
                                        }}
                                    >
                                        Remove tag
                                    </button>
                                    <button
                                        className='delete-tag-button'
                                        onClick={() => {
                                            onDeleteTag(tag.id);
                                            closeDropdown();
                                        }}
                                    >
                                        Remove tag from all notes...
                                    </button>
                                </div>
                            )}
                        </span>
                    ) : (
                        <span key={tag.id} className="tag">
                            {tag.tag_name}
                        </span>
                    )
                ))
            ) : (
                <p></p>
            )}
        </div >
    );
}

export default Tags;
