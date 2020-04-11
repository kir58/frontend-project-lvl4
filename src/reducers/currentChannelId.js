import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const currentChannelId = createSlice({
  name: 'currentChannelId',
  initialState: gon.currentChannelId,
  reducers: {
    changeChannel(state, action) {
      return action.payload;
    },
  },
});

export const { changeChannel } = currentChannelId.actions;

export default currentChannelId.reducer;
