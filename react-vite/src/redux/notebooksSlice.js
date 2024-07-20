import { createSlice } from '@reduxjs/toolkit';

const notebooksSlice = createSlice({
    name: 'notebooks',
    initialState: [],
    reducers: {
        setNotebooks: (state, action) => action.payload,
        dumpNotebooks: () => []
    }
});

export const { setNotebooks, dumpNotebooks } = notebooksSlice.actions;
export default notebooksSlice.reducer;
