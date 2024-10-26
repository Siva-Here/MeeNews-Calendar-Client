import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('jwtToken')), // Set based on token existence in localStorage
  jwtToken: localStorage.getItem('jwtToken') || null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setJwtToken(state, action) {
      state.jwtToken = action.payload;
    },
  },
});

export const { setAuthenticated, setJwtToken } = AuthSlice.actions;
export default AuthSlice.reducer;
