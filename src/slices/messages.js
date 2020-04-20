/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';


const messagesInfo = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [], messageRequest: { type: 'waiting', text: '' } },
  reducers: {
    messageRecieved(state, action) {
      const { data: { attributes } } = action.payload;
      state.messages.push(attributes);
    },
  },
});

export const messagesAction = {
  messageRecieved: messagesInfo.actions.messageRecieved,
};

export default messagesInfo.reducer;
