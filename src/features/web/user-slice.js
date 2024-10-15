import { createSlice } from '@reduxjs/toolkit';
import { fetchUserData } from './web-actions';

// Define the slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
