import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        setNotes: (state, action) => action.payload,
        dumpNotes: () => []
    }
})

export const { setNotes, dumpNotes } = notesSlice.actions;
export default notesSlice.reducer;
