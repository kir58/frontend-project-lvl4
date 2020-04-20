/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalInfo = createSlice({
  name: 'modalInfo',
  initialState: { type: null, currentItem: null },
  reducers: {
    setModalInfo(state, action) {
      const { type, currentItem } = action.payload;
      state.type = type;
      state.currentItem = currentItem;
    },
  },
});

export const modalAction = {
  setModalInfo: modalInfo.actions.setModalInfo,
};

export default modalInfo.reducer;
