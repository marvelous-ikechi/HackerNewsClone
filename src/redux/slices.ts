import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
}

const initialState: User = {
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.bio = action.payload.bio;
    },
    clearUser: state => {
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.bio = '';
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
