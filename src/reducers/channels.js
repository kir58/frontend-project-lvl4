import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

console.log(gon);
const channels = createSlice({
  name: 'chanels',
  initialState: gon.channels,
  reducers: {
    chanelsRecieved(state, action) {
      const { data: { attributes } } = action.payload;
      state.push(attributes);
    },
  },
});

export const { chanelsRecieved } = channels.actions;

export default channels.reducer;
