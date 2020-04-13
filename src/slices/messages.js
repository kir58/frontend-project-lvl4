/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import i18next from 'i18next';
import axios from 'axios';
import routes from '../routes';


export const sendMessage = createAsyncThunk(
  'sendMessage',
  async ({ channelId, message }) => {
    const url = routes.channelMessagesPath(channelId);
    await axios.post(url, message);
  },
);

const messagesInfo = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [], messageRequest: { type: 'waiting', text: '' } },
  reducers: {
    messageRecieved(state, action) {
      const { data: { attributes } } = action.payload;
      state.messages.push(attributes);
    },
  },
  extraReducers: {
    [sendMessage.pending]: (state, action) => { state.messageRequest = { type: action.type, text: i18next.t('request.load') }; },
    [sendMessage.fulfilled]: (state, action) => { state.messageRequest = { type: action.type, text: '' }; },
    [sendMessage.rejected]: (state, action) => { state.messageRequest = { type: action.type, text: i18next.t('request.error') }; },
  },
});

export const messagesAction = {
  messageRecieved: messagesInfo.actions.messageRecieved,
  sendMessage,
};

export default messagesInfo.reducer;
