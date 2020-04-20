/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsInfo = createSlice({
  name: 'chanelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    changeChannel(state, action) {
      state.currentChannelId = action.payload.id;
    },
    changeChannelStatus(state, action) {
      state.pickedChannelStatus = action.payload.status;
    },

    receiveAddedChanel(state, action) {
      const { data: { attributes } } = action.payload;
      state.channels.push(attributes);
    },

    receiveRemovedChanel(state, action) {
      const { payload: { data: { id } } } = action;
      if (state.currentChannelId === id) {
        state.currentChannelId = 1;
      }
      state.channels = state.channels.filter((channel) => channel.id !== id);
    },

    receiveRenamedChanel(state, action) {
      const { payload: { data: { id, attributes } } } = action;
      const item = state.channels.find((channel) => channel.id === id);
      item.name = attributes.name;
    },
  },
});

export const channelsActions = {
  changeChannel: channelsInfo.actions.changeChannel,
  changeChannelStatus: channelsInfo.actions.changeChannelStatus,
  receiveAddedChanel: channelsInfo.actions.receiveAddedChanel,
  receiveRemovedChanel: channelsInfo.actions.receiveRemovedChanel,
  receiveRenamedChanel: channelsInfo.actions.receiveRenamedChanel,
};

export default channelsInfo.reducer;
