import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  messages: [], 
};

const chatMessageSlice = createSlice({
  name: 'chatMessage',
  initialState,
  reducers: {
    saveMessage: (state, action) => {
      state.messages = action.payload; 
    },
    clearMessage: state => {
      state.messages = []; 
    },
  },
});

export const {saveMessage, clearMessage} = chatMessageSlice.actions;

export default chatMessageSlice.reducer;
