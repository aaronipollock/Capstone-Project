// Action Types
const GET_ALL_TAGS = 'tags/GET_ALL_TAGS';
const CREATE_TAG = 'tags/CREATE_TAG';
const GET_TAGS_FOR_NOTE = 'tags/GET_TAGS_FOR_NOTE';
const ADD_TAG_TO_NOTE = 'tags/ADD_TAG_TO_NOTE';
const REMOVE_TAG_FROM_NOTE = 'tags/REMOVE_TAG_FROM_NOTE';
const UPDATE_TAG = 'tags/UPDATE_TAG';
const DELETE_TAG = 'tags/DELETE_TAG';


// Action Creators
const getAllTags = (tags) => ({
    type: GET_ALL_TAGS,
    payload: tags
});

const createTag = (tag) => ({
    type: CREATE_TAG,
    payload: tag
})

const getTagsForNote = (noteId, tags) => ({
    type: GET_TAGS_FOR_NOTE,
    noteId,
    payload: tags,
})

const addTagToNote = (noteId, tags) => ({
    type: ADD_TAG_TO_NOTE,
    noteId,
    payload: tags,
});

const removeTagFromNote = (noteId, tagId) => ({
    type: REMOVE_TAG_FROM_NOTE,
    noteId,
    tagId
});

const updateTag = (tag) => ({
    type: UPDATE_TAG,
    payload: tag
});

const deleteTag = (tagId) => ({
    type: DELETE_TAG,
    tagId
})

// Thunks
export const thunkGetAllTags = () => async (dispatch) => {
    const res = await fetch(`/api/tags/`);
    if (res.ok) {
        const tags = await res.json();
        dispatch(getAllTags(tags));
    }
};

export const thunkCreateTag = (tagName) => async (dispatch) => {
    const res = await fetch('/api/tags/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tagName })
    });
    if (res.ok) {
        const newTag = await res.json();
        dispatch(createTag(newTag));
    }
};

export const thunkGetTagsForNote = (noteId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/tags/notes/${noteId}`);

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Error fetching tags:', errorText);
            return;
        }
        const tags = await res.json();
        console.log('Tag fetched from backend:', tags);
        dispatch(getTagsForNote(noteId, tags));
    } catch (error) {
        console.error('Failed to fetch tags:', error);
    }
};

export const thunkAddTagsToNote = (noteId, tags) => async (dispatch) => {
    const res = await fetch(`/api/tags/notes/${noteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags })
    });
    if (res.ok) {
        dispatch(addTagToNote(noteId, tags));
    }
};

export const thunkRemoveTagFromNote = (noteId, tagId) => async (dispatch) => {
    const res = await fetch(`/api/tags/${tagId}/notes/${noteId}/remove`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeTagFromNote(noteId, tagId));
    }
};

export const thunkUpdateTag = (tagId, tag_name) => async (dispatch) => {
    const res = await fetch(`/api/tags/${tagId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag_name })
    });
    if (res.ok) {
        const updatedTag = await res.json();
        dispatch(updateTag(updatedTag));
    }
};

export const thunkDeleteNote = (tagId) => async (dispatch) => {
    const res = await fetch(`/api/tags/${tagId}/delete`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(deleteTag(tagId));
    }
};

// Initial State
const initialState = {
    allTags: [],
    tagsByNoteId: {},
};

// Reducer
export default function tagReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TAGS:
            return {
                ...state,
                allTags: action.payload
            };
        case CREATE_TAG:
            return {
                ...state,
                allTags: [...state.allTags, action.payload]
            };
        case GET_TAGS_FOR_NOTE:
            return {
                ...state,
                tagsByNoteId: {
                    ...state.tagsByNoteId,
                    [action.noteId]: action.payload
                }
            };
        case REMOVE_TAG_FROM_NOTE:
            return {
                ...state,
                tagsByNoteId: {
                    ...state.tagsByNoteId,
                    [action.noteId]: state.tagsByNoteId[action.noteId].filter(tag => tag.id !== action.tagId)
                }
            }
        case UPDATE_TAG:
            return {
                ...state,
                allTags: state.allTags.map(tag =>
                    tag.id === action.payload.id ? action.payload : tag
                )
            };
        case DELETE_TAG:
            return {
                ...state,
                allTags: state.allTags.filter(tag => tag.id !== action.tagId)
            };
        default:
            return state;
    }
}
