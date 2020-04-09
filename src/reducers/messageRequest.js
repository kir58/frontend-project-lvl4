import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const sendMessage = createAsyncThunk(
  'sendMessages',
  async ({ channelId, message }) => {
    const url = routes.channelMessagesPath(channelId);
    await axios.post(url, message);
  },
);

const messageRequest = createSlice({
  name: 'messageReaquest',
  initialState: { type: 'waiting', text: '' },
  extraReducers: {
    [sendMessage.pending]: (state, action) => ({ type: action.type, text: 'loading...' }),
    [sendMessage.fulfilled]: (state, action) => ({ type: action.type, text: '' }),
    [sendMessage.rejected]: (state, action) => ({ type: action.type, text: 'Network Error' }),
  },
});


export default messageRequest.reducer;
