import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const messages = createSlice({
  name: 'messages',
  initialState: gon.messages,
  reducers: {
    messageRecieved(state, action) {
      const { data: { attributes } } = action.payload;
      state.push(attributes);
    },
  },
});

export const { messageRecieved } = messages.actions;

export default messages.reducer;
