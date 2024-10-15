import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk to fetch user data from the API
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, thunkAPI) => {
    try {
      // Log that we are fetching user data
      console.log("Fetching user data...");

      // Make a fetch request to the API endpoint
      const response = await fetch('http://localhost:9001/api/user/get', {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include credentials if necessary
      });

      // If the response is not ok, throw an error
      if (!response.ok) {
        console.error("Failed to fetch user data:", response.statusText);
        throw new Error('Failed to fetch user data');
      }

      // Parse the response JSON data
      const userData = await response.json();

      // Log that user data has been fetched successfully
      console.log("User data fetched successfully:", userData);

      // Return the fetched user data
      return userData;
    } catch (error) {
      // Log any errors that occur during the fetch operation
      console.error('Error fetching user data:', error);

      // Return a rejected value with the error message
      throw error;
    }
  }
);

// Define a slice to manage the user state
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,     // Initial user data is null
    status: 'idle', // Initial status is idle
    error: null,    // Initial error is null
  },
  reducers: {}, // No additional reducers needed for now
  extraReducers: (builder) => {
    builder
      // When the fetchUserData async action is pending
      .addCase(fetchUserData.pending, (state) => {
        // Update the status to 'loading' and reset the error
        state.status = 'loading';
        state.error = null;
      })
      // When the fetchUserData async action is fulfilled
      .addCase(fetchUserData.fulfilled, (state, action) => {
        // Update the status to 'succeeded' and store the fetched user data
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      // When the fetchUserData async action is rejected
      .addCase(fetchUserData.rejected, (state, action) => {
        // Update the status to 'failed' and store the error message
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Create the Redux store with the userSlice reducer
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// Export the userSlice for further use if needed
export default userSlice;
