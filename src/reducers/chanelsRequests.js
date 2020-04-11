import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const addChanel = createAsyncThunk(
  'addChanel',
  async (newChannel) => {
    const url = routes.channelsPath();
    await axios.post(url, newChannel);
  },
);

const channelRequest = createSlice({
  name: 'messageReaquest',
  initialState: { type: 'waiting', text: '' },
  // extraReducers: {
  //   [sendMessage.pending]: (state, action) => ({ type: action.type, text: 'loading...' }),
  //   [sendMessage.fulfilled]: (state, action) => ({ type: action.type, text: '' }),
  //   [sendMessage.rejected]: (state, action) => ({ type: action.type, text: 'Network Error' }),
  // },
});


export default channelRequest.reducer;
