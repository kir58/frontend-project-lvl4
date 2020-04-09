import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const channels = createSlice({
  name: 'currentChannelId',
  initialState: gon.currentChannelId,
  reducers: {
    changeCurrentChannel(state, action) {
      // const { data: { attributes } } = action.payload;
      // state.push(attributes);
    },
  },
});

export const { changeCurrentChannel } = channels.actions;

export default channels.reducer;
