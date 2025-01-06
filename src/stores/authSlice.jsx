import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  admin: false,
  users: [], 
  loginError: null,
  signUpError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state, action) => {
      const { email, password } = action.payload;
      if (Array.isArray(state.users)) {
        const existingUser = state.users.find(user => user.email === email);
        if (existingUser) {
          state.signUpError = 'User already exists';
        } else {
          state.users.push({ email, password });
          state.signUpError = null;
        }
      } else {
        console.error('Error: state.users is undefined or not an array');
        state.users = []; // Initialize users array if undefined
      }
    },
    
    login: (state, action) => {
      const { email, password } = action.payload;
      if (Array.isArray(state.users)) {
        const user = state.users.find(user => user.email === email && user.password === password);
        if (user) {
          state.isAuthenticated = true;
          state.user = user;
          state.admin = user.email === 'admin@example.com';
          state.loginError = null;
        } else {
          state.isAuthenticated = false;
          state.loginError = 'Invalid email or password';
        }
      } else {
        console.error('Error: state.users is undefined or not an array');
        state.users = [];
      }
    },
    
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.admin = false;
      state.loginError = null;
    },
    
    adminLogin: (state) => {
      state.admin = true;
    },
    
    adminLogout: (state) => {
      state.admin = false;
    },
  },
});

export const { signUp, login, logout, adminLogin, adminLogout } = authSlice.actions;

export default authSlice.reducer;
