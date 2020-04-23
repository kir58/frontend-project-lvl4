/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { channelsActions } from './channels';

const messagesInfo = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [] },
  reducers: {
    messageRecieved(state, action) {
      const { data: { attributes } } = action.payload;
      state.messages.push(attributes);
    },
  },
  extraReducers: {
    [channelsActions.removedChanel]: (state, { payload: { data: { id } } }) => {
      state.messages = state.messages.filter((message) => message.channelId !== id);
    },
  },
});

export const messagesAction = {
  messageRecieved: messagesInfo.actions.messageRecieved,
};

export default messagesInfo.reducer;
